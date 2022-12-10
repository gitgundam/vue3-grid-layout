import interact from 'interactjs'
import { onMounted, Ref, ref } from 'vue'
import { Interactable } from '@interactjs/core/Interactable'

const resizeOption = {
  edges: { top: true, left: true, bottom: true, right: true },
}

export const useInteract = (dom: Ref<HTMLElement>) => {
  const interactObj = ref<Interactable>()

  const tryDrag = (fn: (event: MouseEvent) => void) => {
    interactObj.value
      ?.draggable({})
      .on(['dragstart', 'dragmove', 'dragend'], (event: MouseEvent) => {
        fn(event)
      })
  }

  const tryResize = (fn: (event: MouseEvent) => void) => {
    interactObj.value
      ?.resizable(resizeOption)
      .on(['resizestart', 'resizemove', 'resizeend'], (event: MouseEvent) => {
        fn(event)
      })
  }

  const initInteract = () => (interactObj.value = interact(dom.value))

  onMounted(() => initInteract())

  return { initInteract, tryDrag, tryResize }
}
