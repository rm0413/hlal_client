<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label
          class="
            text-[24px]
            tracking-widest
            font-bold
            text-gray-600
            font-mono
            max-lg:text-[20px]
          "
        >
          <font-awesome-icon
            class="h-6 w-6 text-black"
            icon="magnifying-glass-plus"
          />
          Inspection Data
        </label>
      </div>
      <div class="flex justify-between">
        <div>
          <button
            @click="selectAll"
            class="
              bg-[#A10E13]
              text-white
              rounded
              justify-center
              items-center
              mt-1
              h-[2.5rem]
              w-[10rem]
              p-2
            "
          >
            Select All
          </button>
        </div>
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
            <CSelect @change="selectPartNumber"
              class="text-center p-1 border-2 rounded-md h-[2.8rem] border-gray-600 hover:border-blue-300 outline-green-600"
              :options="code_part_number ? code : part_number" v-model="inspectionDataStore.part_number_select"></CSelect>
          </div> -->
          <div class="relative flex">
            <i
              class="
                h-full
                z-50
                text-gray-400
                top-[2px]
                py-1
                px-3
                rounded
                absolute
              "
              ><font-awesome-icon icon="magnifying-glass"></font-awesome-icon
            ></i>
            <input
              class="
                w-[13rem]
                text-center
                p-1
                border-2
                rounded-l-md
                h-[2.5rem]
                border-gray-600
                hover:border-red-500
                outline-green-600
                lg:w-[13rem]
                min-[100px]:w-[10rem]
              "
              v-model="inspectionDataStore.search_filter"
            />
            <button
              class="
                flex
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
                min-[100px]:text-[13px]
              "
            >
              <b>Search</b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        h-[81vh]
        w-full
        grid grid-cols-9
        min-[100px]:overflow-y-scroll
        lg:overflow-y-hidden
        gap-2
      "
    >
      <div
        class="
          lg:col-span-7
          min-[100px]:col-span-9
          flex flex-col
          mt-2
          lg:h-[81vh]
          min-[100px]:h-[40vh]
          overflow-y-scroll
        "
      >
        <c-table
          :fields="inspectionDataStore.getInspectionDataFields"
          :items="inspectionDataStore.getInspectionData"
          :thStyle="'bg-[#A10E13] p-2 text-white border-2 border-solid border-red-900'"
          :filter="inspectionDataStore.search_filter"
        >
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(selected)="data">
            <input
              type="checkbox"
              :value="JSON.stringify(data.item)"
              v-model="select_item"
              id="cb_data"
              class="h-5 w-5"
              v-if="data.item.cpk_data !== null"
              hidden
            />
            <input
              type="checkbox"
              :value="JSON.stringify(data.item)"
              v-model="select_item"
              id="cb_data"
              class="h-5 w-5"
              v-else
            />
          </template>
          <template #cell(action)="data">
            <button
              v-tooltip.top="'Edit Cpk Data'"
              class="
                h-8
                w-9
                rounded
                bg-orange-400
                text-white
                border-2 border-orange-700
                hover:bg-orange-500
              "
              @click="editCpkData(data.item)"
              v-if="data.item.cpk_data !== null"
            >
              <font-awesome-icon icon="pen"></font-awesome-icon>
            </button>
            <button
              v-tooltip.top="'Edit Cpk Data'"
              class="
                h-8
                w-9
                rounded
                bg-orange-400
                text-white
                border-2 border-orange-700
                hover:bg-orange-500
              "
              @click="editCpkData(data.item)"
              hidden
              v-else
            >
              <font-awesome-icon icon="pen"></font-awesome-icon>
            </button>
          </template>
        </c-table>
      </div>
      <div
        class="
          lg:col-span-2
          min-[100px]:col-span-9
          lg:h-[55vh]
          min-[100px]:h-[35vh] min-[100px]:overflow-y-scroll
          flex flex-col
          mt-2
          gap-2
          px-10
          bg-gray-100
          rounded
          shadow-md
        "
      >
        <form method="post" @submit.prevent="submitInspectionData">
          <label
            class="
              flex flex-col
              items-center
              lg:text-[16px]
              min-[100px]:text-[14px]
            "
          >
            <i class="text-black">100% of Inspection Data or CPK Data</i>
            <textarea
              style="resize: none"
              class="
                border-2
                rounded
                w-full
                lg:h-[10rem]
                min-[100px]:h-[5rem]
                text-center
                border-gray-600
                hover:border-blue-300
                outline-green-600
              "
              v-model="inspectionDataStore.inspectionDataForm.cpk_data"
              required
            ></textarea>
          </label>
          <label
            class="
              flex flex-col
              items-center
              lg:text-[16px]
              min-[100px]:text-[14px]
            "
          >
            <i class="text-black">Inspection after Rework</i>
            <input
              type="text"
              class="
                border-2
                rounded
                w-full
                lg:h-[3rem]
                min-[100px]:h-[2rem]
                text-center
                border-gray-600
                hover:border-blue-300
                outline-green-600
              "
              v-model="inspectionDataStore.inspectionDataForm.inspection_rework"
            />
          </label>
          <label
            class="
              flex flex-col
              items-center
              lg:text-[16px]
              min-[100px]:text-[14px]
            "
          >
            <i class="text-black">Revised Date of IGM</i>
            <input
              type="date"
              class="
                border-2
                rounded
                w-full
                lg:h-[3rem]
                min-[100px]:h-[2rem]
                text-center
                border-gray-600
                hover:border-blue-300
                outline-green-600
              "
              v-model="inspectionDataStore.inspectionDataForm.revised_date"
              required
            />
          </label>
          <label
            class="
              flex flex-col
              items-center
              lg:text-[16px]
              min-[100px]:text-[14px]
            "
          >
            <i class="text-black">Sent Date of IGM</i>
            <input
              type="date"
              class="
                border-2
                rounded
                w-full
                lg:h-[3rem]
                min-[100px]:h-[2rem]
                text-center
                border-gray-600
                hover:border-blue-300
                outline-green-600
              "
              v-model="inspectionDataStore.inspectionDataForm.send_date"
              required
            />
          </label>
          <div class="flex lg:flex-col min-[100px]:flex-row lg:gap-0 min-[100px]:gap-2">
            <button
              type="submit"
              v-if="!inspectionDataStore.onEdit"
              class="
                flex
                gap-2
                bg-red-500
                border-2 border-red-900
                hover:bg-red-600
                p-3
                text-white
                rounded
                justify-center
                items-center
                w-full
                mt-2
              "
            >
              <font-awesome-icon icon="floppy-disk"></font-awesome-icon
              ><b>SAVE</b>
            </button>
            <button
              type="button"
              v-else
              @click="updateInspectionData"
              class="
                flex
                gap-2
                bg-yellow-400
                p-3
                hover:bg-yellow-200
                text-black
                rounded
                justify-center
                items-center
                w-full
                mt-2
                border-2 border-yellow-600
              "
            >
              <font-awesome-icon icon="floppy-disk"></font-awesome-icon>Update
            </button>
            <button
              type="button"
              @click="clearInputs"
              class="
                flex
                gap-2
                bg-gray-600
                hover:bg-gray-500
                p-3
                text-white
                rounded
                justify-center
                items-center
                w-full
                mt-2
                border-2 border-gray-800
              "
            >
              <font-awesome-icon icon="eraser" class="h-5 w-5" /><b>CLEAR</b>
            </button>
          </div>
        </form>
      </div>
    </div>
    <Toast position="bottom-right" group="bl"></Toast>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, computed } from "vue";
import CTable from "@/components/Datatable.vue";
import CSelect from "@/components/CSelect.vue";
import { useInspectionDataStore } from "@/modules/request/inspectiondata";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const inspectionDataStore = useInspectionDataStore();
const swal = inject("$swal");
const toast = useToast();
const part_number = ref([]);
const code = ref([]);
const code_part_number = ref(false);
const select_item = ref([]);

onMounted(() => {
  // inspectionDataStore.setShowInspectionAnswer()
  inspectionDataStore.setInspectionDataRequest();
  inspectionDataStore.setLoadPartNumber().then((response) => {
    response.data.part_number.forEach((v) => {
      part_number.value.push({
        text: v,
        value: v,
      });
    });
    response.data.code.forEach((v) => {
      code.value.push({
        text: v,
        value: v,
      });
    });
  });
});

const selectPartNumber = () => {
  select_item.value = [];
  clearInputs();
};

const selectAll = () => {
  var selected_checkbox = document.querySelectorAll("input[type='checkbox']");
  if (
    select_item.value.length === inspectionDataStore.getInspectionData.length
  ) {
    selected_checkbox.forEach((v) => {
      v.checked = false;
    });
    select_item.value = [];
  } else {
    selected_checkbox.forEach((v) => {
      if (!v.checked) {
        v.checked = true;
        select_item.value.push(v.value);
      }
    });
  }
};

const submitInspectionData = () => {
  swal({
    icon: "question",
    title: "Add Inspection Data?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        inspectionDataStore
          .setInsertInspectionData(select_item.value)
          .then((response) => {
            if (response.status === "success") {
              clearInputs();
              loader.hide();
              swal({
                icon: "success",
                title: response.message,
                timer: 1500,
              });
            } else {
              loader.hide();
              Object.keys(response.error).forEach((key) => {
                toast.add({
                  severity: "warn",
                  summary: "Warning",
                  detail: response.error[key][0],
                  life: 2000,
                  group: "bl",
                });
              });
            }
          });
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled",
        life: 2000,
        group: "bl",
      });
    }
  });
};

const editCpkData = (data) => {
  inspectionDataStore.onEdit = true;
  inspectionDataStore.inspectionDataForm = {
    id: data.inspection_id,
    agreement_id_pk: data.agreement_request_id_fk,
    cpk_data: data.cpk_data,
    inspection_rework: data.inspection_after_rework,
    revised_date: data.revised_date_igm,
    send_date: data.sent_date_igm,
  };
};

const clearInputs = () => {
  inspectionDataStore.inspectionDataForm = {
    cpk_data: null,
    inspection_rework: null,
    revised_date: null,
    send_date: null,
  };
  inspectionDataStore.onEdit = false;
  select_item.value = [];
};

const updateInspectionData = () => {
  swal({
    icon: "question",
    title: "Update Inspection Data?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        inspectionDataStore.setUpdateInspectionData().then((response) => {
          if (response.status === "success") {
            clearInputs();
            loader.hide();
            swal({
              icon: "success",
              title: response.message,
              timer: 1500,
            });
          } else {
            loader.hide();
            Object.keys(response.error).forEach((key) => {
              toast.add({
                severity: "error",
                summary: "Warning",
                detail: response.error[key][0],
                life: 5000,
                group: "bl",
              });
            });
          }
        });
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled.",
        life: 2000,
        group: "bl",
      });
    }
  });
};

// const filterPartNumber = computed(() => {
//   if (!code_part_number.value) {
//     return inspectionDataStore.getInspectionData.filter((v) =>
//       v.part_number == inspectionDataStore.part_number_select.value
//     );
//   } else {
//     return inspectionDataStore.getInspectionData.filter((v) =>
//       v.code == inspectionDataStore.part_number_select.value
//     );
//   }
// })
</script>
