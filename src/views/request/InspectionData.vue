<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="magnifying-glass-plus" />
          Inspection Data
        </label>
        <div class="flex gap-2">
          <div class="flex">
            <label class="flex flex-col items-center justify-center">Search by: </label>
            <div class="h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md ml-3">
              Code
            </div>
            <div class="text-center p-1 border-2 rounded w-[8rem]">Part Number</div>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input class="text-center p-1 border-2 rounded-l-md" v-model="inspectionDataStore.search_filter"/>
            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
              Search
            </button>
          </div>
          <div>
            <select class="text-center p-1 border-2 rounded-md w-[12rem]" />
          </div>
        </div>
      </div>
    </div>
    <div class="h-[85vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
      <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col mt-2 h-[81vh] overflow-y-scroll">
        <c-table ref="c-table" :isSelectable="true" @selectable="(data) => (select_data = data)"
          :fields="inspectionDataStore.getInspectionDataFields" :items="inspectionDataStore.getInspectionData"
          :thStyle="'bg-[#A10E13] p-2 text-white'" :filter="inspectionDataStore.search_filter"></c-table>
      </div>
      <div class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2 px-10">
        <form method="post" @submit.prevent="submitInspectionData">
          <label class="flex flex-col items-center">
            <i class="text-gray-400">100% of Inspection Data or CPK Data</i>
            <textarea style="resize:none" class="border-2 rounded w-full h-[10rem] text-center" v-model="inspectionDataStore.inspectionDataForm.cpk_data" required></textarea>
          </label>
          <label class="flex flex-col items-center">
            <i class="text-gray-400">Inspection after Rework</i>
            <input type="text" class="border-2 rounded w-full h-[3rem] text-center" v-model="inspectionDataStore.inspectionDataForm.inspection_rework" required />
          </label>
          <label class="flex flex-col items-center">
            <i class="text-gray-400">Revised Date of IGM</i>
            <input type="date" class="border-2 rounded w-full h-[3rem] text-center " v-model="inspectionDataStore.inspectionDataForm.revised_date" />
          </label>
          <label class="flex flex-col items-center">
            <i class="text-gray-400">Send Date of IGM</i>
            <input type="date" class="border-2 rounded w-full h-[3rem] text-center " v-model="inspectionDataStore.inspectionDataForm.send_date" />
          </label>
          <button type="submit"
            class="flex gap-2 bg-[#A10E13] p-3 text-white rounded justify-center items-center w-full mt-2"><font-awesome-icon
              icon="floppy-disk"></font-awesome-icon>Save</button>
          <button type="button" @click="inspectionDataStore.clearInspectionData"
            class="flex gap-2 bg-gray-600 hover:bg-gray-500 p-3 text-white rounded justify-center items-center w-full mt-2">Clear</button>
        </form>
      </div>
    </div>
    <Toast position="bottom-left" group="bl"></Toast>
  </div>
</template>
<script setup>
import { onMounted, ref, inject } from "vue";
import CTable from "@/components/Datatable.vue";
import { useInspectionDataStore } from "@/modules/request/inspectiondata";
import { useToast } from "primevue/usetoast";
const inspectionDataStore = useInspectionDataStore();
const swal = inject("$swal");
const toast = useToast();
const ctable = ref()
const select_data = ref([])
onMounted(() => {
  inspectionDataStore.setInspectionDataRequest()
})

const submitInspectionData = () => {
  if (select_data.value.length !== 0) {
    console.log(true)
  } else {
    toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select data in table', life: 2000, group: 'bl' });
  }
}
</script>
