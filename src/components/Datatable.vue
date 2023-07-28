<template>
  <table :class="`${table_class} select-none`">
    <thead class="sticky top-0">
      <tr>
        <th :class="thStyle" v-for="(column, t) in fields" :key="t">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody v-if="filter" class="relative">
      <span v-if="onFilter.length === 0" class="flex justify-center w-full absolute italic">
        {{ emptyMsg }}</span>
      <tr v-else :class="`${tdStyle} unchecked`" v-for="(item, index) in onFilter" :key="index"
        @click="getData(item, `record(${index})`)" :id="`record(${index})`">
        <th class="font-normal relative border-r" v-for="(column, t) in fields" :key="t">
          <slot :name="`cell(${column.key})`" :item="item" :index="index"></slot>
          <span v-if="item[column.key]">{{ item[column.key] }}</span>
        </th>
      </tr>
    </tbody>
    <tbody v-else-if="items">
      <span v-if="items.length === 0" class="flex justify-center w-full absolute italic">
        {{ emptyMsg }}</span>
      <tr :class="`${tdStyle} unchecked`" v-for="(item, index) in items" :key="index"
        @click="getData(item, `record(${index})`)" :id="`record(${index})`">
        <!-- , $emit('selectable', selected_value) -->
        <th v-for="(column, t) in fields" :key="t" :id="`cell(${index},${t})`"
          @click="getCellData(item[column.key], `cell(${index},${t})`)" class="font-normal border-r">
          <slot :name="`cell(${column.key})`" :item="item" :index="index"></slot>
          {{ item[column.key] }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  table_class: {
    type: String,
    default: "table-auto w-full",
  },
  items: Array,
  fields: Array,
  filter: String,
  emptyMsg: {
    type: String,
    default: "No Records found",
  },
  thStyle: {
    type: String,
    default: "p-3 bg-[#A10E13] text-white text-[13px]",
  },
  tdStyle: {
    type: String,
    default: "mt-3 h-[5vh] hover:bg-gray-100 border-b-2 border-gray-200",
  },
  filter: String,
  isSelectable: Boolean,
  value: Array,
  cellCopy: {
    type: Boolean,
    default: false,
  },
  cellHover: {
    type: String,
    default: "hover: bg-green-300",
  },
});

// onMounted(() => {
//   console.log(selected_value.value)
// });

const emit = defineEmits(["selected_value", "selectable"]);

const selected_value = ref([]);

const select_all = ref(false)

const unSelect = () => {
  var records = [];
  props.items.forEach((v, i) => {
    records.push({ record: document.getElementById(`record(${i})`) });
  });

  records.forEach((v) => {
    if (!v.record.classList.contains("unchecked")) {
      v.record.classList.remove("bg-red-300");
      v.record.classList.remove("hover:bg-red-200");
      v.record.classList.add("hover:bg-gray-100");
      v.record.classList.add("unchecked");
    }
  });
  select_all.value = false
  selected_value.value = [];
};

const getData = (data, id) => {
  if (!props.isSelectable) return;

  const record = document.getElementById(id);
  if (record.classList.contains("unchecked")) {
    record.classList.remove("unchecked");
    record.classList.add("bg-red-300");
    record.classList.add("hover:bg-red-200");
    record.classList.remove("hover:bg-gray-100");
  } else {
    record.classList.remove("bg-red-300");
    record.classList.remove("hover:bg-red-200");
    record.classList.add("hover:bg-gray-100");
    record.classList.add("unchecked");
  }
  if (!record.classList.contains("unchecked")) {
    selected_value.value.push(data);
    emit("selectable", selected_value.value);
  }
  else {
    var agreementIdSplicer = selected_value.value.findIndex(
      (obj) => obj.agreement_id === data.agreement_id
    );
    selected_value.value.splice(agreementIdSplicer, 1);
  }
};

const selectAll = () => {
  return new Promise((resolve) => {
    select_all.value = !select_all.value
    if (props.filter) {
      if (select_all.value === true) {
        onFilter.value.forEach((v, i) => {
          if (document.getElementById(`record(${i})`).classList.contains('unchecked')) {
            selected_value.value.push(v)
            document.getElementById(`record(${i})`).classList.remove("unchecked");
            document.getElementById(`record(${i})`).classList.add("bg-red-300");
            document.getElementById(`record(${i})`).classList.add("hover:bg-red-200");
            document.getElementById(`record(${i})`).classList.remove("hover:bg-gray-100");
            resolve(selected_value.value)
          } else {
            selected_value = []
            resolve('error')
          }
        })
      } else {
        selected_value = []
        unSelect()
        resolve(selected_value.value)
      }
    } else if (props.items) {
      if (select_all.value === true) {
        props.items.forEach((v, i) => {
          if (document.getElementById(`record(${i})`).classList.contains('unchecked')) {
            selected_value.value.push(v)
            document.getElementById(`record(${i})`).classList.remove("unchecked");
            document.getElementById(`record(${i})`).classList.add("bg-red-300");
            document.getElementById(`record(${i})`).classList.add("hover:bg-red-200");
            document.getElementById(`record(${i})`).classList.remove("hover:bg-gray-100");
            resolve(selected_value.value)
          } else {
            selected_value = []
            resolve('error')
          }
        })
      } else {
        selected_value = []
        unSelect()
        resolve(selected_value.value)
      }
    }
  })
}

const getCellData = (data, id) => {
  if (!props.cellCopy) return;
  const cell = document.getElementById(id);
  // console.log(cell);
  if (!cell.classList.contains("bg-green-400")) {
    cell.classList.add("bg-green-400");
    navigator.clipboard.writeText(cell.innerHTML);
  } else {
    cell.classList.remove("bg-green-400");
  }
};

const onFilter = computed(() => {
  return props.items.filter((v) =>
    Object.keys(v).some((k) =>
      String(v[k]).toLowerCase().includes(props.filter.toLowerCase())
    )
  );
});

defineExpose({
  unSelect,
  selectAll
});
</script>
