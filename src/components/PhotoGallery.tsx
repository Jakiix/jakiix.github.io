import { PhotoCard } from './PhotoCard';
import { photos } from '../data/photos';

export function PhotoGallery() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} {...photo} />
        ))}
      </div>
    </div>
  );
}