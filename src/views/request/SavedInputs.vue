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
                            <input v-model="savedInputsStore.search_filter" class="text-center p-1 border-2 rounded-l-md" />
                            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-[90vh] w-full mt-3 min-[100px]:overflow-y-scroll lg:overflow-y-hidden">
                <div class="h-[80vh]">
                    <c-table ref="ctable" :isSelectable="true" @selectable="(data) => (select_data = data)"
                        :filter="savedInputsStore.search_filter" :items="savedInputsStore.getAgreementRequest"
                        :fields="savedInputsStore.getSavedInputsFields" :thStyle="'bg-[#A10E13] p-2 text-white'"></c-table>
                </div>
                <div class="flex flex-col items-center justify-center w-full">
                    <button
                        class="bg-[#A10E13] hover:bg-red-600 w-full h-[2.8rem] text-white tracking-widest font-serif text-[20px]"
                        @click="generateCode">
                        <font-awesome-icon icon="floppy-disk" class="h-5 w-5"></font-awesome-icon> GENERATE</button>
                </div>
            </div>
        </div>
        <Toast position="bottom-left" group="bl"></Toast>
    </div>
</template>
<script setup>
import CTable from "@/components/Datatable.vue";
import { onMounted, ref, inject } from "vue";
import { useSavedInputsStore } from "@/modules/request/savedInputs";
import { useToast } from "primevue/usetoast";

const swal = inject("$swal");
const toast = useToast();
const savedInputsStore = useSavedInputsStore();
const select_data = ref([])
const ctable = ref()

onMounted(() => {
    savedInputsStore.loadRequestWithNoCode()
})

const generateCode = () => {
    if (select_data.value.length !== 0) {
        var payload = {
            agreement_request_id: []
        }
        select_data.value.forEach((v) => {
            payload.agreement_request_id.push(v.agreement_id_pk)
        })
        savedInputsStore.setGenerateCode(payload).then((response) => {
            // console.log(response.data)
            if (response.status === "success") {
                savedInputsStore.setShowGenerateCode(response.data.id).then((response) => {
                    if (response.status === "success") {
                        ctable.value.unSelect();
                        select_data.value = [];
                        swal({
                            icon: "success",
                            title: response.data[0].code,
                            text: "Your code has been generated.",
                        });
                    }
                });
            } else {
                swal({
                    icon: "warning",
                    title: response.message,
                    timer: 2000
                });
            }
        })
    } else {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select data in table', life: 2000, group: 'bl' });
    }
}
</script>