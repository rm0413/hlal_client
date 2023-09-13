<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
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
            <font-awesome-icon class="h-6 w-6 text-black" icon="tags" />
            Saved Inputs
          </label>
        </div>
      </div>
      <div class="h-[80vh] w-full mt-3 overflow-y-scroll">
        <div class="flex justify-between mb-1">
          <div class="flex gap-2 mr-2 justify-end">
            <button
              @click="selectAll"
              class="
                bg-[#A10E13]
                text-white
                rounded
                justify-center
                items-center
                h-[2.5rem]
                w-[12rem]
                hover:bg-red-600
              "
            >
              Select All
            </button>
            <button
              :disabled="select_item.length === 0"
              class="
                bg-[#A10E13]
                text-white
                rounded
                justify-center
                items-center
                h-[2.5rem]
                w-[12rem]
                hover:bg-red-600
                cursor-pointer
              "
              @click="generateCode"
            >
              <font-awesome-icon
                icon="floppy-disk"
                class="h-5 w-5"
              ></font-awesome-icon>
              GENERATE
            </button>
          </div>
          <div class="flex relative">
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
              ><font-awesome-icon icon="magnifying-glass"
            /></i>
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
              v-model="savedInputsStore.search_filter"
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
            >
              Search
            </button>
          </div>
        </div>
        <c-table
          :items="newRequestStore.getNoCode"
          :fields="savedInputsStore.getSavedInputsFields"
          :filter="savedInputsStore.search_filter"
          :thStyle="'bg-[#A10E13] p-2 text-white border-2 border-solid border-red-900'"
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
            />
          </template>
        </c-table>
      </div>
    </div>
    <Toast position="bottom-right" group="bl"></Toast>
  </div>
</template>
<script setup>
import CTable from "@/components/Datatable.vue";
import { onMounted, ref, inject } from "vue";
import { useSavedInputsStore } from "@/modules/request/savedInputs";
import { useNewRequestStore } from "@/modules/request/newrequest";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "primevue/usetoast";

const swal = inject("$swal");
const $loading = useLoading();
const toast = useToast();
const savedInputsStore = useSavedInputsStore();
const newRequestStore = useNewRequestStore();
const select_item = ref([]);

onMounted(() => {
  newRequestStore.setNoCodeAgreementList();
});

const selectAll = () => {
  var selected_checkbox = document.querySelectorAll("input[type='checkbox']");
  if (select_item.value.length === newRequestStore.getNoCode.length) {
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

const generateCode = () => {
  swal({
    icon: "question",
    title: "Generate Code?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      var payload = {
        agreement_request_id: [],
        emp_id: sessionStorage.getItem("employee_id"),
      };
      const datastorage = [];
      select_item.value.forEach((v) => {
        datastorage.push(JSON.parse(v));
      });
      datastorage.forEach((v) => {
        payload.agreement_request_id.push(v.agreement_id_pk);
      });
      const loader = $loading.show();
      setTimeout(() => {
        newRequestStore.setGenerateCode(payload).then((response) => {
          // console.log(response.data)
          if (response.status === "success") {
            newRequestStore
              .setShowGenerateCode(response.data.id)
              .then((response) => {
                if (response.status === "success") {
                  loader.hide();
                  swal({
                    icon: "success",
                    title: response.data[0].code,
                    text: "Your code has been generated. An email notification will be sent.",
                  });
                } else {
                  loader.hide();
                  toast.add({
                    severity: "error",
                    summary: "Warning",
                    detail: response.message,
                    life: 2000,
                    group: "bl",
                  });
                }
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
        life: 2000,
        group: "bl",
      });
    }
  });
};
</script>
