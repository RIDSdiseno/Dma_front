import g22 from '../assets/g22.jpg'
import exterior from '../assets/exterior.jpg'
import a24 from '../assets/array-24-1.jpg'
import a23 from '../assets/array-23-1.jpg'
import a25 from '../assets/array-25-1.jpg'
import a26 from '../assets/array-26-1.jpg'
import a27 from '../assets/array-27-1.jpg'
import a21 from '../assets/array-21-1.jpg'
import a30 from '../assets/array-30-1.jpg'
import a21png from '../assets/array-21-1.png'
import s_ex3 from '../assets/santa-exterior3.jpg'
import s_a2 from '../assets/santa-A-2.jpg'
import s_ex2 from '../assets/santa-exterior2.jpg'
import s_a3 from '../assets/santa-A-3.jpg'
import s_a1 from '../assets/santa-A-1.jpg'
import s_lugar from '../assets/santa-imagen-lugar.jpg'
import s_iso1 from '../assets/santa-isometrica-piso1.jpg'
import s_iso2 from '../assets/santa-isometrica-piso2.jpg'
import s_pl1 from '../assets/santa-planta1.jpg'
import s_pltecho from '../assets/santa-planta-techo.jpg'
import s_isoweb from '../assets/santa-isometrica-web.jpg'
import oficina from '../assets/oficina.jpg'
import dm15 from '../assets/dm15.jpg'
import dm16 from '../assets/dm16.jpg'
import dm17 from '../assets/dm17.jpg'
import dm18 from '../assets/dm18.jpg'
import dm1 from '../assets/dm1.jpg'
import dm2 from '../assets/dm2.jpg'
import pieza1 from '../assets/pieza-ninos-1.jpg'
import pieza2 from '../assets/pieza-ninos-2.jpg'
import pieza3 from '../assets/pieza-ninos-3.jpg'
import pieza4 from '../assets/pieza-ninos-4.jpg'

export type Project = {
  id: number
  title: string
  excerpt?: string
  image: string
  images?: string[]
  details?: {
    program?: string
    area?: string
    materials?: string
    client?: string
  }
  source?: string // referencia en dm-a.cl
}

// Datos iniciales: cada proyecto ahora contiene un arreglo de imágenes y detalles básicos.
const projects: Project[] = [
  {
    id: 1,
    title: 'Baño y Walking Closet - Arrayan',
    excerpt: 'Reordenamiento interior y acabado',
    image: g22,
    images: [g22, a24, a23, a25, a26, a27, a21, a30, a21png],
    details: {
      program: 'Vivienda',
      area: '8 m²',
      materials: 'Madera y metal',
      client: 'Privado'
    },
    source: 'https://dm-a.cl/portfolio/quincho-camino-otonal-2/'
  },
  {
    id: 2,
    title: 'Vivienda Santa Cruz',
    excerpt: 'Integración con paisaje',
    image: exterior,
    images: [exterior, s_ex3, s_a2, s_ex2, s_a3, s_a1, s_lugar, s_iso1, s_iso2, s_pl1, s_pltecho, s_isoweb],
    details: {
      program: 'Vivienda unifamiliar',
      area: '125 m²',
      materials: 'Hormigón, madera',
      client: 'Privado'
    },
    source: 'https://dm-a.cl/portfolio/lodge-miramar-pullay/'
  },
  {
    id: 3,
    title: 'Pieza Niños - Morel Mardones',
    excerpt: 'Diseño interior infantil',
    image: oficina,
    images: [oficina, pieza1, pieza2, pieza3, pieza4],
    details: {
      program: 'Vivienda',
      area: '8 m²',
      materials: 'Madera, tapices',
      client: 'Privado'
    },
    source: 'https://dm-a.cl/portfolio/jh-rh-bano/'
  }
]

export default projects
