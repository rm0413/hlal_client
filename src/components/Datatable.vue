<template>
    <table :class="table_class">
      <thead>
        <tr>
          <th :class="thStyle" v-for="(column, t) in fields" :key="t">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
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
const props = defineProps({
  table_class: {
    type: String,
    default: "table-auto w-full",
  },
  items: Array,
  fields: Array,
  thStyle: {
    type: String,
    default: "p-2 bg-zinc-300",
  },
  tdStyle: {
    type: String,
    default: "mt-3 h-[5vh] hover:bg-gray-100 border-b-2 border-gray-200",
  },
});
</script>
