<script setup>
import CSidebar from "@/layout/CSidebar.vue"
import { useRoute } from "vue-router"
import { useAlphaStore } from "./modules/alpha";

const route = useRoute()
const alphaStore = useAlphaStore()

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
        name: 'new_request',
        fa: 'folder-plus'
      },
      {
        title: 'Inspection Data',
        name: 'inspection_data',
        fa: 'folder-plus'
      },
      {
        title: 'Edit Item Details',
        name: 'edit_item_details',
        fa: 'folder-plus'
      },
      {
        title: 'Designer Section Answer',
        name: 'designer_section_answer',
        fa: 'folder-plus'
      },
      {
        title: 'Attachment',
        name: 'attachment',
        fa: 'folder-plus'
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