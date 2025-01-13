import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Carousel } from './components/Carousel';
import { SocialLinks } from './components/SocialLinks';
import { GamingPage } from './pages/GamingPage';
import { PhotoPage } from './pages/PhotoPage';
import { CinemaPage } from './pages/CinemaPage';
import { BlogPage } from './pages/BlogPage';
import { ItPage } from './pages/ItPage';
import { CvPage } from './pages/CvPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Vincent JACQUET</h1>
        
        <div className="mt-8 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed italic">
            Bienvenu sur mon site/portfolio/blog, définissez-le comme vous le voulez. Je voulais un endroit perso, mon petit jardin secret pour y rassembler tout ce que j'aime, et ce que je fais, peu importe le domaine. Et le résultat va vous étonner.
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Carousel />
        <SocialLinks />
      </main>
      
      <footer className="mt-12 py-6 text-center text-gray-600">
        <p>© 2025 Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/it" element={<ItPage />} />
        <Route path="/cinema" element={<CinemaPage />} />
        <Route path="/cv" element={<CvPage />} />
      </Routes>
    </Router>
  );
}