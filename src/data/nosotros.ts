import florencia from '../assets/florencia.jpg'
import paulette from '../assets/paulette.jpg'
import joaco from '../assets/joaco.jpg'
import rafa from '../assets/rafa.jpg'

const intro = `DM+A se crea a fines del 2015, como una empresa focalizada en la generación y comunicación de ideas creativas, cuyos socios cuentan con experiencia en todo tipo de servicios de Arquitectura y Técnicos Relacionados, Diseño, Obras en Construcción y coordinación de trabajos multidisciplinarios.

Ofrecemos un servicio de alta calidad y responsable, basado en la convicción que el verdadero éxito está en forjar relaciones duraderas y confiables con cada uno de nuestros clientes.

Buscamos un enfoque al perfeccionamiento continuo, explorando constantemente técnicas digitales y materias sobre energía y sustentabilidad, teniendo como objetivo utilizarlas como herramientas que hacen posible satisfacer las necesidades de nuestros clientes y crear un diseño sensible y preocupado por el entorno.`

type Member = {
  name: string
  role: string
  bio: string
  image?: string
}

const members: Member[] = [
  {
    name: 'Rafael Donoso S.',
    role: 'Socio',
    bio: `Rafael Alfonso Donoso Sesnic (1983) realiza sus estudios en la Facultad de Arquitectura, Urbanismo y Paisaje en la Universidad Central de Chile, obteniendo su título de arquitecto con Distinción Máxima el año 2010. Continúa posteriormente sus estudios realizando el Diplomado en Arquitectura Sustentable en la Pontificia Universidad Católica de Chile (2012) y se desempeñó como docente en la Universidad Central (Taller de proyectos de 1º año, 2009, 2012 y 2013).

  Actualmente es socio de DM+A ARQUITECTOS.`,
    image: rafa
  },
  {
    name: 'Joaquín Monsalve D.',
    role: 'Socio',
    bio: `Joaquín Monsalve Díaz (1987) realiza sus estudios en la Facultad de Arquitectura, Diseño y Construcción de la Universidad Mayor, obteniendo su título de Arquitecto con Distinción Máxima el año 2013. Continúa posteriormente sus estudios realizando el Diplomado de Preparación y Evaluación de Proyectos Inmobiliarios en la Universidad de Chile (2016) y el Diplomado de Diseño de Paisaje en la Universidad Católica de Chile (2016).

  Actualmente es socio de DM+A ARQUITECTOS.`,
    image: joaco
  },
  {
    name: 'Paulette Coulomb C.',
    role: 'Colaboradora',
    bio: `Paulette Andrea Coulomb Castillo (1995) realiza sus estudios en la Facultad de Arquitectura y Urbanismo de la Universidad de Chile, obteniendo su título de Arquitecta con Distinción el año 2021.

  Actualmente es colaboradora de DM+A Arquitectos.`,
    image: paulette
  },
  {
    name: 'Florencia Feliú G.',
    role: 'Colaboradora',
    bio: `Florencia Antonia Feliú Guzmán (1990) arquitecta de la Universidad Diego Portales, titulada con distinción en mención de paisaje y sustentabilidad el año 2017.

  Actualmente colaboradora en DM+A arquitectos.`,
    image: florencia
  }
]

export { intro, members }
