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
            <label class="flex flex-col items-center justify-center">Search by: </label>
            <div class="h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md ml-3">
              Code
            </div>
            <div class="text-center p-1 border-2 rounded w-[8rem]">Part Number</div>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input class="text-center p-1 border-2 rounded-l-md h-[2.5rem]" v-model="attachmentsStore.search_filter" />
            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
              Search
            </button>
          </div>
          <div>
            <CSelect class="text-center p-1 border-2 rounded-md w-[14rem] h-[2.5rem] text-lg" :options="part_number"
              v-model="attachmentsStore.part_number_select"></CSelect>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[80vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
      <div class="lg:col-span-2 lex flex-col mt-4 rounded-3xl h-[40vh]">
        <p class="flex flex-col text-white bg-[#A10E13] h-[2.5rem] w-full items-center justify-center rounded mt-5">
          Attachments</p>
        <form method="post" @submit.prevent="submitAttachment">
          <div class="flex flex-col items-center justify-center mt-2 border-2 border-black rounded-xl border-dashed">
            <input id="input-file" type="file" accept=".pdf" @change="uploadFile" :draggable="true" class="text-sm text-grey-500 w-full h-[10rem] mt-10
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700" required />
            <span class="file-msg">or drag and drop PDF file here</span>
          </div>
          <div class="flex flex-col items-center justify-center w-full">
            <button class="bg-[#A10E13] text-white p-1 w-full h-[3rem] rounded mt-5 " type="submit">Save</button>
            <button class="bg-gray-700 hover:bg-gray-500 text-white p-1 w-full h-[3rem] rounded mt-1" @click="clearFile"
              type="button">Clear</button>
          </div>
        </form>
      </div>
      <div class="col-span-7 my-5 overflow-y-scroll">
        <CTable ref="ctable" :isSelectable="true" @selectable="(data) => (select_data = data)"
          :filter="attachmentsStore.search_filter" :items="filterPartNumber"
          :fields="attachmentsStore.getAttachmentsFields" :thStyle="'bg-[#A10E13] p-2 text-white text-[13px]'">
          <template #cell(action)="data">
          </template>
        </CTable>
      </div>
    </div>
    <Toast position="top-left"></Toast>
    <Toast position="bottom-left" group="bl"></Toast>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from "vue";
const swal = inject("$swal");
import CTable from "@/components/Datatable.vue"
import CSelect from "@/components/CSelect.vue"
import { useAttachmentsStore } from '@/modules/request/attachments'
const attachmentsStore = useAttachmentsStore()
import { useToast } from "primevue/usetoast";
const toast = useToast();

const ctable = ref();
const select_data = ref([]); //select table
const part_number = ref([])
const path = ref(null);

onMounted(() => {
  attachmentsStore.setAgreementListCode()
  attachmentsStore.setLoadPartNumber().then((response) => {
    response.data.forEach((v) => {
      part_number.value.push({
        text: v,
        value: v
      })
    })
  })
})

const file = ref(null);
const uploadFile = (event) => {
  file.value = event.target.files[0];
};

const submitAttachment = () => {
  if (file.value.type === "application/pdf") {
    if (select_data.value.length !== 0) {
      var payload = {
        agreement_request_id: [],
      };
      select_data.value.forEach((v) => {
        payload.agreement_request_id.push(v.agreement_id_pk);
      });
      const formData = new FormData();
      formData.append('file_path_attachment', file.value);
      payload.agreement_request_id.forEach(function (value) {
        formData.append("agreement_request_id[]", value) // you have to add array symbol after the key name
      })
      swal({
        icon: "question",
        title: "Upload a File?",
        text: "Please make sure before to proceed!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((response) => {
        if (response.value === true) {
          attachmentsStore.setInsertAttachment(formData).then((response) => {
            if (response.status === "success") {
              ctable.value.unSelect();
              select_data.value = [];
              document.getElementById("input-file").value = null;
              swal({
                icon: "success",
                title: response.message,
                timer: 1500
              })
            } else {
              swal({
                icon: "warning",
                title: response.message,
                timer: 1500
              })
            }
          })
        } else {
          toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000, group: 'bl' });
        }
      })
    } else {
      toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select data in table', life: 2000, group: 'bl' });
    }
  } else {
    toast.add({ severity: 'error', summary: 'Warning', detail: 'Only PDF File Allowed.', life: 2000, group: 'bl' });
  }
}

const filterPartNumber = computed(() => {
  return attachmentsStore.getAttachment.filter((v) =>
    v.part_number == attachmentsStore.part_number_select.value
  );
})

const clearFile = () => {
  document.getElementById('input-file').value= null;
  ctable.value.unSelect();
  select_data.value = []; 
}
</script>
