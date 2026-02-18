import { Dumbbell, Percent } from 'lucide-react'
import { BAR_WEIGHTS_KG, KG_TO_LB, LB_TO_KG } from '../../constants/weights'
import useAnimatedNumber from '../../hooks/useAnimatedNumber'
import { toKg } from '../../utils/calculations'
import BarTypeSelector from '../shared/BarTypeSelector'
import BarVisualization from '../shared/BarVisualization'

export default function CalculatorTab({
  rm,
  setRm,
  unit,
  setUnit,
  percentage,
  setPercentage,
  barType,
  setBarType,
  targetWeight,
  actualWeight,
  plateDistribution,
}) {
  const hasDistribution = plateDistribution.lb.length > 0 || plateDistribution.kg.length > 0
  const animatedTarget = useAnimatedNumber(targetWeight)
  const animatedActual = useAnimatedNumber(actualWeight)

  return (
    <div className="calculator feature-panel">
      <div className="form">
        <div className="rm-input-group card-surface">
          <p className="section-intro">
            Ingresa tu RM y te mostramos el peso objetivo con la barra lista para cargar.
          </p>
          <label className="label">
            <Dumbbell size={16} />
            ¿Cuál es tu RM?
          </label>
          <div className="row">
            <input
              className="input"
              type="number"
              step="0.5"
              placeholder="Ej: 100"
              value={rm}
              onChange={(event) => setRm(event.target.value)}
            />
            <select className="input" value={unit} onChange={(event) => setUnit(event.target.value)}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        {rm && (
          <>
            <div className="calculator-controls card-surface controls-surface">
              <div className="control-group">
                <label className="label">
                  <Percent size={16} />
                  Elige intensidad: {percentage}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="1"
                  value={percentage}
                  onChange={(event) => setPercentage(Number(event.target.value))}
                  className="slider"
                />
                <div className="percentage-buttons">
                  {[50, 60, 70, 75, 80, 85, 90, 95, 100].map((value) => (
                    <button
                      key={value}
                      className={`percent-btn ${percentage === value ? 'active' : ''}`}
                      onClick={() => setPercentage(value)}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>

              <BarTypeSelector value={barType} onChange={setBarType} />
            </div>

            <div className="result-section">
              <div className="result-hero card-surface">
                <div className="result-hero-label">Tu carga sugerida ({percentage}%)</div>
                <div className="result-hero-value">{animatedTarget.toFixed(1)} kg</div>
                <div className="result-hero-sub">{(animatedTarget * KG_TO_LB).toFixed(1)} lb</div>
              </div>
              <div className="result-row">
                <div className="result-card-compact card-surface">
                  <div className="result-label-compact">RM Original</div>
                  <div className="result-value-compact">
                    {rm} {unit}
                  </div>
                  <div className="result-sublabel-compact">
                    {unit === 'kg'
                      ? `${(Number(rm) * KG_TO_LB).toFixed(1)} lb`
                      : `${toKg(Number(rm), unit).toFixed(1)} kg`}
                  </div>
                </div>
                <div className="result-card-compact card-surface">
                  <div className="result-label-compact">Peso Real</div>
                  <div className="result-value-compact">{animatedActual.toFixed(1)} kg</div>
                  <div className="result-sublabel-compact">
                    {hasDistribution
                      ? `${(actualWeight * KG_TO_LB).toFixed(1)} lb`
                      : `Solo barra: ${BAR_WEIGHTS_KG[barType]} kg`}
                  </div>
                </div>
              </div>
            </div>

            <div className="plate-distribution card-surface">
              <h3 className="distribution-title">Así quedaría tu barra</h3>
              <BarVisualization barType={barType} lbPlates={plateDistribution.lb} kgPlates={plateDistribution.kg} />
              <div className="plate-list">
                <h4>Carga por lado:</h4>
                {hasDistribution ? (
                  <ul>
                    <li>{plateDistribution.lb.reduce((sum, p) => sum + p, 0)} lb + {plateDistribution.kg.reduce((sum, p) => sum + p, 0)} kg</li>
                    <li>Total: {(plateDistribution.lb.reduce((sum, p) => sum + p * LB_TO_KG, 0) + plateDistribution.kg.reduce((sum, p) => sum + p, 0)).toFixed(1)} kg por lado</li>
                  </ul>
                ) : (
                  <ul>
                    <li>Solo barra: {BAR_WEIGHTS_KG[barType]} kg</li>
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
