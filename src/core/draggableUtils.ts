// Get {x, y} positions from event.
export function getControlPosition(e: MouseEvent): { x: number; y: number } {
  return offsetXYFromParentOf(e)
}

// Get from offsetParent
export function offsetXYFromParentOf(evt: MouseEvent): { x: number; y: number } {
  const initValue = { left: 0, top: 0 }
  const offsetParent = (evt.target as HTMLElement).offsetParent || document.body
  const offsetParentRect =
    offsetParent === document.body ? initValue : offsetParent.getBoundingClientRect()

  const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left
  const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top

  return { x, y }
}
