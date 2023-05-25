<template>
  <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
    <div class="lg:col-span-7 min-[100px]:col-span-9 h-full flex flex-col">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="file-lines" /> New Request
        </label>
        <div class="flex gap-2 mr-10">
          <div class="flex flex-row">
            <c-select class="h-[2.5rem] text-center w-[15rem]" :options="units"
              v-model="newRequestStore.agreementForm.unit"></c-select>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input class="text-center p-1 border-2 rounded-l-md h-[2.5rem]" v-model="newRequestStore.search_filter" />
            <button @click="openModal('search')" class="h-[2.5rem] bg-gray-400 text-white py-1 px-3 rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </div>
      <form class="grid grid-cols-3" action="post" @submit.prevent="submitAgreementList">
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Trial No.
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.trial_number" required />
          </label>
          <label class="flex flex-col gap-2">
            Request Date
            <input type="date" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.request_date" required />
          </label>
          <label class="flex flex-col gap-2">
            Additional Request Qty Date
            <input type="date" class="w-full text-center border-2 rounded p-1 hover:border-blue-300"
              v-model="newRequestStore.agreementForm.additional_request_date" required />
          </label>
          <label class="flex flex-col gap-2">
            TRI No.
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.tri_number" required />
          </label>
          <label class="flex flex-col gap-2">
            TRI Quantity
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.tri_quantity" required />
          </label>
          <label class="flex flex-col gap-2">
            Request Person
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.request_person" required />
          </label>
          <label class="flex flex-col gap-2">
            Superior Approval
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.supperior_approval" required />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Supplier
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.supplier_name" required />
          </label>
          <label class="flex flex-col gap-2">
            Part Number
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.part_number" required />
          </label>
          <label class="flex flex-col gap-2">
            Sub Part Number
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.sub_part_number" required />
          </label>
          <label class="flex flex-col gap-2">
            Revision
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.revision" required />
          </label>
          <label class="flex flex-col gap-2">
            Coordinates
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.coordinates" required />
          </label>
          <label class="flex flex-col gap-2">
            Dimension
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.dimension" required />
          </label>
          <label class="flex flex-col gap-2">
            Actual Value
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.actual_value" required />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Critical Parts
            <c-select v-model="newRequestStore.agreementForm.critical_parts" :options="critical_parts_options"
              class="text-center"></c-select>
          </label>
          <label class="flex flex-col gap-2">
            Critical Dimension
            <c-select v-model="newRequestStore.agreementForm.critical_dimension" :options="critical_dimension_options"
              class="text-center"></c-select>
          </label>
          <label class="flex flex-col gap-2">
            Kind of Request
            <c-select v-model="newRequestStore.agreementForm.kind_request" :options="kind_request_options"
              class="text-center"></c-select>
          </label>
          <label class="flex flex-col gap-2">
            Request Value
            <textarea style="resize: none" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center h-[6.5rem]"
              v-model="newRequestStore.agreementForm.request_value" required />
          </label>
          <label class="flex flex-col gap-2">
            Request Quantity
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 text-center"
              v-model="newRequestStore.agreementForm.request_quantity" required />
          </label>
          <div class="flex justify-center items-center mt-8 gap-2">
            <button type="submit" class="bg-[#A10E13] text-white p-1 w-[7rem] rounded">
              Enter
            </button>
            <button type="button" class="bg-gray-700 text-white p-1 w-[7rem] rounded"
              @click="newRequestStore.setClearAgreementList">
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2">
      <button @click="openModal('multiple_input')"
        class="w-full p-3 flex justify-center items-center bg-[#A10E13] text-white rounded hover:bg-red-600"
        data-open-modal>
        Multiple Input
      </button>
      <button @click="openModal('view_items')"
        class="w-full p-3 flex justify-center items-center bg-green-600 text-white rounded hover:bg-green-500">
        View Item Details
      </Button>
    </div>
    <!--Multiple Input-->
    <dialog ref="multiple_input" class="p-0 rounded transform duration-300 -translate-y-5">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span>Multiple Input</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('multiple_input')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="flex p-5">
          <FileUploader></FileUploader>
        </div>
        <button class="p-3 bg-green-600 text-white hover:bg-green-500">
          Download Format
        </button>
        <button class="p-3 bg-[#A10E13] text-white hover:bg-red-600">Save</button>
      </div>
    </dialog>
    <!--View Items-->
    <dialog ref="view_items" class="p-0 rounded transform duration-300 -translate-y-5 ">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span>View Item Details</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('view_items')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="flex p-5 max-h-[50vh] overflow-y-scroll">
          <CTable :isSelectable="true" @selectable="(data) => checkedData = data" :filter="newRequestStore.search_filter" :fields="newRequestStore.getViewItemDetailsFields"
            :items="newRequestStore.getAgreementList">
            <template #cell(#)="data">
              <div class="flex items-center justify-center">
                {{ data.index + 1 }}
              </div>
            </template>
          </CTable>
        </div>
        {{ checkedData }}
        <button class="p-3 bg-[#A10E13] text-white hover:bg-red-600">Generate</button>
      </div>
    </dialog>
    <!--Search-->
    <dialog ref="search" class="p-0 rounded transform duration-300 -translate-y-5">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span>Search</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('search')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="flex p-5 overflow-y-scroll">
          <c-table :filter="newRequestStore.search_filter" :fields="newRequestStore.search_fields"
            :items="newRequestStore.getAgreementList">
            <template #cell(#)="data">
              <div class="flex items-center justify-center">
                {{ data.index + 1 }}
              </div>
            </template>
            <template #cell(action)="data">
              <button type="button" class="bg-[#A10E13] text-white hover:bg-red-600 rounded w-[4rem] h-[2rem]" @click="autoAdd(data.item)">ADD</button>
            </template>
          </c-table>
        </div>
      </div>
    </dialog>
    <Toast />
  </div>
</template>

<script setup>
import FileUploader from "@/components/FileUploader.vue";
import CTable from '@/components/Datatable.vue'
import CSelect from '@/components/CSelect.vue'
import { useNewRequestStore } from "@/modules/request/newrequest";
import { ref, onMounted, inject } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const swal = inject("$swal");
const newRequestStore = useNewRequestStore();
const multiple_input = ref(null);
const view_items = ref(null);
const search = ref(null)
const units = ref([])
const checkedData = ref([]) //view-item-details check box


const critical_parts_options = ref(
  [
    {
      text: "YES",
      value: "YES"
    },
    {
      text: "NO",
      value: "NO"
    }
  ]
)
const critical_dimension_options = ref(
  [
    {
      text: "YES",
      value: "YES"
    },
    {
      text: "NO",
      value: "NO"
    }
  ]
)
const kind_request_options = ref(
  [
    {
      text: "LSA Request",
      value: "LSA Request"
    },
    {
      text: "Hinsei Request",
      value: "Hinsei Request"
    }
  ]
)
const autoAdd = (data) => {
  search.value.close()
  newRequestStore.setAutoAdd(data)

}

const submitAgreementList = () => {
  if (newRequestStore.agreementForm.unit && newRequestStore.agreementForm.critical_parts && newRequestStore.agreementForm.critical_dimension && newRequestStore.agreementForm.kind_request) {
    swal({
      icon: "question",
      title: "Are you sure to add this request?",
      text: "Please make sure before to proceed!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    }).then((response) => {
      if (response.value === true) {
        newRequestStore.setInsertAgreementList().then((response) => {
          if (response.status === "success") {
            newRequestStore.setAgreementList()
            swal({
              icon: "success",
              title: response.message,
              timer: 2500
            })
          } else {
            swal({
              icon: "warning",
              title: response.message,
              timer: 2500
            })
          }
        })
      }
    })
  } else {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Critical Parts/Critical Dimension/Kind of Request/ Unit Options', life: 3000 });
  }
}

const openModal = (modal) => {
  if (modal === "multiple_input") {
    multiple_input.value.showModal();
    multiple_input.value.classList.remove("-translate-y-5");
  } else if (modal === "view_items") {
    view_items.value.showModal();
    view_items.value.classList.remove("-translate-y-5");
  }else if (modal === 'search') {
    search.value.showModal()
    search.value.classList.remove("-translate-y-5")
  }
};

const closeModal = (modal) => {
  if (modal === "multiple_input") {
    multiple_input.value.close();
    multiple_input.value.classList.add("-translate-y-5");
  } else if (modal === "view_items") {
    view_items.value.close();
    view_items.value.classList.add("-translate-y-5");
  } else if (modal === 'search') {
    search.value.close()
    search.value.classList.add("-translate-y-5")
  }
};

const loadUnits = () => {
  newRequestStore.setUnits().then((response) => {
    // console.log(response)
    units.value = [];
    response.forEach((v) => {
      units.value.push({
        text: v.unit_name,
        unit_id: v.unit_id
      })
      console.log(units.value)
    })
  })
}

onMounted(() => {
  loadUnits()
  newRequestStore.setAgreementList()

})
</script>
