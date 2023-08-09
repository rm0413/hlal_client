<template>
  <div
    class="h-[89vh] w-full grid grid-cols-12 min-[50px]:overflow-y-scroll lg:overflow-y-hidden gap-2 select-none"
  >
    <div class="lg:col-span-10 min-[100px]:col-span-9 h-full flex flex-col">
      <div class="grid grid-cols-2">
        <label
          class="col-span-1 text-[24px] tracking-widest font-bold text-gray-600 font-mono"
        >
          <font-awesome-icon class="h-6 w-6 text-black" icon="home" /> Dashboard
        </label>
        <label
          class="flex col-span-1 text-center items-center justify-end italic mr-6"
        >
          Today is {{ today }}
        </label>
      </div>
      <div
        class="flex flex-col justify-center py-4 px-16 bg-[#A10E13] rounded-full text-white"
      >
        <span class="flex-col-2 text-[1.5rem]"
          >Hello, <strong>{{ first_name }}</strong></span
        >
        <i class="text-[1rem] opacity-90"
          >Welcome to Hinsei & LSA Agreement List System</i
        >
      </div>
      <div class="py-3 px-12 font-bold text-[22px] mb-2">
        <font-awesome-icon icon="chart-simple" /> Request Status
      </div>
      <label
        for=""
        class="absolute mt-[11rem] ml-[5rem] text-gray-500 text-[14px]"
        ><b
          ><i
            >{{ dashboardStore.chartData.hinsei_request }} Total Hinsei Request
            as of {{ dashboardStore.date_from }} to
            {{ dashboardStore.date_to }}</i
          ></b
        ></label
      >
      <div class="grid grid-cols-2 h-[70%] mt-4">
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
          <label for="" class="ml-[5rem] text-gray-500 text-[14px]"
            ><b
              ><i
                >{{ dashboardStore.chartData.lsa_request }} Total LSA Request as
                of {{ dashboardStore.date_from }} to
                {{ dashboardStore.date_to }}</i
              ></b
            ></label
          >
        </div>
        <div class="col-span-1 grid grid-rows-2">
          <div class="col-span-1 flex flex-col gap-2 items-center">
            <legend
              class="flex col-span-2 text-center shadow-md justify-center items-center w-[80%] p-2 rounded bg-[#A10E13] text-white"
            >
              Date Filter
            </legend>
            <form
              method="post"
              class="w-[80%] p-2 grid grid-cols-2 p-3 gap-2 border-2 shadow-lg rounded-md bg-gray-100"
              @submit.prevent="submitDateFilter"
            >
              <label for="" class="flex flex-col text-[14px] w-full">
                From
                <input
                  type="date"
                  v-model="dashboardStore.date_from"
                  class="p-2 rounded border-2 hover:border-red-600 outline-green-600"
                  required
                  :max="max_date"
                />
              </label>
              <label for="" class="flex flex-col text-[14px] w-full">
                To
                <input
                  type="date"
                  v-model="dashboardStore.date_to"
                  required
                  class="p-2 rounded border-2 hover:border-red-600 outline-green-600"
                  :max="max_date"
                />
              </label>
              <button
                type="submit"
                class="flex col-span-2 bg-red-800 w-[50%] p-2 rounded text-white hover:bg-red-700 mt-2 justify-center justify-self-center"
              >
                Search
              </button>
            </form>
          </div>

          <div class="col-span-1 flex flex-col gap-8 items-center">
            <div
              class="col-span-1 flex justify-center items-center gap-2 h-[10vh] w-[25vw] bg-gray-200 rounded-full shadow-lg"
            >
              Total number of Hinsei Request
              <button
                @click="openModal('hinseiCount')"
                class="w-[10rem] h-[2rem] border-blue-900 border-2 bg-blue-300 text-blue-800 rounded-full flex justify-center text-[14px] items-center font-bold"
              >
                {{ hinsei_count }}
              </button>
            </div>
            <div
              class="col-span-1 flex justify-center items-center gap-2 h-[10vh] w-[25vw] bg-gray-200 rounded-full shadow-lg"
            >
              Total number of LSA Request
              <button
                @click="openModal('lsaCount')"
                class="w-[10rem] h-[2rem] border-orange-900 border-2 bg-orange-300 text-orange-800 rounded-full flex justify-center text-[14px] items-center font-bold"
              >
                {{ lsa_count }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:col-span-2 min-[100px]:col-span-9 border-2 rounded-md flex flex-col h-[88vh]"
    >
      <div
        class="font-bold bg-[#A10E13] p-3 drop-shadow-xl text-white rounded-t-md"
      >
        Task To Do!
      </div>
      <div class="font-bold p-6 h-[35vh]">
        Welcome to Hinsei & LSA Agreement List System
      </div>
      <div
        class="font-bold outline-1 bg-[#A10E13] p-3 drop-shadow-xl text-white"
      >
        Activity Logs!
      </div>
      <div class="p-4 overflow-scroll w-[15.5vw] h-[53vh]">
        <div class="flex flex-col space-y-3">
          <ul
            v-for="(i, key) in logs_activity"
            :key="key"
            class="rounded-lg border border-black shadow-xl select-none text-center"
          >
            <span class="text-[13.5px] p-2 rounded font-mono font-bold">
              {{ i.subject }}</span
            ><br />
            <p class="text-[12px] italic p-1">
              <font-awesome-icon icon="user" class="text-blue-700" /> by :
              {{ i.name }}
            </p>
            <p class="text-[12px] italic p-1">
              <font-awesome-icon icon="clipboard-list" class="text-green-700" />
              Date: {{ i.date }}
            </p>
          </ul>
        </div>
      </div>
    </div>

    <Toast position="bottom-left"></Toast>
  </div>

  <!--HINSEI REQUEST COUNT-->
  <dialog
    ref="hinseiCount"
    class="w-[70vh] h-[25vh] rounded-lg p-0 select-none"
  >
    <div class="flex p-2 items-center justify-between bg-[#A10E13]">
      <span class="text-white"
        ><font-awesome-icon
          icon="chart-line"
          class="h-5 text-white mr-2 ml-1"
        />
        Agreement List Overview (Hinsei Request)</span
      >
      <button @click="closeModal('hinseiCount')">
        <font-awesome-icon
          icon="xmark"
          class="px-3 py-2 rounded-full hover:bg-red-500 text-white"
        />
      </button>
    </div>

    <div class="h-[77%]">
      <div class="grid grid-cols-3 h-[70%] gap-2 p-3">
        <div
          class="grid justify-end h-full bg-green-700 rounded-xl place-content-end border-4 border-green-600 p-2"
        >
          <font-awesome-icon
            icon="thumbs-up"
            class="absolute text-green-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ hinsei_ok }}</span>
        </div>

        <div
          class="grid justify-end h-full bg-red-700 rounded-xl place-content-end border-4 border-red-600 p-2"
        >
          <font-awesome-icon
            icon="thumbs-down"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ hinsei_ng }}</span>
        </div>

        <div
          class="grid justify-end h-full bg-yellow-500 rounded-xl place-content-end border-4 border-yellow-600 p-2"
        >
          <font-awesome-icon
            icon="hourglass-half"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{
            hinsei_pending
          }}</span>
        </div>
      </div>
      <div
        class="h-[20%] grid grid-cols-3 justify-center items-center text-center"
      >
        <div>
          <font-awesome-icon icon="square" class="text-green-700" />
          OK
        </div>
        <div>
          <font-awesome-icon icon="square" class="text-red-700" />
          NG
        </div>
        <div>
          <font-awesome-icon icon="square" class="text-yellow-500" />
          PENDING
        </div>
      </div>
    </div>
  </dialog>

  <!--LSA REQUEST COUNT-->
  <dialog ref="lsaCount" class="w-[70vh] h-[25vh] rounded-lg p-0 select-none">
    <div class="flex p-2 items-center justify-between bg-[#A10E13]">
      <span class="text-white"
        ><font-awesome-icon
          icon="chart-line"
          class="h-5 text-white mr-2 ml-1"
        />
        Agreement List Overview (LSA Request)</span
      >
      <button @click="closeModal('lsaCount')">
        <font-awesome-icon
          icon="xmark"
          class="px-3 py-2 rounded-full hover:bg-red-500 text-white"
        />
      </button>
    </div>

    <div class="h-[77%]">
      <div class="grid grid-cols-3 h-[70%] gap-2 p-3">
        <div
          class="grid justify-end h-full bg-green-700 rounded-xl place-content-end border-4 border-green-600 p-2"
        >
          <font-awesome-icon
            icon="thumbs-up"
            class="absolute text-green-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ lsa_ok }}</span>
        </div>

        <div
          class="grid justify-end h-full bg-red-700 rounded-xl place-content-end border-4 border-red-600 p-2"
        >
          <font-awesome-icon
            icon="thumbs-down"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ lsa_ng }}</span>
        </div>

        <div
          class="grid justify-end h-full bg-yellow-500 rounded-xl place-content-end border-4 border-yellow-600 p-2"
        >
          <font-awesome-icon
            icon="hourglass-half"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{
            lsa_pending
          }}</span>
        </div>
      </div>
      <div
        class="h-[20%] grid grid-cols-3 justify-center items-center text-center"
      >
        <div>
          <font-awesome-icon icon="square" class="text-green-700" />
          OK
        </div>
        <div>
          <font-awesome-icon icon="square" class="text-red-700" />
          NG
        </div>
        <div>
          <font-awesome-icon icon="square" class="text-yellow-500" />
          PENDING
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDashboardStore } from "@/modules/dashboard.js";
import moment from "moment";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const dashboardStore = useDashboardStore();
const max_date = moment().format("yyyy-MM-DD");
const date_today = moment().format("yyyy-MM-DD");
const startOfMonth = moment().startOf("month").format("yyyy-MM-DD");
const today = moment().format("MMMM D , Y");
const hinseiCount = ref();
const hinsei_ok = ref(null);
const hinsei_ng = ref(null);
const hinsei_pending = ref(null);
const lsaCount = ref();
const lsa_ok = ref(null);
const lsa_ng = ref(null);
const lsa_pending = ref(null);

const openModal = (modal) => {
  if (modal === "hinseiCount") {
    hinseiCount.value.showModal();
  } else {
    lsaCount.value.showModal();
  }
};

const closeModal = (modal) => {
  if (modal === "hinseiCount") {
    hinseiCount.value.close();
  } else {
    lsaCount.value.close();
  }
};

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

const hinsei_count = ref(null);
const lsa_count = ref(null);
onMounted(() => {
  dashboardStore.date_from = startOfMonth;
  dashboardStore.date_to = date_today;
  submitDateFilter();
  chartOptions.value = setChartOptions();
  dashboardStore.setCountRequest().then((response) => {
    hinsei_count.value = response.data[0].hinsei_count;
    lsa_count.value = response.data[0].count_lsa;
    hinsei_ok.value = response.data[0].hinsei_ok;
    hinsei_ng.value = response.data[0].hinsei_ng;
    hinsei_pending.value = response.data[0].hinsei_pending;
    lsa_ok.value = response.data[0].lsa_ok;
    lsa_ng.value = response.data[0].lsa_ng;
    lsa_pending.value = response.data[0].lsa_pending;
  });
});

const logs_activity = ref([]);
const showActivityLogs = () => {
  dashboardStore.setActivityLogs().then((response) => {
    logs_activity.value = [];
    var datastorage = [];
    response.data.forEach((v) => {
      datastorage = {
        name: v.name,
        subject: v.subject,
        date: v.created_at,
      };
      logs_activity.value.push(datastorage);
    });
  });
};

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
          drawBorder: true,
        },
      },
    },
  };
};

const submitDateFilter = () => {
  showActivityLogs();
  dashboardStore.setLoadCountResult().then((response) => {
    if (response.status === "success") {
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
    } else {
      Object.keys(response.error).forEach((key) => {
        toast.add({
          severity: "error",
          summary: "Warning",
          detail: response.error[key][0],
          life: 5000,
        });
      });
    }
  });
};
</script>