import { User } from 'lucide-react'
import { BAR_WEIGHTS_KG } from '../../constants/weights'

const OPTIONS = [
  { key: 'hombre', label: 'Hombre' },
  { key: 'mujer', label: 'Mujer' },
]

export default function BarTypeSelector({ value, onChange }) {
  return (
    <div className="bar-type-row">
      {OPTIONS.map((opt) => {
        const active = value === opt.key
        return (
          <button
            key={opt.key}
            className={`bar-type-option ${active ? 'active' : ''}`}
            onClick={() => onChange(opt.key)}
          >
            <div className={`bar-type-icon-circle ${active ? 'active' : ''}`}>
              <User size={20} />
            </div>
            <span className="bar-type-label">{opt.label}</span>
            <span className="bar-type-weight">{BAR_WEIGHTS_KG[opt.key]} kg</span>
          </button>
        )
      })}
    </div>
  )
}
