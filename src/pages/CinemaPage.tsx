import { Star, Home } from 'lucide-react';
import { films, MovieReview } from '../data/movies';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-400'
          }`}
        />
      ))}
      <span className="ml-2 text-blue-400">{rating}</span>
    </div>
  );
}

function MovieCard({ review }: { review: MovieReview }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex gap-4 p-4 h-full cursor-pointer transition-all duration-300 hover:bg-gray-700"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <img
        src={review.imageUrl}
        alt={review.title}
        className="w-32 h-48 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-white truncate">{review.title}</h2>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <StarRating rating={review.note} />
          <span className="text-gray-400 text-sm">{review.date}</span>
        </div>
        <p className={`text-gray-300 mt-2 leading-relaxed text-sm ${isExpanded ? '' : 'line-clamp-4'} transition-all duration-300`}>
          {review.critique}
        </p>
        <button 
          className="text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      </div>
    </div>
  );
}

export function CinemaPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6">
      <Link 
        to="/" 
        className="fixed top-6 left-6 bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg"
        aria-label="Retour à l'accueil"
      >
        <Home className="w-6 h-6 text-gray-800" />
      </Link>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Critiques de Films
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {films.map((review) => (
            <MovieCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}