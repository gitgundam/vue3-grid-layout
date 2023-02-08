<script lang="ts" setup="">
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { useDragPosition } from '@/components/GridItem/hooks/useDragPosition'
import { useInteract } from '@/components/GridItem/hooks/useInteract'
import { xyToPosition } from '@/core/xyToPosition'
import { setStyleTopLeft } from '@/components/helper/utils'
import { colWidthKey, optionsKey } from '@/components/provideType'

interface GridItemProps {
  isDraggable?: boolean
  isResizable?: boolean
  static?: boolean
  minH?: number
  minW?: number
  maxH?: number
  maxW?: number
  h: number
  w: number
  y: number
  x: number
  i: number
}

const props = withDefaults(defineProps<GridItemProps>(), {})

const options = inject(optionsKey, {})
const colWidth = inject(colWidthKey, ref(0))
const gridItem = ref()

const { tryDrag, tryResize } = useInteract(gridItem)
const { dragPosition, handleResize, handleDrag, type } = useDragPosition()

const placeHolder = computed(() =>
  setStyleTopLeft(
    xyToPosition(
      options.margin!,
      options.rowHeight!,
      props.x + props.w > options.cols! ? options.cols! - props.w : props.x,
      props.y,
      props.w,
      props.h,
      colWidth.value
    )!
  )
)

const style = computed(() => {
  if (type.value === 'move')
    return {
      ...placeHolder.value,
      top: dragPosition.value.top + 'px',
      left: dragPosition.value.left + 'px',
    }
  else return placeHolder.value
})

onMounted(() => {
  const { proxy }: any = getCurrentInstance()!

  tryDrag((e) => {
    handleDrag(e)
    proxy?.$parent?.dragEvent(e.type, dragPosition, props.i)
  })

  tryResize((e) => handleResize(e))
})
</script>

<template>
  <div ref="gridItem" class="placeHolder" :style="placeHolder" v-if="type === 'move'"></div>
  <div ref="gridItem" class="grid-item" :style="style"></div>
</template>

<style lang="scss" scoped>
.grid-item {
  position: absolute;
  border: 1px solid red;
  height: 200px;
  width: 200px;
}

.placeHolder {
  background: aqua;
  transition: all 200ms ease;
  transition-property: left, top, right;
}
</style>
