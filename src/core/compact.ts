import { Layout, LayoutItem } from '@/components/type'

//根据布局定位,压缩排布每块看板
export const compact = (layout: Layout): Layout => {
  const sorted: Layout = sortLayout(layout)
  const newArr: Layout = []
  sorted.forEach((item) => {
    newArr.push(compactItem(newArr, item))
  })
  return newArr
}

const sortLayout = (layout: Layout): Layout => {
  const cloneLayout: Layout = JSON.parse(JSON.stringify(layout))
  cloneLayout.sort((a, b) => {
    if (a.x === b.x && a.y === b.y) {
      return 0
    } else if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1
    }
    return -1
  })
  return cloneLayout
}

const compactItem = (target: Layout, layoutItem: LayoutItem): LayoutItem => {
  target.forEach((item) => {
    if (layoutItem.y > 0 && layoutItem.y - (item.y + item.h) > 0 && layoutItem.x === item.x) {
      layoutItem.y--
    }
    if (isOverlap(item, layoutItem)) {
      // layoutItem.x = item.x + item.w
      layoutItem.y = item.y + item.h
    }
  })
  return layoutItem
}

//重叠判断
const isOverlap = (a: LayoutItem, b: LayoutItem): boolean => {
  if (a === b) return false
  else return a !== b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h
}
