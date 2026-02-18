import { Minus } from 'lucide-react'
import { BAR_WEIGHTS_KG } from '../../constants/weights'

export default function BarVisualization({
  barType,
  lbPlates,
  kgPlates,
  removable = false,
  onRemovePlate,
}) {
  return (
    <div className="bar-visualization">
      <div className="bar-container-single">
        <div className="bar-left">
          <div className="bar-sleeve-left"></div>
          <div className="bar-grip-single">{BAR_WEIGHTS_KG[barType]} kg</div>
        </div>

        <div className="bar-plates">
          {lbPlates.map((plate, index) => (
            <div
              key={`lb-${index}`}
              className={`plate plate-lb plate-${plate} ${removable ? 'clickable' : ''}`}
              onClick={removable ? () => onRemovePlate(index, 'lb') : undefined}
              title={removable ? 'Click para remover' : undefined}
            >
              {removable && (
                <div className="plate-remove-icon">
                  <Minus size={12} />
                </div>
              )}
              {plate}
            </div>
          ))}
          {kgPlates.map((plate, index) => (
            <div
              key={`kg-${index}`}
              className={`plate plate-kg plate-kg-${plate} ${removable ? 'clickable' : ''}`}
              onClick={removable ? () => onRemovePlate(index, 'kg') : undefined}
              title={removable ? 'Click para remover' : undefined}
            >
              {removable && (
                <div className="plate-remove-icon">
                  <Minus size={12} />
                </div>
              )}
              {plate}
            </div>
          ))}
        </div>

        <div className="bar-sleeve-right"></div>
      </div>
    </div>
  )
}
