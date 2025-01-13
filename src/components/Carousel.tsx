import { useState, useEffect } from 'react';
import { ThemeCard } from './ThemeCard';
import { CarouselNavButton } from './CarouselNavButton';
import { CarouselDots } from './CarouselDots';
import { ThemeNav } from './ThemeNav';
import { themes } from '../data/themes';

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % themes.length);
  };

  const prev = () => {
    setCurrentIndex((current) => (current - 1 + themes.length) % themes.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="relative w-full h-[500px] overflow-hidden shadow-md rounded-md">
        <div 
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {themes.map((theme, index) => (
            <ThemeCard key={index} {...theme} />
          ))}
        </div>
        
        <CarouselNavButton direction="prev" onClick={prev} />
        <CarouselNavButton direction="next" onClick={next} />
        <CarouselDots 
          total={themes.length} 
          current={currentIndex} 
          onSelect={setCurrentIndex} 
        />
      </div>
      
      <ThemeNav currentIndex={currentIndex} onSelect={setCurrentIndex} />
    </div>
  );
}