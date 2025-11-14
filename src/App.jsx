import './App.css'
import { useState, useMemo } from 'react'
import { Scale, Percent, Dumbbell, Plus, Minus, Trash2, Calculator } from 'lucide-react'
import odinLogo from './assets/logo-odin.png'

// Discos disponibles (libras grandes, kilogramos pequeños)
const PLATES_LB = [45, 35, 25, 15, 10] // En libras
const PLATES_KG = [2.5, 2, 1.5, 1, 0.5] // En kilogramos

// Peso de barras en libras
const BAR_WEIGHTS_LB = {
  hombre: 45, // lb
  mujer: 35,  // lb
}

// Convertir a kg para cálculos
const BAR_WEIGHTS_KG = {
  hombre: 45 / 2.20462, // ~20.4 kg
  mujer: 35 / 2.20462,  // ~15.9 kg
}

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator') // 'calculator' o 'builder'
  const [rm, setRm] = useState('')
  const [unit, setUnit] = useState('kg')
  const [percentage, setPercentage] = useState(75)
  const [barType, setBarType] = useState('hombre')
  
  // Estados para el constructor de barra manual
  const [manualPlatesLb, setManualPlatesLb] = useState([])
  const [manualPlatesKg, setManualPlatesKg] = useState([])
  const [manualBarType, setManualBarType] = useState('hombre')

  // Calcular peso objetivo en kg
  const targetWeight = useMemo(() => {
    if (!rm) return 0
    const rmInKg = unit === 'lb' ? Number(rm) / 2.20462 : Number(rm)
    return (rmInKg * percentage) / 100
  }, [rm, unit, percentage])

  // Calcular peso sin barra (en kg)
  const weightWithoutBar = useMemo(() => {
    return Math.max(0, targetWeight - BAR_WEIGHTS_KG[barType])
  }, [targetWeight, barType])

  // Calcular distribución de discos (primero lb, luego kg para ajuste)
  const plateDistribution = useMemo(() => {
    if (weightWithoutBar <= 0) return { lb: [], kg: [], perSide: 0 }

    let remaining = weightWithoutBar / 2 // Por lado en kg
    const platesLb = []
    const platesKg = []

    // Primero usar discos de libras (convertir a kg para comparar)
    for (const plateLb of PLATES_LB) {
      const plateKg = plateLb / 2.20462
      while (remaining >= plateKg) {
        platesLb.push(plateLb)
        remaining -= plateKg
      }
    }

    // Luego ajustar con discos de kilogramos
    for (const plate of PLATES_KG) {
      while (remaining >= plate - 0.01) { // -0.01 para tolerancia de redondeo
        platesKg.push(plate)
        remaining -= plate
      }
    }

    return {
      lb: platesLb,
      kg: platesKg,
      perSide: weightWithoutBar / 2,
    }
  }, [weightWithoutBar])

  // Calcular peso real con los discos disponibles (en kg)
  const actualWeight = useMemo(() => {
    const platesWeightLb = plateDistribution.lb.reduce((sum, p) => sum + (p / 2.20462), 0) * 2
    const platesWeightKg = plateDistribution.kg.reduce((sum, p) => sum + p, 0) * 2
    return BAR_WEIGHTS_KG[barType] + platesWeightLb + platesWeightKg
  }, [plateDistribution, barType])

  // Funciones para el constructor de barra manual
  const addManualPlate = (plate, type) => {
    if (type === 'lb') {
      setManualPlatesLb([...manualPlatesLb, plate])
    } else {
      setManualPlatesKg([...manualPlatesKg, plate])
    }
  }

  const removeManualPlate = (index, type) => {
    if (type === 'lb') {
      setManualPlatesLb(manualPlatesLb.filter((_, i) => i !== index))
    } else {
      setManualPlatesKg(manualPlatesKg.filter((_, i) => i !== index))
    }
  }

  const clearManualPlates = () => {
    setManualPlatesLb([])
    setManualPlatesKg([])
  }

  // Calcular peso total de la barra manual (en kg)
  const manualTotalWeight = useMemo(() => {
    const platesWeightLb = manualPlatesLb.reduce((sum, p) => sum + (p / 2.20462), 0) * 2 // x2 para ambos lados
    const platesWeightKg = manualPlatesKg.reduce((sum, p) => sum + p, 0) * 2 // x2 para ambos lados
    return BAR_WEIGHTS_KG[manualBarType] + platesWeightLb + platesWeightKg
  }, [manualPlatesLb, manualPlatesKg, manualBarType])

  return (
    <div className="app">
      <header className="header">
        <div className="brand-header">
          <div className="brand-icon">
            <img src={odinLogo} alt="Odin Fitness Logo" className="logo" />
          </div>
          <div className="brand-text">
            <h1 className="title">Calculadora de CrossFit</h1>
            <p className="subtitle">Odin Fitness</p>
          </div>
        </div>
      </header>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <Calculator size={18} />
          Calculadora %RM
        </button>
        <button
          className={`tab-button ${activeTab === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          <Dumbbell size={18} />
          Constructor de Barra
        </button>
      </div>

      <main className="main-content">
        {activeTab === 'calculator' && (
        <div className="calculator">
          <div className="form">
            <div className="rm-input-group">
              <label className="label">
                <Dumbbell size={16} />
                Tu RM (Repetición Máxima)
              </label>
              <div className="row">
                <input
                  className="input"
                  type="number"
                  step="0.5"
                  placeholder="Ej: 100"
                  value={rm}
                  onChange={(e) => setRm(e.target.value)}
                />
                <select className="input" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </div>

            {rm && (
              <>
                <div className="calculator-controls">
                  <div className="control-group">
                    <label className="label">
                      <Percent size={16} />
                      Porcentaje: {percentage}%
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      step="1"
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="slider"
                    />
                    <div className="percentage-buttons">
                      {[50, 60, 70, 75, 80, 85, 90, 95, 100].map((p) => (
                        <button
                          key={p}
                          className={`percent-btn ${percentage === p ? 'active' : ''}`}
                          onClick={() => setPercentage(p)}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="control-group">
                    <label className="label">
                      <Scale size={16} />
                      Tipo de barra
                    </label>
                    <div className="bar-type-selector">
                      <button
                        className={`bar-btn ${barType === 'hombre' ? 'active' : ''}`}
                        onClick={() => setBarType('hombre')}
                      >
                        Hombre (45 lb)
                      </button>
                      <button
                        className={`bar-btn ${barType === 'mujer' ? 'active' : ''}`}
                        onClick={() => setBarType('mujer')}
                      >
                        Mujer (35 lb)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="result-section-horizontal">
                  <div className="result-card-compact">
                    <div className="result-label-compact">RM Original</div>
                    <div className="result-value-compact">
                      {rm} {unit}
                    </div>
                    <div className="result-sublabel-compact">
                      {unit === 'kg' 
                        ? `${(Number(rm) * 2.20462).toFixed(1)} lb`
                        : `${(Number(rm) / 2.20462).toFixed(1)} kg`
                      }
                    </div>
                  </div>

                  <div className="result-card-compact primary">
                    <div className="result-label-compact">Objetivo ({percentage}%)</div>
                    <div className="result-value-compact large">
                      {targetWeight.toFixed(1)} kg
                    </div>
                    <div className="result-sublabel-compact">
                      {(targetWeight * 2.20462).toFixed(1)} lb
                    </div>
                  </div>

                  <div className="result-card-compact">
                    <div className="result-label-compact">Peso Real</div>
                    <div className="result-value-compact">
                      {actualWeight.toFixed(1)} kg
                    </div>
                    <div className="result-sublabel-compact">
                      {(actualWeight * 2.20462).toFixed(1)} lb • Δ {(actualWeight - targetWeight).toFixed(1)} kg
                    </div>
                  </div>
                </div>

                <div className="plate-distribution">
                  <h3 className="distribution-title">Configuración de barra</h3>
                  
                  <div className="bar-visualization">
                    <div className="bar-container-single">
                      <div className="bar-left">
                        <div className="bar-sleeve-left"></div>
                        <div className="bar-grip-single">
                          {BAR_WEIGHTS_LB[barType]} lb
                        </div>
                      </div>
                      
                      <div className="bar-plates">
                        {plateDistribution.lb.map((plate, i) => (
                          <div key={`lb-${i}`} className={`plate plate-lb plate-${plate}`}>
                            {plate}
                          </div>
                        ))}
                        {plateDistribution.kg.map((plate, i) => (
                          <div key={`kg-${i}`} className={`plate plate-kg plate-kg-${plate}`}>
                            {plate}
                          </div>
                        ))}
                      </div>
                      
                      <div className="bar-sleeve-right"></div>
                    </div>
                  </div>

                  <div className="plate-list">
                    <h4>Por lado:</h4>
                    <ul>
                      {plateDistribution.lb.length > 0 && (
                        <li>
                          Discos lb: {plateDistribution.lb.join(' lb, ')} lb
                        </li>
                      )}
                      {plateDistribution.kg.length > 0 && (
                        <li>
                          Discos kg: {plateDistribution.kg.join(' kg, ')} kg
                        </li>
                      )}
                      {plateDistribution.lb.length === 0 && plateDistribution.kg.length === 0 && (
                        <li>Solo barra</li>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        )}
        
        {activeTab === 'builder' && (
        <div className="manual-builder">
          <div className="manual-builder-header">
            <h2 className="manual-builder-title">
              <Dumbbell size={20} />
              Constructor de Barra
            </h2>
            <p className="manual-builder-subtitle">
              Arma tu barra personalizada eligiendo los discos para un lado
            </p>
          </div>

          <div className="manual-controls">
            <div className="control-group">
              <label className="label">
                <Scale size={16} />
                Tipo de barra
              </label>
              <div className="bar-type-selector">
                <button
                  className={`bar-btn ${manualBarType === 'hombre' ? 'active' : ''}`}
                  onClick={() => setManualBarType('hombre')}
                >
                  Hombre (45 lb)
                </button>
                <button
                  className={`bar-btn ${manualBarType === 'mujer' ? 'active' : ''}`}
                  onClick={() => setManualBarType('mujer')}
                >
                  Mujer (35 lb)
                </button>
              </div>
            </div>

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
              <div className="manual-weight-label">Peso Total</div>
              <div className="manual-weight-value">
                {manualTotalWeight.toFixed(1)} kg
              </div>
              <div className="manual-weight-sublabel">
                {(manualTotalWeight * 2.20462).toFixed(1)} lb
              </div>
            </div>

            {(manualPlatesLb.length > 0 || manualPlatesKg.length > 0) && (
              <button className="clear-btn" onClick={clearManualPlates}>
                <Trash2 size={16} />
                Limpiar
              </button>
            )}
          </div>

          <div className="manual-bar-visualization">
            <h4 className="visualization-title">Vista de la barra (un lado)</h4>
            <div className="bar-visualization">
              <div className="bar-container-single">
                <div className="bar-left">
                  <div className="bar-sleeve-left"></div>
                  <div className="bar-grip-single">
                    {BAR_WEIGHTS_LB[manualBarType]} lb
                  </div>
                </div>
                
                <div className="bar-plates">
                  {manualPlatesLb.map((plate, i) => (
                    <div 
                      key={`manual-lb-${i}`} 
                      className={`plate plate-lb plate-${plate} clickable`}
                      onClick={() => removeManualPlate(i, 'lb')}
                      title="Click para remover"
                    >
                      <div className="plate-remove-icon">
                        <Minus size={12} />
                      </div>
                      {plate}
                    </div>
                  ))}
                  {manualPlatesKg.map((plate, i) => (
                    <div 
                      key={`manual-kg-${i}`} 
                      className={`plate plate-kg plate-kg-${plate} clickable`}
                      onClick={() => removeManualPlate(i, 'kg')}
                      title="Click para remover"
                    >
                      <div className="plate-remove-icon">
                        <Minus size={12} />
                      </div>
                      {plate}
                    </div>
                  ))}
                </div>
                
                <div className="bar-sleeve-right"></div>
              </div>
            </div>

            {(manualPlatesLb.length > 0 || manualPlatesKg.length > 0) && (
              <div className="manual-plate-list">
                <h4>Discos en un lado:</h4>
                <ul>
                  {manualPlatesLb.length > 0 && (
                    <li>
                      Discos lb: {manualPlatesLb.join(' lb, ')} lb
                    </li>
                  )}
                  {manualPlatesKg.length > 0 && (
                    <li>
                      Discos kg: {manualPlatesKg.join(' kg, ')} kg
                    </li>
                  )}
                </ul>
                <p className="manual-note">
                  * Los discos se duplican en ambos lados de la barra para el peso total
                </p>
              </div>
            )}

            {manualPlatesLb.length === 0 && manualPlatesKg.length === 0 && (
              <div className="empty-state">
                <Dumbbell size={40} opacity={0.3} />
                <p>Agrega discos usando los botones de arriba</p>
              </div>
            )}
          </div>
        </div>
        )}
      </main>

      <footer className="footer">Hecho con ❤️ en Odin Fitness</footer>
    </div>
  )
}
