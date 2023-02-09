import { getCurrentInstance, Ref } from 'vue'
import { positionToXy } from '@/core/positionToXy'
import { DragPosition, GridLayoutOptions, Layout } from '@/components/type'
import { compact } from '@/core/compact'

export const useDrag = (
  colWidth: Ref<number>,
  props: GridLayoutOptions & {
    layout: Layout
  }
) => {
  const { proxy } = getCurrentInstance()!
  
  const dragEvent = (eventType: string, dragPosition: Ref<DragPosition>, id: number) => {
    const layoutItem = props.layout?.find((item) => item.i === id) || { x: 0, y: 0, w: 0, h: 0 }
    const { top, left } = dragPosition.value
    const { x, y } = positionToXy(
      props.margin!,
      colWidth.value,
      props.cols!,
      props.rowHeight!,
      props.maxRows!,
      top,
      left,
      layoutItem.h,
      layoutItem.w
    )

    const index = props.layout?.findIndex((item) => item.i === id)
    const cloneArr = JSON.parse(JSON.stringify(props.layout))

    cloneArr[index] = {
      ...layoutItem,
      x,
      y,
    }
    proxy?.$emit('update:layout', compact(cloneArr))
  }
  return { dragEvent }
}
