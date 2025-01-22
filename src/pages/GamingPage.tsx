import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function GamingPage() {
  return (
    <div className="min-h-screen bg-custom-radial relative overflow-hidden">
      <Link 
        to="/" 
        className="fixed top-6 right-6 bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg"
        aria-label="Retour à l'accueil"
      >
        <Home className="w-6 h-6 text-gray-800" />
      </Link>
      <div className="container mx-auto px-4 py-12">
        <h1 className="neon-text text-6xl font-md text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Gaming
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Add your gaming content here */}
          <div className="bg-gray-900 p-6 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Latest Games</h2>
            <p className="text-gray-300">Content coming soon...</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Reviews</h2>
            <p className="text-gray-300">Content coming soon...</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Streaming</h2>
            <p className="text-gray-300">Content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}