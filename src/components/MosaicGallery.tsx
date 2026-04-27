
import dm1 from '../assets/dm1.jpg'
import dm2 from '../assets/dm2.jpg'
import dm3 from '../assets/dm3.jpg'
import dm4 from '../assets/dm4.jpg'
import dm5 from '../assets/dm5.jpg'
import dm6 from '../assets/dm6.jpg'
import dm9 from '../assets/dm9.jpg'
import dm10 from '../assets/dm10.jpg'
import dm11 from '../assets/dm11.jpg'
import dm12 from '../assets/dm12.jpg'
import dm13 from '../assets/dm13.jpg'
import dm14 from '../assets/dm14.jpg'
import dm15 from '../assets/dm15.jpg'
import dm16 from '../assets/dm16.jpg'
import dm17 from '../assets/dm17.jpg'
import dm18 from '../assets/dm18.jpg'

const images = [
  dm1,
  dm2,
  dm3,
  dm4,
  dm5,
  dm6,
  dm9,
  dm10,
  dm11,
  dm12,
  dm13,
  dm14,
  dm15,
  dm16,
  dm17,
  dm18,
]

export default function MosaicGallery() {
  return (
    <section id="mosaic" className="container mosaic-section">
      <div className="content centered">
        <h2>Galería</h2>
        <div className="masonry">
          {images.map((src, i) => (
            <div className="masonry-item" key={i}>
              <img src={src} alt={`Proyecto ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
