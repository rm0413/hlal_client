<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class=" flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="paperclip" />
          Attachments
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
    </div>
    <div
      class="h-[80vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2"
    >
      <div class="col-span-3 py-5">
          <file-uploader></file-uploader>
      </div>
      <div class="col-span-6 my-5 overflow-y-scroll">
          <CTable :fields="attachmentsStore.getAttachmentsFields" :thStyle="'bg-[#A10E13] p-2 text-white text-[13px]'"></CTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import FileUploader from "@/components/FileUploader.vue";
import CTable from "@/components/Datatable.vue"
import { useAttachmentsStore } from '@/modules/request/attachments'
const attachmentsStore = useAttachmentsStore()
</script>
