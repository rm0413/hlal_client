<script setup>
import CSidebar from "@/layout/CSidebar.vue"
import { useRoute } from "vue-router"

const route = useRoute()

const systemDetails = {
  name: "Hinsei & LSA Agreement List",
  class: "text-rose-600",
  version: "Version 1.0.0",
  logo: "@/assets/images/fujitsuICO.png",
  abbv: "Hinsoi",
};
const links = [
  {
    title: 'Dashboard',
    name: 'dashboard',
    fa: 'home'
  },
  {
    title: 'Request',
    name: 'request',
    fa: 'layer-group',
    sub_module: [
      {
        title: 'New Request',
        name: 'new-request',
        fa: 'folder-plus'
      },
      {
        title: 'Inspection Data',
        name: 'inspection-data',
        fa: 'magnifying-glass'
      },
      {
        title: 'Edit Item Details',
        name: 'edit-item-details',
        fa: 'eraser'
      },
      {
        title: 'Designer Section Answer',
        name: 'designer-section-answer',
        fa: 'puzzle-piece'
      },
      {
        title: 'Attachment',
        name: 'attachment',
        fa: 'paperclip'
      },
      {
        title: 'Saved Inputs',
        name: 'saved-inputs',
        fa: 'tags'
      },

    ]
  },
  {
    title: 'Monitoring',
    name: 'monitoring',
    fa: 'desktop'
  },
  {
    title: 'Usermanagement',
    name: 'usermanagement',
    fa: 'users-gear'
  },
]

</script>

<template>
  <div class="h-screen">
    <CSidebar :systemDetails="systemDetails" :links="links" v-if="route.fullPath !== '/'">
      <template #page>
        <router-view />
      </template>
    </CSidebar>
    <router-view v-else />
 
  </div>
</template>

<style scoped></style>