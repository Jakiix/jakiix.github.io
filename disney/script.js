// Charger les personnages depuis le fichier disney.json
let characters = [];
let randomElement;
let timer; // Variable pour stocker l'intervalle du timer
let elementToRemove = document.getElementById('modale');
let startTime; // Temps de début
let elapsedTime = 0; // Temps écoulé
let emojiString = "";

function getDailyRandomIndex(length) {
    const today = new Date();
    // Utiliser l'annee + le mois + le jour pour une valeur unique chaque jour
    const seed = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // Calculer un index en utilisant le hash de la seed
    const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % length; // Obtenir un index dans les limites de la longueur du tableau
}

// Fonction pour charger les données JSON
async function loadCharacters() {
    const response = await fetch('disney.json');
    if (response.ok) {
        const data = await response.json();
        characters = data.characters; // Supposer que le JSON a une clé "characters"
        const randomIndex = getDailyRandomIndex(data.characters.length)
        randomElement = data.characters[randomIndex];
    } else {
        console.error('Erreur lors du chargement des personnages.');
    }
}

// Fonction pour filtrer les personnages en fonction de la saisie
function filterCharacters() {
    const input = document.getElementById('search');
    const suggestionsDiv = document.getElementById('suggestions');
    const searchTerm = input.value.toLowerCase();

    // Filtrer les personnages en fonction du nom
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    // Afficher les suggestions
    if (filteredCharacters.length > 0 && searchTerm) {
        suggestionsDiv.classList.remove('hidden');
        suggestionsDiv.innerHTML = filteredCharacters.map(character => `
            <div class="p-2 border-b hover:bg-gray-100 cursor-pointer" onclick="selectCharacter('${character.name}')">
                ${character.name}
            </div>
        `).join('');
    } else {
        suggestionsDiv.classList.add('hidden');
        suggestionsDiv.innerHTML = ''; // Vider le contenu si aucune suggestion
    }
}

// Fonction pour sélectionner un personnage
function selectCharacter(name) {
    const input = document.getElementById('search');
    const suggestionsDiv = document.getElementById('suggestions');
    const character = characters.find(character => character.name === name);

    if (character) {
        // Ajout de la ligne au tableau
        addCharacterToTable(character);
        input.value = name; // Remplir le champ de recherche avec le nom sélectionné
    }

    suggestionsDiv.classList.add('hidden'); // Cacher les suggestions
}

function getFlagEmoji(countryCode) {
    const codePoints = Array.from(countryCode.toUpperCase()).map(letter => 127397 + letter.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

function makeTwitterPost(time) {
    // Création message Twitter
    const userLanguage = navigator.language || navigator.languages[0];
    const countryCode = userLanguage.split('-')[1] || userLanguage.slice(0, 2).toUpperCase();
    // Obtenir le drapeau en émoji
    const flagEmoji = getFlagEmoji(countryCode);

    if (localStorage.getItem('emojiString') !== null) {
        emojiString = localStorage.getItem('emojiString')
    }

    return `${flagEmoji} Disneyle Game - ⌛ ${time}\n\n${emojiString}\nhttps://www.vincent-jacquet.fr/disney/disneyle.html`; 
}

function youWin() {
    let timeResult;
    const modalTitle = document.getElementById("modal-title");
        if (modalTitle) {
            // Arrête le timer
            clearInterval(timer);
            // Titre
            modalTitle.textContent = "🎉 Gagné 🎉";
            // Message détaillé
            const felicitations = document.getElementById("felicitations");
            const time = document.getElementById("time");
            const bye = document.getElementById("bye");
            if (felicitations && time && bye) {
                felicitations.textContent = `Félicitation la bonne réponse était bien : ${randomElement.name}.`;
                if (localStorage.getItem('time') !== null) {
                    timeResult = localStorage.getItem('time')
                } else {
                    timeResult = Math.floor(elapsedTime / 1000)
                    localStorage.setItem('time', timeResult);
                }
                if (timeResult > 60) {
                    const minutes = (timeResult / 60).toFixed(2); // Convertir en minutes avec 2 décimales
                    time.textContent = `Temps total : ${minutes} minute(s).`;
                } else {
                    time.textContent = `Temps total : ${timeResult} seconde(s).`;
                }
                bye.textContent = `Rendez-vous demain pour une nouvelle devinette`;
            }
            // Vider le contenu des autres paragraphes
            const paragraphs = document.querySelectorAll('#win p:not(#felicitations,#time,#bye)');
            paragraphs.forEach(p => {
                p.textContent = "";
            });
            // Remplace le bouton
            const shareButton = document.getElementById("delete-modale");
            const twitterShareText = makeTwitterPost(`${timeResult} secondes`)
            localStorage.setItem('todayWinResult', twitterShareText);
            timer = null; // Réinitialiser la variable du timer
            elapsedTime = 0; // Réinitialiser le temps écoulé
            const twitterShareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(twitterShareText);
            shareButton.innerHTML = "Partager sur X"
            // Écouter l'événement de clic sur le bouton de partage
            shareButton.addEventListener("click", function() {
                window.open(twitterShareUrl, "_blank");
            });
        }
        elementToRemove.classList.remove('hidden');
}

function addCharacterToTable(character) {
    let dateArrow = '';
    const tableBody = document.getElementById('character-table-body');
    const newRow = document.createElement('tr');

    // Définir la couleur de fond pour chaque cellule avec une ternaire
    const nameBgColor = character.name === randomElement.name ? '#4ade80' : '#f87171';
    const type_de_personnageBgColor = character.type_de_personnage === randomElement.type_de_personnage ? '#4ade80' : '#f87171';
    const habitatBgColor = character.habitat === randomElement.habitat ? '#4ade80' : '#f87171';
    const année_du_premier_filmBgColor = character.année_du_premier_film === randomElement.année_du_premier_film ? '#4ade80' : '#f87171';
    const sexeBgColor = character.sexe === randomElement.sexe ? '#4ade80' : '#f87171';
    

    const values = [nameBgColor, type_de_personnageBgColor, habitatBgColor, année_du_premier_filmBgColor, sexeBgColor];
    const allEqual = values.every(value => value === '#4ade80');

    // Remplir la chaîne d'émojis
    emojiString += nameBgColor === '#4ade80' ? '🟩' : '🟥';
    emojiString += type_de_personnageBgColor === '#4ade80' ? '🟩' : '🟥';
    emojiString += habitatBgColor === '#4ade80' ? '🟩' : '🟥';
    emojiString += année_du_premier_filmBgColor === '#4ade80' ? '🟩' : '🟥';
    emojiString += sexeBgColor === '#4ade80' ? '🟩' : '🟥';

    localStorage.setItem('emojiString', emojiString)

    // Date + ou -
    if (année_du_premier_filmBgColor !== '#4ade80') {
        if (randomElement.année_du_premier_film > character.année_du_premier_film) {
            dateArrow += 'Plus récent que '
        } else {
            dateArrow += 'Plus vieux que '
        }
    }

    // Ajouter un saut de ligne
    emojiString += '\n';

    newRow.innerHTML = `
        <td class="border border-gray-300 p-2 text-center" style="background-color: ${nameBgColor};">${character.name}</td>
        <td class="border border-gray-300 p-2 text-center" style="background-color: ${type_de_personnageBgColor};">${character.type_de_personnage}</td>
        <td class="border border-gray-300 p-2 text-center" style="background-color: ${habitatBgColor};">${character.habitat}</td>
        <td class="border border-gray-300 p-2 text-center" style="background-color: ${année_du_premier_filmBgColor};">${dateArrow} ${character.année_du_premier_film}</td>
        <td class="border border-gray-300 p-2 text-center" style="background-color: ${sexeBgColor};">${character.sexe}</td>
    `;

    tableBody.appendChild(newRow);

    if (allEqual) {
        localStorage.setItem('winOrNot', true)
        youWin()
    }
}

const removeBtn = document.getElementById('delete-modale');

window.onload = loadCharacters;

removeBtn.addEventListener('click', function() {
    elementToRemove.classList.add('hidden');
    if (canPlayToday()) { 
        if (!timer) {
            // Démarrer le timer
            startTime = Date.now() - elapsedTime;
            timer = setInterval(() => {
                elapsedTime = Date.now() - startTime;
            }, 1000);
        }
    } else {
        youWin()
        localStorage.setItem('winOrNot', true)
    }
});

function canPlayToday() {
    const today = new Date().toLocaleDateString();
    const lastPlayed = localStorage.getItem('lastPlayedDate');
    const winOrNot = localStorage.getItem('winOrNot') === 'true'; // Conversion en booléen

    if (!winOrNot) { // Si la personne n'a pas gagné aujourd'hui
        if (lastPlayed !== today) { // Si la personne n'a pas encore joué aujourd'hui
            localStorage.setItem('lastPlayedDate', today);
            localStorage.setItem('winOrNot', false); // Initialisation à faux pour la nouvelle journée
            return true;
        } else {
            return true; // Peut continuer à jouer s'il n'a pas encore gagné aujourd'hui
        }
    } else {
        return false; // Si la personne a gagné, elle ne peut plus jouer
    }
}

