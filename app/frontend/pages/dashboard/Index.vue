<template>
  <h1>Vue Working! {{ name }}</h1>
</template>

<script setup>
const props = defineProps({
  name: String
})
</script>

<style scoped>
</style>