import { Home, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { ContentRenderer } from '../components/blog/ContentRenderer';

export function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
        
        const response = await fetch(
          `https://api.airtable.com/v0/${baseId}/Table%203?filterByFormula={slug}='${slug}'`, 
          { 
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            }
          })

        if (!response.ok) throw new Error('Erreur de réseau');

        const data = await response.json();

        if (!data?.records?.length) throw new Error('Article non trouvé');
        const record = data.records[0];
        
        // Gestion sécurisée du contenu
        let contenu = [];
        try {
          contenu = record.fields.contenu ? JSON.parse(record.fields.contenu) : [];
        } catch (e) {
          console.error('Erreur de parsing du contenu:', e);
        }

        setPost({
          id: record.id,
          slug: record.fields.slug,
          titre: record.fields.titre,
          date: record.fields.date,
          categorie: record.fields.categorie,
          tempsLecture: record.fields.tempsLecture,
          extrait: record.fields.extrait,
          banniere: record.fields.banniere || [],
          contenu: contenu
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-12">Chargement...</div>;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{error}</h1>
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

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-4 right-4 z-50 flex gap-4">
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
          {post.banniere?.[0]?.url && (
            <div className="mb-6">
              <img
                src={post.banniere[0].url}
                alt={post.titre}
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full">
              {post.categorie}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.tempsLecture} min</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {post.titre}
          </h1>
        </header>
        <ContentRenderer content={post.contenu} />
      </article>
    </div>
  );
}