<template>
    <dialog>
      <div class="flex flex-col w-[40vw] h-[30vh]">
      <slot name="body"></slot>
      </div>
    </dialog>
</template>

<script setup>
// import { useModalStore } from '@/modules/alpha'
// import { onMounted } from "vue";
// const modalStore = useModalStore()

// const props = defineProps({
//   open_modal: String
// })

// onMounted(() => {
//   console.log(modalStore.getModals)
// })
 
</script>
