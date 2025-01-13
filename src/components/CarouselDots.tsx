interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function CarouselDots({ total, current, onSelect }: CarouselDotsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === current ? 'bg-white' : 'bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}