<template>
  <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
    <div class="lg:col-span-7 min-[100px]:col-span-9 h-full flex flex-col">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="file-lines" /> New Request
        </label>
        <div class="flex gap-2 mr-10">
          <div class="flex flex-row">
            <select class="text-center p-1 border-2 rounded w-[12rem] rounded-l-md" />
            <button @click="openModal('new_unit')"
              class="h-full bg-[#A10E13] text-white py-1 px-3 rounded-r-md hover:bg-red-600">
              <font-awesome-icon icon="plus-square"></font-awesome-icon>
              New Unit
            </button>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input class="text-center p-1 border-2 rounded-l-md" />
            <button @click="openModal('search')" class="h-full bg-gray-400 text-white py-1 px-3 rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </div>
      <form class="grid grid-cols-3" action="">
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Trial No.
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Request Date
            <input type="date" class="w-full text-center border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Additional Request Qty Date
            <input type="date" class="w-full text-center border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            TRI No.
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            TRI Quantity
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Request Person
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Superior Approval
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Supplier
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Part Number
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Sub Part Number
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Revision
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Coordinates
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Dimension
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Actual Value
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Critical Parts
            <select class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Critical Dimension
            <select class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Kind of Request
            <select class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <label class="flex flex-col gap-2">
            Request Value
            <textarea style="resize: none" class="w-full border-2 rounded p-1 hover:border-blue-300 h-[6.5rem]" />
          </label>
          <label class="flex flex-col gap-2">
            Request Quantity
            <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300" />
          </label>
          <div class="flex justify-center items-center mt-8 gap-2">
            <button type="submit" class="bg-[#A10E13] text-white p-1 w-[7rem] rounded">
              Enter
            </button>
            <button type="button" class="bg-gray-700 text-white p-1 w-[7rem] rounded">
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
    <dialog ref="view_items" class="p-0 rounded transform duration-300 -translate-y-5">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span>View Item Details</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('view_items')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="flex p-5">
          <CTable :fields="newRequestStore.getViewItemDetailsFields" :items="newRequestStore.getAgreementList">
            <template #cell(#)="data">
              <div class="flex items-center justify-center">
                {{ data.index + 1 }}
              </div>
            </template>
            <template #cell(selected)="data">
              <div class="flex items-center justify-center">
                <input type="checkbox" name="chk" id="chk">
              </div>
            </template>
          </CTable>
        </div>
        <button class="p-3 bg-[#A10E13] text-white hover:bg-red-600">Generate</button>
      </div>
    </dialog>
    <!-- New Unit -->
    <dialog ref="new_unit" class="p-0 rounded transform duration-300 -translate-y-5">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span>Create New Unit</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('new_unit')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <form method="post" @submit.prevent="submitUnit">
          <div class="flex p-5">
            <label class="flex flex-col">
              <span>Name of Unit</span>
              <input class="w-[20rem] h-10 border-2 p-2 hover:border-red-600 rounded"
                v-model="newRequestStore.unitForm.unit_name" required />
            </label>
          </div>
          <button type="submit" class="p-3 bg-[#A10E13] text-white hover:bg-red-600 w-full">Save</button>
        </form>
        <button @click="newRequestStore.setClearUnit"
          class="p-3 bg-gray-600 text-white hover:bg-gray-500 w-full">Clear</button>
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
          <c-table :fields="newRequestStore.view_item_details_fields">
          </c-table>
        </div>
        <button class="p-3 bg-[#A10E13] text-white hover:bg-red-600">Add</button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import FileUploader from "@/components/FileUploader.vue";
import CTable from '@/components/Datatable.vue'
import { useNewRequestStore } from "@/modules/request/newrequest";
import { ref, onMounted, inject } from "vue";

const swal = inject("$swal");
const newRequestStore = useNewRequestStore();
const multiple_input = ref(null);
const view_items = ref(null);
const new_unit = ref(null)
const search = ref(null)

const openModal = (modal) => {
  if (modal === "multiple_input") {
    multiple_input.value.showModal();
    multiple_input.value.classList.remove("-translate-y-5");
  } else if (modal === "view_items") {
    view_items.value.showModal();
    view_items.value.classList.remove("-translate-y-5");
  } else if (modal === 'new_unit') {
    new_unit.value.showModal()
    new_unit.value.classList.remove("-translate-y-5");
  } else if (modal === 'search') {
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
  } else if (modal === 'new_unit') {
    new_unit.value.close()
    newRequestStore.setClearUnit()
    new_unit.value.classList.add("-translate-y-5");
  } else if (modal === 'search') {
    search.value.close()
    search.value.classList.add("-translate-y-5")
  }
};
const submitUnit = () => {
  new_unit.value.close()
  swal({
    icon: "question",
    title: "Are you sure to add this unit?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((response) => {
    if (response.value === true) {
      // console.log(true)
      newRequestStore.setInsertUnits().then((response) => {
        if (response.status === "success") {
          swal({
            icon: "successs",
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
}

onMounted(() => {
  newRequestStore.setAgreementList().then(() => {
    // console.log(response)
  })
})
</script>
