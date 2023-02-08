<script lang="ts" setup>
import elementResizeDetectorMaker from 'element-resize-detector'
import { useHeight } from '@/components/GridLayout/hooks/useHeight'
import { onMounted, provide, ref } from 'vue'
import { useSize } from '@/components/GridLayout/hooks/useSize'
import { GridLayoutOptions, Layout } from '../type'
import { colWidthKey, optionsKey } from '@/components/provideType'
import { useDrag } from '@/components/GridLayout/hooks/useDrag'
import { compact } from '@/core/compact'

interface Props extends GridLayoutOptions {
  layout?: Layout
  autoSize?: boolean
  maxRows?: number
  margin?: [number, number]
  isResizable?: boolean
  isDraggable?: boolean
  preventCollision?: boolean
  cols?: number
  rowHeight?: number
}

const emit = defineEmits(['update:layout'])
const props = withDefaults(defineProps<Props>(), {
  layout: () => [],
  margin: () => [10, 10],
  autoSize: true,
  maxRows: Infinity,
  isResizable: true,
  isDraggable: true,
  preventCollision: true,
  cols: 12,
  rowHeight: 20,
})

const gridLayout = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const [containerHeight] = useHeight(props)
const { colWidth } = useSize(gridLayout, props)
const { dragEvent } = useDrag(colWidth, props)

provide(optionsKey, props)
provide(colWidthKey, colWidth)

onMounted(() => {
  emit('update:layout', compact(props.layout))
})

defineExpose({
  dragEvent,
  isDragging,
})
</script>

<template>
  <div :style="containerHeight" class="grid-layout" ref="gridLayout">
    <slot :count="1"></slot>
  </div>
</template>

<style lang="scss" scoped>
.grid-layout {
  border: 1px solid red;
  overflow: hidden;
}
</style>
