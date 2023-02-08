import { inject, ref } from 'vue'

export const useDragPosition = () => {
  const dragPosition = ref({ top: 0, left: 0 })
  const isDragging = ref(false)
  const handleResize = (event: any) => {}
  const type = ref('end')
  const handleDrag = (event: any) => {
    const { dx, dy } = event
    const { left: clientLeft, top: clientTop } = event.target.getBoundingClientRect()
    const { left: parentLeft, top: parentTop } = event.target.offsetParent.getBoundingClientRect()
    //计算父容器中子元素的定位
    const newPosition = { top: 0, left: 0 }

    switch (event.type) {
      case 'dragstart': {
        type.value = 'start'
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
        type.value = 'end'

        // if (!this.isDragging) return;
        newPosition.left = clientLeft - parentLeft
        newPosition.top = clientTop - parentTop
        // dragPosition.value = {top: 0, left: 0};
        isDragging.value = false
        break
      }
      case 'dragmove': {
        type.value = 'move'
        dragPosition.value.left += dx
        dragPosition.value.top += dy
        break
      }
    }
  }

  return { dragPosition, handleResize, handleDrag, type }
}
