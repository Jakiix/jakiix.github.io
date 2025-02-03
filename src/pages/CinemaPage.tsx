import { useState, useEffect } from 'react';
import { Star, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieReview {
  id: string;
  fields: {
    title: string;
    critique: string;
    date: string;
    note: number;
    imgUrl: string;
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

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
    </div>
  );
}

function MovieCard({ review }: { review: MovieReview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex gap-4 p-4 h-full cursor-pointer 
    transition-all duration-500 ease-out transform hover:scale-[1.02] hover:shadow-2xl 
    hover:shadow-blue-500/20 hover:bg-gray-700 hover:-translate-y-1
    hover:ring-1 hover:ring-blue-500/30"
    onClick={() => setIsExpanded(!isExpanded)}
    >
    <img
    src={review.fields.imgUrl}
    alt={review.fields.title}
    className="w-32 h-48 object-cover rounded-lg flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
    />
    <div className="flex flex-col flex-1 min-w-0">
    <div className="flex justify-between items-start mb-2">
    <h2 className="text-xl font-bold text-white truncate transition-colors duration-300 hover:text-blue-400">
    {review.fields.title}
    </h2>
    </div>
    <div className="flex items-center gap-4 mb-2">
    <StarRating rating={review.fields.note} />
    <span className="text-gray-400 text-sm">{formatDate(review.fields.date)}</span>
    </div>
    <p className={`text-gray-300 mt-2 leading-relaxed text-sm ${isExpanded ? '' : 'line-clamp-4'} 
    transition-all duration-500`}>
    {review.fields.critique}
    </p>
    <button 
    className="text-blue-400 hover:text-blue-300 text-sm mt-2 transition-all duration-300
    hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
    rounded-md px-2 py-1 -ml-2"
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
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
        
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/Table%201`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const sortedReviews = data.records.sort((a: MovieReview, b: MovieReview) => 
        new Date(b.fields.date).getTime() - new Date(a.fields.date).getTime()
    );
    setReviews(sortedReviews);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Une erreur est survenue');
  } finally {
    setLoading(false);
  }
};

fetchData();
}, []);

return (
  <div className="min-h-screen bg-gray-900 py-12 px-6">
  <Link 
  to="/" 
  className="fixed top-6 right-6 bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 
  transition-all duration-300 shadow-lg hover:scale-110"
  aria-label="Retour à l'accueil"
  >
  <Home className="w-6 h-6 text-gray-800" />
  </Link>
  
  <div className="max-w-7xl mx-auto">
  <h1 className="text-4xl font-bold text-white mb-12 text-center">Critiques ciné</h1>
  
  {loading && (
    <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )}
  
  {error && (
    <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
    <p className="text-red-200">{error}</p>
    </div>
  )}
  
  {!loading && !error && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {reviews.map((review) => (
      <MovieCard key={review.id} review={review} />
    ))}
    </div>
  )}
  
  {!loading && !error && reviews.length === 0 && (
    <div className="text-center text-gray-400 mt-8">Aucune critique de film trouvée</div>
  )}
  </div>
  </div>
);
}