import { Home, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';

export function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article introuvable</h1>
          <Link 
            to="/blog" 
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-4 left-4 z-50 flex gap-4">
        <Link 
          to="/" 
          className="bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg"
          aria-label="Retour à l'accueil"
        >
          <Home className="w-6 h-6 text-gray-800" />
        </Link>
        <button
          onClick={() => navigate('/blog')}
          className="bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/70 transition-colors duration-300 shadow-lg inline-flex items-center gap-2 text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </button>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="mb-6">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              {section.type === 'paragraph' && (
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              )}
              {section.type === 'heading' && (
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">{section.content}</h2>
              )}
              {section.type === 'image' && (
                <figure className="my-8">
                  <img
                    src={section.url}
                    alt={section.caption}
                    className="w-full rounded-xl shadow-lg"
                  />
                  <figcaption className="text-center text-gray-500 mt-4">{section.caption}</figcaption>
                </figure>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}