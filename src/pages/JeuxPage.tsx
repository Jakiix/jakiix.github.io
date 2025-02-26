import { Link, useNavigate } from 'react-router-dom';
import { Home, Gamepad } from 'lucide-react';

interface Game {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    comingSoon?: boolean;
    route?: string;
}

const games: Game[] = [
    {
        id: 1,
        title: "DBZ Wordle",
        description: "Devinez le personnage mystère grâce à ses propriétés",
        imageUrl: "https://images.unsplash.com/photo-1733690683193-087f7bd60bdc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        route: "/jeux/wordle"
    },
    {
        id: 2,
        title: "Disney Wordle",
        description: "Devinez le personnage mystère grâce à ses propriétés",
        imageUrl: "https://images.unsplash.com/photo-1611345405264-d9f9629c2f3c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        comingSoon: true
    }
];

function GameCard({ game }: { game: Game }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (!game.comingSoon && game.route) {
            navigate(game.route);
        }
    };

    return (
        <div className="relative group" onClick={handleClick}>
            <div className={`
                relative overflow-hidden rounded-lg transform transition-all duration-500 cursor-pointer
                ${game.comingSoon ? 'opacity-70' : 'hover:scale-105'}
                bg-gradient-to-br from-purple-900 to-blue-900
                border-2 border-transparent hover:border-blue-400
                shadow-lg hover:shadow-blue-500/50
            `}>
                <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-48 object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {game.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                        {game.description}
                    </p>
                </div>

                {game.comingSoon && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                        Bientôt disponible
                    </div>
                )}

                {!game.comingSoon && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Gamepad className="w-6 h-6 text-blue-400" />
                    </div>
                )}
            </div>
        </div>
    );
}

export function JeuxPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12 px-6">
            <Link 
                to="/" 
                className="fixed top-6 right-6 bg-white/10 p-3 rounded-full backdrop-blur-sm 
                hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                aria-label="Retour à l'accueil"
            >
                <Home className="w-6 h-6 text-white" />
            </Link>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
                    from-blue-400 to-purple-400 neon-text">
                        Jeux
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        J'ai fais quelques petits jeux, je vous laisse tester, et tenter de faire le meilleur score.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
}