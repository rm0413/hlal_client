<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class=" flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="paperclip" />
          Attachments
        </label>
        <div class="flex">
          <!-- <div class="flex">
            <label class="flex flex-col items-center justify-center">Search by: </label>
            <div @click="code_part_number = true"
              :class="`${code_part_number ? 'bg-red-700 text-white' : 'bg-gray-300'} select-none cursor-pointer h-full border border-gray-600 py-1 px-3 rounded-l-md ml-3 flex flex-col justify-center items-center`">
              <b>Code</b>
            </div>
            <div @click="code_part_number = false"
              :class="`${code_part_number ? 'bg-gray-300 ' : 'bg-red-700 text-white '}cursor-pointer text-center select-none p-1 border rounded-r-md w-[8rem] border-gray-600 flex flex-col justify-center items-center`">
              <b>Part Number</b>
            </div>
          </div>
          <div>
            <CSelect @change="changeSelect"
              class="text-center p-1 border-2 rounded-md w-[18rem] h-[2.8rem] text-lg border-gray-600 hover:border-blue-300 outline-green-600"
              :options="code_part_number ? code : part_number" v-model="attachmentsStore.part_number_select"></CSelect>
          </div> -->
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input
              class="text-center p-1 border-2 rounded-l-md h-[2.8rem] border-gray-600 hover:border-blue-300 outline-green-600"
              v-model="attachmentsStore.search_filter" />
            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
              <b>Search</b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[85vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
      <div class="lg:col-span-2 min-[100px]:overflow-y-scroll h-[18vh] flex flex-col bg-gray-100 rounded shadow-md mt-1">
        <div class="flex justify-center items-center p-2 bg-[#A10E13] text-white rounded">
          Attachments
        </div>
        <form method="post" @submit.prevent="submitAttachment">
          <div class="flex justify-center items-center mt-2 border-2 border-black rounded w-full">
            <input id="input-file" type="file" accept=".pdf" @change="uploadFile" data-open-modal :disabled="select_item.length === 0" :draggable="true" class="cursor-pointer text-sm text-grey-500 bg-white w-full
            file:mr-5 file:py-2 file:px-6
            file:rounded file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700 rounded" required />
            <!-- <span class="file-msg">or drag and drop PDF file here</span> -->
          </div>
          <div class="flex items-center justify-center w-full gap-2 mt-3">
            <button :disabled="select_item.length === 0" class="w-[12rem] bg-red-500 hover:bg-red-600 text-white p-1 h-[3rem] rounded border-2 border-red-800"
              type="submit"><font-awesome-icon icon="floppy-disk" /> <b>SAVE</b></button>
            <button
              class="w-[12rem] bg-gray-500 hover:bg-gray-600 border-2 border-gray-800 text-white p-1 h-[3rem] rounded"
              @click="clearFile" type="button"><font-awesome-icon icon="eraser" /> <b>CLEAR</b></button>
          </div>
        </form>
      </div>
      <div class="lg:col-span-7 min-[100px]:col-span-9 h-[85vh] overflow-y-scroll mt-1">
        <CTable :filter="attachmentsStore.search_filter" :items="attachmentsStore.getAttachment"
          :fields="attachmentsStore.getAttachmentsFields"
          :thStyle="'bg-[#A10E13] p-2 text-white text-[13px] border-2 border-solid border-red-900'">
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(selected)="data">
            <input type="checkbox" :value="JSON.stringify(data.item)" v-model="select_item" id="cb_data" class="h-5 w-5">
          </template>
        </CTable>
      </div>
    </div>
    <Toast position="bottom-right"></Toast>
    <Toast position="bottom-right" group="bl"></Toast>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from "vue";
import CTable from "@/components/Datatable.vue"
import CSelect from "@/components/CSelect.vue"
import { useAttachmentsStore } from '@/modules/request/attachments'
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading()
const attachmentsStore = useAttachmentsStore()
const swal = inject("$swal");
const toast = useToast();
const part_number = ref([])
const code = ref([])
const code_part_number = ref(false);
const select_item = ref([])

onMounted(() => {
  attachmentsStore.setAgreementListCode()
  attachmentsStore.setLoadPartNumber().then((response) => {
    response.data.part_number.forEach((v) => {
      part_number.value.push({
        text: v,
        value: v
      })
    })
    response.data.code.forEach((v) => {
      code.value.push({
        text: v,
        value: v
      })
    })
  })
})

const changeSelect = () => {
  select_item.value = []
  clearFile()
}

const file = ref(null);
const uploadFile = (event) => {
  file.value = event.target.files[0];
};

const submitAttachment = () => {
    var payload = {
      agreement_request_id: [],
    };
    const data_storage = []
    select_item.value.forEach((v) => {
      data_storage.push(JSON.parse(v))
    })
    data_storage.forEach((v) => {
      payload.agreement_request_id.push(v.agreement_id_pk);
    });
    const formData = new FormData();
    formData.append('file_path_attachment', file.value);
    formData.append('emp_id', sessionStorage.getItem('employee_id'));
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
        const loader = $loading.show()
        setTimeout(() => {
          attachmentsStore.setInsertAttachment(formData).then((response) => {
            if (response.status === "success") {
              document.getElementById("input-file").value = null;
              loader.hide()
              swal({
                icon: "success",
                title: response.message,
                timer: 1500
              })
            } else {
              loader.hide()
              Object.keys(response.error).forEach((key) => {
                toast.add({
                  severity: "error",
                  summary: "Warning",
                  detail: response.error[key][0],
                  life: 5000,
                  group: 'bl'
                });
              })
            }
          })
        })
      } else {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000, group: 'bl' });
      }
    })
  }

// const filterPartNumber = computed(() => {
//   if (!code_part_number.value) {
//     return attachmentsStore.getAttachment.filter((v) =>
//       v.part_number == attachmentsStore.part_number_select.value
//     );
//   } else {
//     return attachmentsStore.getAttachment.filter((v) =>
//       v.code == attachmentsStore.part_number_select.value
//     );
//   }
// })

const clearFile = () => {
  document.getElementById('input-file').value = null;
  select_item.value = []
}
</script>
