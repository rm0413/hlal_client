<script setup>
import Sidebar from "@/layout/Sidebar.vue"
import { useRoute} from "vue-router"

const route = useRoute()
</script>

<template>
  <Sidebar v-if="route.fullPath !== '/'"></Sidebar>
  <router-view />
</template>

<style scoped></style>