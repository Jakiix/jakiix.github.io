const uploadImage = async (file) => {
    const url = `http://176.139.233.54/nextcloud/remote.php/dav/files/mariage/Uploads/${file.name}`;
    const username = 'mariage';
    const password = 'mariagedelilas22';

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                'Content-Type': file.type // Ajout du type de contenu
            },
            body: file,
        });

        if (response.ok) {
            alert('Fichier uploadé avec succès !');
        } else {
            const errorText = await response.text();
            alert(`Erreur lors de l'upload : ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Erreur de réseau :', error);
        alert('Erreur de réseau, veuillez vérifier la connexion.');
    }
};

document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Obtenez le fichier sélectionné

    if (!file) {
        alert('Veuillez sélectionner un fichier à uploader.');
        return;
    }

    uploadImage(file); // Appelle la fonction pour uploader l'image
});