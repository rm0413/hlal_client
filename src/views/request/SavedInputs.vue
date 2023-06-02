<template>
    <div class="flex flex-col h-[90vh] min-[100px]:overflow-y-scroll lg:overflow-y-hidden">
        <div class="flex flex-col">
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
           <div class="flex flex-col h-[90vh] w-full mt-3 min-[100px]:overflow-y-scroll lg:overflow-y-hidden">
                <div class="h-[80vh]">
                    <c-table :items="savedInputsStore.getAgreementRequest" :fields="savedInputsStore.getSavedInputsFields"
                        :thStyle="'bg-[#A10E13] p-2 text-white'"></c-table>
                </div>
                <div class="flex flex-col items-center justify-center w-full">
                    <button class="bg-[#A10E13] hover:bg-red-600 w-full h-[2.8rem] text-white tracking-widest font-serif text-[20px]">
                        <font-awesome-icon icon="floppy-disk" class="h-5 w-5"></font-awesome-icon> GENERATE</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import CTable from "@/components/Datatable.vue";
import { onMounted, ref } from "vue";
import { useSavedInputsStore } from "@/modules/request/savedInputs";
const savedInputsStore = useSavedInputsStore();

onMounted(() => {
    savedInputsStore.loadRequestWithNoCode()
})
</script>