import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlogPost } from '../types/index';
import { BlogCard } from '../components/blog/BlogCard';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
        
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/Table%203`, {
          headers: { 
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const formattedPosts = data.records.map((record: any) => ({
          id: record.id,
          ...record.fields,
          contenu: JSON.parse(record.fields.contenu || '[]')
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Mon Blog</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez mes derniers articles sur le développement, la technologie et les bonnes pratiques du web moderne.
          </p>
        </header>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
    </div>
    </div>
  );
}