import odinLogo from '../../assets/logo-odin.png'

export default function Header() {
  return (
    <header className="header">
      <div className="brand-header">
        <div className="brand-icon">
          <img src={odinLogo} alt="Odin Fitness Logo" className="logo" />
        </div>
        <div className="brand-text">
          <h1 className="title">HeavyBar Calculator</h1>
          <p className="subtitle">Odin Fitness</p>
        </div>
      </div>
    </header>
  )
}
