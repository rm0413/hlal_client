<script setup>
import CSidebar from "@/layout/CSidebar.vue"
import { useRoute } from "vue-router"
import { onMounted, ref } from 'vue'

const route = useRoute()

// onMounted(() => {
//   console.log(userprofile.value)
// })
const signOut = () => {
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = "http://10.164.58.62/FDTP-Portal/public/";
}

// const userprofile = ref(sessionStorage.getItem("employee_id"))
const userprofile = ref({
  full_name: `${sessionStorage.getItem("last_name")}, ${sessionStorage.getItem("first_name")}`,
  employee_id: sessionStorage.getItem("employee_id"),
  position: sessionStorage.getItem("position"),
  photo: sessionStorage.getItem("photo"),
  email: sessionStorage.getItem("email"),
  section: sessionStorage.getItem("section"),
  role: sessionStorage.getItem("role_access")
})

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
  // {
  //   title: 'Usermanagement',
  //   name: 'usermanagement',
  //   fa: 'users-gear'
  // },
  {
    title: 'Management',
    name: 'management',
    fa: 'gears',
    sub_module: [
      {
        title: 'User Management',
        name: 'usermanagement',
        fa: 'users-gear'
      },
      {
        title: 'Unit Management',
        name: 'unitmanagement',
        fa: 'toolbox'
      },
    ]
  },
]



</script>

<template>
  <div class="h-screen">
    <CSidebar :systemDetails="systemDetails" :links="links" :userDetails="userprofile" :signOut="signOut"
      v-if="route.name !== 'login'">
      <template #page>
        <router-view />
      </template>
    </CSidebar>
    <router-view v-else />

  </div>
</template>

<style scoped></style>