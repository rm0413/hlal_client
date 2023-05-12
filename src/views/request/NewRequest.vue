<template>
  <div
    class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2"
  >
    <div class="lg:col-span-7 min-[100px]:col-span-9 h-full flex flex-col">
      <div class="flex justify-between">
        <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono">
          <font-awesome-icon class="h-6 w-6 text-black" icon="desktop" /> New Request
        </label>
        <div class="flex gap-2 mr-10">
          <div class="flex flex-row">
            <select class="text-center p-1 border-2 rounded w-[12rem]" />
            <button class="h-full bg-[#A10E13] text-white py-1 px-3 rounded">
                <font-awesome-icon icon="plus-square"></font-awesome-icon>
                New Unit</button>
          </div>
          <div class="relative">
            <i class="h-full z-50 text-gray-400 top-[2px] py-1 px-3 rounded absolute"><font-awesome-icon icon="magnifying-glass"></font-awesome-icon></i>
            <input class="text-center p-1 border-2 rounded" />
            <button class="h-full bg-gray-400 text-white py-1 px-3 rounded">Search</button>
          </div>
        </div>
      </div>
      <form class="grid grid-cols-3" action="">
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Trial No.
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Request Date
            <input
              type="date"
              class="w-full text-center border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Additional Request Qty Date
            <input
              type="date"
              class="w-full text-center border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            TRI No.
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            TRI Quantity
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Request Person
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Superior Approval
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Supplier
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Part Number
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Sub Part Number
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Revision
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Coordinates
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Dimension
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Actual Value
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
        </div>
        <div class="col-span-1 p-10">
          <label class="flex flex-col gap-2">
            Critical Parts
            <select
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Critical Dimension
            <select
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Kind of Request
            <select
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <label class="flex flex-col gap-2">
            Request Value
            <textarea
              style="resize: none"
              class="w-full border-2 rounded p-1 hover:border-blue-300 h-[6.5rem]"
            />
          </label>
          <label class="flex flex-col gap-2">
            Request Quantity
            <input
              type="text"
              class="w-full border-2 rounded p-1 hover:border-blue-300"
            />
          </label>
          <div class="flex justify-center items-center mt-8 gap-2">
            <button type="submit" class="bg-[#A10E13] text-white p-1 w-[7rem] rounded">
              Enter
            </button>
            <button type="button" class="bg-gray-700 text-white p-1 w-[7rem] rounded">
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="lg:col-span-2 min-[100px]:col-span-9 h-full flex flex-col mt-10 gap-2">
      <button
        class="w-full p-3 flex justify-center items-center bg-[#A10E13] text-white rounded"
      >
        Multiple Input
      </button>
      <button
        class="w-full p-3 flex justify-center items-center bg-green-600 text-white rounded"
      >
        View Item Details
      </button>
    </div>
  </div>
</template>
