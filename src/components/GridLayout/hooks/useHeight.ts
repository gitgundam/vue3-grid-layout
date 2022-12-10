import { computed, onMounted, ref, watch } from 'vue'
import { bottom } from '@/components/helper/utils'
import { GridLayoutOptions, Layout } from '@/components/type'

export const useHeight = (options: GridLayoutOptions & { layout: Layout }) => {
  const containerHeight = ref({})
  const getContainerHeight = () => {
    containerHeight.value = {
      height:
        bottom(options.layout) * (options.rowHeight! + options.margin![1]) +
        options.margin![1] +
        'px',
    }
  }
  watch(
    () => options.layout,
    (v) => {
      getContainerHeight()
    },
    { immediate: true, deep: true }
  )
  return [containerHeight]
}
