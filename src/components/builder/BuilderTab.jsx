import { Dumbbell, Trash2, Weight, XCircle } from 'lucide-react'
import { BAR_WEIGHTS_KG, KG_TO_LB, LB_TO_KG, PLATES_KG, PLATES_LB } from '../../constants/weights'
import useAnimatedNumber from '../../hooks/useAnimatedNumber'
import BarTypeSelector from '../shared/BarTypeSelector'
import BarVisualization from '../shared/BarVisualization'

const PLATE_BTN_COLORS_LB = {
  45: '#2980d4',
  35: '#fde047',
  25: '#a7f3d0',
  15: '#fff',
  10: '#a1a8b4',
}
const PLATE_BTN_COLORS_KG = {
  2.5: '#ef4444',
  2: '#3b82f6',
  1.5: '#fbbf24',
  1: '#22c55e',
  0.5: '#faf7f0',
}

export default function BuilderTab({
  manualBarType,
  setManualBarType,
  manualPlatesLb,
  manualPlatesKg,
  manualTotalWeight,
  addManualPlate,
  removeManualPlate,
  clearManualPlates,
}) {
  const hasPlates = manualPlatesLb.length > 0 || manualPlatesKg.length > 0
  const animatedTotal = useAnimatedNumber(manualTotalWeight)
  const perSideKg =
    manualPlatesLb.reduce((s, p) => s + p * LB_TO_KG, 0) +
    manualPlatesKg.reduce((s, p) => s + p, 0)

  return (
    <div className="manual-builder feature-panel">
      <div className="manual-builder-header card-surface">
        <h2 className="manual-builder-title">
          <Dumbbell size={20} />
          Arma tu barra
        </h2>
        <p className="manual-builder-subtitle">
          Elige los discos de un lado y calculamos el peso total automáticamente.
        </p>
      </div>

      <div className="manual-controls card-surface">
        <BarTypeSelector value={manualBarType} onChange={setManualBarType} />
      </div>

      <div className="manual-controls card-surface">
        <h4 className="plate-selector-title">Libras (lb)</h4>
        <div className="disc-row">
          {PLATES_LB.map((plate) => {
            const dark = [35, 25, 15].includes(plate)
            return (
              <button
                key={plate}
                className={`disc ${dark ? 'dark' : ''}`}
                style={{ backgroundColor: PLATE_BTN_COLORS_LB[plate] ?? '#64748b' }}
                onClick={() => addManualPlate(plate, 'lb')}
              >
                <span className="disc-weight">{plate}</span>
                <span className="disc-unit">lb</span>
              </button>
            )
          })}
        </div>

        <h4 className="plate-selector-title" style={{ marginTop: '0.75rem' }}>Kilogramos (kg)</h4>
        <div className="disc-row">
          {PLATES_KG.map((plate) => {
            const dark = [1.5, 0.5].includes(plate)
            return (
              <button
                key={plate}
                className={`disc disc-small ${dark ? 'dark' : ''}`}
                style={{ backgroundColor: PLATE_BTN_COLORS_KG[plate] ?? '#64748b' }}
                onClick={() => addManualPlate(plate, 'kg')}
              >
                <span className="disc-weight">{plate}</span>
                <span className="disc-unit">kg</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="manual-bar-visualization card-surface">
        <BarVisualization
          barType={manualBarType}
          lbPlates={manualPlatesLb}
          kgPlates={manualPlatesKg}
          removable
          onRemovePlate={removeManualPlate}
        />

        <div className="weight-strip">
          <div className="weight-strip-main">
            <span className="weight-strip-value">{animatedTotal.toFixed(1)}</span>
            <span className="weight-strip-unit">kg</span>
            <span className="weight-strip-sep">·</span>
            <span className="weight-strip-secondary">{(animatedTotal * KG_TO_LB).toFixed(1)} lb</span>
          </div>
          {hasPlates && (
            <button className="clear-btn-compact" onClick={clearManualPlates}>
              <Trash2 size={14} />
              Limpiar
            </button>
          )}
        </div>

        <div className="load-box">
          <div className="load-box-header">
            <Weight size={16} />
            <h4 className="load-box-title">Carga por lado</h4>
          </div>

          {hasPlates ? (
            <>
              <div className="chip-section">
                {manualPlatesLb.length > 0 && (
                  <div className="chip-group">
                    <span className="chip-group-label">Libras</span>
                    <div className="chip-row">
                      {manualPlatesLb.map((plate, index) => (
                        <button
                          key={`lb-chip-${index}`}
                          className={`chip removable ${[35, 25, 15].includes(plate) ? 'dark' : ''}`}
                          style={{ backgroundColor: PLATE_BTN_COLORS_LB[plate] ?? '#64748b' }}
                          onClick={() => removeManualPlate(index, 'lb')}
                        >
                          {plate}
                          <XCircle size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {manualPlatesKg.length > 0 && (
                  <div className="chip-group">
                    <span className="chip-group-label">Kilogramos</span>
                    <div className="chip-row">
                      {manualPlatesKg.map((plate, index) => (
                        <button
                          key={`kg-chip-${index}`}
                          className={`chip removable ${[1.5, 0.5].includes(plate) ? 'dark' : ''}`}
                          style={{ backgroundColor: PLATE_BTN_COLORS_KG[plate] ?? '#64748b' }}
                          onClick={() => removeManualPlate(index, 'kg')}
                        >
                          {plate}
                          <XCircle size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="load-box-divider" />

              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-value">{manualPlatesLb.reduce((s, p) => s + p, 0)}</span>
                  <span className="summary-unit">lb</span>
                </div>
                <span className="summary-op">+</span>
                <div className="summary-item">
                  <span className="summary-value">{manualPlatesKg.reduce((s, p) => s + p, 0)}</span>
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
              <Dumbbell size={32} opacity={0.4} />
              <p>Agrega discos usando los botones de arriba</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
