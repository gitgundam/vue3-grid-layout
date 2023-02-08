import { Layout, LayoutItem } from '@/components/type'
import { StyleValue } from 'vue'

/**
 * Return the bottom coordinate of the layout.
 * 遍历LayoutList,获取布局中的最下层的位置
 * @param  {Array} layout Layout array.
 * @return {Number} Bottom coordinate.
 */
export const bottom = (layout: Layout = []) => {
  let max = 0,
    bottomY = 0
  layout.forEach((item, index) => {
    bottomY = item.y + item.h
    if (bottomY > max) max = bottomY
  })
  return max
}

export const cloneLayout = (layout: Layout) => JSON.parse(JSON.stringify(layout))

export function moveElement(
  layout: Layout,
  layoutItem: LayoutItem,
  x: number,
  y: number,
  preventCollision: boolean
): Layout {
  if (layoutItem.static) return layout

  const oldX = layoutItem.x
  const oldY = layoutItem.y

  const movingUp = y && layoutItem.y > y
  // This is quite a bit faster than extending the object
  layoutItem.x = x
  layoutItem.y = y
  layoutItem.moved = true

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItemsByRowCol(layout)
  if (movingUp) sorted = sorted.reverse()
  const collisions = getAllCollisions(sorted, l)

  if (collisions.length) {
    layoutItem.x = oldX
    layoutItem.y = oldY
    layoutItem.moved = false
    return layout
  }

  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i]
    // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);

    // Short circuit so we can't infinite loop
    if (collision.moved) continue

    // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.
    if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = moveElementAwayFromCollision(layout, collision, l, isUserAction)
    } else {
      layout = moveElementAwayFromCollision(layout, l, collision, isUserAction)
    }
  }

  return layout
}

/**
 * Get layout items sorted from top left to right and down.
 * 从左到右,从上到下来进行排序
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */
export function sortLayoutItemsByRowCol(layout: Layout): Layout {
  return layout
    .map((item) => item)
    .sort((a, b) => {
      if (a.y === b.y && a.x === b.x) {
        return 0
      }
      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        return 1
      }
      return -1
    })
}

export function setStyleTopLeft(position: {
  top: number
  left: number
  width: number
  height: number
}): any {
  const { top, left, width, height } = position
  return {
    top: top + 'px',
    left: left + 'px',
    width: width + 'px',
    height: height + 'px',
    position: 'absolute',
  }
}
