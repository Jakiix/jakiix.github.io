import { X } from 'lucide-react';

interface PhotoModalProps {
    href: string;
    title: string;
    onClose: () => void;
}

export function PhotoModal({ href, title, onClose }: PhotoModalProps) {
    return (
    <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fadeIn"
        onClick={onClose}
    >
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label="Close"
        >
        <X className="w-6 h-6 text-white/50" />
        </button>
        <img
            src={href}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
        />
    </div>
    );
}