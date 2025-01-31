// components/blog/ContentRenderer.tsx
import { ArrowRight } from "lucide-react";
import React from "react";

export const ContentRenderer = ({ content }: { content: any[] }) => {

    console.log("Contenu reçu :", content); // Vérifier si les données arrivent correctement

    if (!content || !Array.isArray(content)) return null;
    
    return (
        <div className="space-y-6">
        {content.map((block, index) => {
            switch (block.type) {
                case 'heading':
                return React.createElement(
                    `h${block.level}`,
                    {
                        key: index,
                        className: `font-bold text-gray-900 ${
                            block.level === 2 ? 'text-2xl mt-12 mb-6' : 
                            block.level === 3 ? 'text-xl mt-8 mb-4' : 'text-lg mt-6 mb-3'
                        }`
                    },
                    block.content
                );
                
                case 'paragraph':
                return (
                    <p
                    key={index}
                    className={`text-gray-700 leading-relaxed ${
                        block.italic ? 'italic' : ''
                    } ${block.style === 'small' ? 'text-sm' : 'text-base'}`}
                    >
                    {block.content}
                    </p>
                );
                
                case 'list':
                const ListTag = block.ordered ? 'ol' : 'ul';
                return (
                    <ListTag
                    key={index}
                    className="list-disc pl-6 my-4 space-y-2"
                    >
                    {block.items?.map((item: any, i: number) => (
                        <li key={i} className="text-gray-700">
                        {item.content}
                        </li>
                    ))}
                    </ListTag>
                );
                
                case 'link':
                    return (
                        <a
                        key={index}
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-4 ${block.space ? 'ml-4' : ''}`}
                        >
                        <ArrowRight className="w-4 h-4" />
                        {block.text}
                        </a>
                    );
                
                case 'image':
                return (
                    <figure key={index} className="my-8">
                    <img
                    src={block.url}
                    alt={block.alt}
                    className="w-full rounded-xl shadow-lg"
                    />
                    {block.caption && (
                        <figcaption className="text-center text-gray-500 mt-2 text-sm">
                        {block.caption}
                        </figcaption>
                    )}
                    </figure>
                );

                case 'footer':
                return (
                    <p
                    key={index}
                    className={`text-gray-700 leading-relaxed ${block.italic ? 'italic' : ''
                    } ${block.style === 'small' ? 'text-sm' : 'text-base'} fixed bottom-0 right-0 mr-4 mb-16`}>
                    {block.content}
                    </p>
                );
                
                default:
                console.warn('Type de bloc non géré:', block.type);
                return null;
            }
        })}
        </div>
    );
};