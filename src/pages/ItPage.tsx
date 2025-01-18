import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function ItPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f0] py-12 px-4">
            <Link 
                to="/" 
                className="fixed top-6 left-6 bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg"
                aria-label="Retour à l'accueil"
            >
                <Home className="w-6 h-6 text-gray-800" />
            </Link>
            <h1 className="text-4xl font-bold text-center mb-12">It</h1>
        </div>
    );
}