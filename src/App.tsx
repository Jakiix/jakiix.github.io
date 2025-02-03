import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhotoPage } from './pages/PhotoPage';
import { CinemaPage } from './pages/CinemaPage';
import { BlogPage } from './pages/BlogPage';
import { JeuxPage } from './pages/JeuxPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { CvPage } from './pages/CvPage';
import { themes } from './data/themes';
import { SocialLinks } from './components/SocialLinks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import moi from './data/photographies/moi.webp';
import { ScrollToTop } from './components/ScrollToTop';

function HomePage() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f5f0] z-10" />
        <div className="absolute inset-0">
          <img
            src={moi}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Vincent JACQUET
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Bienvenue sur mon site, mon portfolio, ou mon blog… appelez-le comme vous voulez, après tout, les étiquettes, c’est surfait. J’avais juste envie d’un espace à moi pour rassembler tout ce qui me plaît.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('categories');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="animate-bounce inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span>Découvrir mon monde</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="relative min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <div
                key={theme.theme}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveTheme(theme.theme)}
                onMouseLeave={() => setActiveTheme(null)}
                onClick={() => navigate(`/${theme.theme.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={theme.imageUrl}
                    alt={theme.theme}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                      <theme.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {theme.theme}
                    </h2>
                    
                    {/* Description - Hidden by default, shown on hover */}
                    <p className="text-white/80 transform transition-all duration-500 opacity-0 group-hover:opacity-100">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Restons connectés
          </h2>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallerie-photo" element={<PhotoPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/critique-ciné" element={<CinemaPage />} />
        <Route path="/mon-parcours" element={<CvPage />} />
        <Route path="/jeux" element={<JeuxPage />} />
      </Routes>
    </Router>
  );
}