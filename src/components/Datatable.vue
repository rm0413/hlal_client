<template>
  <table :class="table_class">
    <thead>
      <tr>
        <th :class="thStyle" v-for="(column, t) in fields" :key="t">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody v-if="filter" class="relative">
      <span
        v-if="onFilter.length === 0"
        class="flex justify-center w-full absolute italic"
      >
        {{ emptyMsg }}</span
      >
      <tr v-else :class="tdStyle" v-for="(item, index) in onFilter" :key="index">
        <th class="font-normal relative" v-for="(column, t) in fields" :key="t">
          <slot :name="`cell(${column.key})`" :item="item" :index="index"></slot>
          <span v-if="item[column.key]">{{ item[column.key] }}</span>
        </th>
      </tr>
    </tbody>
    <tbody v-else-if="items">
      <span v-if="items.length === 0" class="flex justify-center w-full absolute italic">
        {{ emptyMsg }}</span
      >
      <tr :class="tdStyle" v-for="(item, index) in items" :key="index">
        <th class="font-normal" v-for="(column, t) in fields" :key="t">
          <slot :name="`cell(${column.key})`" :item="item" :index="index"></slot>
          {{ item[column.key] }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";

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
});

const onFilter = computed(() => {
    return props.items.filter((v) =>
      Object.keys(v).some((k) =>
        String(v[k]).toLowerCase().includes(props.filter.toLowerCase())
      )
    );
});
</script>
