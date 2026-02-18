import { Scale } from 'lucide-react'
import { BAR_WEIGHTS_KG } from '../../constants/weights'

export default function BarTypeSelector({ value, onChange, label = 'Tipo de barra' }) {
  return (
    <div className="control-group">
      <label className="label">
        <Scale size={16} />
        {label}
      </label>
      <div className="bar-type-selector">
        <button className={`bar-btn ${value === 'hombre' ? 'active' : ''}`} onClick={() => onChange('hombre')}>
          Hombre ({BAR_WEIGHTS_KG.hombre} kg)
        </button>
        <button className={`bar-btn ${value === 'mujer' ? 'active' : ''}`} onClick={() => onChange('mujer')}>
          Mujer ({BAR_WEIGHTS_KG.mujer} kg)
        </button>
      </div>
    </div>
  )
}
