<template>
  <div class="relative w-[500px] overflow-hidden border border-black">
    <input
      type="checkbox"
      name="c1"
      class="w-full absolute top-0 inset-x-0 h-12 opacity-0 z-10 cursor-pointer"
    />
    <div class="bg-black h-12 w-full pl-5 flex items-center">
      <h1  class="text-lg text-white font-sans">{{ Title }}</h1>
    </div>
    <div
      class="absolute top-3 right-3 text-white transform transition-transform duration-200"
      :class="prop.open ? 'rotate-0' : 'rotate-180'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
    <div
      class="bg-white overflow-hidden transition-all duration-500"
      :class="prop.open ? 'max-h-600' : 'max-h-0'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps({ open: Boolean, Title: String  });
</script>

<style scoped></style>
