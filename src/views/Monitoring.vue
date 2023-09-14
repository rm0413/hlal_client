<template>
  <div class="flex flex-col">
    <div class="h-full w-full">
      <div class="h-[80vh] w-full mt-3 overflow-y-scroll">
        <div class="flex justify-between">
          <label
            class="
              text-[24px]
              tracking-widest
              font-bold
              text-gray-600
              font-mono
              max-lg:text-[20px]
            "
          >
            <font-awesome-icon class="h-6 w-6 text-black" icon="desktop" />
            Hinsei & LSA Monitoring List
          </label>
        </div>
        <div class="flex justify-end">
          <div class="relative flex">
            <i
              class="
                h-full
                z-50
                text-gray-400
                top-[2px]
                py-1
                px-3
                rounded
                absolute
              "
              ><font-awesome-icon icon="magnifying-glass"></font-awesome-icon
            ></i>
            <input
              v-model="monitoringStore.search_filter"
              class="
                w-[13rem]
                text-center
                p-1
                border-2
                rounded-l-md
                h-[2.5rem]
                border-gray-600
                hover:border-red-500
                outline-green-600
                lg:w-[13rem]
                min-[100px]:w-[10rem]
              "
            />
            <button
              class="
                flex
                justify-center
                items-center
                h-[2.5rem]
                lg:w-[5rem]
                min-[100px]:w-[3rem]
                bg-gray-700
                text-white
                py-1
                px-3
                rounded-r-md
                font-bold
                lg:text-[16px]
                min-[100px]:text-[13px]
              "
            >
              <b>Search</b>
            </button>
          </div>
        </div>
        <c-table
          :items="monitoringStore.getLoadMonitoring"
          :fields="monitoringStore.getMonitoringFields"
          :thStyle="'bg-[#A10E13] text-white p-2'"
          class="mt-1"
          :filter="monitoringStore.search_filter"
        >
          <template #cell(export)="data">
            <button
              v-tooltip.top="'Export File'"
              @click="exportFile(data.item)"
            >
              <font-awesome-icon
                icon="file-export"
                class="hover:scale-125 text-green-700"
              />
            </button>
          </template>
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(selected)="data">
            <input
              type="checkbox"
              :value="JSON.stringify(data.item)"
              v-model="select_item"
              id="cb_data"
              class="h-5 w-5"
            />
          </template>
          <template #cell(action)="data" v-if="role === 'ADMIN'">
            <div class="flex justify-center gap-1">
              <button
                @click="
                  openModal('viewEditModal'),
                    monitoringStore.setEditMonitoringList(data.item)
                "
                data-open-modal
                class="
                  h-8
                  w-9
                  rounded
                  bg-yellow-400
                  hover:bg-yellow-500
                  border-2 border-yellow-600
                  text-white
                "
                v-tooltip.top="'Edit/Delete Request'"
              >
                <font-awesome-icon icon="eraser"></font-awesome-icon>
              </button>
              <button
                @click="
                  openModal('attachmentModal'),
                    monitoringStore.setAttachmentMonitoringList(data.item)
                "
                v-tooltip.top="'Attached Files'"
                data-open-modal
                class="
                  h-8
                  w-9
                  rounded
                  bg-blue-500
                  hover:bg-blue-700
                  border-2 border-blue-900
                  text-white
                "
              >
                <font-awesome-icon icon="download"></font-awesome-icon>
              </button>
              <button
                @click="
                  openModal('viewDesignerModal'), designerOpenModal(data.item)
                "
                v-tooltip.top="'View Agreement Lists'"
                data-open-modal
                class="
                  h-8
                  w-9
                  rounded
                  bg-cyan-500
                  hover:bg-cyan-700
                  border-2 border-cyan-900
                  text-white
                "
              >
                <font-awesome-icon icon="eye"></font-awesome-icon>
              </button>
            </div>
          </template>
          <template #cell(action)="data" v-else>
            <div class="flex justify-center gap-1">
              <button
                @click="
                  openModal('viewEditModal'),
                    monitoringStore.setEditMonitoringList(data.item)
                "
                disabled
                data-open-modal
                class="h-8 w-9 rounded bg-gray-400 text-white"
                v-tooltip.top="'Edit/Delete Request'"
              >
                <font-awesome-icon icon="eraser"></font-awesome-icon>
              </button>
              <button
                @click="
                  openModal('attachmentModal'),
                    monitoringStore.setAttachmentMonitoringList(data.item)
                "
                disabled
                v-tooltip.top="'Attached Files'"
                data-open-modal
                class="h-8 w-9 rounded bg-gray-400 text-white"
              >
                <font-awesome-icon icon="download"></font-awesome-icon>
              </button>
              <button
                @click="
                  openModal('viewDesignerModal'), designerOpenModal(data.item)
                "
                v-tooltip.top="'View Agreement Lists'"
                data-open-modal
                class="h-8 w-9 rounded bg-cyan-600 text-white"
              >
                <font-awesome-icon icon="eye"></font-awesome-icon>
              </button>
            </div>
          </template>
        </c-table>
      </div>
    </div>
    <dialog
      ref="viewEditModal"
      class="
        p-0
        rounded
        transform
        duration-300
        -translate-y-2
        border-2 border-[#A10E13]
        w-[80%]
      "
    >
      <div class="border-2 col-span-2">
        <div
          class="
            flex
            justify-between
            items-center
            h-[5vh]
            px-3
            text-white
            bg-[#A10E13]
          "
        >
          <span
            ><font-awesome-icon icon="pen" /><label class="ml-2"
              >Edit/Delete Item Modal</label
            ></span
          >
          <button
            class="px-3 py-2 rounded-full hover:bg-red-600"
            @click="closeModal('viewEditModal')"
          >
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="grid grid-cols-3 p-2 text-[13px]">
          <div class="border-2 col-span-1 p-2 h-[73vh]">
            <form
              class="grid grid-cols-2"
              method="post"
              @submit.prevent="submitUpdateEditItemMonitoring"
            >
              <div class="col-span-1 p-2">
                <label class="flex flex-col gap-2">
                  Trial No.
                  <input
                    ref="input_trial_no"
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.trial_number
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Request Date
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.request_date
                    "
                    type="date"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Additional Request Qty Date
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm
                        .additional_request_date
                    "
                    type="date"
                    class="
                      h-[2rem]
                      w-full
                      text-center
                      border-2
                      rounded
                      p-1
                      outline-green-600
                    "
                  />
                </label>
                <label class="flex flex-col gap-2">
                  TRI No.
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="monitoringStore.monitoringEditItemForm.tri_number"
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  TRI Quantity
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.tri_quantity
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Request Person
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.request_person
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Superior Approval
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.supperior_approval
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Supplier
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.supplier_name
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Part Number
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="monitoringStore.monitoringEditItemForm.part_number"
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Sub Part Number
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.sub_part_number
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
              </div>
              <div class="col-span-1 p-2">
                <label class="flex flex-col gap-2">
                  Revision
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="monitoringStore.monitoringEditItemForm.revision"
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Coordinates
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="monitoringStore.monitoringEditItemForm.coordinates"
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Dimension
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="monitoringStore.monitoringEditItemForm.dimension"
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Actual Value
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.actual_value
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Critical Parts
                  <select
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.critical_parts
                    "
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      outline-green-600
                      text-center
                    "
                    required
                  >
                    <option value="null" disabled>Select Critical Parts</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
                <label class="flex flex-col gap-2">
                  Critical Dimension
                  <select
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.critical_dimension
                    "
                    class="
                      h-[2rem]
                      outline-green-600
                      border-2
                      rounded
                      text-center
                    "
                    required
                  >
                    <option value="null" disabled>
                      Select Critical Dimension
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
                <label class="flex flex-col gap-2">
                  Kind of Request
                  <select
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.kind_request
                    "
                    class="
                      h-[2rem]
                      outline-green-600
                      border-2
                      rounded
                      text-center
                    "
                    required
                  >
                    <option value="null" disabled>
                      Select Kind of Request
                    </option>
                    <option value="LSA Request">LSA Request</option>
                    <option value="Hinsei Request">Hinsei Request</option>
                  </select>
                </label>
                <label class="flex flex-col gap-2 w-full">
                  Request Value
                  <textarea
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.request_value
                    "
                    style="resize: none"
                    class="
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      h-[5.8rem]
                    "
                    required
                  />
                </label>
                <label class="flex flex-col gap-2">
                  Request Quantity
                  <input
                    :disabled="monitoringStore.inputStatus"
                    v-model="
                      monitoringStore.monitoringEditItemForm.request_quantity
                    "
                    type="text"
                    class="
                      h-[2rem]
                      w-full
                      border-2
                      rounded
                      p-1
                      outline-green-600
                      text-center
                    "
                    required
                  />
                </label>
                <div class="flex flex-col justify-end items-end h-[5rem]">
                  <div class="flex justify-center items-end mt-5 gap-2">
                    <button
                      :disabled="monitoringStore.inputStatus"
                      type="submit"
                      class="
                        bg-yellow-400
                        hover:bg-yellow-500
                        border-2 border-yellow-700
                        text-black
                        p-1
                        w-[7rem]
                        rounded
                      "
                    >
                      <font-awesome-icon icon="floppy-disk" />
                      <b> UPDATE</b>
                    </button>
                    <button
                      @click="monitoringStore.setClearEditMonitoring"
                      type="button"
                      class="
                        bg-gray-500
                        text-white
                        p-1
                        w-[7rem]
                        rounded
                        border-2
                        hover:bg-gray-700
                        border-gray-900
                      "
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="border-2 col-span-2 ml-2 overflow-y-auto h-[73vh]">
            <c-table
              :items="monitoringStore.getEditMonitoringItems"
              :fields="monitoringStore.monitoringEditFields"
              :thStyle="'bg-[#A10E13] text-white p-2'"
            >
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(action)="data">
                <div class="flex justify-center gap-1">
                  <div class="group flex relative">
                    <button
                      class="
                        h-8
                        w-9
                        rounded
                        bg-yellow-400
                        hover:bg-yellow-500
                        border-2 border-yellow-700
                        text-white
                      "
                      @click="edit_monitoring_item(data.item)"
                    >
                      <font-awesome-icon icon="pen"></font-awesome-icon>
                    </button>
                    <span
                      class="
                        group-hover:opacity-100
                        transition-opacity
                        bg-gray-700
                        px-1
                        text-sm text-gray-100
                        rounded-md
                        absolute
                        left-1/2
                        -translate-x-1/2 -translate-y-10
                        opacity-0
                        m-4
                        mx-auto
                        z-50
                      "
                    >
                      <div
                        class="
                          h-[3vh]
                          w-[5rem]
                          flex flex-col
                          justify-center
                          items-center
                        "
                      >
                        Edit
                      </div>
                    </span>
                  </div>
                  <div class="group flex relative">
                    <button
                      class="
                        h-8
                        w-9
                        rounded
                        bg-red-500
                        hover:bg-red-700
                        border-2 border-red-800
                        text-white
                      "
                      @click="delete_monitoring_item(data.item)"
                    >
                      <font-awesome-icon icon="trash" />
                    </button>
                    <span
                      class="
                        group-hover:opacity-100
                        transition-opacity
                        bg-gray-700
                        px-1
                        text-sm text-gray-100
                        rounded-md
                        absolute
                        left-1/2
                        -translate-x-1/2 -translate-y-10
                        opacity-0
                        m-4
                        mx-auto
                        z-50
                      "
                    >
                      <div
                        class="
                          h-[3vh]
                          w-[5rem]
                          flex flex-col
                          justify-center
                          items-center
                        "
                      >
                        Delete
                      </div>
                    </span>
                  </div>
                </div>
              </template>
            </c-table>
          </div>
        </div>
      </div>
    </dialog>
    <dialog
      ref="attachmentModal"
      class="
        p-0
        rounded
        transform
        duration-300
        -translate-y-2
        border-2 border-[#A10E13]
        w-[35rem]
      "
    >
      <div class="border-2 col-span-2">
        <div
          class="
            flex
            justify-between
            items-center
            h-[5vh]
            px-3
            text-white
            bg-[#A10E13]
          "
        >
          <p>
            <font-awesome-icon icon="download" class="h-5 w-5 mr-2" />Attached
            Files
          </p>
          <button
            class="px-3 py-2 rounded-full hover:bg-red-600"
            @click="closeModal('attachmentModal')"
          >
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div
          class="
            flex flex-col
            overflow-y-scroll
            h-[35vh]
            mt-1
            ml-[0.15rem]
            w-full
          "
        >
          <c-table
            :items="monitoringStore.getAttachmentMonitoringItems"
            :fields="monitoringStore.getAttachmentMonitoringFields"
            :thStyle="'bg-[#A10E13] text-white p-2'"
          >
            <template #cell(#)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(action)="data">
              <div class="flex justify-center gap-1">
                <div class="group flex relative">
                  <button
                    class="
                      h-8
                      w-9
                      rounded
                      bg-green-500
                      hover:bg-green-700
                      border-2 border-green-900
                      text-white
                    "
                    @click="downloadAttachment(data.item)"
                  >
                    <font-awesome-icon icon="download" />
                  </button>
                  <span
                    class="
                      group-hover:opacity-100
                      transition-opacity
                      bg-gray-700
                      px-1
                      text-sm text-gray-100
                      rounded-md
                      absolute
                      left-1/2
                      -translate-x-1/2 -translate-y-10
                      opacity-0
                      m-4
                      mx-auto
                      z-50
                    "
                  >
                    <div
                      class="
                        h-[3vh]
                        w-[5rem]
                        flex flex-col
                        justify-center
                        items-center
                      "
                    >
                      Download
                    </div>
                  </span>
                </div>
                <div class="group flex relative">
                  <button
                    data-open-modal
                    class="
                      h-8
                      w-9
                      rounded
                      bg-cyan-500
                      hover:bg-cyan-700
                      border-2 border-cyan-900
                      text-white
                    "
                    @click="viewAttachment(data.item)"
                  >
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                  </button>
                  <span
                    class="
                      group-hover:opacity-100
                      transition-opacity
                      bg-gray-700
                      px-1
                      text-sm text-gray-100
                      rounded-md
                      absolute
                      left-1/2
                      -translate-x-1/2 -translate-y-10
                      opacity-0
                      m-4
                      mx-auto
                      z-50
                    "
                  >
                    <div
                      class="
                        h-[3vh]
                        w-[3rem]
                        flex flex-col
                        justify-center
                        items-center
                      "
                    >
                      View
                    </div>
                  </span>
                </div>
              </div>
            </template>
          </c-table>
        </div>
      </div>
    </dialog>
    <dialog
      ref="viewDesignerModal"
      class="
        p-0
        rounded
        transform
        duration-300
        -translate-y-2
        border-2 border-[#A10E13]
        w-full
      "
    >
      <div class="border-2 col-span-2">
        <div
          class="
            flex
            justify-between
            items-center
            h-[5vh]
            px-3
            text-white
            bg-[#A10E13]
          "
        >
          <p>
            <font-awesome-icon icon="table" class="h-5 w-5 mr-2" />{{
              designer_unit_name
            }}
          </p>
          <button
            class="px-3 py-2 rounded-full hover:bg-red-600"
            @click="closeModal('viewDesignerModal')"
          >
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="relative flex justify-end mt-1">
        <i
          class="
            h-full
            z-50
            text-gray-400
            top-[2px]
            py-1
            px-3
            rounded
            absolute
            lg:right-[15rem]
            min-[100px]:right-[10.5rem]
          "
          ><font-awesome-icon icon="magnifying-glass"></font-awesome-icon
        ></i>
        <input
          class="
            w-[13rem]
            text-center
            p-1
            border-2
            rounded-l-md
            h-[2.5rem]
            border-gray-600
            hover:border-red-500
            outline-green-600
            lg:w-[13rem]
            min-[100px]:w-[10rem]
          "
          v-model="monitoringStore.search_filter_designer"
        />
        <button
          type="button"
          class="
            flex
            justify-center
            items-center
            h-[2.5rem]
            lg:w-[4rem]
            min-[100px]:w-[2rem]
            bg-gray-700
            mr-2
            text-white
            py-1
            px-3
            rounded-r-md
            font-bold
            lg:text-[16px]
            min-[100px]:text-[13px]
          "
          @click="openModal('search')"
        >
          Search
        </button>
      </div>
        <div class="flex flex-col overflow-y-auto mx-2 h-[73vh] mt-1">
          <c-table
            :items="monitoringStore.getEditMonitoringItems"
            :fields="monitoringStore.getDesignerMonitoringFields"
            :thStyle="'bg-[#A10E13] text-white p-2 border-spacing-2'"
            :filter="monitoringStore.search_filter_designer"
            :table_class="'w-[110vw]'"
          >
            <template #cell(#)="data">
              {{ data.index + 1 }}
            </template>
          </c-table>
        </div>
      </div>
    </dialog>
    <Toast position="bottom-right"></Toast>
  </div>
</template>

<script setup>
import CTable from "@/components/Datatable.vue";
import { useMonitoringStore } from "@/modules/monitoring";
import { useAttachmentsStore } from "@/modules/request/attachments";
import { ref, onMounted, inject } from "vue";
import { useToast } from "primevue/usetoast";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const toast = useToast();
const swal = inject("$swal");
const monitoringStore = useMonitoringStore();
const attachmentStore = useAttachmentsStore();
const units = ref([]);
const input_trial_no = ref(null);
const viewEditModal = ref(null);
const attachmentModal = ref(null);
const viewDesignerModal = ref(null);
const role = sessionStorage.getItem("role_access");
const select_item = ref([]);

onMounted(() => {
  loadUnits();
  monitoringStore.setLoadMonitoring();
});

const designer_unit_name = ref(null);

const designerOpenModal = (data) => {
  // console.log(data)
  designer_unit_name.value = data.unit_name;
  monitoringStore.setEditMonitoringList(data);
};

const inputPartNumber = () => {
  select_item.value = [];
};

const loadUnits = () => {
  monitoringStore.setUnits().then((response) => {
    response.forEach((v) => {
      units.value.push({
        text: v.unit_name,
        unit_id: v.unit_id,
      });
    });
  });
};

// const searchButton = () => {
//   monitoringStore.setLoadMonitoring();
// };
const delete_monitoring_item = (data) => {
  viewEditModal.value.close();
  swal({
    icon: "question",
    title: "Are you sure you want to Delete?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        monitoringStore.setDeleteMonitoring(data).then((response) => {
          if (response.status === "success") {
            loader.hide();
            swal({
              icon: "success",
              title: response.message,
              text: "If problems occur please contact the developer",
              timer: 1500,
            });
          } else {
            loader.hide();
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
      });
    } else {
      viewEditModal.value.showModal();
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled.",
        life: 2000,
      });
    }
  });
};
const edit_monitoring_item = (data) => {
  // console.log(data)
  monitoringStore.inputStatus = false;
  monitoringStore.monitoringEditItemForm = {
    id: data.agreement_id_pk,
    trial_number: data.trial_number,
    request_date: data.request_date,
    additional_request_date: data.additional_request_qty_date,
    tri_number: data.tri_number,
    tri_quantity: data.tri_quantity,
    request_person: data.request_person,
    supperior_approval: data.superior_approval,
    supplier_name: data.supplier_name,
    part_number: data.part_number,
    sub_part_number: data.sub_part_number,
    revision: data.revision,
    coordinates: data.coordinates,
    dimension: data.dimension,
    actual_value: data.actual_value,
    critical_dimension: data.critical_dimension,
    critical_parts: data.critical_parts,
    kind_request: data.request_type,
    request_value: data.request_value,
    request_quantity: data.request_quantity,
    unit_id: data.unit_id,
  };
};

const exportFile = (data) => {
  // if (select_item.value.length === 1 && select_item.value != 0) {
  // if (monitoringStore.monitoringForm.monitoring_unit_name) {
  //   if (monitoringStore.monitoringForm.monitoring_supplier) {
  //     if (monitoringStore.monitoringForm.monitoring_part_number) {
  swal({
    icon: "question",
    title: "Export File?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      monitoringStore.setExportMonitoringList(data);
      select_item.value = [];
    } else {
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled.",
        life: 2000,
      });
    }
  });
  //     } else {
  //       toast.add({
  //         severity: "error",
  //         summary: "Warning",
  //         detail: "Please input Part Number.",
  //         life: 2000,
  //       });
  //     }
  //   } else {
  //     toast.add({
  //       severity: "error",
  //       summary: "Warning",
  //       detail: "Please input Supplier",
  //       life: 2000,
  //     });
  //   }
  // } else {
  //   toast.add({
  //     severity: "error",
  //     summary: "Warning",
  //     detail: "Select must be 1 only.",
  //     life: 2000,
  //   });
  // }
};

const openModal = (modal) => {
  if (modal === "viewEditModal") {
    viewEditModal.value.showModal();
    viewEditModal.value.classList.remove("-translate-y-5");
  } else if (modal === "attachmentModal") {
    attachmentModal.value.showModal();
    attachmentModal.value.classList.remove("-translate-y-5");
  } else if (modal === "viewDesignerModal") {
    viewDesignerModal.value.showModal();
    viewDesignerModal.value.classList.remove("-translate-y-5");
  }
};

const closeModal = (modal) => {
  if (modal === "viewEditModal") {
    viewEditModal.value.close();
    viewEditModal.value.classList.add("-translate-y-5");
  } else if (modal === "attachmentModal") {
    attachmentModal.value.close();
    attachmentModal.value.classList.add("-translate-y-5");
  } else if (modal === "viewDesignerModal") {
    viewDesignerModal.value.close();
    viewDesignerModal.value.classList.add("-translate-y-5");
  }
};

const submitUpdateEditItemMonitoring = () => {
  viewEditModal.value.close();
  swal({
    icon: "question",
    title: "Update this request?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      const loader = $loading.show();
      setTimeout(() => {
        monitoringStore.setUpdateMonitoring().then((response) => {
          monitoringStore.setEditMonitoringList();
          loader.hide();
          swal({
            icon: "success",
            title: response.message,
            timer: 1500,
          });
        });
      });
    } else {
      loader.hide();
      viewEditModal.value.showModal();
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled.",
        life: 2000,
      });
    }
  });
};

const viewAttachment = (data) => {
  var path = data.file_path_attachment;
  window.open(
    `http://10.164.58.82/hinsei/server/public/view-attachment?file_path_attachment=${path}`
  );
};

const downloadAttachment = (data) => {
  attachmentModal.value.close();
  var datastorage = {
    emp_id: sessionStorage.getItem("employee_id"),
    file_path_attachment: data.file_path_attachment,
  };
  swal({
    icon: "question",
    title: "Download Attachment?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((response) => {
    if (response.value === true) {
      attachmentStore.downloadAttachment(datastorage);
      attachmentModal.value.showModal();
    } else {
      attachmentModal.value.showModal();
      toast.add({
        severity: "error",
        summary: "Warning",
        detail: "Cancelled.",
        life: 2000,
      });
    }
  });
};
</script>
<style scoped>
.p-tooltip {
  z-index: 10 !important;
}
</style>
