import { PositionToXy } from './types'

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
