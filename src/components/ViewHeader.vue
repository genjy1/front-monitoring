<template>
  <h1 class="text-3xl pb-2 mt-3 font-medium flex items-center justify-between text-nowrap">
    {{ text }}
  </h1>
</template>

<script setup>
const props = defineProps({ text: String })
</script>
