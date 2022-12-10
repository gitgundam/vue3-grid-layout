export type Layout = LayoutItem[] | []

export type DragPosition = { top: number; left: number }

export interface LayoutItem {
  i: number
  x: number
  y: number
  h: number
  w: number
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
  static?: boolean
  moved?: boolean
  isDraggable?: boolean
  isResizable?: boolean
}

export interface GridLayoutOptions {
  autoSize?: boolean
  maxRows?: number
  margin?: [number, number]
  isResizable?: boolean
  isDraggable?: boolean
  preventCollision?: boolean
  cols?: number
  rowHeight?: number
}
