<template>
    <div class="flex flex-col">
        <div class="h-full w-full">
            <div class="flex justify-between">
                <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
                    <font-awesome-icon class="h-6 w-6 text-black" icon="tags" />
                    Saved Inputs
                </label>
                <div class="flex">
                    <div class="flex flex-row">
                        <div class="relative">
                            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                                    icon="magnifying-glass"></font-awesome-icon></i>
                            <input class="text-center p-1 border-2 rounded-l-md" />
                            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[85vh] w-full mt-3 overflow-y-scroll">
                <c-table :fields="savedInputsStore.getSavedInputsFields" :thStyle="'bg-[#A10E13] p-2 text-white'"></c-table>
            </div>
        </div>
    </div>
</template>
<script setup>
import CTable from "@/components/Datatable.vue";
import { useSavedInputsStore } from "@/modules/request/savedInputs";

const savedInputsStore = useSavedInputsStore();
</script>