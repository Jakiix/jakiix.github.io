import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Newspaper, Film, Milestone } from 'lucide-react';

interface ThemeCardProps {
  theme: string;
  description: string;
  icon: 'photo' | 'blog' | 'cinema' | 'journey';
  imageUrl: string;
}

const icons = {
  photo: Camera,
  blog: Newspaper,
  cinema: Film,
  journey: Milestone,
};

const routes = {
  'Gallerie photo': '/photo',
  'Cinema': '/cinema',
  'Blog': '/blog',
  'Mon parcours': '/cv',
  'Jeux': '/jeux'
};

export function ThemeCard({ theme, description, icon, imageUrl }: ThemeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const Icon = icons[icon];
  
  const handleClick = () => {
    const route = routes[theme as keyof typeof routes];
    if (route) {
      navigate(route);
    }
  };
  
  return (
    <div className="relative h-[500px] w-full flex-shrink-0 snap-center rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={theme}
          className={`h-full w-full object-cover brightness-50 transition-all duration-300 ease-in-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-16 h-16 mb-4" />
        <h2 className="text-4xl font-bold mb-4 hover:underline transition-all duration-300">{theme}</h2>
        <p className="text-xl text-center max-w-2xl transition-all duration-300">{description}</p>
      </div>
    </div>
  );
}