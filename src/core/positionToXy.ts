import { Ref } from 'vue'
import { GridLayoutOptions } from '@/components/type'

type PositionToXy = (
  margin: [number, number],
  colWidth: number,
  cols: number,
  rowHeight: number,
  maxRows: number,
  top: number,
  left: number,
  innerH: number,
  innerW: number
) => { x: number; y: number }

export const positionToXy: PositionToXy = (
  margin,
  colWidth,
  cols,
  rowHeight,
  maxRows,
  top,
  left,
  innerH,
  innerW
) => {
  const [mx, my] = margin

  let x = Math.round((left - mx) / (colWidth + mx))
  let y = Math.round((top - my) / (rowHeight! + my))

  x = Math.max(Math.min(x, cols! - innerW), 0)
  y = Math.max(Math.min(y, maxRows! - innerH), 0)

  return { x, y }
}
