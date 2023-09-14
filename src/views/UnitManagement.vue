<template>
  <div
    class="
      h-[89vh]
      w-full
      grid grid-cols-9
      min-[100px]:overflow-y-scroll
      lg:overflow-y-hidden
      gap-2
    "
  >
    <div
      class="
        lg:col-span-2
        min-[100px]:col-span-9
        lg:h-[89vh]
        min-[100px]:h-[28vh]
        flex flex-col
      "
    >
      <label
        class="
          text-[24px]
          tracking-widest
          font-bold
          text-gray-600
          font-mono
          max-lg:text-[20px]
        "
        ><font-awesome-icon class="h-6 w-6 text-black" icon="users-gear" /> Unit
        Management</label
      >
      <div
        class="
          flex flex-col
          justify-center
          py-3
          px-16
          bg-[#A10E13]
          rounded
          shadow-md
          text-white
          mt-4
          text-center
        "
      >
        Add Unit
      </div>
      <form method="post" @submit.prevent="submitUnit">
        <div class="border-2 border-gray-100 shadow-lg p-2">
          <div class="mt-2">
            <label class="">Unit Name</label>
            <input
              type="text"
              class="
                w-full
                border-2
                h-[2.5rem]
                border-gray-600
                rounded
                text-center
                hover:border-blue-300
                outline-green-600
              "
              v-model="unitManagementStore.unitForm.unit_name"
              required
            />
          </div>
          <div
            class="
              flex
              lg:flex-col
              min-[100px]:flex-row
              lg:gap-0
              min-[100px]:gap-2
            "
          >
            <button
              type="submit"
              v-if="!unitManagementStore.onEdit"
              class="
                w-full
                flex
                gap-2
                bg-red-500
                p-3
                hover:bg-red-700
                border-2 border-red-800
                rounded
                justify-center
                items-center
                mt-2
                text-white
              "
            >
              <font-awesome-icon icon="eraser" /> <b>SAVE</b>
            </button>
            <button
              type="button"
              v-else
              class="
                w-full
                flex
                gap-2
                bg-yellow-400
                border-2 border-yellow-700
                p-3
                hover:bg-yellow-200
                text-black
                rounded
                justify-center
                items-center
                mt-2
              "
              @click="submitUpdateUnit"
            >
              <font-awesome-icon icon="floppy-disk" /> <b>UPDATE</b>
            </button>
            <button
              type="button"
              @click="unitManagementStore.setClearUnit"
              class="
                w-full
                flex
                gap-2
                bg-gray-500
                border-2 border-gray-800
                hover:bg-gray-600
                p-3
                text-white
                rounded
                justify-center
                items-center
                mt-2
              "
            >
              <font-awesome-icon icon="eraser" /> <b>CLEAR</b>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col lg:h-[89vh] min-[100px]:h-[60vh]">
      <div class="relative flex justify-end">
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
            lg:right-[15.5rem]
            min-[100px]:right-[10.5rem]
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
          v-model="unitManagementStore.search_filter"
        />
        <button
          type="button"
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
          @click="openModal('search')"
        >
          Search
        </button>
      </div>
      <!-- <div class="flex items-end justify-end">
        <span class="p-input-icon-left">
          <font-awesome-icon icon="magnifying-glass" />
          <input-text
            placeholder="Search"
            class="w-[17rem] h-[4.5vh] rounded-md border-2 border-black"
            v-model="unitManagementStore.search_filter"
          />
        </span>
      </div> -->
      <div class="border rounded-[5px] overflow-y-scroll lg:h-full min-[100px]:h-[53vh] mt-2">
        <c-table
          :fields="unitManagementStore.unitManagementFields"
          :items="unitManagementStore.getUnit"
          :filter="unitManagementStore.search_filter"
          :thStyle="'bg-[#A10E13] p-2 text-white border-2 border-solid border-red-900'"
        >
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(action)="data">
            <div class="flex items-center justify-center gap-1">
              <button
                class="
                  h-8
                  w-9
                  rounded
                  bg-orange-400
                  text-white
                  border-2 border-orange-700
                  hover:bg-orange-500
                "
                @click="editUnit(data.item)"
                data-open-modal
                v-tooltip.top="'Edit Unit'"
              >
                <font-awesome-icon icon="pen"></font-awesome-icon>
              </button>
              <button
                class="
                  h-8
                  w-9
                  rounded
                  bg-red-500
                  border-2 border-red-900
                  hover:bg-red-800
                  text-white
                "
                v-tooltip.top="'Delete Unit'"
                @click="deleteUnit(data.item)"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </template>
        </c-table>
      </div>
    </div>
    <Toast position="bottom-right"></Toast>
  </div>
</template>
<script setup>
import { inject, onMounted, ref } from "vue";
import CTable from "@/components/Datatable.vue";
import { useUnitManagementStore } from "@/modules/management/unitManagement";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const unitManagementStore = useUnitManagementStore();
const toast = useToast();
const swal = inject("$swal");
const units = ref([]);

onMounted(() => {
  loadUnits();
});

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
const deleteUnit = (data) => {
  unitManagementStore.onEdit = false;
  unitManagementStore.unitForm.unit_name = "";
  swal({
    icon: "question",
    title: "Delete Unit?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        unitManagementStore.setDeleteUnit(data).then((response) => {
          if (response.status === "success") {
            loader.hide();
            swal({
              icon: "success",
              title: response.message,
              timer: 2500,
            });
          } else {
            loader.hide();
            Object.keys(response.error).forEach((key) => {
              toast.add({
                severity: "error",
                summary: "Warning",
                detail: response.error[key][0],
                life: 5000,
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
        life: 5000,
      });
    }
  });
};

const editUnit = (data) => {
  unitManagementStore.onEdit = true;
  unitManagementStore.setEditUnit(data);
};
const submitUpdateUnit = () => {
  swal({
    icon: "question",
    title: "Update Unit?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        unitManagementStore.setUpdateUnit().then((response) => {
          if (response.status === "success") {
            loader.hide();
            swal({
              icon: "success",
              title: response.message,
              timer: 2500,
            });
          } else {
            loader.hide();
            Object.keys(response.error).forEach((key) => {
              toast.add({
                severity: "error",
                summary: "Warning",
                detail: response.error[key][0],
                life: 5000,
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
        life: 5000,
      });
    }
  });
};
const submitUnit = () => {
  swal({
    icon: "question",
    title: "Add Unit?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        unitManagementStore.setInsertUnit().then((response) => {
          if (response.status === "success") {
            loader.hide();
            swal({
              icon: "success",
              title: response.message,
              timer: 2500,
            });
          } else {
            loader.hide();
            Object.keys(response.error).forEach((key) => {
              toast.add({
                severity: "error",
                summary: "Warning",
                detail: response.error[key][0],
                life: 5000,
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
        life: 5000,
      });
    }
  });
};
</script>
