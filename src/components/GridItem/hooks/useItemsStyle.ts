import {computed, Ref} from 'vue'
import { setStyleTopLeft } from '@/components/helper/utils'

const useItemsStyle = (position:Ref) => {
  
  const style = computed(() => setStyleTopLeft(position.value))
  return [style]
}
