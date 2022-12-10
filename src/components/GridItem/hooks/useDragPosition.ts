import { inject, ref } from 'vue'
import { getControlPosition } from '@/components/helper/draggableUtils'

export const useDragPosition = () => {
  const dragPosition = ref({ top: 0, left: 0 })
  const isDragging = ref(false)
  const handleResize = (event: any) => {}
  const handleDrag = (event: any) => {
    const { dx, dy } = event
    const { x, y } = getControlPosition(event)
    const { left: clientLeft, top: clientTop } = event.target.getBoundingClientRect()
    const { left: parentLeft, top: parentTop } = event.target.offsetParent.getBoundingClientRect()

    //计算父容器中子元素的定位
    const newPosition = { top: 0, left: 0 }

    switch (event.type) {
      case 'dragstart': {
        isDragging.value = true
        // this.previousX = this.innerX;
        // this.previousY = this.innerY;

        //开始时,获取目标值在容器内的相对定位
        newPosition.left = clientLeft - parentLeft
        newPosition.top = clientTop - parentTop
        dragPosition.value = newPosition
        break
      }
      case 'dragend': {
        // if (!this.isDragging) return;
        newPosition.left = clientLeft - parentLeft
        newPosition.top = clientTop - parentTop
        // dragPosition.value = {top: 0, left: 0};
        isDragging.value = false
        break
      }
      case 'dragmove': {
        dragPosition.value.left += dx
        dragPosition.value.top += dy
        break
      }
    }
  }

  return { dragPosition, handleResize, handleDrag }
}
