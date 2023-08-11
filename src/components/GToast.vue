<template>
  <div
    v-for="(data, i) in toast_details"
    :key="i"
    :id="`toast(${i})`"
    :class="`absolute right-0 w-96 h-28 rounded border-l-4 opacity-0 ${
      data.status !== ''
        ? data.status !== 'warning'
          ? data.status !== 'error'
            ? data.status !== 'success'
              ? ''
              : 'bg-green-200 text-green-900'
            : 'bg-red-200 text-[#a10e13]'
          : 'bg-yellow-100 text-yellow-800'
        : ''
    } ${
      data.status !== ''
        ? data.status !== 'warning'
          ? data.status !== 'error'
            ? data.status !== 'success'
              ? ''
              : 'border-green-900'
            : 'border-[#a10e13]'
          : 'border-yellow-800'
        : ''
    } transform duration-300 translate-x-[30rem] p-4`"
  >
    <div :class="`text-[18px] font-bold flex items-center gap-1 justify-between px-2`">
      <div>
        <font-awesome-icon
          :icon="
            data.status !== 'puzzle-piece'
              ? data.status !== 'warning'
                ? data.status !== 'error'
                  ? data.status !== 'success'
                    ? 'puzzle-piece'
                    : 'check-circle'
                  : 'screwdriver-wrench'
                : 'exclamation-triangle'
              : 'puzzle-piece'
          "
        ></font-awesome-icon>
        {{
          data.status !== ""
            ? data.status !== "warning"
              ? data.status !== "error"
                ? data.status !== "success"
                  ? ""
                  : "Successfully Executed"
                : "Something went wrong!"
              : "Warning"
            : ""
        }}
      </div>
      <button @click="closeToast(`toast(${i})`)">
        <font-awesome-icon icon="xmark" class="h-5"></font-awesome-icon>
      </button>
    </div>
    <span class="flex justify-end items-center px-4 w-full h-16">
      {{ data.message }}
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  position: {
    type: String,
    default: "bottom-10",
  },
});

const count = ref(0);
const toast_details = ref([]);
const toastList = ref([]);
const posList = ref([]);

const toggle = () => {
  count.value === 5 ? count.value = 0 : count.value
  posList.value.push(posList.value.length === 0 ? 'bottom-[2rem]' :`bottom-[${8 * count.value + 2}rem]`);
  toastList.value.push(posList.value.length === 0 ? posList.value = [] : document.getElementById(`toast(${count.value})`));
  toastList.value.forEach((v, i) => {
    v.classList.add(posList.value[i]);
    if (v.classList.contains("translate-x-[30rem]")) {
      v.classList.replace("translate-x-[30rem]", "-translate-x-[2rem]");
      v.classList.replace("opacity-0", "opacity-1");
      outToast(v)
        .then(() => {
          // if (posList.value.length >= 5) {
            posList.value.splice(0);
            toastList.value.splice(0);
            count.value !== 0 ? count.value-- : count.value
          // }
        })
    }
  });
  count.value++;
};

const outToast = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      data.classList.replace("-translate-x-[2rem]", "translate-x-[30rem]");
      data.classList.replace("opacity-1", "opacity-0");
      resolve(data);
    }, toast_details.value[count.value].timer);
  });
};

const closeToast = (id) => {
  document.getElementById(id).classList.replace(
    "-translate-x-[2rem]",
    "translate-x-[30rem]"
  );
};

const show = (data) => {
  getDetails(data).then((res) => {
    toggle(res);
  });
};

const getDetails = (data) => {
  return new Promise((resolve) => {
    toast_details.value.push(data);
    resolve(toast_details.value);
  });
};

defineExpose({
  show,
});
</script>
