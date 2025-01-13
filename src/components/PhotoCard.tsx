import { useState } from 'react';
import { PhotoModal } from './PhotoModal';

interface PhotoCardProps {
  id: number;
  href: string;
  title: string;
  description: string;
  date: string;
}

export function PhotoCard({ href, title, description, date }: PhotoCardProps) {
  const [showModal, setShowModal] = useState(false);
  const thumbnailUrl = `${href}?auto=compress&w=800&q=80`;

  return (
    <>
      <div className="group h-[400px] [perspective:1000px] cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0">
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
              loading="lazy"
            />
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-white px-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
              <p className="mt-2 text-gray-500">{date}</p>
              <p className="mt-4 text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <PhotoModal
          href={href}
          title={title}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}