<script setup>
const props = defineProps({
  text: String,
})
</script>
<template>
  <div class="bg-red-500">
    <p class="py-2 text-center">{{ text }}</p>
  </div>
</template>
