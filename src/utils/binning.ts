export const mcatBins = [
  { lo: -Infinity, hi: 485, label: '<486' },
  { lo: 486, hi: 489, label: '486-489' },
  { lo: 490, hi: 493, label: '490-493' },
  { lo: 494, hi: 497, label: '494-497' },
  { lo: 498, hi: 501, label: '498-501' },
  { lo: 502, hi: 505, label: '502-505' },
  { lo: 506, hi: 509, label: '506-509' },
  { lo: 510, hi: 513, label: '510-513' },
  { lo: 514, hi: 517, label: '514-517' },
  { lo: 518, hi: Infinity, label: '>517' }
] as const

export const gpaBins = [
  { lo: 3.80, hi: 4.00, label: '>3.79' },
  { lo: 3.60, hi: 3.79, label: '3.60-3.79' },
  { lo: 3.40, hi: 3.59, label: '3.40-3.59' },
  { lo: 3.20, hi: 3.39, label: '3.20-3.39' },
  { lo: 3.00, hi: 3.19, label: '3.00-3.19' },
  { lo: 2.80, hi: 2.99, label: '2.80-2.99' },
  { lo: 2.60, hi: 2.79, label: '2.60-2.79' },
  { lo: 2.40, hi: 2.59, label: '2.40-2.59' },
  { lo: 2.20, hi: 2.39, label: '2.20-2.39' },
  { lo: 2.00, hi: 2.19, label: '2.00-2.19' },
  { lo: -Infinity, hi: 1.99, label: '<2.00' }
] as const

export function binValue(bins: readonly { lo: number; hi: number; label: string }[], v: number) {
  return bins.find(b => v >= b.lo && v <= b.hi)?.label ?? null
}