<template>
  <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
    <div class="lg:col-span-3 min-[100px]:col-span-9 h-full flex flex-col">
      <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
        <font-awesome-icon class="h-6 w-6 text-black" icon="desktop" /> Hinsei & LSA
        Monitoring List
      </label>
      <div class="flex flex-col">
        <div class="flex justify-center items-center p-2 bg-[#A10E13] text-white rounded mt-5">
          Search Filters
        </div>
        <form action="" class="flex flex-col items-center gap-2">
          <label for="" class="flex flex-col mt-3">
            Unit Name
            <select class="w-[31.5vw] h-[2.7rem] rounded border-black border-2 text-center" v-model="monitoringStore.monitoringForm.monitoring_unit_name">
              <option value="" disabled>Select Unit</option>
              <option v-for="(i, key) in units" :key="key" :value="i.text">{{ i.text }}</option>
            </select>
          </label>
          <label for="" class="flex flex-col">
            Supplier
            <input type="text" class="border p-2 flex text-center w-[31.5vw] rounded border-black"
              placeholder="Supplier" />
          </label>
          <label for="" class="flex flex-col">
            Part Number
            <input type="text" class="border p-2 flex text-center w-[31.5vw] rounded border-black text-black"
              placeholder="Part Number" />
          </label>
          <div class="flex gap-5 mt-5">
            <button type="button" @click="exportFile" class="p-2 bg-green-700 text-white rounded">
              <font-awesome-icon icon="download"></font-awesome-icon>
              Export File
            </button>
            <button type="button" class="p-2 bg-gray-700 text-white rounded">
              <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="lg:col-span-6 min-[100px]:col-span-9 h-[85vh]">
      <div class="border rounded-[5px] overflow-y-scroll h-full">
        <c-table :items="[
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
          { unit_name: 'test', supplier: 'test', part_number: 'test' },
        ]" :fields="monitoringStore.getMonitoringFields" :thStyle="'bg-[#A10E13] text-white p-2'">
          <template #cell(action)>
            <div class="flex justify-center gap-1">
              <button class="h-8 w-9 rounded bg-green-700 text-white">
                <font-awesome-icon icon="download"></font-awesome-icon>
              </button>
              <button class="h-8 w-9 rounded bg-cyan-600 text-white">
                <font-awesome-icon icon="eye"></font-awesome-icon>
              </button>
              <button class="h-8 w-9 rounded bg-orange-500 text-white">
                <font-awesome-icon icon="pen"></font-awesome-icon>
              </button>
              <button class="h-8 w-9 rounded bg-[#A10E13] text-white">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </button>
            </div>
          </template>
          <template #cell(id)="data">{{ data.index + 1 }}</template>
          <template #cell(select)>
            <input type="checkbox">
          </template>
        </c-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CTable from "@/components/Datatable.vue";
import { useMonitoringStore } from "@/modules/monitoring";
import { ref, onMounted } from "vue";
const monitoringStore = useMonitoringStore();

const units = ref([]);

onMounted(() => {
  loadUnits();
});

const loadUnits = () => {
  monitoringStore.setUnits().then((response) => {
    response.forEach((v) => {
      units.value.push({
        text: v.unit_name,
        unit_id: v.unit_id,
      });
    });
  });
};

const exportFile = () => {
  monitoringStore.setUnit()
}
</script>
