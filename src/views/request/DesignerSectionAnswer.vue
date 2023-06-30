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
            <label class="flex flex-col items-center justify-center">Search by: </label>
            <div
              class="flex flex-col h-full bg-[#A10E13] text-white py-1 px-3 rounded-l-md ml-3 items-center justify-center">
              Code
            </div>
            <div class="flex flex-col text-center p-1 border-2 rounded w-[8rem] items-center justify-center">Part Number
            </div>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon
                icon="magnifying-glass" /></i>
            <input class="text-center p-1 border-2 rounded-l-md h-[2.5rem]"
              v-model="designerSectionAnswerStore.search_filter" />
            <button class="bg-gray-400 text-white py-1 px-3 rounded-r-md h-[2.5rem]">
              Search
            </button>
          </div>
          <div>
            <c-select class="text-center w-[15rem]" :options="part_number"
              v-model="designerSectionAnswerStore.part_number_select"></c-select>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[80vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
      <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col mt-2 overflow-y-scroll">
        <c-table ref="ctable" :isSelectable="true" @selectable="(data) => (select_data = data)"
          :filter="designerSectionAnswerStore.search_filter" :items="filterPartNumber"
          :fields="designerSectionAnswerStore.getDesignerSectionAnswerFields"
          :thStyle="'bg-[#A10E13] p-2 text-white text-[13px]'">
          <template #cell(action)="data">
            <button @click="editDesignerSection(data.item)" v-if="data.item.request_result !== null"
              class="h-8 w-9 rounded bg-yellow-500 text-white"
              v-tooltip.top="'Edit Designer Section Answer'"><font-awesome-icon icon="pen"></font-awesome-icon></button>
            <button @click="editDesignerSection(data.item)" v-else class="h-8 w-9 rounded bg-yellow-500 text-white"
              v-tooltip.top="'Edit Designer Section Answer'" hidden><font-awesome-icon
                icon="pen"></font-awesome-icon></button>
          </template>
        </c-table>
      </div>
      <div class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2 px-10">
        <form method="post" @submit.prevent="submitDesignerSectionAnswer">
          <label class="flex flex-col items-center">
            <i class="text-white bg-[#A10E13] w-full flex justify-center rounded">Request Result</i>
            <select class="border-2 rounded w-full h-[3rem] text-center"
              v-model="designerSectionAnswerStore.designerSectionAnswerForm.request_result" >
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
              <textarea style="resize: none"
                v-model="designerSectionAnswerStore.designerSectionAnswerForm.designer_section_answer"
                class="border-2 rounded w-full h-[4rem] text-center"  />
              <p class="text-[13px]">Designer In-charge</p>
              <input type="text" v-model="designerSectionAnswerStore.designerSectionAnswerForm.designer_in_charge"
                class="border-2 rounded w-full text-center h-[2.5rem]"  />
              <p class="text-[13px]">Answer Date:</p>
              <input type="date" v-model="designerSectionAnswerStore.designerSectionAnswerForm.answer_date"
                class="border-2 rounded text-center w-full h-[2.5rem]"  />
            </div>
          </label>
          <label class="flex flex-col items-center">
            <i class="text-white bg-[#A10E13] w-full flex justify-center rounded mb-2">Upload Designer Answer</i>
            <input type="file" accept=".xlsx" @change="uploadFile" :draggable="true" class="block w-full text-sm text-slate-600 file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700" />
          </label>
          <button type="submit" v-if="!designerSectionAnswerStore.onEdit"
            class="w-full flex gap-2 bg-[#A10E13] p-3 text-white rounded justify-center items-center mt-5">
            <font-awesome-icon icon="floppy-disk" />Save
          </button>
          <button type="button" @click="updateDesignerSectionAnswer" v-else
            class="w-full flex gap-2 bg-yellow-400 p-3 hover:bg-yellow-200 text-black rounded justify-center items-center mt-5">
            <font-awesome-icon icon="floppy-disk" />Update
          </button>
          <button type="button" @click="clearInputs"
            class="w-full flex gap-2 bg-gray-600 hover:bg-gray-500 p-3 text-white rounded justify-center items-center mt-2">
            <font-awesome-icon icon="eraser" />Clear
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
const designerSectionAnswerStore = useDesignerSectionAnswerStore();

const toast = useToast();
const swal = inject("$swal");

const select_data = ref([])
const ctable = ref()
const part_number = ref([])
const data = ref([])

onMounted(() => {
  designerSectionAnswerStore.setLoadDesignerSection()
  designerSectionAnswerStore.setLoadPartNumber().then((response) => {
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
  // startProgress();
  file.value = event.target.files[0];
};

const submitDesignerSectionAnswer = () => {
  select_data.value.forEach((v) => {
    data.value = {
      agreement_request_id_pk: v.agreement_request_id_fk,
      trial_number: v.trial_number,
      request_date: v.request_date,
      additional_request_qty_date: v.additional_request_qty_date,
      tri_number: v.tri_number,
      request_person: v.request_person,
      superior_approval: v.superior_approval,
      supplier_name: v.supplier_name,
      part_number: v.part_number,
      sub_part_number: v.sub_part_number,
      revision: v.revision,
      coordinates: v.coordinates,
      dimension: v.dimension,
      actual_value: v.actual_value,
      critical_parts: v.critical_parts,
      critical_dimension: v.critical_dimension,
      request_type: v.request_type,
      request_value: v.request_value,
      request_quantity: v.request_quantity,
      unit_id: v.unit_id,
      requestor_employee_id: v.requestor_employee_id,
    }
    console.log(data.value)
  })
  // data.value = select_data.value

  // var payload = {
  //   agreement_request_id: [],
  // };
  // select_data.value.forEach((v) => {
  //   payload.agreement_request_id.push(v.agreement_id_pk);
  // });
  const formData = new FormData();
  formData.append('uploaded_file', file.value);
  formData.append('data', data.value);
  // formData.append('data', data.value);
  // data.value.forEach(function (value) {
  //   formData.append("data[]", value)
  //   // console.log(value) // you have to add array symbol after the key name
  // })
  designerSectionAnswerStore.setInsertDesignerSectionAnswer(formData)

}

// const submitDesignerSectionAnswer = () => {
//   if (select_data.value.length !== 0) {
//     swal({
//       icon: "question",
//       title: "Add Designer Section Answer?",
//       text: "Please make sure before to proceed!",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//     }).then((response) => {
//       if (response.value === true) {
//         designerSectionAnswerStore.setInsertDesignerSectionAnswer(select_data.value).then((response) => {
//           if (response.status === 'success') {
//             swal({
//               icon: 'success',
//               title: response.message,
//               timer: 1500
//             })
//           } else {
//             toast.add({ severity: 'error', summary: 'Warning', detail: response.message, life: 1500, group: 'br' });
//           }
//         })
//       } else {
//         toast.add({ severity: 'error', summary: 'Warning', detail: 'Cancelled', life: 1500, group: 'bl' });
//       }
//     })
//   } else {
//     toast.add({ severity: 'error', summary: 'Warning', detail: 'Please select data in table', life: 1500, group: 'bl' });
//   }
// }

const editDesignerSection = (data) => {
  ctable.value.unSelect();
  select_data.value = [];
  designerSectionAnswerStore.onEdit = true;
  designerSectionAnswerStore.designerSectionAnswerForm = {
    id: data.designer_section_id,
    agreement_request_id: data.agreement_request_id_fk,
    request_result: data.request_result,
    designer_section_answer: data.designer_answer,
    designer_in_charge: data.designer_in_charge,
    answer_date: data.answer_date
  }
}

const updateDesignerSectionAnswer = () => {
  designerSectionAnswerStore.setUpdateDesignerSectionAnswer().then((response) => {
    if (response.status === 'success') {
      ctable.value.unSelect();
      select_data.value = [];
      swal({
        icon: 'success',
        title: response.message,
        timer: 1500
      })
    } else {
      toast.add({ severity: 'error', summary: 'Warning', detail: response.message, life: 1500, group: 'br' });
    }
  })
}

const filterPartNumber = computed(() => {
  return designerSectionAnswerStore.getDesignerSectionAnswer.filter((v) =>
    v.part_number == designerSectionAnswerStore.part_number_select.value
  );
})

const clearInputs = () => {
  designerSectionAnswerStore.onEdit = false
  ctable.value.unSelect();
  select_data.value = [];
  designerSectionAnswerStore.clearDesignerAnswer()
}
</script>
