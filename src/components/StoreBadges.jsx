import { APP_STORE_URL, PLAY_STORE_URL } from '../stores'

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="badge-logo">
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="badge-logo">
      <polygon fill="#2196F3" points="3.6,1.8 13.2,12 3.6,22.2" />
      <polygon fill="#00E676" points="3.6,1.8 16.3,9.2 13.2,12" />
      <polygon fill="#FF3D44" points="3.6,22.2 13.2,12 16.3,14.8" />
      <polygon fill="#FFC400" points="13.2,12 16.3,9.2 21,12 16.3,14.8" />
    </svg>
  )
}

function Badge({ href, logo, small, big, store }) {
  return (
    <a
      className="badge"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Descargar SMARTWeight en ${store}`}
    >
      {logo}
      <span className="badge-text">
        <span className="badge-small">{small}</span>
        <span className="badge-big">{big}</span>
      </span>
    </a>
  )
}

export default function StoreBadges() {
  return (
    <div className="badges">
      <Badge
        href={APP_STORE_URL}
        logo={<AppleLogo />}
        small="Descárgalo en el"
        big="App Store"
        store="App Store"
      />
      <Badge
        href={PLAY_STORE_URL}
        logo={<PlayLogo />}
        small="Disponible en"
        big="Google Play"
        store="Google Play"
      />
    </div>
  )
}
