import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function CarouselNavButton({ direction, onClick }: CarouselNavButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className={`absolute ${
        direction === 'prev' ? 'left-4' : 'right-4'
      } top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-colors`}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} slide`}
    >
      <Icon className="w-6 h-6 text-white" />
    </button>
  );
}