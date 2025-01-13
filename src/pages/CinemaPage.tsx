import { Star } from 'lucide-react';
import { films, MovieReview } from '../data/movies';

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
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex gap-4 p-4 h-full">
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
            <p className="text-gray-300 mt-2 leading-relaxed text-sm line-clamp-4">{review.critique}</p>
        </div>
        </div>
    );
}

export function CinemaPage() {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-6">
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