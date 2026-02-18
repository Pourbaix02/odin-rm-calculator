import { useMemo, useState } from 'react'
import './App.css'
import BuilderTab from './components/builder/BuilderTab'
import CalculatorTab from './components/calculator/CalculatorTab'
import Header from './components/layout/Header'
import Tabs from './components/layout/Tabs'
import { BAR_WEIGHTS_KG } from './constants/weights'
import {
  calculateActualWeight,
  calculateManualTotalWeight,
  calculatePlateDistribution,
  calculateTargetWeight,
} from './utils/calculations'

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator')
  const [rm, setRm] = useState('')
  const [unit, setUnit] = useState('kg')
  const [percentage, setPercentage] = useState(75)
  const [barType, setBarType] = useState('hombre')

  const [manualPlatesLb, setManualPlatesLb] = useState([])
  const [manualPlatesKg, setManualPlatesKg] = useState([])
  const [manualBarType, setManualBarType] = useState('hombre')

  const targetWeight = useMemo(() => calculateTargetWeight(rm, unit, percentage), [rm, unit, percentage])

  const weightWithoutBar = useMemo(() => Math.max(0, targetWeight - BAR_WEIGHTS_KG[barType]), [targetWeight, barType])

  const plateDistribution = useMemo(
    () => calculatePlateDistribution(weightWithoutBar),
    [weightWithoutBar],
  )

  const actualWeight = useMemo(
    () => calculateActualWeight(plateDistribution, barType),
    [plateDistribution, barType],
  )

  const manualTotalWeight = useMemo(
    () => calculateManualTotalWeight(manualPlatesLb, manualPlatesKg, manualBarType),
    [manualPlatesLb, manualPlatesKg, manualBarType],
  )

  const addManualPlate = (plate, type) => {
    if (type === 'lb') {
      setManualPlatesLb((current) => [...current, plate])
      return
    }
    setManualPlatesKg((current) => [...current, plate])
  }

  const removeManualPlate = (index, type) => {
    if (type === 'lb') {
      setManualPlatesLb((current) => current.filter((_, currentIndex) => currentIndex !== index))
      return
    }
    setManualPlatesKg((current) => current.filter((_, currentIndex) => currentIndex !== index))
  }

  const clearManualPlates = () => {
    setManualPlatesLb([])
    setManualPlatesKg([])
  }

  return (
    <>
      <div className="noise-overlay" />
      <div className="app">
        <Header />
        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        <main className="main-content">
          {activeTab === 'calculator' ? (
            <CalculatorTab
              key="calculator"
              rm={rm}
              setRm={setRm}
              unit={unit}
              setUnit={setUnit}
              percentage={percentage}
              setPercentage={setPercentage}
              barType={barType}
              setBarType={setBarType}
              targetWeight={targetWeight}
              actualWeight={actualWeight}
              plateDistribution={plateDistribution}
            />
          ) : (
            <BuilderTab
              key="builder"
              manualBarType={manualBarType}
              setManualBarType={setManualBarType}
              manualPlatesLb={manualPlatesLb}
              manualPlatesKg={manualPlatesKg}
              manualTotalWeight={manualTotalWeight}
              addManualPlate={addManualPlate}
              removeManualPlate={removeManualPlate}
              clearManualPlates={clearManualPlates}
            />
          )}
        </main>

        <footer className="footer">Hecho con amor en Odin Fitness</footer>
      </div>
    </>
  )
}
