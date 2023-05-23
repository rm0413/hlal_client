<template>
  <CSidebar
    v-if="route.fullPath !== '/login-2'"
    :navLinks="navLinks"
    :systemDetails="systemDetails"
    :userDetails="_p"
    :signOut="signOut"
  >
    <template #page>
      <Title :tContent="_title_object"></Title>
      <router-view :profile="_p" />
    </template>
  </CSidebar>
  <router-view v-else />
</template>
<script setup>
import CSidebar from "@/components/CSidebar.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Title from "@/components/TitleHolder.vue";

const _title_object = ref([
  {
    path: "/request",
    icon: "hand-holding-medical",
    title: "Request System Access",
    description: "List of System you want to request access.",
  },
  {
    path: "/systems",
    icon: "display",
    title: "My Systems",
    description:
      "Connecting all your system access in one portal for easy access. You can request to the System Administrator or Section heads if the system you're looking for is not on the list.",
  },
  {
    path: "/admin",
    icon: "user-shield",
    title: "System Management",
    description: "Together we connect and manage Systems and Role.",
  },
  {
    path: "/user",
    icon: "users-gear",
    title: "User Management",
    description:
      "Welcome to User Management of the FDTP System Portal. All employees list down here can request access to FDTP Systems through their Section heads approval and system role allocation.",
  },
  {
    path: "/home",
    icon: "chart-simple",
    title: "FDTP Systems",
    description:
      "Monitor the numbers of Systems per section using Graphical Represntation and the status of all inhouse systems.",
  },
  {
    path: "/logs",
    icon: "list-ul",
    title: "Logs History",
    description: "Monitor FDTP Portal system activities.",
  },
]);

const route = useRoute();
const router = useRouter();

/**
 * userprofile
 */
const _p = ref(JSON.parse(sessionStorage.getItem("userprofile")));

const navLinks = [
  {
    title: "Home",
    name: "home",
    fa: "fa-solid fa-chart-simple",
  },
  {
    title: "Request",
    name: "request",
    fa: "fa-hand-holding-medical",
  },
  {
    title: "Systems",
    name: "systems",
    fa: "fa-solid fa-display",
  },
  {
    title: "Admin",
    name: "admin",
    fa: "fa-solid fa-user-shield",
  },
  {
    title: "User",
    name: "user",
    fa: "fa-solid fa-users-gear",
  },
  {
    title: "Logs",
    name: "logs",
    fa: "fa-solid fa-list-ul",
  },
];

const systemDetails = {
  name: "FDTP Portal",
  class: "text-rose-600",
  version: "Version 1.0.0",
  logo: "./src/assets/img/fujitsuICO.png",
  abbv: "Fortal",
};

// const userDetails = {
//   full_name: "Gian Maaghop",
//   position: "IT Staff",
//   section: "MIT",
//   email: "gianoliver.maaghop@fujitsu.com",
// };

const signOut = () => {
  localStorage.removeItem("userdata");
  router.push({ name: "login-2" });
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #a10e13;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a10e13;
}
</style>
