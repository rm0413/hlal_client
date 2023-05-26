<template>
  <select
    v-model="selected_value"
    @change="$emit('update:modelValue', selected_value)"
    class="p-2 border rounded border-stone-300 w-full hover:border-red-600 cursor-pointer"
    required
  >
    <option value="null" disabled selected hidden>{{ placeholder }}</option>
    <option v-for="(data, idx) in options" :key="idx" :value="data">
      {{ data.text }}
    </option>
  </select>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  options: Array,
  placeholder: {
    type: String,
    default: "Select option",
  },
});

const selected_value = ref(null);

const unSelect = () => {
  selected_value.value = null
}

const editSelect = (data) => {
  props.options.forEach(v => {
    if(data === v.text){
      selected_value.value = v
    }
  })
}

defineExpose({
  unSelect,
  editSelect,
})
</script>
