<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="puzzle-piece" />
          Designer Section Answer
        </label>
        <div class="flex gap-2">
          <div class="flex flex-row items-center">
            <p class="mr-2">Search by:</p>
            <div
              class="h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md flex items-center gap-1"
            >
              Code
            </div>
            <div class="text-center p-1 border-2 rounded-r-md w-[12rem]">Part Number</div>
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
    </div>
    <div
      class="h-[86.2vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2"
    >
      <div
        class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col mt-2 bg-gray-100 overflow-y-scroll"
      >
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
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
            {
              code: 'DX458',
              trial_no: 'T3',
              request_date: '10/12/2022',
              supplier: 'SPPI',
              part_number: 'KD0616-E081',
              revision: '06',
              dimension: '144.5+-0.20',
              critical_dimension: '',
              inspection_data: 'CPK'
            },
          ]"
          :fields="designerSectionAnswerStore.getDesignerSectionAnswerFields"
          :thStyle="'bg-[#A10E13] p-2 text-white text-[13px]'"
        >
        <template #cell(select)>
            <input type="checkbox" />
        </template>
        </c-table>
      </div>
      <div
        class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2 px-10"
      >
        <label class="flex flex-col items-center">
          <i class="text-white bg-[#A10E13] w-full flex justify-center rounded"
            >Request Result</i
          >
          <select class="border-2 rounded w-full h-[3rem]" />
        </label>
        <label class="flex flex-col items-center">
          <i class="text-white bg-[#A10E13] w-full flex justify-center rounded"
            >Input Designer Answers</i
          >
          <div class="p-2 w-full">
            <p class="text-[13px]">Designer section's answer</p>
            <textarea style="resize: none" class="border-2 rounded w-full h-[4rem]" />
            <p class="text-[13px]">Designer In-charge</p>
            <input type="text" class="border-2 rounded w-full h-[2rem]" />
            <p class="text-[13px]">Answer Date:</p>
            <input type="date" class="border-2 rounded text-center w-full h-[2rem]" />
          </div>
        </label>
        <label class="flex flex-col items-center">
          <i class="text-white bg-[#A10E13] w-full flex justify-center rounded mb-2"
            >Upload Designer Answer</i
          >
          <input
            type="file"
            class="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </label>
        <button
          class="flex gap-2 bg-[#A10E13] p-3 text-white rounded justify-center items-center mt-5"
        >
          <font-awesome-icon icon="floppy-disk"></font-awesome-icon>Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CTable from "@/components/Datatable.vue";
import { useDesignerSectionAnswerStore } from "@/modules/request/designersectionanswer";
const designerSectionAnswerStore = useDesignerSectionAnswerStore();
</script>
