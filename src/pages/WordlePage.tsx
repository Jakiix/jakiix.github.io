import { Link } from 'react-router-dom';
import { Home, CircleUserRound, Scale, Swords, Palette, Dna, UsersRound, Skull, RefreshCw, RotateCcw } from 'lucide-react';
import { ElementType, useState } from 'react';

// Exemple de données statiques pour le design
const WORD_LENGTH = 8;
const MAX_ATTEMPTS = 6;
const EXAMPLE_WORD = "REACT";
const EXAMPLE_ATTEMPTS = [
    "STEAM", // Mauvais mot
    "TRACE", // Lettres mélangées
    "REACT", // Mot correct
    "", // Vide
    "", // Vide
    "", // Vide
];

interface LetterProps {
    letter: string;
    status: 'correct' | 'present' | 'absent' | 'empty';
}

function Letter({ letter, status }: LetterProps) {
    const baseClasses = "w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg transition-all duration-500";
    
    const statusClasses = {
        correct: "bg-green-500 border-green-600 text-white",
        present: "bg-yellow-500 border-yellow-600 text-white",
        absent: "bg-gray-600 border-gray-700 text-white",
        empty: "bg-transparent border-gray-300 text-gray-700"
    };
    
    return (
        <div className={`${baseClasses} ${statusClasses[status]}`}>
        {letter}
        </div>
    );
}

function IconCell({ Icon, tooltip }: { Icon: ElementType; tooltip: string }) {
    return (
        <div className="group relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-purple-300 flex items-center justify-center rounded-lg bg-purple-50 transition-all duration-300 hover:bg-purple-100">
            <Icon className="w-6 h-6 text-purple-500" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-10">
                {tooltip}
                <div className="absolute bottom-0 left-1/2 -mb-1 w-2 h-2 bg-gray-800 transform -translate-x-1/2 rotate-45"></div>
            </div>
        </div>
    );
}

function WordRow({ word, isGuessed }: { word: string; isGuessed: boolean }) {
    const letters = word.padEnd(WORD_LENGTH, ' ').split('');
    
    return (
        <div className="flex gap-1 sm:gap-2 justify-center">
        {letters.map((letter, index) => {
            let status: LetterProps['status'] = 'empty';
            if (isGuessed) {
                if (letter === EXAMPLE_WORD[index]) {
                    status = 'correct';
                } else if (EXAMPLE_WORD.includes(letter)) {
                    status = 'present';
                } else if (letter !== ' ') {
                    status = 'absent';
                }
            }
            
            return (
                <Letter 
                key={index} 
                letter={letter} 
                status={status}
                />
            );
        })}
        </div>
    );
}

export function WordlePage() {
    const [inputValue, setInputValue] = useState('');
    const icons = [
        { 
            Icon: CircleUserRound,
            tooltip: "Nom" 
        },
        { 
            Icon: Scale,
            tooltip: "Gentil/Méchant" 
        },
        { 
            Icon: Swords,
            tooltip: "Guerrier ou pas" 
        },
        { 
            Icon: Palette,
            tooltip: "Couleur de cheveux" 
        },
        { 
            Icon: Dna,
            tooltip: "Homme ou Femme" 
        },
        { 
            Icon: UsersRound,
            tooltip: "Race" 
        },
        { 
            Icon: Skull,
            tooltip: "Nombre de morts" 
        },
        { 
            Icon: RefreshCw,
            tooltip: "Transformation possible ou pas" 
        },
    ];
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
        <nav className="fixed top-4 right-4 flex gap-4 z-10">
        <Link 
        to="/jeux" 
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Retour aux jeux"
        >
        <Home className="w-6 h-6 text-gray-700" />
        </Link>
        <button 
        className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Recommencer"
        >
        <RotateCcw className="w-6 h-6 text-gray-700" />
        </button>
        </nav>
        
        <div className="max-w-lg mx-auto flex flex-col min-h-screen">
        <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">DBZ WORDLE</h1>
        <p className="text-gray-600">Devinez le personnage de Dragon Ball Z du jour ! Cherchez n'importe quel personnage pour commencer.</p>
        </div>
        
        <div className="flex-grow flex flex-col items-center justify-center -mt-20">
        <div className="w-full max-w-sm">
        {/* Ligne d'icônes */}
        <div className="flex gap-1 sm:gap-2 justify-center mb-4">
        {icons.map(({ Icon, tooltip }, index) => (
            <IconCell key={index} Icon={Icon} tooltip={tooltip} />
        ))}
        </div>
        
        <div className="flex flex-col gap-2 mb-8">
        {EXAMPLE_ATTEMPTS.map((attempt, index) => (
            <WordRow 
            key={index} 
            word={attempt} 
            isGuessed={attempt !== ""}
            />
        ))}
        </div>
        
        <div className="flex gap-2 mt-8 px-4">
        <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toUpperCase())}
        className="flex-grow px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
        placeholder="Personnage DBZ"
        />
        <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={inputValue.length !== 5}
        >
        OK
        </button>
        </div>
        
        <div className="mt-8 text-left text-sm text-gray-500 space-y-1">
        <p>🟩 Le vert indique que la propriété est une correspondance exacte.</p>
        <p>🟧 L'orange indique une correspondance partielle.</p>
        <p>🟥 Le rouge indique qu'il n'y a aucune correspondance entre votre proposition et la propriété.</p>
        <p>⬆️⬇️ Les flèches indiquent également si la propriété de la réponse est au-dessus ou en dessous de votre proposition.</p>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
}
