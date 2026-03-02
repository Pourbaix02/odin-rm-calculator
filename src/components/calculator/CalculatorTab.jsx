import { Dumbbell, Percent, Weight } from 'lucide-react'
import { BAR_WEIGHTS_KG, KG_TO_LB, LB_TO_KG } from '../../constants/weights'
import useAnimatedNumber from '../../hooks/useAnimatedNumber'
import { toKg } from '../../utils/calculations'
import BarTypeSelector from '../shared/BarTypeSelector'
import BarVisualization from '../shared/BarVisualization'

const CHIP_COLORS_LB = {
  45: '#2563eb',
  35: '#eab308',
  25: '#16a34a',
  15: '#e2e8f0',
  10: '#78716c',
}
const CHIP_COLORS_KG = {
  2.5: '#dc2626',
  2: '#2563eb',
  1.5: '#d97706',
  1: '#16a34a',
  0.5: '#e2e8f0',
}
const DARK_LB = [35, 25, 15]
const DARK_KG = [1.5, 0.5]

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

  const perSideKg =
    plateDistribution.lb.reduce((s, p) => s + p * LB_TO_KG, 0) +
    plateDistribution.kg.reduce((s, p) => s + p, 0)

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
            <div className="unit-row">
              <button
                type="button"
                className={`unit-btn ${unit === 'kg' ? 'active' : ''}`}
                onClick={() => setUnit('kg')}
              >
                kg
              </button>
              <button
                type="button"
                className={`unit-btn ${unit === 'lb' ? 'active' : ''}`}
                onClick={() => setUnit('lb')}
              >
                lb
              </button>
            </div>
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

              <div className="load-box">
                <div className="load-box-header">
                  <Weight size={16} />
                  <h4 className="load-box-title">Carga por lado</h4>
                </div>

                {hasDistribution ? (
                  <>
                    <div className="chip-section">
                      {plateDistribution.lb.length > 0 && (
                        <div className="chip-group">
                          <span className="chip-group-label">Libras</span>
                          <div className="chip-row">
                            {plateDistribution.lb.map((plate, index) => (
                              <span
                                key={`lb-${index}`}
                                className={`chip ${DARK_LB.includes(plate) ? 'dark' : ''}`}
                                style={{ backgroundColor: CHIP_COLORS_LB[plate] ?? '#64748b' }}
                              >
                                {plate} lb
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {plateDistribution.kg.length > 0 && (
                        <div className="chip-group">
                          <span className="chip-group-label">Kilogramos</span>
                          <div className="chip-row">
                            {plateDistribution.kg.map((plate, index) => (
                              <span
                                key={`kg-${index}`}
                                className={`chip ${DARK_KG.includes(plate) ? 'dark' : ''}`}
                                style={{ backgroundColor: CHIP_COLORS_KG[plate] ?? '#64748b' }}
                              >
                                {plate} kg
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="load-box-divider" />

                    <div className="summary-row">
                      <div className="summary-item">
                        <span className="summary-value">{plateDistribution.lb.reduce((s, p) => s + p, 0)}</span>
                        <span className="summary-unit">lb</span>
                      </div>
                      <span className="summary-op">+</span>
                      <div className="summary-item">
                        <span className="summary-value">{plateDistribution.kg.reduce((s, p) => s + p, 0)}</span>
                        <span className="summary-unit">kg</span>
                      </div>
                      <span className="summary-op">=</span>
                      <div className="summary-item highlight">
                        <span className="summary-value">{perSideKg.toFixed(1)}</span>
                        <span className="summary-unit">kg/lado</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="load-box-empty">
                    Solo barra: {BAR_WEIGHTS_KG[barType]} kg
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
