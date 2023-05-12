<template>
  <div
    class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2"
  >
    <div class="lg:col-span-6 min-[100px]:col-span-9 h-full flex flex-col">
      <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
        <font-awesome-icon class="h-6 w-6 text-black" icon="home" /> Dashboard
      </label>
      <div
        class="flex flex-col justify-center py-4 px-16 bg-[#A10E13] rounded-full text-white"
      >
        <span class="text-[1.5rem]">Hello, <strong>Reina Mae</strong></span>
        <i class="text-[1rem] opacity-90"
          >Welcome to Hinsei & LSA Agreement List System</i
        >
      </div>
      <div class="py-3 px-12 font-bold text-[18px]">Request Status</div>
      <div class="grid grid-rows-2 h-[70%]">
        <div class="row-span-1 grid grid-cols-2">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
          <div class="grid grid-cols-2 gap-3">
            <label for="" class="flex flex-col text-[14px]">
              From
              <input
                type="date"
                class="p-2 border-2 rounded-[5px] h-[2.5rem] hover:border-[#A10E13]"
                v-model="hinsei_date_from"
              />
            </label>
            <label for="" class="flex flex-col text-[14px]">
              To
              <input
                type="date"
                class="p-2 border-2 rounded-[5px] h-[2.5rem] mr-3 hover:border-[#A10E13]"
                v-model="hinsei_date_to"
              />
            </label>
          </div>
        </div>
        <div class="row-span-1 grid grid-cols-2">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
          <div class="grid grid-cols-2 gap-3">
            <label for="" class="flex flex-col text-[14px]">
              From
              <input
                type="date"
                class="p-2 border-2 rounded-[5px] h-[2.5rem] hover:border-[#A10E13]"
                v-model="lsa_date_from"
              />
            </label>
            <label for="" class="flex flex-col text-[14px]">
              To
              <input
                type="date"
                class="p-2 border-2 rounded-[5px] h-[2.5rem] mr-3 hover:border-[#A10E13]"
                v-model="lsa_date_to"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 h-[10%]">
        <div class="col-span-1 flex justify-center items-center gap-2">
          Total number of Hinsei Request
          <strong
            class="w-[5rem] bg-[#A10E13] text-white rounded-full flex justify-center text-[12px]"
            >21</strong
          >
        </div>
        <div class="col-span-1 flex justify-center items-center gap-2">
          Total number of LSA Request
          <strong
            class="w-[5rem] bg-[#A10E13] text-white rounded-full flex justify-center text-[12px]"
            >21</strong
          >
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 min-[100px]:col-span-9 border-2 rounded-[5px] flex flex-col h-[70%]">
      <div class="font-bold bg-gray-100 p-3">Task To Do!</div>
      <div class="font-bold p-6 h-full">
        Welcome to Hinsei & LSA Agreement List System
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const hinsei_date_from = ref();
const hinsei_date_to = ref();
const lsa_date_from = ref();
const lsa_date_to = ref();

const chartData = ref({
  labels: ["OK", "NG", "PENDING"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702],
      backgroundColor: ["#A10E13"],
    },
  ],
});

onMounted(() => {
  chartOptions.value = setChartOptions();
});
const chartOptions = ref();

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          fontColor: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>
