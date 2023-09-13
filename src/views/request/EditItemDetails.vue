<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono max-lg:text-[20px]">
          <font-awesome-icon class="h-6 w-6 " icon="eraser" />
          Edit Item Details
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
            <c-select
              class="text-center rounded-md h-[2.8rem] w-[18rem] border-2 border-gray-600 hover:border-blue-300 outline-green-600"
              :options="code_part_number ? code : part_number"
              v-model="editItemDetailsStore.part_number_select"></c-select>
          </div> -->
          <div class="relative flex">
            <i class="h-full
              z-50
              text-gray-400
              top-[2px]
              py-1
              px-3
              rounded
              absolute"><font-awesome-icon
                icon="magnifying-glass"></font-awesome-icon></i>
            <input
              class="w-[13rem]
              text-center
              p-1
              border-2
              rounded-l-md
              h-[2.5rem]
              border-gray-600
              hover:border-red-500
              outline-green-600
              lg:w-[13rem]
              min-[100px]:w-[10rem]"
              v-model="editItemDetailsStore.search_filter" />
            <button class="flex
              justify-center
              items-center
              h-[2.5rem]
              lg:w-[5rem]
              min-[100px]:w-[3rem]
              bg-gray-700
              text-white
              py-1
              px-3
              rounded-r-md
              font-bold
              lg:text-[16px]
              min-[100px]:text-[13px]">
              <b>Search</b>
            </button>
          </div>
        </div>
      </div>
      <div class="h-[80vh] w-full mt-3 overflow-y-scroll">
        <c-table :items="editItemDetailsStore.getEditItemDetails" :filter="editItemDetailsStore.search_filter"
          class="border-solid border-2 border-[#A10E13]" :fields="editItemDetailsStore.getEditItemDetailsFields"
          :thStyle="'bg-[#A10E13] text-white p-2 text-[13px] border-2 border-solid border-red-900'">
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(action)="data">
            <div class="flex justify-center gap-1 p-1">
              <button class="h-8 w-9 rounded bg-orange-400 text-white border-2 border-orange-700 hover:bg-orange-500"
                @click="openModal(data.item)" data-open-modal v-tooltip.top="'Edit Request'">
                <font-awesome-icon icon="pen"></font-awesome-icon>
              </button>
              <button class="h-8 w-9 rounded bg-red-500 border-2 border-red-900 hover:bg-red-800 text-white"
                v-tooltip.top="'Delete Request'" @click="deleteRequest(data.item)">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </template>
        </c-table>
      </div>
    </div>
    <dialog ref="edit_item" class="p-0 rounded transform duration-300 -translate-y-2 border-2 border-[#A10E13]">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span><font-awesome-icon icon="pen" /><label class="ml-2">Edit Item Modal</label></span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="edit_item.close()">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <form class="grid grid-cols-3" method="post" @submit.prevent="submitUpdateAgreementList">
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Trial No.
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.trial_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Date
              <input type="date" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.request_date" />
            </label>
            <label class="flex flex-col gap-2">
              Additional Request Qty Date
              <input type="date" class="w-full text-center border-2 rounded p-1 hover:border-blue-300 outline-green-600"
                v-model="editItemDetailsStore.editItemForm.additional_request_date" />
            </label>
            <label class="flex flex-col gap-2">
              TRI No.
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.tri_number" required />
            </label>
            <label class="flex flex-col gap-2">
              TRI Quantity
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.tri_quantity" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Person
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.request_person" required />
            </label>
            <label class="flex flex-col gap-2">
              Superior Approval
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.supperior_approval" required />
            </label>
          </div>
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Supplier
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.supplier_name" required />
            </label>
            <label class="flex flex-col gap-2">
              Part Number
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.part_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Sub Part Number
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.sub_part_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Revision
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.revision" required />
            </label>
            <label class="flex flex-col gap-2">
              Coordinates
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.coordinates" required />
            </label>
            <label class="flex flex-col gap-2">
              Dimension
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.dimension" required />
            </label>
            <label class="flex flex-col gap-2">
              Actual Value
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.actual_value" required />
            </label>
          </div>
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Critical Parts
              <!-- <c-select ref="select_critical_parts" v-model="editItemDetailsStore.editItemForm.critical_parts"
                :options="critical_parts_options" class="text-center"></c-select> -->
              <select class="h-[2.3rem] hover:border-blue-300 outline-green-600 border-2 rounded text-center"
                v-model="editItemDetailsStore.editItemForm.critical_parts" required>
                <option value="null" disabled>Select Critical Parts</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              Critical Dimension
              <!-- <c-select ref="select_critical_dimension" v-model="editItemDetailsStore.editItemForm.critical_dimension"
                :options="critical_dimension_options" class="text-center"></c-select> -->
              <select class="h-[2.3rem] hover:border-blue-300 outline-green-600 border-2 rounded text-center"
                v-model="editItemDetailsStore.editItemForm.critical_dimension" required>
                <option value="null" disabled>Select Critical Dimension</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              Kind of Request
              <!-- <c-select ref="select_kind_request" v-model="editItemDetailsStore.editItemForm.kind_request"
                :options="kind_request_options" class="text-center"></c-select> -->
              <select class="h-[2.3rem] hover:border-blue-300 outline-green-600 border-2 rounded text-center"
                v-model="editItemDetailsStore.editItemForm.kind_request" required>
                <option value="null" disabled>Select Kind of Request</option>
                <option value="LSA Request">LSA Request</option>
                <option value="Hinsei Request">Hinsei Request</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              Request Value
              <textarea style="resize: none"
                class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center h-[6.5rem]"
                v-model="editItemDetailsStore.editItemForm.request_value" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Quantity
              <input type="text" class="w-full border-2 rounded p-1 hover:border-blue-300 outline-green-600 text-center"
                v-model="editItemDetailsStore.editItemForm.request_quantity" required />
            </label>
            <div class="flex justify-center items-center mt-8 gap-2">
              <button type="submit" class="bg-[#A10E13] text-white p-1 w-[7rem] rounded">
                Enter
              </button>
              <button type="button" @click="editItemDetailsStore.setClear" class="bg-gray-700 text-white p-1 w-[7rem] rounded">
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
    <Toast position="bottom-right" group="bl"></Toast>
  </div>
</template>
<script setup>
import { ref, onMounted, inject, computed, watch } from "vue";
import CTable from "@/components/Datatable.vue";
import CSelect from "@/components/CSelect.vue";
import { useEditItemDetailsStore } from "@/modules/request/edititemdetails";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading()
const editItemDetailsStore = useEditItemDetailsStore();
const toast = useToast();
const swal = inject("$swal");
const part_number = ref([]);
const code = ref([]);
const edit_item = ref(null);
const code_part_number = ref(false);

onMounted(() => {
  editItemDetailsStore.setLoadPartNumber().then((response) => {
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
  editItemDetailsStore.setAgreementListCode()
})

// const filterPartNumber = computed(() => {
//   if (!code_part_number.value) {
//     return editItemDetailsStore.getEditItemDetails.filter((v) =>
//       v.part_number == editItemDetailsStore.part_number_select.value
//     );
//   } else {
//     return editItemDetailsStore.getEditItemDetails.filter((v) =>
//       v.code == editItemDetailsStore.part_number_select.value
//     );
//   }
// })

const openModal = (data) => {
  edit_item.value.showModal()
  editItemDetailsStore.editItemForm = {
    id: data.agreement_id_pk,
    trial_number: data.trial_number,
    request_date: data.request_date,
    additional_request_date: data.additional_request_qty_date,
    tri_number: data.tri_number,
    tri_quantity: data.tri_quantity,
    request_person: data.request_person,
    supperior_approval: data.superior_approval,
    supplier_name: data.supplier_name,
    part_number: data.part_number,
    sub_part_number: data.sub_part_number,
    revision: data.revision,
    coordinates: data.coordinates,
    dimension: data.dimension,
    actual_value: data.actual_value,
    critical_dimension: data.critical_dimension,
    critical_parts: data.critical_parts,
    kind_request: data.request_type,
    request_value: data.request_value,
    request_quantity: data.request_quantity,
    unit_id: data.unit_id
  }
}
const submitUpdateAgreementList = () => {
  edit_item.value.close()
  swal({
    icon: "question",
    title: "Update this request?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show()
      setTimeout(() => {
        editItemDetailsStore.setUpdateAgreementList().then((response) => {
          if (response.status === "success") {
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

const deleteRequest = (data) => {
  // console.log(data)
  swal({
    icon: "question",
    title: "Delete this request?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show()
      setTimeout(() => {
        editItemDetailsStore.setDeleteAgreementList(data).then((response) => {
          if (response.status === "success") {
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
</script>
