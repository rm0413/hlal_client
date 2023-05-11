<template>
  <div class="select-none absolute inset-x-0 top-0 w-screen bg-[#A10E13] h-[2px] z-50"></div>
  <div
    class="select-none fixed w-full z-30 flex shadow-lg dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10 bg-white">
    <div ref="logo"
      class="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center text-black">
    </div>
    <!-- SPACER -->
    <div class="grow h-full flex items-center justify-center"></div>
    <div ref="asideProfile" @click="openAside()" style="cursor: pointer"
      class="bg-gradient-to-r duration-500 bg-white border-2 shadow-lg flex-none rounded-2xl h-full text-center flex item-center justify-center -mr-24 w-72 z-50">
      <div ref="profile" class="opacity-100 duration-[700ms] flex space-x-3 items-center px-3">
        <div class="flex-none flex justify-center">
          <div class="w-8 h-8 flex">
            <img src="@/assets/images/fujitsuICO.png" />
          </div>
        </div>

        <div class="font-bold md:block text-sm md:text-md text-black dark:text-white">
          <div :class="systemDetails.class">{{ systemDetails.name }}</div>
        </div>
      </div>
      <div ref="settings"
        class="opacity-0 duration-[600ms] font-bold md:block text-sm md:text-md text-black mt-3 dark:text-white mr-3">
        SETTINGS
      </div>
    </div>
    <div @click="openAside()" ref="asideCog"
      class="transition translate-x-12 flex mr-4 p-4 rounded-full text-white z-50 rotate-[360deg] duration-[600ms] cursor-pointer">
      <font-awesome-icon class="text-black h-6 w-6" icon="gear"></font-awesome-icon>
      <!-- <i class="pi pi-cog text-black" style="font-size: 1.5rem"></i> -->
    </div>
  </div>
  <aside ref="caside"
    class="select-none inset-y-0 right-0 w-[19rem] translate-x-96 fixed transition ease-in-out duration-500 flex z-10 h-[calc(100vh)] shadow-2xl bg-white">
    <!-- MAX ASIDE -->
    <div ref="maxAside" class="ml-2 max text-black mt-16 flex-col space-y-2 w-full h-[calc(100vh)] flex text-center">
      <div class="text-xl divide-y-2 divide-white font-bold mt-7">
        USER INFORMATION
      </div>
      <div class="grid grid-rows-2 h-28">
        <div class="row-span-1 grid grid-cols-2 place-items-center">
          <div class="col-span-2">
            <button @click="signOut()"
              class="p-3 flex w-52 h-12 justify-center place-items-center bg-[#A10E13] text-white rounded-xl gap-2">
              <font-awesome-icon icon="right-from-bracket" />SIGN OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <aside ref="sidebar"
    class="select-none w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-30 flex h-screen bg-white shadow-xl">
    <!-- open sidebar button -->
    <div ref="maxToolbar"
      class="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-white shadow-lg absolute top-2 rounded-full h-12">
      <div class="flex pl-4 items-center space-x-2">
        <div>
          <div onclick="setDark('dark')" class="moon">
            <svg class="h-4 w-4 text-zinc-400 hover:text-[#A10E13] dark:hover:text-[#38BDF8]" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
          <div onclick="setDark('light')" class="sun hidden">
            <svg class="h-4 w-4 text-zinc-400 hover:text-[#A10E13] dark:hover:text-[#38BDF8]" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </div>
        <div class="text-black hover:text-blue-500 dark:hover:text-[#38BDF8]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{3}" stroke="currentColor"
            class="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </div>
      </div>
      <div
        class="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-[#EBC1C3] via-[#B54A4E] to-[#A10E13] pl-10 pr-2 py-1 rounded-full text-white">
        <div class="transform ease-in-out duration-300 mr-12 w-[4.8rem] text-right">
          {{
            systemDetails.abbv !== undefined ? systemDetails.abbv : "FDTP-AT"
          }}
        </div>
      </div>
    </div>
    <div @click="openNav()"
      class="-right-6 cursor-pointer transition transform ease-in-out duration-500 flex border-2 border-black dark:border-[#0F172A] bg-[#FFF] dark:hover:bg-blue-500 hover:bg-rose-100 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
      <img src="@/assets/images/fujitsuICO.png" alt="" class="w-6 h-6" />
    </div>
    <!-- MAX SIDEBAR-->
    <div ref="maxSidebar" class="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
      <div v-for="(navs, n) in links" :key="n">
        <router-link :to="{ name: navs.name }"
          class="hover:ml-4 w-full shadow-lg text-black hover:text-rose-900 dark:hover:text-blue-500 bg-white border-red-700 p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
          <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
          <i v-show="navs.svg" v-html="navs.svg"></i>
          <font-awesome-icon v-if="navs.fa" class="h-3 w-3 text-black" :icon="navs.fa"></font-awesome-icon>

          <div>{{ navs.title }}</div>
        </router-link>
      </div>
    </div>
    <!-- MINI SIDEBAR-->
    <div ref="miniSidebar" class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
      <div v-for="(navs, n) in links" :key="n">
        <router-link :to="{ name: navs.name }"
          class="hover:ml-4 justify-end pr-5 text-black hover:text-red-900 dark:hover:text-red-200 w-full bg-white p-3 rounded-full transform ease-in-out duration-300 flex shadow-lg">
          <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
          <i v-show="navs.svg" v-html="navs.svg"></i>
          <font-awesome-icon v-if="navs.fa" class="h-3 w-3 text-black" :icon="navs.fa"></font-awesome-icon>
        </router-link>
      </div>
    </div>
  </aside>
  <div ref="content" class="select-none content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
    <slot name="page"></slot>
  </div>
  <div class="select-none absolute inset-x-0 bottom-0 w-screen bg-[#A10E13] z-50 text-sm text-zinc-100 text-right">
    Hinsei & LSA Agreement List ©2023 MIS
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  links: Array,
  systemDetails: Object,
  // userDetails: Object,
  // signOut: Function,
  // changeEmail: Function,
  // changePassword: Function,
});

onMounted(() => {
  console.log(props.links)
})

//sidebar
const logo = ref(null);
const sidebar = ref(null);
const maxToolbar = ref(null);
const maxSidebar = ref(null);
const miniSidebar = ref(null);
const content = ref(null);
const highlights = ref(null);

//aside
const caside = ref(null);
const asideProfile = ref(null);
const asideCog = ref(null);
const profile = ref(null);
const settings = ref(null);

const openAside = () => {
  if (caside.value.classList.contains("translate-x-96")) {
    asideCog.value.classList.remove("translate-x-12");
    asideCog.value.classList.add("-translate-x-[12.5rem]");
    profile.value.classList.add("opacity-0");
    profile.value.classList.remove("opacity-100");
    settings.value.classList.remove("opacity-0");
    settings.value.classList.add("opacity-100");
    asideCog.value.classList.add("-rotate-[360deg]");
    asideCog.value.classList.remove("rotate-[360deg]");
    caside.value.classList.remove("translate-x-96");
    caside.value.classList.add("translate-x-none");
  } else {
    settings.value.classList.add("opacity-0");
    settings.value.classList.remove("opacity-100");
    profile.value.classList.remove("opacity-0");
    profile.value.classList.add("opacity-100");
    asideCog.value.classList.remove("-rotate-[360deg]");
    asideCog.value.classList.add("rotate-[360deg]");
    asideCog.value.classList.add("translate-x-12");
    asideCog.value.classList.remove("-translate-x-[12.5rem]");
    caside.value.classList.add("translate-x-96");
    caside.value.classList.remove("translate-x-none");
  }
};

const openNav = () => {
  if (sidebar.value.classList.contains("-translate-x-48")) {
    // max sidebar
    sidebar.value.classList.remove("-translate-x-48");
    sidebar.value.classList.add("translate-x-none");
    maxSidebar.value.classList.remove("hidden");
    maxSidebar.value.classList.add("flex");
    miniSidebar.value.classList.remove("flex");
    miniSidebar.value.classList.add("hidden");
    maxToolbar.value.classList.add("translate-x-0");
    maxToolbar.value.classList.remove("translate-x-24", "scale-x-0");
    logo.value.classList.remove("ml-12");
    content.value.classList.remove("ml-12");
    content.value.classList.add("ml-12", "md:ml-60");
  } else {
    sidebar.value.classList.add("-translate-x-48");
    sidebar.value.classList.remove("translate-x-none");
    maxSidebar.value.classList.add("hidden");
    maxSidebar.value.classList.remove("flex");
    miniSidebar.value.classList.add("flex");
    miniSidebar.value.classList.remove("hidden");
    maxToolbar.value.classList.add("translate-x-24", "scale-x-0");
    maxToolbar.value.classList.remove("translate-x-0");
    logo.value.classList.add("ml-12");
    content.value.classList.remove("ml-12", "md:ml-60");
    content.value.classList.add("ml-12");
  }
};
</script>
