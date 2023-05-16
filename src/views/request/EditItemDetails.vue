<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="eraser" />
          Edit Item Details
        </label>
        <div class="flex gap-2">
          <div class="flex">
            <label class="flex flex-col items-center justify-center">Search by:  </label>
            <div class="h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md ml-3">
              Code
            </div>
            <div class="text-center p-1 border-2 rounded w-[8rem]">Part Number</div>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"
              ><font-awesome-icon icon="magnifying-glass"></font-awesome-icon
            ></i>
            <input class="text-center p-1 border-2 rounded-l-md" />
            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
              Search
            </button>
          </div>
          <div>
            <select class="text-center p-1 border-2 rounded-md w-[12rem]" />
          </div>
        </div>
      </div>
      <div class="h-[80vh] w-full mt-3 overflow-y-scroll">
        <c-table
          :items="[
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              actual_value: '+0.25/+0.30',
              kind_of_request: 'LSA Request',
              value_of_request: '144.5(+0.30/-0.20)',
            },
          ]"
          :fields="editItemDetailsStore.getEditItemDetailsFields"
          :thStyle="'bg-[#A10E13] text-white p-2 text-[13px]'"
        >
          <template #cell(action)>
            <div class="flex justify-center gap-1">
              <button class="h-8 w-9 rounded bg-yellow-500 text-white">
                <font-awesome-icon icon="pen"></font-awesome-icon>
              </button>
              <button class="h-8 w-9 rounded bg-[#A10E13] text-white">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </button>
            </div>
          </template>
        </c-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import CTable from "@/components/Datatable.vue";
import { useEditItemDetailsStore } from "@/modules/request/edititemdetails";
const editItemDetailsStore = useEditItemDetailsStore();
</script>
