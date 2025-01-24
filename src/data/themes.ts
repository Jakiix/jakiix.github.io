import { Camera, Gamepad, Newspaper, Film, Milestone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import gaming from '../data/photographies/gaming.webp';
import cinema from '../data/photographies/cinema.webp';

interface Theme {
  theme: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
}

export const themes: Theme[] = [
  {
    theme: 'Gallerie photo',
    description: '(🚧 WIP 🚧) Une sélection de photos dont je suis particulièrement fier.',
    icon: Camera,
    imageUrl: 'https://images.unsplash.com/photo-1488684430052-f2d92fb178c2?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    theme: 'Blog',
    description: '(🚧 WIP 🚧) Une sélection de quelques articles rédigés par mes soins (logique, c\'est mon site) !',
    icon: Newspaper,
    imageUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    theme: 'Cinema',
    description: 'Mes critiques. Attention ça va saigner !',
    icon: Film,
    imageUrl: cinema,
  },
  {
    theme: 'Mon parcours',
    description: '(🚧 WIP 🚧) Découvrez mon parcours professionnel et mes réseaux',
    icon: Milestone,
    imageUrl: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    theme: 'Jeux',
    description: '(🚧 WIP 🚧) Des jeux que j\'ai fait, c\'est marrant viens essayer',
    icon: Gamepad,
    imageUrl: gaming,
  },
] as const;