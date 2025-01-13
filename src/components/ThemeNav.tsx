import { themes } from '../data/themes';

interface ThemeNavProps {
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function ThemeNav({ currentIndex, onSelect }: ThemeNavProps) {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {themes.map((theme, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`text-lg transition-all duration-300 ${
            index === currentIndex 
              ? 'font-bold text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {theme.theme}
        </button>
      ))}
    </div>
  );
}