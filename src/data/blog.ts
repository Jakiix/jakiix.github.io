export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    imageUrl: string;
    content: Array<{
        type: 'paragraph' | 'heading' | 'image';
        content?: string;
        url?: string;
        caption?: string;
    }>;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'timelapse-etoiles',
        title: "Mon timelapse des étoiles",
        excerpt: "Depuis que je suis jeune j'ai une fascination pour l'astronomie (et pas l'astrologie 😤). Depuis mes premiers films de SF, comme Alien à l'époque, où Interstellar plus récemment (ouais bon 2016 quand même). Pleins de questions dans la tête assez classiques, que je ne vais pas cité aujourd'hui..",
        date: "15 Mars 2024",
        readTime: "8 min",
        category: "Photo",
        imageUrl: "https://images.unsplash.com/photo-1529474530412-0dab316caf55?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: [
            {
                type: 'paragraph',
                content: "Depuis que je suis jeune, j'ai toujours été fasciné par l'astronomie. Cette passion a commencé avec les films de science-fiction comme Alien et plus récemment Interstellar. L'immensité de l'espace, ses mystères et sa beauté m'ont toujours captivé."
            },
            {
                type: 'heading',
                content: "Le début de l'aventure"
            },
            {
                type: 'paragraph',
                content: "J'ai commencé à m'intéresser à la photographie astronomique il y a environ deux ans. Au début, c'était simplement quelques photos avec mon smartphone, mais rapidement, j'ai réalisé que je voulais aller plus loin."
            },
            {
                type: 'image',
                url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=3270&auto=format&fit=crop",
                caption: "Une de mes premières photos du ciel étoilé"
            },
            {
                type: 'heading',
                content: "Le matériel nécessaire"
            },
            {
                type: 'paragraph',
                content: "Pour réaliser un bon timelapse des étoiles, il faut un équipement adapté. J'utilise actuellement un appareil photo reflex avec un objectif grand angle, un trépied stable, et un intervallomètre. La clé est d'avoir un appareil qui permet des poses longues et qui gère bien les hautes sensibilités ISO."
            }
        ]
    },
    {
        id: 2,
        slug: 'osint-indiana-jones',
        title: "OSINT et Indiana Jones",
        excerpt: "Je vais pas vous donner la définition Wikipédia, ou la définition avec des mots compliqués. Déjà d'une parceque c'est pas marrant mais surtout parceque c'est pas marrant ... 👀",
        date: "10 Mars 2024",
        readTime: "12 min",
        category: "Tech",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=3353&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: [
            {
                type: 'paragraph',
                content: "L'OSINT (Open Source Intelligence) est comme une chasse au trésor moderne. Tout comme Indiana Jones parcourt le monde à la recherche d'artefacts anciens, les analystes OSINT explorent le vaste monde d'Internet à la recherche d'informations précieuses."
            },
            {
                type: 'heading',
                content: "Qu'est-ce que l'OSINT ?"
            },
            {
                type: 'paragraph',
                content: "L'OSINT consiste à collecter et analyser des informations provenant de sources publiques. Ces sources peuvent être des réseaux sociaux, des sites web, des forums, des documents publics, et bien plus encore. C'est un peu comme être un détective numérique."
            },
            {
                type: 'image',
                url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop",
                caption: "Le monde numérique regorge d'informations à découvrir"
            },
            {
                type: 'heading',
                content: "Les outils du métier"
            },
            {
                type: 'paragraph',
                content: "Tout comme Indiana Jones a son fouet et sa sacoche, l'analyste OSINT a ses outils spécifiques. Cela inclut des moteurs de recherche spécialisés, des outils d'analyse de métadonnées, des visualiseurs de réseaux sociaux, et bien d'autres encore."
            }
        ]
    }
];