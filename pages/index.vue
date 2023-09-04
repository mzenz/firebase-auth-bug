<template>
  <h1>Home</h1>
  <span>{{ `x = ${x}, y = ${y}` }}</span>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const {x, y } = useMouse()
</script>
