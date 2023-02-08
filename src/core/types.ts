export type XY = { x: number; y: number }

export type PositionToXy = (
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


export type XyToPosition = (
  margin: [number, number],
  rowHeight: number,
  x: number,
  y: number,
  w: number,
  h: number,
  colWidth: number
) => { left: number; top: number; width: number; height: number } | void
