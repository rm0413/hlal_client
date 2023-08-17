<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="puzzle-piece" />
          Designer Section Answer
        </label>
        <div class="flex gap-2">
          <div class="flex">
            <label class="flex flex-col items-center justify-center">Search by:
            </label>
            <button
              class="flex flex-col h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md rounded-r-none ml-3 items-center justify-center">
              <b>Code</b>
            </button>
            <button
              class="flex flex-col text-center p-1 border-2 rounded-r-md w-[8rem] items-center justify-center border-gray-600">
              <b>Part Number</b>
            </button>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass" /></i>
            <input
              class="text-center p-1 border-2 rounded-l-md h-[2.8rem] border-gray-600 hover:border-blue-300 outline-green-600"
              v-model="designerSectionAnswerStore.search_filter" />
            <button class="bg-gray-400 text-white py-1 px-3 rounded-r-md h-[2.8rem]">
              <b>Search</b>
            </button>
          </div>
          <div>
            <c-select class="text-center w-[15rem] h-[2.8rem] border-2 rounded-md border-black hover:border-blue-300 outline-green-600"
              :options="part_number" @change="selectPartNumber"
              v-model="designerSectionAnswerStore.part_number_select"></c-select>
          </div>
        </div>
      </div>
    </div>
    <button @click="selectAll"
      class="bg-[#A10E13] text-white rounded justify-center items-center mt-1 h-[2.5rem] w-[10rem]">
      Select All
    </button>
    <div class="h-[80vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
      <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col mt-2 overflow-y-scroll">
        <c-table ref="ctable" :isSelectable="true" @selectable="(data) => (select_data = data)"
          :filter="designerSectionAnswerStore.search_filter" :items="filterPartNumber"
          :fields="designerSectionAnswerStore.getDesignerSectionAnswerFields"
          :thStyle="'bg-[#A10E13] p-2 text-white text-[13px] border-2 border-solid border-red-900'">
          <template #cell(action)="data">
            <button @click="editDesignerSection(data.item)" v-if="data.item.request_result !== null"
              class="h-8 w-9 rounded bg-yellow-500 text-white border-2 border-yellow-700 hover:bg-yellow-600" v-tooltip.top="'Edit Designer Section Answer'">
              <font-awesome-icon icon="pen"></font-awesome-icon>
            </button>
            <button @click="editDesignerSection(data.item)" v-else class="h-8 w-9 rounded bg-yellow-500 text-white"
              v-tooltip.top="'Edit Designer Section Answer'" hidden>
              <font-awesome-icon icon="pen"></font-awesome-icon>
            </button>
          </template>
        </c-table>
      </div>
      <div class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2 px-10">
        <form method="post" @submit.prevent="submitDesignerSectionAnswer">
          <label class="flex flex-col items-center">
            <i class="text-white bg-[#A10E13] w-full flex justify-center rounded">Request Result</i>
            <select
              class="border-2 rounded w-full h-[3rem] text-center border-gray-600 hover:border-blue-300 outline-green-600"
              v-model="designerSectionAnswerStore.designerSectionAnswerForm
                .request_result
                " required>
              <option value="" disabled>Select Request Result</option>
              <option value="LSA OK">LSA OK</option>
              <option value="LSA NG">LSA NG</option>
              <option value="Hinsei OK">Hinsei OK</option>
              <option value="Hinsei NG">Hinsei NG</option>
            </select>
          </label>
          <label class="flex flex-col items-center mt-1">
            <i class="text-white bg-[#A10E13] w-full flex justify-center rounded">Input Designer Answers</i>
            <div class="p-2 w-full">
              <p class="text-[13px]">Designer section's answer</p>
              <textarea style="resize: none" v-model="designerSectionAnswerStore.designerSectionAnswerForm
                .designer_section_answer
                " required
                class="border-2 rounded w-full h-[4rem] text-center border-gray-600 hover:border-blue-300 outline-green-600" />
              <p class="text-[13px]">Designer In-charge</p>
              <input type="text" v-model="designerSectionAnswerStore.designerSectionAnswerForm
                .designer_in_charge
                "
                class="border-2 rounded w-full text-center border-gray-600 hover:border-blue-300 outline-green-600 h-[2.5rem]"
                required />
              <p class="text-[13px]">Answer Date:</p>
              <input type="date" v-model="designerSectionAnswerStore.designerSectionAnswerForm
                .answer_date
                "
                class="border-2 rounded text-center border-gray-600 hover:border-blue-300 outline-green-600 w-full h-[2.5rem]"
                required />
            </div>
          </label>
          <label class="flex flex-col items-center">
            <i class="text-white bg-[#A10E13] w-full flex justify-center rounded mb-2">Upload Designer Answer</i>
            <input type="file" id="file-designer" accept=".xlsx" @change="uploadFile" :draggable="true"
              class="cursor-pointer block w-full text-sm text-slate-600 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" />
          </label>
          <button type="submit" v-if="!designerSectionAnswerStore.onSingle"
            class="w-full flex gap-2 bg-green-500 p-3 hover:bg-green-700 border-2 border-green-800 text-black rounded justify-center items-center mt-2">
            <font-awesome-icon icon="floppy-disk" /><b>SAVE INPUTS</b>
          </button>
          <button type="button" @click="excelUploadingDesignerAnswer" v-else-if="designerSectionAnswerStore.onUploading"
            class="w-full flex gap-2 bg-red-500 border-2 border-red-800 hover:bg-red-600 p-3 text-white rounded justify-center items-center mt-5">
            <font-awesome-icon icon="floppy-disk" /><b>SUBMIT FILE</b>
          </button>
          <button type="button" @click="updateDesignerSectionAnswer" v-else-if="designerSectionAnswerStore.onEdit"
            class="w-full flex gap-2 bg-yellow-400 border-2 border-yellow-700 p-3 hover:bg-yellow-200 text-black rounded justify-center items-center mt-5">
            <font-awesome-icon icon="floppy-disk" />Update
          </button>
          <button type="button" @click="clearInputs"
            class="w-full flex gap-2 bg-gray-500 border-2 border-gray-800 hover:bg-gray-600 p-3 text-white rounded justify-center items-center mt-2">
            <font-awesome-icon icon="eraser" /><b>CLEAR</b>
          </button>
        </form>
      </div>
    </div>
    <Toast position="bottom-right" group="br"></Toast>
    <Toast position="bottom-left" group="bl"></Toast>
  </div>
</template>

<script setup>
import CTable from "@/components/Datatable.vue";
import CSelect from "@/components/CSelect.vue";
import { onMounted, ref, inject, computed } from "vue";
import { useDesignerSectionAnswerStore } from "@/modules/request/designersectionanswer";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading()
const designerSectionAnswerStore = useDesignerSectionAnswerStore();
const toast = useToast();
const swal = inject("$swal");
const select_data = ref([]);
const ctable = ref();
const part_number = ref([]);

onMounted(() => {
  designerSectionAnswerStore.setLoadDesignerSection();
  designerSectionAnswerStore.setLoadPartNumber().then((response) => {
    response.data.forEach((v) => {
      part_number.value.push({
        text: v,
        value: v,
      });
    });
  });
});

const selectPartNumber = () => {
  ctable.value.unSelect();
  select_data.value = [];
  clearInputs()
};

const file = ref(null);
const uploadFile = (event) => {
  designerSectionAnswerStore.onSingle = true;
  designerSectionAnswerStore.onUploading = true;
  designerSectionAnswerStore.onEdit = false;
  file.value = event.target.files[0];
};

const excelUploadingDesignerAnswer = () => {
  if (select_data.value.length !== 0) {
    if (
      file.value.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      if (
        designerSectionAnswerStore.designerSectionAnswerForm.request_result !==
        null
      ) {
        swal({
          icon: "question",
          title: "Upload Designer Answer?",
          text: "Please make sure before to proceed!",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((response) => {
          if (response.value === true) {
            var emp_id = sessionStorage.getItem("employee_id")
            const name = "data";
            const formData = new FormData();
            select_data.value.forEach((item, i) => {
              formData.append((`${name}[${i}]${["[agreement_request_id]"]}`), item["agreement_request_id_fk"]);
              formData.append((`${name}[${i}]${["[trial_number]"]}`), item["trial_number"]);
              formData.append((`${name}[${i}]${["[request_date]"]}`), item["request_date"]);
              formData.append((`${name}[${i}]${["[additional_request_qty_date]"]}`), item["additional_request_qty_date"]);
              formData.append((`${name}[${i}]${["[tri_number]"]}`), item["tri_number"]);
              formData.append((`${name}[${i}]${["[tri_quantity]"]}`), item["tri_quantity"]);
              formData.append((`${name}[${i}]${["[request_person]"]}`), item["request_person"]);
              formData.append((`${name}[${i}]${["[superior_approval]"]}`), item["superior_approval"]);
              formData.append((`${name}[${i}]${["[supplier_name]"]}`), item["supplier_name"]);
              formData.append((`${name}[${i}]${["[part_number]"]}`), item["part_number"]);
              formData.append((`${name}[${i}]${["[sub_part_number]"]}`), item["sub_part_number"]);
              formData.append((`${name}[${i}]${["[revision]"]}`), item["revision"]);
              formData.append((`${name}[${i}]${["[coordinates]"]}`), item["coordinates"]);
              formData.append((`${name}[${i}]${["[dimension]"]}`), item["dimension"]);
              formData.append((`${name}[${i}]${["[actual_value]"]}`), item["actual_value"]);
              formData.append((`${name}[${i}]${["[critical_parts]"]}`), item["critical_parts"]);
              formData.append((`${name}[${i}]${["[critical_dimension]"]}`), item["critical_dimension"]);
              formData.append((`${name}[${i}]${["[request_type]"]}`), item["request_type"]);
              formData.append((`${name}[${i}]${["[request_value]"]}`), item["request_value"]);
              formData.append((`${name}[${i}]${["[request_quantity]"]}`), item["request_quantity"]);
              formData.append((`${name}[${i}]${["[unit_id]"]}`), item["unit_id"]);
              formData.append((`${name}[${i}]${["[requestor_employee_id]"]}`), item["requestor_employee_id"]);
            })
            formData.append("uploaded_file", file.value);
            formData.append("emp_id", emp_id);
            formData.append(
              "request_result",
              designerSectionAnswerStore.designerSectionAnswerForm
                .request_result
            );
            const loader = $loading.show()
            setTimeout(() => {
              designerSectionAnswerStore
                .setInsertDesignerSectionAnswer(formData)
                .then((response) => {
                  if (response.status === "success") {
                    document.getElementById("file-designer").value = null;
                    loader.hide()
                    swal({
                      icon: "success",
                      title: response.message,
                      timer: 1500,
                    });
                    ctable.value.unSelect();
                    select_data.value = [];
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
                });
            })
          }
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Warning",
          detail: "Please select Request Result",
          life: 1500,
          group: "bl",
        });
      }
    } else {
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Only Excel File Allowed",
        life: 1500,
        group: "bl",
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Warning",
      detail: "Please select data in table",
      life: 1500,
      group: "bl",
    });
  }
};

const submitDesignerSectionAnswer = () => {
  if (select_data.value.length !== 0) {
    swal({
      icon: "question",
      title: "Add Designer Section Answer?",
      text: "Please make sure before to proceed!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((response) => {
      if (response.value === true) {
        const loader = $loading.show()
        setTimeout(() => {
          designerSectionAnswerStore
            .setInsertSingleMultipleDesigner(select_data.value)
            .then((response) => {
              if (response.status === "success") {
                ctable.value.unSelect();
                select_data.value = [];
                loader.hide()
                swal({
                  icon: "success",
                  title: response.message,
                  timer: 1500,
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
        toast.add({
          severity: "error",
          summary: "Warning",
          detail: "Cancelled",
          life: 1500,
          group: "bl",
        });
      }
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Warning",
      detail: "Please select data in table",
      life: 1500,
      group: "bl",
    });
  }
};

const editDesignerSection = (data) => {
  designerSectionAnswerStore.onEdit = true;
  designerSectionAnswerStore.onUploading = false;
  designerSectionAnswerStore.onSingle = true;
  designerSectionAnswerStore.designerSectionAnswerForm = {
    id: data.designer_section_id,
    agreement_request_id: data.agreement_request_id_fk,
    request_result: data.request_result,
    designer_section_answer: data.designer_answer,
    designer_in_charge: data.designer_in_charge,
    answer_date: data.answer_date,
  };
  ctable.value.unSelect();
  select_data.value = [];
};

const updateDesignerSectionAnswer = () => {
  swal({
    icon: "question",
    title: "Update Designer Answer?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show()
      setTimeout(() => {
        designerSectionAnswerStore
          .setUpdateDesignerSectionAnswer()
          .then((response) => {
            if (response.status === "success") {
              ctable.value.unSelect();
              select_data.value = [];
              loader.hide()
              swal({
                icon: "success",
                title: response.message,
                timer: 1500,
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
      toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled.', life: 2000, group: 'bl' });
    }
  })
};

const filterPartNumber = computed(() => {
  return designerSectionAnswerStore.getDesignerSectionAnswer.filter(
    (v) => v.part_number == designerSectionAnswerStore.part_number_select.value
  );
});

const clearInputs = () => {
  designerSectionAnswerStore.onEdit = false;
  designerSectionAnswerStore.onUploading = false;
  designerSectionAnswerStore.onSingle = false;
  document.getElementById("file-designer").value = null;
  designerSectionAnswerStore.clearDesignerAnswer();
  ctable.value.unSelect();
  select_data.value = [];
};

const selectAll = () => {
  ctable.value.selectAll().then(res => {
    select_data.value = res
  })
}
</script>
