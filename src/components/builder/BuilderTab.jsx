import { Dumbbell, Plus, Trash2 } from 'lucide-react'
import { BAR_WEIGHTS_KG, KG_TO_LB, LB_TO_KG, PLATES_KG, PLATES_LB } from '../../constants/weights'
import useAnimatedNumber from '../../hooks/useAnimatedNumber'
import BarTypeSelector from '../shared/BarTypeSelector'
import BarVisualization from '../shared/BarVisualization'

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

        <div className="plate-selector-section">
          <h4 className="plate-selector-title">Discos de Libras (lb)</h4>
          <div className="plate-selector-buttons">
            {PLATES_LB.map((plate) => (
              <button
                key={plate}
                className={`plate-selector-btn plate-lb-${plate}`}
                onClick={() => addManualPlate(plate, 'lb')}
              >
                <Plus size={16} />
                {plate} lb
              </button>
            ))}
          </div>
        </div>

        <div className="plate-selector-section">
          <h4 className="plate-selector-title">Discos de Kilogramos (kg)</h4>
          <div className="plate-selector-buttons">
            {PLATES_KG.map((plate) => (
              <button
                key={plate}
                className={`plate-selector-btn plate-kg-${plate}`}
                onClick={() => addManualPlate(plate, 'kg')}
              >
                <Plus size={16} />
                {plate} kg
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="manual-result">
        <div className="manual-weight-display">
          <div className="manual-weight-label">Peso total de la barra</div>
          <div className="manual-weight-value">{animatedTotal.toFixed(1)} kg</div>
          <div className="manual-weight-sublabel">
            {hasPlates
              ? `${(animatedTotal * KG_TO_LB).toFixed(1)} lb`
              : `Solo barra: ${BAR_WEIGHTS_KG[manualBarType]} kg`}
          </div>
        </div>

        {hasPlates && (
          <button className="clear-btn" onClick={clearManualPlates}>
            <Trash2 size={16} />
            Limpiar
          </button>
        )}
      </div>

      <div className="manual-bar-visualization card-surface">
        <h4 className="visualization-title">Así se vería un lado de la barra con los discos que elegiste</h4>
        <BarVisualization
          barType={manualBarType}
          lbPlates={manualPlatesLb}
          kgPlates={manualPlatesKg}
          removable
          onRemovePlate={removeManualPlate}
        />

        <div className="plate-list">
          <h4>Carga por lado:</h4>
          {hasPlates ? (
            <ul>
              <li>
                {manualPlatesLb.reduce((s, p) => s + p, 0)} lb + {manualPlatesKg.reduce((s, p) => s + p, 0)} kg
              </li>
              <li>
                Total: {(manualPlatesLb.reduce((s, p) => s + p * LB_TO_KG, 0) + manualPlatesKg.reduce((s, p) => s + p, 0)).toFixed(1)} kg por lado
              </li>
            </ul>
          ) : (
            <ul>
              <li>Solo barra: {BAR_WEIGHTS_KG[manualBarType]} kg</li>
            </ul>
          )}
        </div>

        {!hasPlates && (
          <div className="empty-state">
            <Dumbbell size={40} opacity={0.3} />
            <p>Agrega discos usando los botones de arriba</p>
          </div>
        )}
      </div>
    </div>
  )
}
