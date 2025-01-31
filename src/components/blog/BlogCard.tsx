import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from 'react-router-dom';
import { BlogPost } from "../../types";

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]">
        {post.banniere?.[0]?.url && (
            <div className="h-48 sm:h-56 lg:h-48 xl:h-56 overflow-hidden">
                <img
                src={`${post.banniere[0].url}?auto=format&fit=crop&w=800&q=60`}
                alt={post.titre}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
            </div>
        )}
            <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full">
                        {post.categorie}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{post.tempsLecture} min</span>
                    </div>
                </div>
        
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {post.titre}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                    {post.extrait}
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