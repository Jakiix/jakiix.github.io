import { Home, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]">
      <div className="h-48 sm:h-56 lg:h-48 xl:h-56 overflow-hidden">
        <img
          src={`${post.imageUrl}?auto=format&fit=crop&w=800&q=60`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <span className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`} 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group text-sm sm:text-base"
        >
          Lire la suite
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Link 
        to="/" 
        className="fixed top-4 sm:top-6 right-4 sm:right-6 bg-white/50 p-2 sm:p-3 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg z-50"
        aria-label="Retour à l'accueil"
      >
        <Home className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
      </Link>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Le Blog</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez mes derniers articles sur le développement, la technologie et les bonnes pratiques du web moderne.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}