import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
interface Photo {
  id: string;
  fields: { 
    href: Array<{
      id: string;
      width: number;
      height: number;
      url: string;
      filename: string;
      size: number;
      type: string;
      thumbnails: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
        full: { url: string; width: number; height: number };
      };
    }>;
    title: string;
    description: string;
    date: string;
  };
}

interface PhotoModalProps {
  href: string;
  title: string;
  onClose: () => void;
}

function PhotoModal({ href, title, onClose }: PhotoModalProps) {
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

function PhotoCard({ photo }: { photo: Photo }) {
  console.log("photo.fields.href:", photo.fields.href);
  
  const [showModal, setShowModal] = useState(false);
  const thumbnailUrl = `${photo.fields.href[0].thumbnails.large.url}?auto=compress&w=800&q=80`;
  
  return (
    <>
    <div className="group h-[400px] [perspective:1000px] cursor-pointer" onClick={() => setShowModal(true)}>
    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    {/* Front */}
    <div className="absolute inset-0">
    <img
    src={thumbnailUrl}
    alt={photo.fields.title}
    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
    loading="lazy"
    />
    </div>
    
    {/* Back */}
    <div className="absolute inset-0 h-full w-full rounded-xl bg-white px-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
    <div className="flex min-h-full flex-col items-center justify-center">
    <h3 className="text-2xl font-bold text-gray-800">{photo.fields.title}</h3>
    <p className="mt-2 text-gray-500">{photo.fields.date}</p>
    <p className="mt-4 text-gray-600">{photo.fields.description}</p>
    </div>
    </div>
    </div>
    </div>
    
    {showModal && (
      <PhotoModal
      href={photo.fields.href[0].thumbnails.full.url}
      title={photo.fields.title}
      onClose={() => setShowModal(false)}
      />
    )}
    </>
  );
}

export function PhotoGallery() {
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
        
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/Table%202`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const test = data.records;
      setPhotos(test);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

return (
  <div className="container mx-auto">
  {/* Grid principale */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {loading && (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
  )}
  
  {error && (
    <div className="bg-red-300 border border-red-500 rounded-lg p-4 mb-6 ">
      <p className="text-center">Erreur : Les données n'ont pas pu être récupérées</p>
    </div>
  )}
  
  {!loading &&
    !error &&
    photos.map((photo) => (
      <PhotoCard key={photo.id} photo={photo} />
    ))}
    
    {!loading && !error && photos.length === 0 && (
      <div className="text-center text-gray-400 mt-8">
      Aucune photo trouvée
      </div>
    )}
    </div>
    </div>
  );
  
}