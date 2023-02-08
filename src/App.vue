<script setup lang="ts">
import GridLayout from '@/components/GridLayout/index.vue'
import GridItem from '@/components/GridItem/index.vue'
import { ref } from 'vue'
import { Layout } from '@/components/type'

const layout = ref<Layout>([
  {
    h: 1,
    w: 1,
    y: 0,
    x: 1,
    i: 1,
  },
 
  {
    h: 1,
    w: 1,
    y: 1,
    x: 0,
    i: 3,
  },
  {
    h: 1,
    w: 1,
    y: 0,
    x: 2,
    i: 2,
  },
  {
    h: 1,
    w: 1,
    y: 0,
    x: 0,
    i: 0,
  },
  {
    h: 1,
    w: 1,
    y: 0,
    x: 0,
    i: 9,
  },
])
</script>

<template>
  <GridLayout v-model:layout="layout" :margin="[10, 10]" :cols="8" :rowHeight="80">
    <GridItem v-for="item in layout" :key="item.i" v-bind="item" :i="item.i"></GridItem>
  </GridLayout>
</template>
<style>
* {
  box-sizing: border-box;
}
</style>
