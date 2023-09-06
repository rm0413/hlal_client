<template>
  <div class="group flex relative">
    <slot></slot>
    <!-- <span
      class="w-full [transform:perspective(500px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] group-hover:opacity-100 transition-all duration-300 bg-[#a10e13] px-1 text-sm text-gray-100 rounded-md absolute right-0 top-1/2 translate-x-full opacity-0"
      >{{ message }}</span
    >
  </div> -->
    <div
      v-if="tooltype === 'right'"
      :class="`group-hover:flex [transform:perspective(500px)_translateZ(0)_translateX(-100px)_rotateY(-1deg)] group-hover:[transform:perspective(0px)_translateZ(0)_translateX(0)_rotateY(0deg)] absolute  left-full top-0 translate-x-full origin-bottom rounded ${textColor} transition-all duration-300 opacity-0 group-hover:opacity-100`"
    >
      <div class="flex items-center">
        <div :class="`clip-right h-2 w-4 ${bg}`"></div>
        <div :class="`rounded ${bg} p-2 text-xs text-center shadow-lg ${padding}`">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  tooltype: String,
  bottom: {
    type: String,
    default: "0",
  },
  top: {
    type: String,
    default: "[10%]",
  },
  right: {
    type: String,
    default: "[35%]",
  },
  left: String,
  top: String,
  bg: {
    type: String,
    default: "bg-red-950",
  },
  textColor: {
    type: String,
    default: "text-white",
  },
  padding: {
    type: String,
    default: "p-2",
  },
});
</script>

<style scoped>
.clip-right {
  clip-path: polygon(100% 0%, 100% 100%, 0% 50%, 100% 0%, 0 0);
}
.clip-left {
  clip-path: polygon(100% 100%, 0% 0%, 100% 0%, 0% 50%, 0 0);
}
</style>
