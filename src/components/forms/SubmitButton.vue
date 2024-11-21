<script setup>
const props = defineProps({
  innerText: String,
})
</script>
<template>
  <button
    type="submit"
    class="border-2 text-nowrap px-4 text-[#6B23A7] rounded border-[#6B23A7] font-medium py-2 hover:border-transparent hover:bg-[#6B23A7] hover:text-white outline-none transition-all duration-300 ease-in-out focus:border-[#8230da] focus:outline-none focus:ring-2 focus:ring-[#6223A7]"
  >
    {{ innerText }}
  </button>
</template>
