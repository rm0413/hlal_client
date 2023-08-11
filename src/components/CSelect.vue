<template>
  <div v-if="filterSelect" class="w-full relative">
    <input
      @change="$emit('update:modelValue', selected_value)"
      :class="classStyle"
      autocomplete="off"
      role="combobox"
      :id="id"
      name="browsers"
      @focus="inputFocus"
      v-model="selected_value"
      placeholder="Input part number"
    />
    <datalist
      id="browsers"
      role="listbox"
      class="flex-col absolute bg-white border-2 w-full overflow-y-scroll h-[40vh]"
    >
      <div v-if="!selected_value">
        <option
          class="p-2 hover:bg-gray-200"
          v-for="(data, i) in filterList"
          :key="i"
          @click="selectVal(data.value)"
        >
          {{ data.value }}
        </option>
      </div>

      <div v-else>
        <option
          class="p-2 hover:bg-gray-200"
          v-for="(data, i) in filterSelection"
          :key="i"
          @click="selectVal(data.value)"
        >
          {{ data.value }}
        </option>
      </div>
    </datalist>
  </div>

  <select
    v-else
    v-model="selected_value"
    @change="$emit('update:modelValue', selected_value)"
    :class="classStyle"
    required
  >
    <option :class="`${optionClass}`" value="null" disabled selected hidden>
      {{ placeholder }}
    </option>

    <option
      :class="`${optionClass}`"
      v-for="(data, idx) in options"
      :key="idx"
      :value="data"
    >
      {{ data.text }}
    </option>
  </select>
</template>

<script setup>
import { computed, ref, watch, onRenderTracked} from "vue";

const props = defineProps({
  options: Array,
  optionClass: String,
  filterSelect: {
    type: Boolean,
    default: false,
  },
  filterList: {
    type: Array,
    default: [
      { value: "test1" },
      { value: "test2" },
      { value: "gio" },
      { value: "olibird" },
    ],
  },
  placeholder: {
    type: String,
    default: "Select option",
  },
  numpad: {
    type: Boolean,
    default: false,
  },
  numpadPopup: {
    type: Boolean,
    default: false,
  },
  id: String,
  thisInput: String,
  classStyle: {
    type: String,
    default: 'p-2 border rounded border-black hover:border-red-600 cursor-pointer w-full'
  }
});

const emits = defineEmits(["selected_value", "popup-keyboard"]);

const selected_value = ref(null);
const checkFocus = ref(false);

watch(() => props.thisInput, (newValue) => {
  selected_value.value = newValue
})
const activateNumpad = ref([
  { numpad: false, popup: false },
  { qwerty: false, popup: false },
]);

const unSelect = () => {
  selected_value.value = null;
};

const filterSelection = computed(() => {
  return props.filterList.filter((v) =>
    Object.keys(v).some((k) =>
      String(v[k]).toLowerCase().includes(selected_value.value.toLowerCase())
    )
  );
});
const appendValue = (data) => {
  selected_value.value = data;
};

const selectVal = (data) => {
  var browsers = document.getElementById("browsers");
  var input = document.getElementById("input");
  selected_value.value = data;
  emits('selected_value', selected_value.value)
  outFocus(browsers);
};

const outFocus = (el) => {
  el.classList.remove("flex");
  activateNumpad.value[0].numpad = false;
  activateNumpad.value[0].popup = false;
  emits("popup-keyboard", activateNumpad.value);
};

const inputFocus = () => {
  var browsers = document.getElementById("browsers");
  var input = document.getElementById("input");
  browsers.classList.add("flex");

  activateNumpad.value[0].numpad = true;
  activateNumpad.value[0].popup = true;
  emits("popup-keyboard", activateNumpad.value);
  checkFocus.value = true;
};

const editSelect = (data) => {
  props.options.forEach((v) => {
    if (data.toLowerCase() === v.text.toLowerCase()) {
      selected_value.value = v;
    }
  });
};

// let count = 0
// onRenderTracked((debug) => {
//   count += 1
//   console.log(`GSelect.vue render tracked. \tCount: ${count} key: ${debug.key}`)
// })


defineExpose({
  unSelect,
  editSelect,
  appendValue,
});
</script>
