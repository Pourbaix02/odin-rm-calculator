import { BAR_WEIGHTS_KG } from '../../constants/weights'

const LB_PLATE_DIAMETER = 80
const PLATE_WIDTHS_LB = { 45: 18, 35: 14, 25: 12, 15: 10, 10: 8 }
const PLATE_DIAMETERS_KG = { 2.5: 34, 2: 30, 1.5: 28, 1: 24, 0.5: 22 }
const PLATE_WIDTHS_KG = { 2.5: 8, 2: 7, 1.5: 6, 1: 5, 0.5: 5 }

const PLATE_COLORS_LB = {
  45: { base: '#2563eb', highlight: '#60a5fa', shadow: '#1d4ed8' },
  35: { base: '#eab308', highlight: '#fde047', shadow: '#a16207' },
  25: { base: '#16a34a', highlight: '#86efac', shadow: '#15803d' },
  15: { base: '#e2e8f0', highlight: '#f8fafc', shadow: '#94a3b8' },
  10: { base: '#78716c', highlight: '#a8a29e', shadow: '#57534e' },
}
const PLATE_COLORS_KG = {
  2.5: { base: '#dc2626', highlight: '#f87171', shadow: '#991b1b' },
  2: { base: '#2563eb', highlight: '#60a5fa', shadow: '#1d4ed8' },
  1.5: { base: '#d97706', highlight: '#fbbf24', shadow: '#92400e' },
  1: { base: '#16a34a', highlight: '#86efac', shadow: '#15803d' },
  0.5: { base: '#e2e8f0', highlight: '#f8fafc', shadow: '#94a3b8' },
}
const FALLBACK = { base: '#64748b', highlight: '#94a3b8', shadow: '#475569' }

function Plate({ weight, unit, onClick }) {
  const colors = unit === 'lb' ? (PLATE_COLORS_LB[weight] ?? FALLBACK) : (PLATE_COLORS_KG[weight] ?? FALLBACK)
  const diameter = unit === 'lb' ? LB_PLATE_DIAMETER : (PLATE_DIAMETERS_KG[weight] ?? 44)
  const width = unit === 'lb' ? (PLATE_WIDTHS_LB[weight] ?? 16) : (PLATE_WIDTHS_KG[weight] ?? 10)

  return (
    <div
      className={`bar-plate-3d ${onClick ? 'clickable' : ''}`}
      style={{ width: `${width}px` }}
      onClick={onClick}
    >
      <div
        className="bar-plate-body"
        style={{
          height: `${diameter}px`,
          backgroundColor: colors.base,
          borderColor: colors.shadow,
        }}
      >
        <div className="bar-plate-highlight" style={{ backgroundColor: colors.highlight }} />
        <div className="bar-plate-shadow" style={{ backgroundColor: colors.shadow }} />
      </div>
    </div>
  )
}

function PlatesGroup({ lbPlates, kgPlates, reversed, removable, onRemovePlate }) {
  const lbElements = lbPlates.map((plate, index) => (
    <Plate
      key={`lb-${index}`}
      weight={plate}
      unit="lb"
      onClick={removable && onRemovePlate ? () => onRemovePlate(index, 'lb') : undefined}
    />
  ))
  const kgElements = kgPlates.map((plate, index) => (
    <Plate
      key={`kg-${index}`}
      weight={plate}
      unit="kg"
      onClick={removable && onRemovePlate ? () => onRemovePlate(index, 'kg') : undefined}
    />
  ))
  const all = [...lbElements, ...kgElements]
  if (reversed) all.reverse()
  return <div className="bar-plates-group">{all}</div>
}

export default function BarVisualization({
  barType,
  lbPlates,
  kgPlates,
  removable = false,
  onRemovePlate,
}) {
  return (
    <div className="bar-viz-wrapper">
      <div className="bar-viz-scroll">
        <div className="bar-viz-row">
          <div className="bar-sleeve-cap-left" />
          <div className="bar-sleeve-tip" />

          <PlatesGroup
            lbPlates={lbPlates}
            kgPlates={kgPlates}
            reversed
            removable={removable}
            onRemovePlate={onRemovePlate}
          />

          <div className="bar-sleeve-section" />
          <div className="bar-collar-ring" />

          <div className="bar-grip">
            <div className="bar-grip-knurl" />
            <div className="bar-grip-knurl" />
            <div className="bar-grip-knurl" />
            <div className="bar-grip-center" />
            <div className="bar-grip-knurl" />
            <div className="bar-grip-knurl" />
            <div className="bar-grip-knurl" />
          </div>

          <div className="bar-collar-ring" />
          <div className="bar-sleeve-section" />

          <PlatesGroup
            lbPlates={lbPlates}
            kgPlates={kgPlates}
            removable={removable}
            onRemovePlate={onRemovePlate}
          />

          <div className="bar-sleeve-tip" />
          <div className="bar-sleeve-cap-right" />
        </div>
      </div>

      <div className="bar-viz-label">
        <span className="bar-viz-label-text">Barra {BAR_WEIGHTS_KG[barType]} kg</span>
      </div>
    </div>
  )
}
