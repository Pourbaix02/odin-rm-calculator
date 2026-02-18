import { Calculator, Dumbbell } from 'lucide-react'

export default function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs-container">
      <div className={`tab-indicator ${activeTab === 'builder' ? 'builder' : ''}`} />
      <button
        className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
        onClick={() => onChange('calculator')}
      >
        <Calculator size={18} />
        Cuánto quieres levantar
      </button>
      <button
        className={`tab-button ${activeTab === 'builder' ? 'active' : ''}`}
        onClick={() => onChange('builder')}
      >
        <Dumbbell size={18} />
        Arma tu barra
      </button>
    </div>
  )
}
