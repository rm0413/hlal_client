<template>
  <div>
    <div class="select-none absolute inset-x-0 top-0 w-screen bg-[#A10E13] h-[2px] z-50"></div>
    <div :class="`select-none fixed w-full z-30 flex shadow-lg dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10 bg-${themeStore.theme[themeStore.theme_select]._navbar
      }`">
      <div ref="logo"
        class="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center text-black">
      </div>
      <!-- SPACER -->
      <div class="grow h-full flex items-center justify-center"></div> <label class="
            flex
            col-span-1
            text-center
            items-center
            justify-end
            italic
            mr-6
            lg:text-[16px]
            min-[100px]:text-[14px]
          ">
        <font-awesome-icon class="h-5 w-5 max-lg:h-4 max-lg:w-4 mr-1 text-gray-700" icon="clock" />
        {{ today }}
      </label>
      <div ref="asideProfile" @click="openAside()" style="cursor: pointer"
        :class="`bg-gradient-to-r duration-500 bg-${themeStore.theme[themeStore.theme_select]._navbar
          } border-2 shadow-lg flex-none rounded-2xl h-full text-center flex item-center justify-center -mr-24 w-72 z-50`">
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
        <div ref="settings" :class="`opacity-0 duration-[600ms] font-bold md:block text-sm md:text-md text-${themeStore.theme[themeStore.theme_select].sidebar_text
          } mt-3 dark:text-white mr-3`">
          SETTINGS
        </div>
      </div>
      <div @click="openAside()" ref="asideCog"
        class="transition translate-x-12 flex mr-4 p-4 rounded-full text-white z-50 rotate-[360deg] duration-[600ms] cursor-pointer">
        <font-awesome-icon :class="`text-${themeStore.theme[themeStore.theme_select]._navbar_icon
          } h-6 w-6`" icon="gear"></font-awesome-icon>
        <!-- <i class="pi pi-cog text-black" style="font-size: 1.5rem"></i> -->
      </div>
    </div>
    <aside ref="caside" :class="`select-none inset-y-0 right-0 w-[19rem] translate-x-96 fixed transition ease-in-out duration-500 flex z-10 h-[calc(100vh)] shadow-2xl bg-${themeStore.theme[themeStore.theme_select].aside
      }`">
      <!-- MAX ASIDE -->
      <div ref="maxAside" :class="`ml-2 max text-${themeStore.theme[themeStore.theme_select].sidebar_text
        } mt-16 flex-col space-y-2 w-full h-[calc(100vh)] flex text-center`">
        <div class="text-xl divide-y-2 divide-white font-bold mt-7">USER INFORMATION</div>
        <div class="text-xl text-left flex flex-col p-5">
          <div class="w-full flex items-center justify-center">
            <img v-if="userprofile.photo !== undefined" :src="userprofile.photo" alt="" class="rounded-full w-[7rem]" />
            <img v-else src="@/assets/images/user_default.png" alt="" class="rounded-full" />
          </div>
          <div class="flex flex-col items-center justify-center">
            <p class="text-[#A10E13] font-bold text-[17px]">
              {{ userprofile.full_name ? userprofile.full_name : "Dela Cruz, Juan" }}
            </p>
            <p class="text-black font-bold text-[15px]">
              {{ userprofile.role }}
            </p>
            <p class="text-zinc-400 text-sm">
              {{
                userprofile.position !== undefined
                ? `${userprofile.position}`
                : "IT Staff"
              }}
            </p>
            <p class="text-zinc-400 text-xs">
              {{ userprofile.section !== undefined ? `${userprofile.section}` : "MIT" }}
            </p>
            <p class="text-zinc-400 text-xs">
              {{
                userprofile.email !== undefined
                ? `${userprofile.email}`
                : "john.doe@fujitsu.com"
              }}
            </p>
          </div>
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
    <aside ref="sidebar" :class="`select-none w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-30 flex h-screen bg-${themeStore.theme[themeStore.theme_select].sidebar
      } shadow-xl`">
      <!-- open sidebar button -->
      <div ref="maxToolbar" :class="`max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-2 border-gray-200 dark:border-[#0F172A] bg-${themeStore.theme[themeStore.theme_select].container
        } shadow-lg absolute top-2 rounded-full h-12`">
        <div class="flex pl-4 items-center space-x-2">
          <div>
            <!-- <div @click="themeStore.darkMode(), openNav()" v-if="themeStore.theme_select === 0" class="cursor-pointer">
              <font-awesome-icon icon="moon"></font-awesome-icon>
            </div> -->
            <!-- <div v-else @click="themeStore.onDefault(), openNav()" class="cursor-pointer">
              <font-awesome-icon icon="sun" class="text-white"></font-awesome-icon>
            </div> -->
          </div>
          <div class="text-black hover:text-blue-500 dark:hover:text-[#38BDF8] hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{3}"
              stroke="currentColor" class="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
        </div>
        <div
          class="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-[#EBC1C3] via-[#B54A4E] to-[#A10E13] pl-10 pr-2 py-1 rounded-full text-white">
          <div class="transform ease-in-out duration-300 mr-12 w-[4.8rem] text-center text-xs">
            {{ systemDetails.abbv !== undefined ? systemDetails.abbv : "FDTP-AT" }}
          </div>
        </div>
      </div>
      <div @click="openNav()"
        class="-right-6 cursor-pointer transition transform ease-in-out duration-500 flex border-2 border-black dark:border-[#0F172A] bg-[#FFF] dark:hover:bg-blue-500 hover:bg-rose-100 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
        <img src="@/assets/images/fujitsuICO.png" alt="" class="w-6 h-6" />
      </div>
      <!-- MAX SIDEBAR-->
      <div ref="maxSidebar" :class="`max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]`">
        <div v-for="(navs, n) in links" :key="n">

          <div
            v-if="navs.role === undefined || navs.role === userprofile.role || navs.section_code === userprofile.section_code">
            <router-link v-if="!navs.sub_module" :to="{ name: navs.name }"
              :class="`hover:ml-4 w-full shadow-lg text-${themeStore.theme[themeStore.theme_select].sidebar_text
                } hover:text-rose-900 dark:hover:text-blue-500 bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
                } border-red-700 p-2 pl-8 rounded transform ease-in-out duration-300 flex flex-row items-center space-x-3`">
              <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
              <i v-show="navs.svg" v-html="navs.svg"></i>
              <font-awesome-icon v-if="navs.fa" :class="`h-3 w-3 text-${themeStore.theme[themeStore.theme_select].sidebar_icon
                }`" :icon="navs.fa"></font-awesome-icon>

              <div>{{ navs.title }}</div>
            </router-link>
            <div :class="`hover:ml-4  w-full shadow-lg text-${themeStore.theme[themeStore.theme_select].sidebar_text
              } hover:text-rose-900 dark:hover:text-blue-500 border-red-700 p-2 pl-8 flex-row items-center space-x-3 transform ease-in-out duration-300 flex shadow-lg cursor-pointer bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
              } ${!openSubModule ? ' rounded text-[#A10E13]' : ' rounded'}`"
              @click="(openSubModule = !openSubModule), expand_submodule(`submodule(${n})`)" v-else>
              <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
              <i v-show="navs.svg" v-html="navs.svg"></i>
              <font-awesome-icon v-if="navs.fa" class="h-3 w-3" :icon="navs.fa"></font-awesome-icon>
              <div>{{ navs.title }}</div>
            </div>
            <div v-for="(sub, s) in navs.sub_module" :key="s">
              <router-link v-if="sub.role === userprofile.role || sub.section_code === userprofile.section_code"
                :to="{ name: sub.name }">
                <div ref="sub_module"
                  :class="`submodule(${n}) hover:ml-4 w-full shadow-lg text-${themeStore.theme[themeStore.theme_select].sidebar_text
                    } hover:text-rose-900 text-[12px] dark:hover:text-blue-500 bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
                    } border-red-700 p-2 pl-12 rounded transform ease-in-out duration-300 flex flex-row items-center space-x-3 shadow-lg cursor-pointer gap-2`">
                  <i v-show="sub.class" :style="sub.style" :class="sub.class"></i>
                  <i v-show="sub.svg" v-html="sub.svg"></i>
                  <font-awesome-icon v-if="sub.fa" class="h-3 w-3" :icon="sub.fa"></font-awesome-icon>
                  {{ sub.title }}
                  <!-- {{ links[0] }} -->
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- MINI SIDEBAR-->
      <div ref="miniSidebar" class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
        <div v-for="(navs, n) in links" :key="n">
          <!-- {{ navs.sub_module }} -->
          <div
            v-if="navs.role === undefined || navs.role === userprofile.role || navs.section_code === userprofile.section_code">
            <GTooltip :tooltype="'right'" :message="navs.title">
              <router-link v-if="!navs.sub_module" :to="{ name: navs.name }" :class="`hover:ml-4 justify-end pr-5 hover:text-red-900 dark:hover:text-red-200 w-full relative bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
                } p-3 rounded-full transform ease-in-out duration-500 flex shadow-lg hover:visible`">
                <span
                  class="translate-x-36 bg-black text-white flex items-center px-2 py-1 -translate-y-2 rounded invisible">Testingtesting</span>

                <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
                <i v-show="navs.svg" v-html="navs.svg"></i>
                <font-awesome-icon v-if="navs.fa" :class="`h-5 w-5 text-${themeStore.theme[themeStore.theme_select].sidebar_icon
                  }`" :icon="navs.fa"></font-awesome-icon>
              </router-link>
              <div :class="` hover:ml-4 justify-end pr-5 hover:text-red-900 dark:hover:text-red-200 duration-500  w-full p-3 bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
                }  ${openSubModule ? 'rounded text-[#A10E13]' : 'rounded-full text-blue-400'
                } transform ease-in-out duration-300 flex shadow-lg cursor-pointer`"
                @click="(openSubModule = !openSubModule), expand_submodule(`submodule(${n})`)" v-else>
                <i v-show="navs.class" :style="navs.style" :class="navs.class"></i>
                <i v-show="navs.svg" v-html="navs.svg"></i>
                <font-awesome-icon v-if="navs.fa" class="h-5 w-5" :icon="navs.fa"></font-awesome-icon>
              </div>
            </GTooltip>
            <div v-for="(sub, s) in navs.sub_module" :key="s">
              <router-link :to="{ name: sub.name }">
                <GTooltip :tooltype="'right'" :message="sub.title">
                  <div v-show="sub.role === userprofile.role || sub.section_code === userprofile.section_code"
                    ref="sub_module" :class="`submodule(${n}) transform duration-300 absolute hover:ml-4 opacity-0 -translate-x-[15rem] justify-end pr-5 text-${themeStore.theme[themeStore.theme_select].sidebar_sub_icon
                      } dark:hover:text-red-200 hover:text-red-900 w-full rounded bg-${themeStore.theme[themeStore.theme_select].sidebar_route_bg
                      } text-${themeStore.theme[themeStore.theme_select].sidebar_text} p-3 flex shadow-lg`">
                    <i v-show="sub.class" :style="sub.style" :class="sub.class"></i>
                    <i v-show="sub.svg" v-html="sub.svg"></i>
                    <font-awesome-icon v-if="sub.fa" class="h-4 w-4 " :icon="sub.fa"></font-awesome-icon>
                  </div>
                </GTooltip>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <!-- <div ref="content"
      :class="`content ${themeStore.theme[themeStore.theme_select].container} ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 h-screen`">
      <slot name="page"></slot>
    </div> -->
    <div ref="content" v-cloak :class="`content ${themeStore.theme[themeStore.theme_select].container
      } ml-12 transform ease-in-out duration-[1000ms] pt-20 px-2 md:px-5 pb-4 h-screen overflow-x-hidden`">
      <slot name="page"></slot>
    </div>
    <div :class="`select-none absolute inset-x-0 bottom-0 w-screen duration-500 bg-${themeStore.theme[themeStore.theme_select].footer
      } z-50 text-sm text-zinc-100 text-right`">
      Hinsei & LSA Agreement List ©2023 MIS
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/modules/alpha";
import GTooltip from "@/components/GTooltip.vue";
import moment from "moment";

const today = moment().format("[Today is ]dddd, MMMM Do YYYY");
const themeStore = useThemeStore();
const props = defineProps({
  links: Array,
  systemDetails: Object,
  signOut: Function,
  changeEmail: Function,
  changePassword: Function,
  // section_code: String,
  // role: String,
  tooltip: {
    type: Array,
    default: [true, 'try']
  }
});

// onMounted(() => {
//   console.log(props.links)
//   console.log(props.role)
//   console.log(props.section)
// })

const signOut = (() => {
window.close()
})

//User Information
const userprofile = ref({
  full_name: `${sessionStorage.getItem("last_name")}, ${sessionStorage.getItem("first_name")}`,
  employee_id: sessionStorage.getItem("employee_id"),
  position: sessionStorage.getItem("position"),
  photo: sessionStorage.getItem("photo"),
  email: sessionStorage.getItem("email"),
  section: sessionStorage.getItem("section"),
  section_code: sessionStorage.getItem("section_code"),
  role: sessionStorage.getItem("role_access")
})

//sidebar
const logo = ref(null);
const sidebar = ref(null);
const maxToolbar = ref(null);
const maxSidebar = ref(null);
const miniSidebar = ref(null);
const content = ref(null);
const highlights = ref(null);
const openSubModule = ref(false);
const sub_module = ref(null);

//aside
const caside = ref(null);
const asideProfile = ref(null);
const asideCog = ref(null);
const profile = ref(null);
const settings = ref(null);

const expand_submodule = (id) => {
  sub_module.value.forEach((sub) => {
    if (sub.classList.contains(id) && sub.classList.contains('opacity-0')) {
      sub.classList.remove("-translate-x-[15rem]");
      sub.classList.remove("opacity-0");
      sub.classList.remove("absolute");
      // sub.classList.remove("hidden");
    } else {
      // sub.classList.add("hidden");
      sub.classList.add("opacity-0");
      sub.classList.add("-translate-x-[15rem]");
      setTimeout(() => {
        sub.classList.add("absolute");
      }, 300);
    }
  });
};

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
    sub_module.value.forEach((v) => {
      if (v.classList.contains('opacity-0'))
        v.classList.add("absolute");
    });
  } else {
    // sub_module.value.forEach((v) => {
    //   v.classList.remove("opacity-0");
    //   v.classList.remove("opacity-0")
    //   // setTimeout(() => {v.classList.remove("hidden")},200)
    // });
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

<style>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
