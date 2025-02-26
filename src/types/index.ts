export type BlogPost = {
    id: string;
    slug: string;
    titre: string;
    date: string;
    categorie: string;
    tempsLecture: number;
    extrait: string;
    banniere?: { 
        id: string;
        url: string;
        width?: number;
        height?: number;
    }[];
    contenu: Array<{
        type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote';
        level?: number;
        content?: string;
        url?: string;
        alt?: string;
        caption?: string;
        items?: string[];
        italic?: boolean;
    }>;
};

export type AirtableResponse<T> = {
    records: {
        id: string;
        createdTime: string;
        fields: T;
    }[];
};

export type Character = {
    name: string;
    alignment: string;
    fighter: string;
    hair_color: string;
    gender: string;
    race: string;
    deaths: number;
    can_transform: string;
};