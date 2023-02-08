<script setup lang="ts">
import GridLayout from '@/components/GridLayout/index.vue'
import GridItem from '@/components/GridItem/index.vue'
import { ref } from 'vue'
import { Layout } from '@/components/type'

const layout = ref<Layout>([
  {
    h: 10,
    w: 4,
    y: 0,
    x: 1,
    i: 0,
  },
  {
    h: 4,
    w: 3,
    y: 2,
    x: 5,
    i: 1,
  },
])
</script>

<template>
  <GridLayout v-model:layout="layout" :margin="[10, 10]" :cols='8'>
    <GridItem v-for="(item) in layout" :key="item.i" v-bind="item" :i="item.i"></GridItem>
  </GridLayout>
</template>
<style>
* {
  box-sizing: border-box;
}
</style>
