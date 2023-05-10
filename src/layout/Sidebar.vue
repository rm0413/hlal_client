<template>
    <div ref="sidebar"
        :class="`flex flex-col h-screen p-3 bg-black text-white shadow select-none transform duration-500 ${!alphaStore.sidebar ? 'w-[12%]' : 'w-[3%]'} absolute`">
        <div class="space-y-3">
            <div class="flex items-center justify-center relative">
                <h2 ref="icon_name" class="text-xl font-bold">Main Menu</h2>
                <h2 @click="openSidebar" class="cursor-pointer absolute right-0">click</h2>
            </div>
            <div class="ml-5">
                <ul class="text-sm">
                    <li class="rounded-sm hover:bg-gray-200 hover:text-black">
                        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 space-x-3 rounded-md">
                            <font-awesome-icon icon="home" class="bg-white"></font-awesome-icon>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li class="rounded-sm hover:bg-gray-200 hover:text-black">
                        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 space-x-3 rounded-md">
                            <font-awesome-icon icon="home" class></font-awesome-icon>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li class="rounded-sm hover:bg-gray-200 hover:text-black">
                        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 space-x-3 rounded-md">
                            <font-awesome-icon icon="home" class></font-awesome-icon>
                            <span>Home</span>
                        </router-link>
                    </li>
                    <li class="rounded-sm hover:bg-gray-200 hover:text-black">
                        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 space-x-3 rounded-md">
                            <font-awesome-icon icon="home" class></font-awesome-icon>
                            <span>Home</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlphaStore } from '@/modules/alpha'
import { ref } from 'vue'

const sidebar = ref(null)
const main = ref(null)
const icon_name = ref(null)

const alphaStore = useAlphaStore()

const openSidebar = () => {
    alphaStore.setSidebar()
}

</script>

<style>
.hide_icons {
    visibility: visible;
}
</style>