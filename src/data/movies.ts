export interface MovieReview {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    critique: string;
    note: number;
}

export const films: MovieReview[] = [
    {
        id: 1,
        imageUrl: `../dist/assets/${1}.jpg`,
        title: 'Arthur, malédiction',
        date: 'Ajoutée le 03 juillet 2022',
        critique: 'L\'idée du film avait un potentiel immense. La réalisation était vraiment pas degeu du tout. Malheureusement le jeu d\acteur est catastrophique, ce qui gâche tout. Le film est un slasheur classique avec un skin d\'Arthur... Très dommage tout ça',
        note: 0.5
    },
    {
        id: 2,
        imageUrl: `../dist/assets/${2}.jpg`,
        title: 'Les minions 2 : Il était une fois Gru',
        date: 'Ajoutée le 04 juillet 2022',
        critique: 'Bon film. Les répliques des minions sont toujours aussi drôle et cultes. Agréable de voir le passé de Gru mais le film n\'est pas plus marquant qu\'un autre. Film plutôt vite oubliable',
        note: 3
    },
    {
        id: 3,
        imageUrl: `../dist/assets/${3}.jpg`,
        title: 'Buzz l\éclair',
        date: 'Ajoutée le 04 juillet 2022',
        critique: 'Très bon film d\'animation. Le film est un mélange entre Interstellar, Star Wars et Alien. La première partie du film est excellente, avant de tomber dans une partie plus classique et enfantine. Pixar toujours au top niveau animation !',
        note: 3.5
    },
    {
        id: 4,
        imageUrl: `../dist/assets/${4}.jpg`,
        title: 'Jurassic World: Le monde d\'après',
        date: 'Ajoutée le 08 juin 2022',
        critique: 'J\'ai passé un long mauvais moment. Or le casting du premier Jurassic qui reviens, il n\'y a rien à retirer. Le film est long pour au final rien du tout. Le fait de donner des sentiments aux raptors rends le film moins impactant. Et trop de questions sans réponses, pourquoi les personnages se retrouvent en 1 seconde dans tel ou tel endroit, pourquoi les dinosaures paraissent aveugles et n\'attaquent pas et attendent juste que leurs proies soient or de portée. En résumé, le film est une réplique du premier en beaucoup beaucoup moins bien. Il y a bien trop de points négatifs...',
        note: 1.5
    },
    {
        id: 5,
        imageUrl: `../dist/assets/${5}.jpg`,
        title: 'The Northman',
        date: 'Ajoutée le 16 mai 2022',
        critique: 'Très beau, les musiques sont superbes. Après il y a beaucoup de violences, très gore. Le scénario était sympa, notamment le côté mystique de l\'histoire fort agréable.',
        note: 2.5
    },
    {
        id: 6,
        imageUrl: `../dist/assets/${6}.jpg`,
        title: 'Les Bad Guys',
        date: 'Ajoutée le 06 mai 2022',
        critique: 'Film plutôt prévisible tout est assez moyen en vérité, l\'humour, le scénario... Malgrès tout cela le film reste un très bon divertissement, les musiques rythment très bien le film et au final tous ces éléments le rende très agréable à le regarder. On peut le résumer en un Ocean Eleven version enfant.',
        note: 3.5
    },
    {
        id: 7,
        imageUrl: `../dist/assets/${7}.webp`,
        title: 'Ça : Chapitre 2',
        date: 'Ajoutée le 06 mai 2022',
        critique: 'Scénario un peu tiré par les cheveux, parsemé de quelques incohérences. Le clown est toujours parfaut, bien mieux que le premier de 1989. La lumière et la réalisation sont top. La fin a été revue il me semble, sans plus.',
        note: 3.5
    },
    {
        id: 8,
        imageUrl: `../dist/assets/${8}.webp`,
        title: 'Ça',
        date: 'Ajoutée le 06 mai 2022',
        critique: 'Film d\'horreur très plaisant de par sa lumière et son ambiance. Le clown est extrêmement bien fait. Dommage pour le scénario qui est repris du livre et qui est un peu fouillis à certains moments. L\'actrice qui joue Berverly est très bonne dans son rôle.',
        note: 3.5
    },
    {
        id: 9,
        imageUrl: `../dist/assets/${9}.jpg`,
        title: 'La Ruse',
        date: 'Ajoutée le 06 mai 2022',
        critique: 'Histoire intéressante. Film beaucoup trop long pour ce que ça veut raconter. À éviter un lundi soir à 22h30 en version originale.',
        note: 3
    },
    {
        id: 10,
        imageUrl: `../dist/assets/${10}.jpg`,
        title: 'Doctor Strange in the Multiverse of madness',
        date: 'Ajoutée le 06 mai 2022',
        critique: 'Film assez oubliable. Les effets spéciaux sont très bien fait mais il y en a peut-être un peu trop. Il est fortement conseillé d\'avoir vu la série avant ce film. Bon divertissement tout de même.',
        note: 3
    },
    {
        id: 11,
        imageUrl: `../dist/assets/${11}.jpg`,
        title: 'Le secret de la cité perdue',
        date: 'Ajoutée le 27 avril 2022',
        critique: 'Scénario prévisible. Beaucoup de scènes inutiles. Les effets spéciaux sont mauvais. L\'humour par contre n\'est pas trop trop lourd, ça passe pour un film du dimanche.',
        note: 2
    },
    {
        id: 12,
        imageUrl: `../dist/assets/${12}.jpg`,
        title: 'Les Animaux fantastiques : Les secrets de Dumbledore',
        date: 'Ajoutée le 12 avril 2022',
        critique: 'Film plutôt fade et mal rythmé. Pas mal de fan services, et on a l\'impression que l\'histoire du 1 et du 2 ne servent pas à grand chose pour ce troisième volet. L\'acteur de Norbert est beaucoup plus agréable à l\'écran que les deux premiers films. Certaines scènes ne sont pas crédibles dans le cadre du film.',
        note: 2.5
    },
    {
        id: 13,
        imageUrl: `../dist/assets/${13}.jpg`,
        title: 'Les Animaux fantastiques : Les crimes de Grindewald',
        date: 'Ajoutée le 09 avril 2022',
        critique: 'J\'ai vraiment du mal avec les acteurs... Le scénario est beaucoup plus intéressant que le premier film. Les effets spéciaux sont quand même très bien faits. Les musiques sont fades... On a l\'impression que les acteurs principaux sont les seconds rôles du film, dommage',
        note: 3
    },
    {
        id: 14,
        imageUrl: `../dist/assets/${14}.webp`,
        title: 'Us',
        date: 'Ajoutée le 05 avril 2022',
        critique: 'J\'ai beaucoup aimé. le film pose une ambiance, le scénario est vraiment pas banal. Les plans sont absolument sublimes, les couleurs, les musiques... Un peu longuet. Les codes du slasheur sont présents.',
        note: 4
    },
    {
        id: 15,
        imageUrl: `../dist/assets/${15}.jpg`,
        title: 'Morbius',
        date: 'Ajoutée le 01 avril 2022',
        critique: 'Vraiment très mauvais. tout est ultra cliché. Il y a trop d\'incohérences. Les musiques sont semblables aux musiques de bande annonce, mais sur 1h50 de film. Le scénario est vraiment pas prenant du tout, il n\'y a aucun enjeu. 0,5 points pour les SFX de la faculté spéciale de Morbius. Venom 2 était légèrement au dessus.',
        note: 0.5
    },
    {
        id: 16,
        imageUrl: `../dist/assets/${16}.webp`,
        title: 'Abuela',
        date: 'Ajoutée le 29 mars 2022',
        critique: 'J\'ai beaucoup aimé ce film. Ça fait un peu film d\'auteur et ça sort un peu des clichés screameur type Annabelle. Ici ils jouent beaucoup avec la solitude liée à la vieillesse. Quelques moments bien dérangeant et c\'est ça qu\'on aime? Le scénario est sympa sans plus.',
        note: 4
    },
    {
        id: 17,
        imageUrl: `../dist/assets/${17}.jpg`,
        title: 'Mort sur le Nil',
        date: 'Ajoutée le 18 mars 2022',
        critique: 'Très long à démarrer. De bons acteurs. L\'histoire m\'a laissé de marbre. Petit plus pour l\'actrice Emma Mackey qui joue très bien !',
        note: 2.5
    },
    {
        id: 18,
        imageUrl: `../dist/assets/${18}.jpg`,
        title: 'Alerte Rouge',
        date: 'Ajoutée le 18 mars 2022',
        critique: 'L\'histoire est pas mal. Je ne suis pas fan des charadesign, mais l\'animation est tout de même parfaitement maîtrisée de la part de Pixar. Un film pour enfant sans plus.',
        note: 3.5
    },
    {
        id: 19,
        imageUrl: `../dist/assets/${19}.webp`,
        title: 'Jujutsu Kaisen 0',
        date: 'Ajoutée le 18 mars 2022',
        critique: 'Très bien. le rythme est plutôt lent le premier tiers du film, mais le scénario étant très prenant on oublie vite, les personnages étant attachants. L\'animation est au top comme d\'hab. Les musiques étaient assez spéciales mais pas tellement dérangeantes.',
        note: 4
    },
    {
        id: 20,
        imageUrl: `../dist/assets/${20}.jpg`,
        title: 'Maison de Retraite',
        date: 'Ajoutée le 07 mars 2022',
        critique: 'Film extrêmement gnangnan, le jeu d\'acteur de Kev adams laisse à désirer. Scénario vraiment très prévisible avec un dénouement brouillon. Cependant, les musiques sont bien, quelques passages ressortent une morale assez basique mais très bien amenée à touchante. Les acteurs des personnes âgées sont très bon notamment l\'excellent Gérard Depardieu!',
        note: 3
    },
] as const;