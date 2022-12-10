import elementResizeDetectorMaker from 'element-resize-detector'
import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { GridLayoutOptions } from '@/components/type'

export const useSize = (dom: Ref<HTMLElement | null>, props: GridLayoutOptions) => {
  const domWidth = ref(0)

  const colWidth = computed<number>(
    () => (domWidth.value - props.margin![0] * (props.cols! + 1)) / props.cols!
  )

  const erdUltraFast = elementResizeDetectorMaker({
    strategy: 'scroll',
  })

  const calcDomWidth = (e: HTMLElement) => (domWidth.value = e.offsetWidth)

  onMounted(() => {
    erdUltraFast.listenTo(dom.value!, calcDomWidth)
  })

  onUnmounted(() => {
    erdUltraFast.removeListener(dom.value!, calcDomWidth)
  })
  return {
    domWidth,
    colWidth,
  }
}
