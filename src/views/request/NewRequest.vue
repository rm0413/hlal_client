<template>
  <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
    <div class="lg:col-span-7 min-[100px]:col-span-9 h-full flex flex-col">
      <form action="post" @submit.prevent="submitAgreementList">
        <div class="flex justify-between">
          <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
            <font-awesome-icon class="h-6 w-6 text-black" icon="file-lines" /> New Request
          </label>
          <div class="flex gap-2 mr-10">
            <div class="flex flex-row w-[18rem]">
              <p
                class="flex flex-col text-white bg-[#A10E13] h-[2.5rem] w-[5rem] items-center justify-center rounded-l-md rounded-r-none">
                <b>Unit</b>
              </p>
              <!-- <c-select ref="select_unit" class="h-[2.5rem] text-center" :options="units"
              v-model="newRequestStore.agreementForm.unit"></c-select> -->
              <select
                class="h-[2.5rem] border-2 rounded text-center w-[16rem] rounded-l-none rounded-r-md border-gray-600 hover:border-blue-300 outline-green-600"
                v-model="newRequestStore.agreementForm.unit" required>
                <option value="" disabled>Select Unit</option>
                <option v-for="(i, key) in units" :key="key" :value="i.unit_id">{{ i.text }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Trial No.
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.trial_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Date
              <input type="date"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.request_date" />
            </label>
            <label class="flex flex-col gap-2">
              Additional Request Qty Date
              <input type="date"
                class="w-full text-center h-[2.5rem]  outline-green-600 border-2 rounded p-1 hover:border-blue-300 border-gray-600"
                v-model="newRequestStore.agreementForm.additional_request_date" />
            </label>
            <label class="flex flex-col gap-2">
              TRI No.
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.tri_number" required />
            </label>
            <label class="flex flex-col gap-2">
              TRI Quantity
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.tri_quantity" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Person
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.request_person" required />
            </label>
            <label class="flex flex-col gap-2">
              Superior Approval
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.supperior_approval" required />
            </label>
          </div>
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Supplier
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.supplier_name" required />
            </label>
            <label class="flex flex-col gap-2">
              Part Number
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.part_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Sub Part Number
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.sub_part_number" required />
            </label>
            <label class="flex flex-col gap-2">
              Revision
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.revision" required />
            </label>
            <label class="flex flex-col gap-2">
              Coordinates
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.coordinates" required />
            </label>
            <label class="flex flex-col gap-2">
              Dimension
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.dimension" required />
            </label>
            <label class="flex flex-col gap-2">
              Actual Value
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.actual_value" required />
            </label>
          </div>
          <div class="col-span-1 p-10">
            <label class="flex flex-col gap-2">
              Critical Parts
              <select
                class="border-2 rounded text-center h-[2.5rem] hover:border-blue-300 border-gray-600 outline-green-600"
                v-model="newRequestStore.agreementForm.critical_parts" required>
                <option value="" disabled>Select Critical Parts</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <!-- <c-select ref="select_critical_parts" v-model="newRequestStore.agreementForm.critical_parts"
              :options="critical_parts_options" class="text-center"></c-select> -->
            </label>
            <label class="flex flex-col gap-2">
              Critical Dimension
              <!-- <c-select ref="select_critical_dimension" v-model="newRequestStore.agreementForm.critical_dimension"
              :options="critical_dimension_options" class="text-center"></c-select> -->
              <select
                class="border-2 rounded text-center h-[2.5rem] hover:border-blue-300 border-gray-600 outline-green-600"
                v-model="newRequestStore.agreementForm.critical_dimension" required>
                <option value="" disabled>Select Critical Dimension</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              Kind of Request
              <!-- <c-select ref="select_kind_request" v-model="newRequestStore.agreementForm.kind_request"
                :options="kind_request_options" class="text-center"></c-select> -->
              <select
                class="border-2 rounded text-center h-[2.5rem] hover:border-blue-300 border-gray-600 outline-green-600"
                v-model="newRequestStore.agreementForm.kind_request" required>
                <option value="" disabled>Select Kind of Request</option>
                <option value="LSA Request">LSA Request</option>
                <option value="Hinsei Request">Hinsei Request</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              Request Value
              <textarea style="resize: none"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[7rem] outline-green-600"
                v-model="newRequestStore.agreementForm.request_value" required />
            </label>
            <label class="flex flex-col gap-2">
              Request Quantity
              <input type="text"
                class="w-full border-2 rounded p-1 hover:border-blue-300 border-gray-600 text-center h-[2.5rem] outline-green-600"
                v-model="newRequestStore.agreementForm.request_quantity" required />
            </label>
            <div class="flex justify-center items-center mt-8 gap-2">
              <button type="submit"
                class="bg-red-500 border-2 border-red-900 text-white p-1 w-[10rem] h-[2.5rem] rounded hover:bg-red-600">
                <font-awesome-icon icon="arrow-turn-right" /> <b>ENTER</b>
              </button>
              <button type="button"
                class="bg-gray-500 text-white p-1 w-[10rem] h-[2.5rem] rounded hover:bg-gray-600 border-2 border-gray-800"
                @click="newRequestStore.setClearAgreementList">
                <font-awesome-icon icon="eraser" /> <b>CLEAR</b>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="lg:col-span-2 min-[100px]:col-span-9 h-full w-full flex flex-col">
      <div class="relative flex ml-9">
        <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
            icon="magnifying-glass"></font-awesome-icon></i>
        <input
          class="w-[15rem] text-center p-1 border-2 rounded-l-md h-[2.5rem] border-gray-600 hover:border-red-500 outline-green-600"
          v-model="newRequestStore.search_filter" />
        <button type="button" @click="openModal('search')"
          class="h-[2.5rem] w-[10rem] bg-gray-400 text-white py-1 px-3 rounded-r-md">
          <b>Search</b>
        </button>
      </div>
      <div class="flex flex-col rounded mt-[4.5rem] bg-gray-100 shadow-md h-[15vh] justify-center items-center w-full">
        <button @click="openModal('multiple_input')"
          class="w-[25rem] p-3 flex justify-center items-center bg-red-500 text-white rounded hover:bg-red-700 border-2 border-red-900"
          data-open-modal>
          <font-awesome-icon icon="file-import" class="h-5 w-5" />
          <p class="ml-3"><b>MULTIPLE INPUT</b></p>
        </button>
        <button @click="openModal('view_items')"
          class="w-[25rem] mt-2 p-3 flex justify-center items-center bg-green-500 text-white rounded hover:bg-green-600 border-2 border-green-800">
          <font-awesome-icon icon="file-lines" class="h-5 w-5" />
          <p class="ml-3"><b>VIEW ITEM DETAILS</b></p>
        </button>
      </div>
      <!-- <div class="flex flex-col rounded mt-[1rem] shadow-lg h-[35vh] w-full">
        <span class="font-bold p-2">NOTE: <i class=" text-red-600"> Please make sure the excel file to be uploaded doesn't
            contain the following: </i>
          <li>Merge cells</li>
          <li>Wrap text</li>
          <li>Space before inputting the text.</li>
          <span class="ml-5">(Please see below image.)</span>
          <img :src="logo" alt="" class="h-[13rem] w-full hover:scale-150 trasition duration-500 cursor-pointer" />
        </span>
      </div> -->
    </div>
    <!--Multiple Input-->
    <dialog ref="multiple_input" class="p-0 rounded transform duration-300 -translate-y-5 border-2 border-[#A10E13]">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <p><font-awesome-icon icon="file-import" class="h-5 w-5 mr-2" />Multiple Input</p>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('multiple_input')">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <form method="post" @submit.prevent="submitMultipleRequest">
          <div class="flex p-5">
            <!-- <FileUploader></FileUploader> -->
            <div class="flex flex-col items-center justify-center mt-2 border-2 border-black rounded-xl border-dashed">
              <input id="input-file" type="file" accept=".xlsx" @change="uploadFile" :draggable="true" class="cursor-pointer text-sm text-grey-500 w-[25rem] h-[15rem] mt-10
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700" required />
              <span class="file-msg">or drag and drop Excel file here</span>
            </div>
          </div>
          <button type="button" class="p-3 bg-green-600 text-white hover:bg-green-500 w-full" @click="downloadFormat">
            <font-awesome-icon icon="download" /> Download Format
          </button>
          <button type="submit" class="w-full p-3 bg-[#A10E13] text-white hover:bg-red-600"><font-awesome-icon
              icon="cloud-arrow-up" />
            Upload</button>
        </form>
      </div>
    </dialog>
    <!--View Items-->
    <dialog ref="view_items" class="p-0 rounded transform duration-300 -translate-y-5 w-full border-2 border-[#A10E13]">
      <div class="flex flex-col h-[75vh]">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <p><font-awesome-icon icon="file-lines" class="h-5 w-5 mr-2" />View Item Details</p>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('view_items')">
            <font-awesome-icon icon="xmark" />
          </button>
        </div>
        <div class="flex flex-row ml-2 mb-1">
          <button @click="selectAll"
            class="bg-[#A10E13] text-white rounded justify-center items-center mt-1 h-[2.5rem] w-[10rem] p-2">
            Select All
          </button>
        </div>
        <div class="h-[65vh] overflow-y-scroll mx-2">
          <CTable :filter="newRequestStore.search_filter" :fields="newRequestStore.getViewItemDetailsFields"
            :items="newRequestStore.getNoCode"
            :thStyle="'bg-[#A10E13] p-2 text-white border-2 border-solid border-red-900'">
            <template #cell(#)="data">
              <div class="flex items-center justify-center">
                {{ data.index + 1 }}
              </div>
            </template>
            <template #cell(selected)="data">
              <input type="checkbox" :value="JSON.stringify(data.item)" v-model="select_item" id="cb_data"
                class="h-5 w-5">
            </template>
          </CTable>
        </div>
        <button :disabled="select_item.length === 0"
          class="mt-6 bg-[#A10E13] hover:bg-red-600 w-full h-[2.8rem] text-white tracking-widest font-serif text-[20px]"
          @click="generateCode">
          <font-awesome-icon icon="floppy-disk" class="h-5 w-5" /> GENERATE</button>
      </div>
    </dialog>
    <!--Search-->
    <dialog ref="search" class="p-0 rounded transform duration-300 -translate-y-5 w-full border-2 border-[#A10E13]">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span><font-awesome-icon icon="magnifying-glass" class="h-5 w-5 mr-2" />Search</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="closeModal('search')">
            <font-awesome-icon icon="xmark" />
          </button>
        </div>
        <div class="flex overflow-y-scroll h-[73vh] mx-1">
          <CTable :filter="newRequestStore.search_filter" :fields="newRequestStore.search_fields"
            :items="newRequestStore.getAgreementList"
            :thStyle="'bg-[#A10E13] text-white p-2 text-[13px] border-2 border-solid border-red-900'">
            <template #cell(#)="data">
              <div class="flex items-center justify-center">
                {{ data.index + 1 }}
              </div>
            </template>
            <template #cell(action)="data">
              <button type="button" class="bg-[#A10E13] text-white hover:bg-red-600 rounded w-[4rem] h-[2rem]"
                @click="autoAdd(data.item)">
                ADD
              </button>
            </template>
          </CTable>
        </div>
      </div>
    </dialog>
    <Toast position="bottom-right"></Toast>
    <Toast position="bottom-left" group="bl"></Toast>
  </div>
</template>

<script setup>
import CTable from "@/components/Datatable.vue";
import { useNewRequestStore } from "@/modules/request/newrequest";
import { ref, onMounted, inject } from "vue";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";
import { useUnitManagementStore } from "@/modules/management/unitManagement";
import logo from "@/assets/images/space.png"

const unitManagementStore = useUnitManagementStore();
const $loading = useLoading()
const toast = useToast();
const swal = inject("$swal");
const newRequestStore = useNewRequestStore();
const multiple_input = ref(null);
const view_items = ref(null);
const search = ref(null);
const units = ref([]);
const select_item = ref([]); //view-item-details check box

const autoAdd = (data) => {
  search.value.close();
  newRequestStore.agreementForm = {
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
    critical_parts: data.critical_parts,
    critical_dimension: data.critical_dimension,
    kind_request: data.request_type,
    request_value: data.request_value,
    request_quantity: data.request_quantity,
    unit: data.unit_id
  }
};

const generateCode = () => {
  view_items.value.close();
  swal({
    icon: "question",
    title: "Generate Code?",
    text: "Please make sure. Cannot be undone",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response => {
    if (response.value === true) {
      var payload = {
        agreement_request_id: [],
        emp_id: sessionStorage.getItem('employee_id')
      };
      const datastorage = []
      select_item.value.forEach(v => {
        datastorage.push(JSON.parse(v))
      })
      datastorage.forEach((v) => {
        payload.agreement_request_id.push(v.agreement_id_pk);
      });
      const loader = $loading.show()
      setTimeout(() => {
        newRequestStore.setGenerateCode(payload).then((response) => {
          if (response.status === "success") {
            newRequestStore.setShowGenerateCode(response.data.id).then((response) => {
              if (response.status === "success") {
                loader.hide()
                swal({
                  icon: "success",
                  title: response.data[0].code,
                  text: "Your code has been generated. An email notification will be sent.",
                });
              } else {
                loader.hide()
                toast.add({ severity: 'error', summary: 'Warning', detail: response.message, life: 2000, group: 'bl' });
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
                group: 'bl'
              });
            })
          }
        });
      })
    } else {
      view_items.value.showModal();
      toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled', life: 2000, group: 'bl' });
    }
  }))
};

const submitAgreementList = () => {
  swal({
    icon: "question",
    title: "Add this request?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show()
      setTimeout(() => {
        newRequestStore.setInsertAgreementList().then((response) => {
          if (response.status === "success") {
            newRequestStore.search_filter = "";
            loader.hide()
            swal({
              icon: response.status,
              title: response.message,
              timer: 2500,
            });
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
        });
      })
    }
  });
};

const openModal = (modal) => {
  if (modal === "multiple_input") {
    if (newRequestStore.agreementForm.unit !== null) {
      multiple_input.value.showModal();
      multiple_input.value.classList.remove("-translate-y-5");
    } else {
      toast.add({
        severity: "error",
        summary: "warning",
        detail: "Please select Unit.",
        life: 2000,
        group: "bl"
      });
    }
  } else if (modal === "view_items") {
    view_items.value.showModal();
    view_items.value.classList.remove("-translate-y-5");
  } else if (modal === "search") {
    if (newRequestStore.search_filter) {
      search.value.showModal();
      search.value.classList.remove("-translate-y-5");
    } else {
      toast.add({ severity: 'error', summary: 'Warning', detail: 'Please input data.', life: 2000 });
    }
  }
};

const closeModal = (modal) => {
  if (modal === "multiple_input") {
    multiple_input.value.close();
    multiple_input.value.classList.add("-translate-y-5");
  } else if (modal === "view_items") {
    view_items.value.close();
    view_items.value.classList.add("-translate-y-5");
  } else if (modal === "search") {
    search.value.close();
    search.value.classList.add("-translate-y-5");
  }
};

const loadUnits = () => {
  unitManagementStore.setUnits().then((response) => {
    units.value = [];
    response.forEach((v) => {
      units.value.push({
        text: v.unit_name,
        unit_id: v.unit_id,
      });
    });
  });
};

onMounted(() => {
  loadUnits();
  newRequestStore.setAgreementList();
  newRequestStore.setNoCodeAgreementList();
});

const downloadFormat = () => {
  multiple_input.value.close();
  swal({
    icon: "question",
    title: "Download Format?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      var unit_id = newRequestStore.agreementForm.unit
      newRequestStore.setShowUnit(unit_id).then((response) => {
        if(response.status === "success")
        {
          var unit_name = response.data[0].unit_name
          window.location.href = `http://10.164.58.62/hinsei/server/public/download-format/${unit_name}`;
        }
      })
    } else {
      multiple_input.value.showModal();
      toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000 });
    }
  })
}

const file = ref(null);
const employee_id = ref(sessionStorage.getItem("employee_id"))
const uploadFile = (event) => {
  file.value = event.target.files[0];
};

const submitMultipleRequest = () => {
  multiple_input.value.close();
  const formData = new FormData();
  formData.append('uploaded_file', file.value);
  formData.append('unit_id', newRequestStore.agreementForm.unit);
  formData.append('requestor_employee_id', employee_id.value);
  if (newRequestStore.agreementForm.unit !== null) {
    swal({
      icon: "question",
      title: "Upload File?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((response) => {
      if (response.value === true) {
        const loader = $loading.show()
        setTimeout(() => {
          newRequestStore.setUploadMultipleRequest(formData).then((response) => {
            if (response.status === "success") {
              document.getElementById("input-file").value = null
              multiple_input.value.close();
              loader.hide()
              swal({
                icon: response.status,
                title: response.message,
                timer: 1500
              })
            } else {
              loader.hide()
              // Object.keys(response.error).forEach((key) => {
              toast.add({
                severity: response.status,
                summary: "Warning",
                detail: response.message,
                life: 5000,
                group: 'bl'
              });
              // })
            }
          })
        })
      } else {
        multiple_input.value.showModal();
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000, group: 'bl' });
      }
    })
  } else {
    multiple_input.value.showModal();
    toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select Unit Name', life: 2000, group: 'bl' });
  }
}

const selectAll = () => {
  var selected_checkbox = document.querySelectorAll(
    "input[type='checkbox']"
  );
  if (select_item.value.length === newRequestStore.getNoCode.length) {
    selected_checkbox.forEach((v) => {
      v.checked = false
    })
    select_item.value = []
  } else {
    selected_checkbox.forEach((v) => {
      if (!v.checked) {
        v.checked = true
        select_item.value.push(v.value)
      }
    })
  }
}
</script>
