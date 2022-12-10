import { Ref } from 'vue'
import { GridLayoutOptions } from '@/components/type'

type XyToPosition = (
  margin: [number, number],
  rowHeight: number,
  x: number,
  y: number,
  w: number,
  h: number,
  colWidth: number
) => { left: number; top: number; width: number; height: number }

export const xyToPosition: XyToPosition = (margin, rowHeight, x, y, w, h, colWidth) => {
  return {
    left: Math.round(colWidth * x + (x + 1) * margin[0]),
    top: Math.round(rowHeight! * y + (y + 1) * margin[1]),
    width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * margin[0]),
    height: h === Infinity ? h : Math.round(rowHeight! * h + Math.max(0, h - 1) * margin[1]),
  }
}
