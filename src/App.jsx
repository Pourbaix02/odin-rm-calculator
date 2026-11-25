import { Calculator, Dumbbell, Rotate3d, TrendingUp } from 'lucide-react'
import './App.css'
import StoreBadges from './components/StoreBadges'

const FEATURES = [
  {
    icon: Calculator,
    title: 'Calcula la carga',
    text: 'Elige tu RM y el porcentaje y mira qué discos van por lado. Si no calza, te da la opción un poco más arriba o más abajo.',
  },
  {
    icon: Rotate3d,
    title: 'Tu barra en 3D',
    text: 'Mírala de lado, de cerca o de frente. Al cambiar de porcentaje te dice qué quitar y qué poner.',
  },
  {
    icon: TrendingUp,
    title: 'Tus RMs',
    text: 'Guarda tus pesos por movimiento, calcula tu RM estimado y sigue tu progreso en un gráfico.',
  },
  {
    icon: Dumbbell,
    title: 'Como en tu box',
    text: 'Discos en kilos, libras o mixtos, bumpers de colores o negros, barra de 20 o 15 kg y seguros si quieres.',
  },
]

const SCREENS = [
  { src: '/screens/es_2.webp', caption: 'Tu barra en 3D' },
  { src: '/screens/es_3.webp', caption: 'Qué quitar y qué poner' },
  { src: '/screens/es_4.webp', caption: 'Todos tus RMs en un lugar' },
  { src: '/screens/es_5.webp', caption: 'Mira cómo avanzas' },
  { src: '/screens/es_6.webp', caption: 'Con los discos de tu gimnasio' },
]

function Phone({ src, alt, eager = false }) {
  return (
    <div className="phone">
      <img
        src={src}
        alt={alt}
        width="600"
        height="1304"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#top">
          <img src="/icon-192.png" alt="" width="36" height="36" />
          <span>SMARTWeight</span>
        </a>
        <a className="topbar-cta" href="#descargar">
          Descargar
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="notice">
              <span className="dot" aria-hidden="true" />
              HeavyBar Calculator ahora es una app
            </p>
            <h1 className="display">
              ¿Cuánto cargo
              <br />
              <span className="accent">por lado?</span>
            </h1>
            <p className="lead">
              SMARTWeight es la nueva versión de esta calculadora. Elige tu RM, mueve el
              porcentaje y mira qué discos cargar en una barra en 3D, tal como la vas a armar.
            </p>
            <StoreBadges />
            <p className="perks">Gratis · Sin anuncios · Sin cuenta</p>
          </div>
          <div className="hero-visual">
            <Phone src="/screens/es_1.webp" alt="SMARTWeight mostrando la carga al 80 % de un Back Squat" eager />
          </div>
        </section>

        <section className="features" aria-labelledby="features-title">
          <h2 id="features-title" className="section-title">
            Todo lo que hacía la web, <span className="accent">y más</span>
          </h2>
          <div className="feature-grid">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <article key={feature.title} className="feature">
                  <Icon className="feature-icon" size={26} strokeWidth={2.2} aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="gallery" aria-label="Capturas de la app">
          <div className="gallery-track">
            {SCREENS.map(({ src, caption }) => (
              <figure key={src} className="shot">
                <Phone src={src} alt={caption} />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="descargar" className="cta">
          <img src="/icon-512.png" alt="" width="96" height="96" className="cta-icon" />
          <h2 className="display">
            Descárgala <span className="accent">gratis</span>
          </h2>
          <p className="lead">Para iPhone y Android. Tus pesos se guardan solo en tu teléfono.</p>
          <StoreBadges />
        </section>
      </main>

      <footer className="footer">
        <nav className="footer-links">
          <a href="https://rainbowtech.app/smartweight/privacidad">Privacidad</a>
          <a href="https://rainbowtech.app/smartweight/soporte">Soporte</a>
        </nav>
        <p>
          SMARTWeight es de <a href="https://rainbowtech.app">Rainbow Tech</a>. Hecho con amor en Odin
          Fitness.
        </p>
      </footer>
    </div>
  )
}
