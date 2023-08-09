<template>
    <div class="flex flex-col">
        <div class="h-full w-full">
            <div class="h-full w-full">
                <div class="flex justify-between">
                    <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
                        <font-awesome-icon class="h-6 w-6 text-black" icon="tags" />
                        Saved Inputs
                    </label>
                    <div class="flex flex-row">
                        <div class="relative">
                            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                                    icon="magnifying-glass"></font-awesome-icon></i>
                            <input v-model="savedInputsStore.search_filter"
                                class="text-center p-1 border-2 rounded-l-md w-[15rem] h-[2.5rem]" />
                            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[82vh] w-full mt-3 overflow-y-scroll">
                <c-table :items="savedInputsStore.getAgreementRequest" :thStyle="'bg-[#A10E13] p-3 text-white'" ref="ctable"
                    :fields="savedInputsStore.getSavedInputsFields" :filter="savedInputsStore.search_filter"
                    :isSelectable="true" @selectable="(data) => (select_data = data)"></c-table>
            </div>
            <button
                class="bg-[#A10E13] hover:bg-red-600 w-full h-[2.5rem] text-white tracking-widest font-serif text-[20px]"
                @click="generateCode">
                <font-awesome-icon icon="floppy-disk" class="h-5 w-5"></font-awesome-icon> GENERATE</button>
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
        swal({
            icon: "question",
            title: "Generate Code?",
            text: "Please make sure before to proceed!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((response) => {
            if (response.value === true) {
                var payload = {
                    agreement_request_id: []
                }
                select_data.value.forEach((v) => {
                    payload.agreement_request_id.push(v.agreement_id_pk)
                })
                const loader = $loading.show()
                setTimeout(() => {
                    savedInputsStore.setGenerateCode(payload).then((response) => {
                        // console.log(response.data)
                        if (response.status === "success") {
                            savedInputsStore.setShowGenerateCode(response.data.id).then((response) => {
                                if (response.status === "success") {
                                    ctable.value.unSelect();
                                    select_data.value = [];
                                    loader.hide()
                                    swal({
                                        icon: "success",
                                        title: response.data[0].code,
                                        text: "Your code has been generated. An email notification will be sent.",
                                    });
                                }
                            });
                        } else {
                            loader.hide()
                            Object.keys(response.error).forEach((key) => {
                                toast.add({
                                    severity: "error",
                                    summary: "Warning",
                                    detail: response.error[key][0],
                                    life: 5000,
                                });
                            })
                        }
                    })
                })
            } else {
                toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000, group: 'bl' });
            }
        })
    } else {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select data in table', life: 2000, group: 'bl' });
    }
}
</script>