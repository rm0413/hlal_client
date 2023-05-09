<template>
    <div class="flex">
        <div class="flex flex-col h-screen p-3 bg-gray-950 text-white shadow w-60">
            <div class="space-y-3">
                <div class="flex items-center justify-center">
                    <h2 class="text-xl font-bold">Main Menu</h2>
                </div>
                <div class="flex-1 ml-5">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">
                            <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 space-x-3 rounded-md">
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <span>Home</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>