<template>
  <div
    class="
      h-[89vh]
      w-full
      grid grid-cols-12
      min-[100px]:overflow-y-scroll
      lg:overflow-y-hidden
      gap-2
      select-none
    "
  >
    <div class="lg:col-span-10 min-[100px]:col-span-12 h-full flex flex-col">
      <div class="grid grid-cols-2">
        <label
          class="
            col-span-1
            lg:text-[24px]
            tracking-widest
            font-bold
            text-gray-600
            font-mono
            min-[100px]:text-[18px]
          "
        >
          <font-awesome-icon
            class="h-6 w-6 max-lg:h-4 max-lg:w-4 text-black"
            icon="home"
          />
          Dashboard
        </label>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          py-4
          px-16
          bg-[#A10E13]
          rounded-full
          text-white
        "
      >
        <span class="flex-col-2 lg:text-[1.5rem] min-[100px]:text-[1rem]"
          >Hello, <strong>{{ first_name }}</strong></span
        >
        <i class="lg:text-[1rem] opacity-90 min-[100px]:text-[.8rem]"
          >Welcome to Hinsei & LSA Agreement List System</i
        >
      </div>
      <div class="grid grid-cols-2 h-[5vh]">
        <div
          class="
            col-span-1
            py-3
            px-12
            font-bold
            lg:text-[22px]
            min-[100px]:text-[18px]
          "
        >
          <font-awesome-icon icon="chart-simple" /> Request Status
        </div>
        <div class="col-span-1 p-2">
          <form
            method="post"
            class="lg:h-full min-[100px]:h-[85%]"
            @submit.prevent="submitDateFilter"
          >
            <div class="grid grid-cols-7 h-full gap-2">
              <div
                class="
                  flex
                  col-span-3
                  items-center
                  justify-center
                  text-white
                  rounded-l
                "
              >
                <label
                  class="
                    flex
                    w-[30%]
                    justify-center
                    bg-gray-500
                    h-full
                    items-center
                    rounded-l
                    max-lg:text-[13px]
                  "
                  >From:</label
                >
                <input
                  type="date"
                  v-model="dashboardStore.date_from"
                  required
                  class="
                    rounded
                    border-2
                    hover:border-red-600
                    outline-green-600
                    w-[70%]
                    h-full
                    text-center
                    px-3
                    text-black
                    max-lg:text-[13px]
                  "
                  :max="max_date"
                />
              </div>
              <div
                class="
                  flex
                  col-span-3
                  items-center
                  justify-center
                  text-white
                  rounded-l
                "
              >
                <label
                  class="
                    flex
                    w-[30%]
                    justify-center
                    bg-gray-500
                    h-full
                    items-center
                    rounded-l
                    max-lg:text-[13px]
                  "
                  >To:</label
                >
                <input
                  type="date"
                  v-model="dashboardStore.date_to"
                  required
                  class="
                    rounded
                    border-2
                    hover:border-red-600
                    outline-green-600
                    w-[70%]
                    h-full
                    text-center
                    px-3
                    text-black
                    max-lg:text-[13px]
                  "
                  :max="max_date"
                />
              </div>
              <div class="col-span-1 bg-pink-200">
                <button
                  type="submit"
                  class="
                    w-[100%]
                    h-[100%]
                    bg-red-800
                    rounded
                    text-white
                    hover:bg-red-700
                    justify-center
                    max-lg:text-[13px]
                  "
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
        class="ml-[5rem] text-gray-500 lg:text-[14px] min-[100px]:text-[12px]"
        ><b
          ><i
            >{{ dashboardStore.chartData.hinsei_request }} Total Hinsei Request
            as of {{ dashboardStore.date_from }} to
            {{ dashboardStore.date_to }}</i
          ></b
        ></label
      >
      <div class="grid grid-cols-2 h-[73%] mt-2">
        <div class="col-span-1 grid grid-rows-2">
          <div class="row-span-1">
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="h-full max-lg:h-[95%] max-lg:w-[95%]"
            />
          </div>
          <div class="row-span-1">
            <Chart
              type="bar"
              :data="chartData2"
              :options="chartOptions"
              class="h-full max-lg:h-[95%] max-lg:w-[95%]"
            />
          </div>
          <label
            for=""
            class="
              ml-[5rem]
              text-gray-500
              lg:text-[14px]
              min-[100px]:text-[12px]
            "
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
          class="
            col-span-1
            grid grid-rows-2
            justify-center
            items-center
            place-items-center
          "
        >
          <div
            class="
              row-span-1
              shadow-lg
              h-[27vh]
              w-[25vw]
              text-center
              p-3
              bg-gray-100
              border-t-2 border-[#A10A13]
              max-lg:w-[40vw] max-lg:h-[22vh]
              min-[100px]:shadow-md
            "
          >
            <span
              class="font-bold lg:text-[18px] min-[100px]:text-[15px] uppercase"
              >Hinsei Request</span
            >
            <!-- <div class="flex flex-row w-[100%] h-[55%] justify-center gap-2">
              <div class="flex flex-col w-[27%] h-[100%] rounded-md border border-[#a10a13] bg-[#a10a13] text-white text-[1.2rem]">OK
                <span class="flex bg-white h-[80%] rounded-b-md justify-center items-center text-black text-[2.5rem]">{{ hinsei_ok }}</span>
              </div>
              <div class="flex flex-col w-[27%] rounded-md border border-[#a10a13] bg-[#a10a13] text-white text-[1.2rem]">NG
                <span class="flex bg-white h-[80%] rounded-b-md justify-center items-center text-black text-[2.5rem]">{{ hinsei_ng }}</span>
              </div>
              <div class="flex flex-col w-[27%] rounded-md border border-[#a10a13] bg-[#a10a13] text-white text-[1.2rem]">PENDING
                <span class="flex bg-white h-[80%] rounded-b-md justify-center items-center text-black text-[2.5rem]">{{ hinsei_pending }}</span>
              </div>
              <div class="absolute mt-[13%] bg-white w-[40%] rounded-full h-[5%]">
                asd
              </div>
            </div> -->
            <div class="grid grid-cols-3">
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      min-[100px]:text-[15px]
                    "
                    >OK</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >
                    {{ hinsei_ok }}
                    </span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      min-[100px]:text-[15px]
                    "
                    >NG</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >{{ hinsei_ng }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      min-[100px]:text-[15px]
                    "
                    >PENDING</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >{{ hinsei_pending }}</span
                  >
                </div>
              </div>
              <div
                class="
                  col-span-3
                  mt-3
                  bg-white
                  w-full
                  h-[6vh]
                  rounded-full
                  shadow-lg
                  max-lg:h-[5vh]
                "
              >
                <div class="grid grid-cols-2">
                  <div
                    class="
                      flex
                      col-span-1
                      h-[6vh]
                      justify-center
                      items-center
                      max-lg:h-[5vh] max-lg:text-[12px]
                    "
                  >
                    Total Hinsei Request:
                  </div>
                  <button
                    @click="openModal('hinseiCount')"
                    class="
                      flex
                      col-span-1
                      h-[6vh]
                      justify-center
                      items-center
                      font-bold
                      lg:text-[30px]
                      text-white
                      bg-[#A10A13]
                      rounded-r-full
                      hover:bg-red-600
                      min-[100px]:text-[23px]
                      max-lg:h-[5vh]
                    "
                  >
                    {{ hinsei_count }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              row-span-1
              shadow-lg
              h-[27vh]
              w-[25vw]
              text-center
              p-3
              bg-gray-100
              border-t-2 border-[#A10A13]
              max-lg:w-[40vw] max-lg:h-[22vh]
              min-[100px]:shadow-md
            "
          >
            <span class="font-bold lg:text-[18px] md:text-[15px] uppercase"
              >LSA Request</span
            >
            <div class="grid grid-cols-3">
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      md:text-[15px]
                    "
                    >OK</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >{{ lsa_ok }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      md:text-[15px]
                    "
                    >NG</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >{{ lsa_ng }}</span
                  >
                </div>
              </div>
              <div class="flex col-span-1 justify-center items-center">
                <div
                  class="
                    rounded-md
                    bg-gray-100
                    lg:w-[130px]
                    lg:h-[120px]
                    border border-[#a10a13]
                    min-[100px]:w-[90px] min-[100px]:h-[90px]
                  "
                >
                  <label
                    for=""
                    class="
                      flex
                      lg:text-[20px]
                      bg-[#A10A13]
                      text-white
                      justify-center
                      md:text-[15px]
                    "
                    >PENDING</label
                  >
                  <span
                    class="
                      flex
                      justify-center
                      h-[72%]
                      lg:text-[30px]
                      bg-white
                      items-center
                      text-center
                      overflow-hidden
                      break-words break-all
                      min-[100px]:text-[25px]
                      md:text-sm
                    "
                    >{{ lsa_pending }}</span
                  >
                </div>
              </div>
              <div
                class="
                  col-span-3
                  mt-3
                  bg-white
                  w-full
                  h-[6vh]
                  rounded-full
                  shadow-lg
                  max-lg:h-[5vh]
                "
              >
                <div class="grid grid-cols-2">
                  <div
                    class="
                      flex
                      col-span-1
                      h-[6vh]
                      justify-center
                      items-center
                      max-lg:h-[5vh] max-lg:text-[12px]
                    "
                  >
                    Total LSA Request:
                  </div>
                  <button
                    @click="openModal('lsaCount')"
                    class="
                      flex
                      col-span-1
                      h-[6vh]
                      justify-center
                      items-center
                      font-bold
                      lg:text-[30px]
                      text-white
                      bg-[#A10A13]
                      rounded-r-full
                      hover:bg-red-600
                      min-[100px]:text-[23px]
                      max-lg:h-[5vh]
                    "
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
      class="
        lg:col-span-2
        min-[100px]:col-span-12
        border-2
        rounded-md
        flex flex-col
        h-[88vh]
      "
    >
      <div
        class="
          font-bold
          bg-[#A10E13]
          p-3
          drop-shadow-xl
          text-white
          rounded-t-md
        "
      >
        <font-awesome-icon icon="bookmark" class="w-[15px] h-[17px]" />
        Task to Do!
      </div>
      <div
        class="p-4 overflow-scroll lg:w-[15.5vw] h-[53vh] min-[100px]:w-full"
      >
        <div class="flex flex-col space-y-3">
          <div
            class="
              grid grid-cols-7
              rounded-lg
              border-t-4 border-gray-800
              shadow-xl
              select-none
              text-center
              h-[12vh]
              max-lg:w-full
            "
          >
            <dialog
              ref="request_generate_data_dialog"
              class="
                h-[30%]
                w-[20%]
                ml-[64%]
                mt-[7.6%]
                border-2 border-[#A10A13]
                p-0
                select-none
                max-lg:ml-[42%] max-lg:mt-[35%] max-lg:w-[40%]
              "
            >
              <div
                class="
                  flex
                  bg-[#A10A13]
                  h-[13%]
                  pl-2
                  items-center
                  text-white text-[16px]
                  justify-between
                  sticky
                  top-0
                "
              >
                {{ requestGenerateData.total_count }} Request(s)
                <button @click="closeModal('request_generate_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="
                      flex
                      px-3
                      py-2
                      rounded-full
                      hover:bg-red-500
                      text-white
                    "
                  />
                </button>
              </div>
              <div class="grid grid-cols-2 sticky top-9">
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >PART NUMBER</span
                >
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >SUPPLIER</span
                >
              </div>
              <div
                v-for="(i, key) in task_to_do_generate"
                :key="key"
                class="pb-0.5"
              >
                <div class="grid grid-cols-2">
                  <span class="col-span-1 border border-gray-900">{{
                    i.part_number
                  }}</span>
                  <span class="col-span-1 border border-gray-900">{{
                    i.supplier_name
                  }}</span>
                </div>
              </div>
            </dialog>
            <div
              class="
                flex
                col-span-1
                justify-center
                bg-gray-800
                rounded-l-md
                select-none
                cursor-pointer
                hover:bg-gray-500
                max-lg:w-11 max-lg:h-15
              "
              @click="openModal('request_generate_data_dialog')"
            >
              <div
                ref="forGenerate"
                class="
                  flex
                  justify-center
                  items-center
                  rotate-360
                  transition
                  transform
                  ease-in-out
                  duration-700
                "
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div
              class="
                flex flex-col
                col-span-6
                self-center
                justify-center
                h-full
                text-[13px]
                max-lg:text-[18px]
              "
            >
              <span
                class="
                  flex flex-col
                  justify-center
                  items-center
                  h-[20%]
                  text-[3vh]
                  font-bold
                "
                >{{ requestGenerateData.total_count }}</span
              >
              <span class="flex flex-col justify-center items-center h-[40%]"
                >Request needs to GENERATE CODE</span
              >
            </div>
          </div>
          <div
            class="
              grid grid-cols-7
              rounded-lg
              border-t-4 border-gray-800
              shadow-xl
              select-none
              text-center
              h-[12vh]
              max-lg:w-full
            "
          >
            <dialog
              ref="designer_data_dialog"
              class="
                h-[30%]
                w-[20%]
                ml-[64%]
                mt-[14.5%]
                border-2 border-[#A10A13]
                p-0
                select-none
                max-lg:ml-[42%] max-lg:mt-[35%] max-lg:w-[40%]
              "
            >
              <div
                class="
                  flex
                  bg-[#A10A13]
                  h-[13%]
                  pl-2
                  items-center
                  text-white text-[16px]
                  justify-between
                  sticky
                  top-0
                "
              >
                {{ designerData.total_count }} Request(s)
                <button @click="closeModal('designer_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="
                      flex
                      px-3
                      py-2
                      rounded-full
                      hover:bg-red-500
                      text-white
                    "
                  />
                </button>
              </div>
              <div class="grid grid-cols-2 sticky top-9">
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >PART NUMBER</span
                >
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >SUPPLIER</span
                >
              </div>
              <div
                v-for="(i, key) in task_to_do_designer"
                :key="key"
                class="pb-0.5"
              >
                <div class="grid grid-cols-2">
                  <span class="col-span-1 border border-gray-900">{{
                    i.part_number
                  }}</span>
                  <span class="col-span-1 border border-gray-900">{{
                    i.supplier_name
                  }}</span>
                </div>
              </div>
            </dialog>
            <div
              class="
                flex
                col-span-1
                justify-center
                bg-gray-800
                rounded-l-md
                select-none
                cursor-pointer
                hover:bg-gray-500
                max-lg:w-11 max-lg:h-15
              "
              @click="openModal('designer_data_dialog')"
            >
              <div
                ref="forDesigner"
                class="
                  flex flex-col
                  justify-center
                  items-center
                  rotate-360
                  transition
                  transform
                  ease-in-out
                  duration-700
                "
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div
              class="
                flex flex-col
                col-span-6
                self-center
                justify-center
                h-full
                text-[13px]
                max-lg:text-[18px]
              "
            >
              <span
                class="
                  flex flex-col
                  justify-center
                  items-center
                  h-[20%]
                  text-[3vh]
                  font-bold
                "
                >{{ designerData.total_count }}</span
              >
              <span class="flex flex-col justify-center items-center h-[40%]"
                >Request needs to have DESIGNER ANSWER</span
              >
            </div>
          </div>
          <div
            class="
              grid grid-cols-7
              rounded-lg
              border-t-4 border-gray-800
              shadow-xl
              select-none
              text-center
              h-[12vh]
              max-lg:w-full
            "
          >
            <dialog
              ref="inspection_data_dialog"
              class="
                h-[30%]
                w-[20%]
                ml-[64%]
                mt-[21.2%]
                border-2 border-[#A10A13]
                p-0
                select-none
                max-lg:ml-[42%] max-lg:mt-[35%] max-lg:w-[40%]
              "
            >
              <div
                class="
                  flex
                  bg-[#A10A13]
                  h-[13%]
                  pl-2
                  items-center
                  text-white
                  lg:text-[16px]
                  justify-between
                  sticky
                  top-0
                  min-[100px]:text-[14px]
                "
              >
                {{ inspectionData.total_count }} Request(s)
                <button @click="closeModal('inspection_data_dialog')">
                  <font-awesome-icon
                    icon="xmark"
                    class="
                      flex
                      px-3
                      py-2
                      rounded-full
                      hover:bg-red-500
                      text-white
                    "
                  />
                </button>
              </div>
              <div class="grid grid-cols-2 sticky top-9">
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >PART NUMBER</span
                >
                <span
                  class="col-span-1 bg-gray-900 text-white border border-white"
                  >SUPPLIER</span
                >
              </div>
              <div
                v-for="(i, key) in task_to_do_inspection"
                :key="key"
                class="pb-0.5"
              >
                <div class="grid grid-cols-2">
                  <span class="col-span-1 border border-gray-900">{{
                    i.part_number
                  }}</span>
                  <span class="col-span-1 border border-gray-900">{{
                    i.supplier_name
                  }}</span>
                </div>
              </div>
            </dialog>
            <div
              class="
                flex
                col-span-1
                justify-center
                bg-gray-800
                rounded-l-md
                select-none
                cursor-pointer
                hover:bg-gray-500
                max-lg:w-11 max-lg:h-15
              "
              @click="openModal('inspection_data_dialog')"
            >
              <div
                ref="forInspection"
                class="
                  flex
                  justify-center
                  items-center
                  rotate-360
                  transition
                  transform
                  ease-in-out
                  duration-700
                "
              >
                <font-awesome-icon
                  icon="circle-arrow-right"
                  class="self-center h-6 text-white"
                />
              </div>
            </div>
            <div
              class="
                flex flex-col
                col-span-6
                self-center
                justify-center
                h-full
                text-[13px]
                max-lg:text-[18px]
              "
            >
              <span
                class="
                  flex flex-col
                  justify-center
                  items-center
                  h-[20%]
                  text-[3vh]
                  font-bold
                "
                >{{ inspectionData.total_count }}</span
              >
              <span class="flex flex-col justify-center items-center h-[40%]"
                >Request with CRITICAL PARTS</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          font-bold
          outline-1
          bg-[#A10E13]
          p-3
          drop-shadow-xl
          text-white text-[15px]
        "
      >
        <font-awesome-icon icon="table-list" class="w-5 h-[17px]" />
        Activity Logs!
      </div>
      <div class="p-4 overflow-scroll lg:w-[15.5vw] h-[33vh] md:w-[full]">
        <div class="flex flex-col space-y-3">
          <ul
            v-for="(i, key) in logs_activity"
            :key="key"
            v-tooltip.left="{
              value: `<div class='font-bold'>Activity Logs Details</div><div class='font-bold'>Agent:</div>${i.agent}<div class='font-bold'>IP:</div>${i.ip}`,
              escape: true,
              class: 'custom-error',
            }"
            class="
              rounded-lg
              border border-black
              shadow-xl
              select-none
              text-center
            "
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

    <Toast position="bottom-right"></Toast>
  </div>

  <!--HINSEI REQUEST COUNT-->
  <dialog
    ref="hinseiCount"
    class="
      w-[70vh]
      h-[25vh]
      rounded-lg
      p-0
      select-none
      border-2 border-[#A10A13]
    "
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
          class="
            grid
            justify-end
            h-full
            bg-green-700
            rounded-xl
            place-content-end
            border-4 border-green-600
            p-2
          "
        >
          <font-awesome-icon
            icon="thumbs-up"
            class="absolute text-green-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ hinsei_ok }}</span>
        </div>

        <div
          class="
            grid
            justify-end
            h-full
            bg-red-700
            rounded-xl
            place-content-end
            border-4 border-red-600
            p-2
          "
        >
          <font-awesome-icon
            icon="thumbs-down"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ hinsei_ng }}</span>
        </div>

        <div
          class="
            grid
            justify-end
            h-full
            bg-yellow-500
            rounded-xl
            place-content-end
            border-4 border-yellow-600
            p-2
          "
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
    class="
      w-[70vh]
      h-[25vh]
      rounded-lg
      p-0
      select-none
      border-2 border-[#A10A13]
    "
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
          class="
            grid
            justify-end
            h-full
            bg-green-700
            rounded-xl
            place-content-end
            border-4 border-green-600
            p-2
          "
        >
          <font-awesome-icon
            icon="thumbs-up"
            class="absolute text-green-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ lsa_ok }}</span>
        </div>

        <div
          class="
            grid
            justify-end
            h-full
            bg-red-700
            rounded-xl
            place-content-end
            border-4 border-red-600
            p-2
          "
        >
          <font-awesome-icon
            icon="thumbs-down"
            class="absolute text-red-100 opacity-40 h-[5rem] self-center"
          /><span class="text-white text-[3em] font-bold">{{ lsa_ng }}</span>
        </div>

        <div
          class="
            grid
            justify-end
            h-full
            bg-yellow-500
            rounded-xl
            place-content-end
            border-4 border-yellow-600
            p-2
          "
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
// import { useLoading } from "vue-loading-overlay";
const toast = useToast();
// const $loading = useLoading();
const dashboardStore = useDashboardStore();
const max_date = moment().format("yyyy-MM-DD");
const date_today = moment().format("yyyy-MM-DD");
const startOfMonth = moment().startOf("month").format("yyyy-MM-DD");
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
  resize();
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
        supplier_name: v.supplier_name,
      };
      task_to_do_designer.value.push(datastorage);
    });

    task_to_do_generate.value = [];
    response.data.request_generate_data.part_number.forEach((v) => {
      var datastorage1 = {
        part_number: v.part_number,
        supplier_name: v.supplier_name,
      };
      task_to_do_generate.value.push(datastorage1);
    });

    task_to_do_inspection.value = [];
    response.data.inspection_data.part_number.forEach((v) => {
      var datastorage2 = {
        part_number: v.part_number,
        supplier_name: v.supplier_name,
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

const resize = () => {
  const isOverflown = ({
    clientWidth,
    scrollWidth,
    clientHeight,
    scrollHeight,
  }) => scrollWidth > clientWidth || scrollHeight > clientHeight;

  const resizeText = ({
    element,
    elements,
    minSize = 1,
    maxSize = 45,
    step = 1,
    unit = "px",
  }) => {
    (elements || [element]).forEach((el) => {
      let i = minSize;
      let overflow = false;

      const parent = el.parentNode;

      while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`;
        overflow = isOverflown(parent);
        el.style.lineHeight = el.style.fontSize.slice(0, -2) * 0.8 + "px";
        if (!overflow) i += step;
      }

      el.style.fontSize = `${i - step - 1}${unit}`;
    });
  };

  resizeText({
    elements: document.querySelectorAll(".text_resize"),
    step: 0.5,
  });
};

if (document.readyState === "complete") {
  resize();
} else {
  window.onload = resize();
}
</script>
<style>
.custom-error {
  padding: 0;
}
.custom-error .p-tooltip-text {
  color: white;
  justify-content: center;
}
</style>
