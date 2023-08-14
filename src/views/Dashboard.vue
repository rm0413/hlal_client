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
          <font-awesome-icon class="h-5 w-5 mr-1 text-gray-700" icon="clock" />
          {{ today }}
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
      <div class="grid grid-cols-2 h-[5vh]">
        <div class="col-span-1 py-3 px-12 font-bold text-[22px]">
          <font-awesome-icon icon="chart-simple" /> Request Status
        </div>
        <div class="col-span-1 p-2">
          <form method="post" class="h-full" @submit.prevent="submitDateFilter">
            <div class="grid grid-cols-7 h-full gap-2">
              <div
                class="flex col-span-3 items-center justify-center text-white rounded-l"
              >
                <label
                  class="flex w-[30%] justify-center bg-gray-500 h-full items-center rounded-l"
                  >From:</label
                >
                <input
                  type="date"
                  v-model="dashboardStore.date_from"
                  required
                  class="rounded border-2 hover:border-red-600 outline-green-600 w-[70%] h-full text-center px-3 text-black"
                  :max="max_date"
                />
              </div>
              <div
                class="flex col-span-3 items-center justify-center text-white rounded-l"
              >
                <label
                  class="flex w-[30%] justify-center bg-gray-500 h-full items-center rounded-l"
                  >To:</label
                >
                <input
                  type="date"
                  v-model="dashboardStore.date_to"
                  required
                  class="rounded border-2 hover:border-red-600 outline-green-600 w-[70%] h-full text-center px-3 text-black"
                  :max="max_date"
                />
              </div>
              <div class="col-span-1 bg-pink-200">
                <button
                  type="submit"
                  class="w-full h-full bg-red-800 rounded text-white hover:bg-red-700 justify-center"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
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
      <div class="grid grid-cols-2 h-[73%] mt-4">
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
        <div
          class="col-span-1 grid grid-rows-2 justify-center items-center place-items-center"
        >
          <div
            class="row-span-1 shadow-lg h-[25vh] w-[50vh] text-center p-3 bg-gray-100 border-t-2 border-[#A10A13]"
          >
            <span class="font-bold text-[18px] uppercase">Hinsei Request</span>
            <div class="grid grid-cols-3">
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >OK</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ hinsei_ok }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >NG</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ hinsei_ng }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >PENDING</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ hinsei_pending }}</span
                  >
                </div>
              </div>
              <div
                class="col-span-3 mt-3 bg-white w-full h-[6vh] rounded-full shadow-lg"
              >
                <div class="grid grid-cols-2">
                  <div
                    class="flex col-span-1 h-[6vh] justify-center items-center"
                  >
                    Total Hinsei Request:
                  </div>
                  <button
                    @click="openModal('hinseiCount')"
                    class="flex col-span-1 h-[6vh] justify-center items-center font-bold text-[40px] text-white bg-[#A10A13] rounded-r-full hover:bg-red-600"
                  >
                    {{ hinsei_count }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row-span-1 shadow-lg h-[25vh] w-[50vh] text-center p-3 bg-gray-100 border-t-2 border-[#A10A13]"
          >
            <span class="font-bold text-[18px] uppercase">LSA Request</span>
            <div class="grid grid-cols-3">
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >OK</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ lsa_ok }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >NG</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ lsa_ng }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="rounded-md bg-gray-100 w-[130px] h-[120px] border border-gray-500"
                >
                  <label
                    for=""
                    class="flex text-[20px] bg-[#A10A13] text-white justify-center"
                    >PENDING</label
                  >
                  <span
                    class="flex justify-center h-[74%] text-[45px] bg-white items-center text-center"
                    >{{ lsa_pending }}</span
                  >
                </div>
              </div>
              <div
                class="col-span-3 mt-3 bg-white w-full h-[6vh] rounded-full shadow-lg"
              >
                <div class="grid grid-cols-2">
                  <div
                    class="flex col-span-1 h-[6vh] justify-center items-center"
                  >
                    Total LSA Request:
                  </div>
                  <button
                    @click="openModal('lsaCount')"
                    class="flex col-span-1 h-[6vh] justify-center items-center font-bold text-[40px] text-white bg-[#A10A13] rounded-r-full hover:bg-red-600"
                  >
                    {{ lsa_count }}
                  </button>
                </div>
              </div>
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
        <font-awesome-icon icon="bookmark" class="w-[15px] h-[17px]" />
        Task To Do!
      </div>
      <div class="p-4 overflow-scroll w-[15.5vw] h-[53vh]">
        <div class="flex flex-col space-y-3">
          <div
            class="grid grid-cols-7 rounded-lg border-t-4 border-gray-800 shadow-xl select-none text-center h-[8vh]"
          >
            <dialog
              ref="request_generate_data_dialog"
              class="h-[30%] w-[15%] ml-[69.2%] mt-[7.6%] border-2 border-[#A10A13] p-0 select-none"
            >
              <div
                class="flex bg-[#A10A13] h-[13%] pl-2 items-center text-white font-mono font-bold text-[20px] justify-between sticky top-0"
              >
                PART NUMBER
                <button @click="closeModal('request_generate_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="flex px-3 py-2 rounded-full hover:bg-red-500 text-white"
                  />
                </button>
              </div>
              <div
                v-for="(i, key) in task_to_do_generate"
                :key="key"
                class="pb-0.5"
              >
                <div class="w-full border border-black">
                  {{ i.part_number }}
                </div>
              </div>
            </dialog>
            <div
              class="flex col-span-1 justify-center bg-gray-800 rounded-l-md select-none cursor-pointer hover:bg-gray-500"
              @click="openModal('request_generate_data_dialog')"
            >
              <div
                ref="forGenerate"
                class="flex flex-col justify-center items-center rotate-360 transition transform ease-in-out"
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div class="col-span-6 self-center">
              <span class="font-mono text-[14px] font-bold"
                >Request needs to have CODE</span
              >
              <p>{{ requestGenerateData.total_count }}</p>
            </div>
          </div>
          <div
            class="grid grid-cols-7 rounded-lg border-t-4 border-gray-800 shadow-xl select-none text-center h-[8vh] w-full"
          >
            <dialog
              ref="designer_data_dialog"
              class="h-[30%] w-[15%] ml-[69.2%] mt-[12.4%] border-2 border-[#A10A13] p-0 select-none gap-2"
            >
              <div
                class="flex bg-[#A10A13] h-[13%] pl-2 items-center text-white font-mono font-bold text-[20px] justify-between sticky top-0"
              >
                PART NUMBER
                <button @click="closeModal('designer_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="flex px-3 py-2 rounded-full hover:bg-red-500 text-white"
                  />
                </button>
              </div>
              <div
                v-for="(i, key) in task_to_do_designer"
                :key="key"
                class="pb-0.5"
              >
                <div class="w-full border border-black">
                  {{ i.part_number }}
                </div>
              </div>
            </dialog>
            <div
              class="flex col-span-1 justify-center bg-gray-800 rounded-l-md select-none cursor-pointer hover:bg-gray-500"
              @click="openModal('designer_data_dialog')"
            >
              <div
                ref="forDesigner"
                class="flex flex-col justify-center items-center rotate-360 transition transform ease-in-out"
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div class="col-span-6 self-center">
              <span class="font-mono text-[14px] font-bold"
                >Request needs to have DESIGNER ANSWER</span
              >
              <p>{{ designerData.total_count }}</p>
            </div>
          </div>
          <div
            class="grid grid-cols-7 rounded-lg border-t-4 border-gray-800 shadow-xl select-none text-center h-[8vh]"
          >
            <dialog
              ref="inspection_data_dialog"
              class="h-[30%] w-[15%] ml-[69.2%] mt-[17.1%] border-2 border-[#A10A13] p-0 select-none"
            >
              <div
                class="flex bg-[#A10A13] h-[13%] pl-2 items-center text-white font-mono font-bold text-[20px] justify-between sticky top-0"
              >
                PART NUMBER
                <button @click="closeModal('inspection_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="flex px-3 py-2 rounded-full hover:bg-red-500 text-white"
                  />
                </button>
              </div>
              <div
                v-for="(i, key) in task_to_do_inspection"
                :key="key"
                class="pb-0.5"
              >
                <div class="w-full border border-black p-1">
                  {{ i.part_number }}
                </div>
              </div>
            </dialog>
            <div
              class="flex col-span-1 justify-center bg-gray-800 rounded-l-md select-none cursor-pointer hover:bg-gray-500"
              @click="openModal('inspection_data_dialog')"
            >
              <div
                ref="forInspection"
                class="flex flex-col justify-center items-center rotate-360 transition transform ease-in-out"
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div class="col-span-6 self-center">
              <span class="font-mono text-[14px] font-bold"
                >Request that have CRITICAL PARTS
              </span>
              <p>{{ inspectionData.total_count }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="font-bold outline-1 bg-[#A10E13] p-3 drop-shadow-xl text-white"
      >
        <font-awesome-icon icon="table-list" class="w-5 h-[17px]" />
        Activity Logs!
      </div>
      <div class="p-4 overflow-scroll w-[15.5vw] h-[85vh]">
        <div class="flex flex-col space-y-3">
          <ul
            v-for="(i, key) in logs_activity"
            :key="key"
            v-tooltip.left="{
              value: `<div class='font-bold'>Activity Logs Details</div><div class='font-bold'>Agent:</div>${i.agent}<div class='font-bold'>IP:</div>${i.ip}`,
              escape: true,
              class: 'custom-error',
            }"
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
    class="w-[70vh] h-[25vh] rounded-lg p-0 select-none border-2 border-[#A10A13]"
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
  <dialog
    ref="lsaCount"
    class="w-[70vh] h-[25vh] rounded-lg p-0 select-none border-2 border-[#A10A13]"
  >
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
const today = moment().format("[Today is ]dddd, MMMM Do YYYY");
const hinseiCount = ref();
const hinsei_ok = ref(null);
const hinsei_ng = ref(null);
const hinsei_pending = ref(null);
const lsaCount = ref();
const lsa_ok = ref(null);
const lsa_ng = ref(null);
const lsa_pending = ref(null);
const inspection_data_dialog = ref(null);
const designer_data_dialog = ref(null);
const request_generate_data_dialog = ref(null);

const openModal = (modal) => {
  if (modal === "hinseiCount") {
    hinseiCount.value.showModal();
  } else if (modal === "lsaCount") {
    lsaCount.value.showModal();
  } else if (modal === "inspection_data_dialog") {
    forInspection.value.classList.replace("rotate-360", "rotate-180");
    inspection_data_dialog.value.showModal();
  } else if (modal === "designer_data_dialog") {
    forDesigner.value.classList.replace("rotate-360", "rotate-180");
    designer_data_dialog.value.showModal();
  } else if (modal === "request_generate_data_dialog") {
    forGenerate.value.classList.replace("rotate-360", "rotate-180");
    request_generate_data_dialog.value.showModal();
  }
};

const forInspection = ref(null);
const forDesigner = ref(null);
const forGenerate = ref(null);

const closeModal = (modal) => {
  if (modal === "hinseiCount") {
    hinseiCount.value.close();
  } else if (modal === "lsaCount") {
    lsaCount.value.close();
  } else if (modal === "inspection_data_dialog") {
    forInspection.value.classList.replace("rotate-180", "rotate-360");
    inspection_data_dialog.value.close();
  } else if (modal === "designer_data_dialog") {
    forDesigner.value.classList.replace("rotate-180", "rotate-360");
    designer_data_dialog.value.close();
  } else if (modal === "request_generate_data_dialog") {
    forGenerate.value.classList.replace("rotate-180", "rotate-360");
    request_generate_data_dialog.value.close();
  }
};

const hinsei_count = ref(null);
const lsa_count = ref(null);
onMounted(() => {
  dashboardStore.date_from = startOfMonth;
  dashboardStore.date_to = date_today;
  submitDateFilter();
  chartOptions.value = setChartOptions();
  taskToDo();
});

const countRequest = () => {
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
};
const requestGenerateData = ref([]);
const inspectionData = ref([]);
const designerData = ref([]);
const part_number = ref([]);
const task_to_do_designer = ref([]);
const task_to_do_generate = ref([]);
const task_to_do_inspection = ref([]);

const taskToDo = () => {
  dashboardStore.setLoadTaskList().then((response) => {
    requestGenerateData.value = response.data.request_generate_data;
    inspectionData.value = response.data.inspection_data;
    designerData.value = response.data.designer_data;

    task_to_do_designer.value = [];
    response.data.designer_data.part_number.forEach((v) => {
      var datastorage = {
        part_number: v.part_number,
      };
      task_to_do_designer.value.push(datastorage);
    });

    task_to_do_generate.value = [];
    response.data.request_generate_data.part_number.forEach((v) => {
      var datastorage1 = {
        part_number: v.part_number,
      };
      task_to_do_generate.value.push(datastorage1);
    });

    task_to_do_inspection.value = [];
    response.data.inspection_data.part_number.forEach((v) => {
      var datastorage2 = {
        part_number: v.part_number,
      };
      task_to_do_inspection.value.push(datastorage2);
    });
  });
};

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
        agent: v.agent,
        ip: v.ip,
        url: v.url,
      };
      logs_activity.value.push(datastorage);
    });
  });
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
        display: false,
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
  countRequest();
  dashboardStore.setCountRequest();
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

// const isClick_generate = ref(null);
// const isClick_designer = ref(null);
// const isClick_inspection = ref(null);

</script>
<style>
.custom-error {
  padding: 0;
}
.custom-error .p-tooltip-text {
  color: white;
  justify-content: center;
}
/* .rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease-in-out;
} */
/* .rotate_back {
  transform: rotate(180deg);
  transition: transform 0.3s ease-in-out;
} */
</style>