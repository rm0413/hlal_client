<template>
  <div
    class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2"
  >
    <div class="lg:col-span-6 min-[100px]:col-span-9 h-full flex flex-col">
      <label
        class="text-[24px] tracking-widest font-bold text-gray-600 font-mono"
      >
        <font-awesome-icon class="h-6 w-6 text-black" icon="home" /> Dashboard
      </label>
      <div
        class="flex flex-col justify-center py-4 px-16 bg-[#A10E13] rounded-full text-white"
      >
        <span class="text-[1.5rem]"
          >Hello, <strong>{{ first_name }}</strong></span
        >
        <i class="text-[1rem] opacity-90"
          >Welcome to Hinsei & LSA Agreement List System</i
        >
      </div>
      <div class="py-3 px-12 font-bold text-[18px]">Request Status</div>
      <div class="grid grid-cols-2 h-[70%]">
        <div class="col-span-1 grid grid-rows-2">
          <div class="row-span-1">
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="h-full"
            />
          </div>
          <div class="row-span-1">
            <Chart
              type="bar"
              :data="chartData2"
              :options="chartOptions"
              class="h-full"
            />
          </div>
          <!-- <form class="flex flex-col">

            <label for="" class="flex flex-col text-[14px]">
              From
              <input type="date" class="p-2 border-2 rounded-[5px] h-[2.5rem] hover:border-[#A10E13]"
                v-model="dashboardStore.date_from" />
            </label>
            <label for="" class="flex flex-col text-[14px]">
              To
              <input type="date" class="p-2 border-2 rounded-[5px] h-[2.5rem] mr-3 hover:border-[#A10E13]"
                v-model="dashboardStore.date_to" />
            </label>
            <button class="bg-red-800"></button>
          </form> -->
        </div>
        <div class="col-span-1 flex flex-col justify-center items-center gap-2">
          <fieldset
            class="w-[40%] flex flex-col justify-center items-center gap-2 border-2"
          >
            <legend class="ml-2">Date Filter</legend>
            <form
              method="post"
              class="w-full p-2"
              @submit.prevent="submitDateFilter"
            >
              <label for="" class="flex flex-col text-[14px] w-full">
                From
                <input
                  type="date"
                  v-model="dashboardStore.date_from"
                  class="p-2 rounded border-2 hover:border-red-600 outline-green-600"
                  required
                />
              </label>
              <label for="" class="flex flex-col text-[14px] w-full">
                To
                <input
                  type="date"
                  v-model="dashboardStore.date_to"
                  required
                  class="p-2 rounded border-2 hover:border-red-600 outline-green-600"
                />
              </label>
              <button
                type="submit"
                class="bg-red-800 w-full p-2 rounded text-white hover:bg-red-700 mt-2"
              >
                Search
              </button>
            </form>
            <!-- <div class="grid grid-cols-2 gap-3">
          </div> -->
          </fieldset>
        </div>
      </div>
      <div class="grid grid-cols-2 h-[10%] mt-9">
        <div class="col-span-1 flex justify-center items-center gap-2">
          Total number of Hinsei Request
          <button
            class="w-[10rem] h-[2rem] bg-blue-500 text-white rounded-full flex justify-center text-[14px] items-center font-bold"
          >
            {{ hinsei_count }}
          </button>
        </div>
        <div class="col-span-1 flex justify-center items-center gap-2">
          Total number of LSA Request<button
            class="w-[10rem] h-[2rem] bg-orange-600 text-white rounded-full flex justify-center text-[14px] items-center font-bold"
          >
            {{ lsa_count }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="lg:col-span-3 min-[100px]:col-span-9 border-2 rounded-[5px] flex flex-col h-[70%]"
    >
      <div class="font-bold bg-gray-100 p-3">Task To Do!</div>
      <div class="font-bold p-6 h-full">
        Welcome to Hinsei & LSA Agreement List System
        {{ dashboardStore.chartData }}
      </div>
    </div>
  </div>

  
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDashboardStore } from "@/modules/dashboard.js";
// import { useToast } from "primevue/usetoast";
// const toast = useToast();
// const swal = inject("$swal");
const dashboardStore = useDashboardStore();



const first_name = sessionStorage.getItem("first_name");
const documentStyle = getComputedStyle(document.body);
const chartData = ref({
  labels: ["OK", "NG", "PENDING"],
  datasets: [
    {
      label: "Hinsei",
      data: dashboardStore.chartData.hinsei,
      backgroundColor: [
        documentStyle.getPropertyValue("--green-700"),
        documentStyle.getPropertyValue("--red-700"),
        documentStyle.getPropertyValue("--yellow-500"),
      ],
      hoverBackgroundColor: [
        documentStyle.getPropertyValue("--green-400"),
        documentStyle.getPropertyValue("--red-400"),
        documentStyle.getPropertyValue("--yellow-400"),
      ],
      // backgroundColor: ["#A10E13"],
    },
  ],
});
const chartData2 = ref({
  labels: ["OK", "NG", "PENDING"],
  datasets: [
    {
      label: "LSA",
      data: dashboardStore.chartData.lsa,
      backgroundColor: [
        documentStyle.getPropertyValue("--green-700"),
        documentStyle.getPropertyValue("--red-700"),
        documentStyle.getPropertyValue("--yellow-500"),
      ],
      hoverBackgroundColor: [
        documentStyle.getPropertyValue("--green-400"),
        documentStyle.getPropertyValue("--red-400"),
        documentStyle.getPropertyValue("--yellow-400"),
      ],
    },
  ],
});
/**
 * labels: []
 *
 */
const hinsei_count = ref(null);
const lsa_count = ref(null);
onMounted(() => {
  chartOptions.value = setChartOptions();
  dashboardStore.setCountRequest().then((response) => {
    hinsei_count.value = response.data[0].hinsei_count;
    lsa_count.value = response.data[0].count_lsa;
  });
});
const chartOptions = ref();

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
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

const data_request_result = ref([]);

const submitDateFilter = () => {
  dashboardStore.setLoadCountResult().then((response) => {
    chartData.value = {
      labels: ["OK", "NG", "PENDING"],
      datasets: [
        {
          label: "Hinsei",
          data: dashboardStore.chartData.hinsei,
          backgroundColor: [
            documentStyle.getPropertyValue("--green-700"),
            documentStyle.getPropertyValue("--red-700"),
            documentStyle.getPropertyValue("--yellow-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--yellow-400"),
          ],
          // backgroundColor: ["#A10E13"],
        },
      ],
    };

    chartData2.value = {
      labels: ["OK", "NG", "PENDING"],
      datasets: [
        {
          label: "LSA",
          data: dashboardStore.chartData.lsa,
          backgroundColor: [
            documentStyle.getPropertyValue("--green-700"),
            documentStyle.getPropertyValue("--red-700"),
            documentStyle.getPropertyValue("--yellow-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--yellow-400"),
          ],
        },
      ],
    };
  });
  // console.log(dashboardStore.getCountResult)
};
</script>
