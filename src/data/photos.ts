import neige from '../data/photographies/Neige.jpg'
import chien from '../data/photographies/Chien.jpg'
import temple from '../data/photographies/Temple.jpg'
import mer from '../data/photographies/Mer.jpg'
import etoiles from '../data/photographies/Etoiles.jpg'
import riviere from '../data/photographies/Riviere.jpg'

export const photos = [
    {
        id: 1,
        href: neige,
        title: 'Morzine - Suisse',
        description: 'Vue magnifique sur la station de ski Morzine à Avoriaz',
        date: 'Décembre 2024'
    },
    {
        id: 2,
        href: chien,
        title: 'Bouvier Bernois - Réunion',
        description: 'Bouvier Bernois présent dans ma famille depuis à peu près 8 ans. La photo a été prise à Langevin à l\'île de la Réunion',
        date: 'Mai 2023'
    },
    {
        id: 3,
        href: temple,
        title: 'Fontaine d\'un temple - Japon',
        description: 'En arrière et en premier plan on peut voir la petite fontaine sortir d\'un tube en bamboo',
        date: 'Juillet 2023'
    },
    {
        id: 4,
        href: mer,
        title: 'Grand Anse - Réunion',
        description: 'Le bien connu "Bassin de Grand Anse" à la Réunion. Pas évident d\'avoir la vague en pleine action',
        date: 'Avril 2024'
    },
    {
        id: 5,
        href: etoiles,
        title: 'Ciel étoilés - France',
        description: 'Photo utilisée pour un timelapse d\étoiles, avec le post-traitement on peut distinguer encore plus les étoiles et objets célestes.',
        date: 'Août 2024'
    },
    {
        id: 6,
        href: riviere,
        title: 'Langevin - Réunion',
        description: 'Mon paradis sur Terre. J\'ai utilisé les masques sur Lightroom pour retoucher les couleurs et d\'autres réglages sympas.',
        date: 'Avril 2024'
    }
] as const;