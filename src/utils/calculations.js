import {
  BAR_WEIGHTS_KG,
  KG_TO_LB,
  LB_TO_KG,
  PLATES_KG,
  PLATES_LB,
} from '../constants/weights'

export const toKg = (value, unit) => (unit === 'lb' ? Number(value) * LB_TO_KG : Number(value))
export const toLb = (valueInKg) => valueInKg * KG_TO_LB

export function calculateTargetWeight(rm, unit, percentage) {
  if (!rm) return 0
  return (toKg(rm, unit) * percentage) / 100
}

export function calculatePlateDistribution(weightWithoutBar) {
  if (weightWithoutBar <= 0) return { lb: [], kg: [], perSide: 0 }

  let remaining = weightWithoutBar / 2
  const platesLb = []
  const platesKg = []

  for (const plateLb of PLATES_LB) {
    const plateKg = plateLb * LB_TO_KG
    while (remaining >= plateKg) {
      platesLb.push(plateLb)
      remaining -= plateKg
    }
  }

  for (const plate of PLATES_KG) {
    while (remaining >= plate - 0.01) {
      platesKg.push(plate)
      remaining -= plate
    }
  }

  return {
    lb: platesLb,
    kg: platesKg,
    perSide: weightWithoutBar / 2,
  }
}

export function calculateActualWeight(plateDistribution, barType) {
  const platesWeightLb = plateDistribution.lb.reduce((sum, plate) => sum + plate * LB_TO_KG, 0) * 2
  const platesWeightKg = plateDistribution.kg.reduce((sum, plate) => sum + plate, 0) * 2
  return BAR_WEIGHTS_KG[barType] + platesWeightLb + platesWeightKg
}

export function calculateManualTotalWeight(manualPlatesLb, manualPlatesKg, manualBarType) {
  const platesWeightLb = manualPlatesLb.reduce((sum, plate) => sum + plate * LB_TO_KG, 0) * 2
  const platesWeightKg = manualPlatesKg.reduce((sum, plate) => sum + plate, 0) * 2
  return BAR_WEIGHTS_KG[manualBarType] + platesWeightLb + platesWeightKg
}
