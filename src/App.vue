<script setup>
import CSidebar from "@/layout/CSidebar.vue"
import { useRoute } from "vue-router"
import { onMounted, ref } from 'vue'
import { useLoginStore } from "@/modules/login.js";

const route = useRoute()
const loginStore = useLoginStore()

onMounted(() => {
  if (loginStore.role === null && loginStore.section === null) {
    loginStore.role = sessionStorage.getItem('role_access')
    loginStore.section = sessionStorage.getItem('section_code')
  }
})

const signOut = () => {
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = "http://10.164.58.82/FDTP-Portal/public/";
}

const systemDetails = {
  name: "Hinsei & LSA Agreement List",
  class: "text-rose-600",
  version: "Version 1.0.0",
  logo: "@/assets/images/fujitsuICO.png",
  abbv: "HLAL",
};



const links = [
  {
    title: 'Dashboard',
    name: 'dashboard',
    fa: 'home',
  },
  {
    title: 'Request',
    name: 'request',
    fa: 'layer-group',
    role: 'ADMIN',
    section_code: 'QCI',
    sub_module: [
      {
        title: 'New Request',
        name: 'new-request',
        fa: 'folder-plus',
        role: 'ADMIN'
      },
      {
        title: 'Inspection Data',
        name: 'inspection-data',
        fa: 'magnifying-glass',
        role: 'ADMIN',
        section_code: 'QCI'
      },
      {
        title: 'Edit Item Details',
        name: 'edit-item-details',
        fa: 'eraser',
        role: 'ADMIN'
      },
      {
        title: 'Designer Section Answer',
        name: 'designer-section-answer',
        fa: 'puzzle-piece',
        role: 'ADMIN'
      },
      {
        title: 'Attachment',
        name: 'attachment',
        fa: 'paperclip',
        role: 'ADMIN'
      },
      {
        title: 'Saved Inputs',
        name: 'saved-inputs',
        fa: 'tags',
        role: 'ADMIN'
      },

    ]
  },
  {
    title: 'Monitoring',
    name: 'monitoring',
    fa: 'desktop',
  },
  {
    title: 'Management',
    name: 'management',
    fa: 'gears',
    role: 'ADMIN',
    sub_module: [
      {
        title: 'User Management',
        name: 'usermanagement',
        fa: 'users-gear',
        role: 'ADMIN',
      },
      {
        title: 'Unit Management',
        name: 'unitmanagement',
        fa: 'toolbox',
        role: 'ADMIN',
      },
    ]
  },
]

</script>

<template>
  <div class="h-screen">
    <CSidebar :systemDetails="systemDetails" :links="links"
      :signOut="signOut" v-if="route.name !== 'login'">
      <template #page>
        <router-view />
      </template>
    </CSidebar>
    <router-view v-else />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0 grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #A10E13;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.p-tooltip {
  z-index: 1105 !important;
}
</style>