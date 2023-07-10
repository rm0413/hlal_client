<template>
    <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
        <div class="lg:col-span-2 min-[100px]:col-span-9 h-[89vh] flex flex-col">
            <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono"><font-awesome-icon
                    class="h-6 w-6 text-black" icon="users-gear" /> Unit
                Management</label>
            <div class="flex flex-col justify-center py-3 px-16 bg-[#A10E13] rounded shadow-md text-white mt-4 text-center">
                Add Unit
            </div>
            <form method="post" @submit.prevent="submitUnit">
                <div class="mt-2">
                    <label class="">Unit Name</label>
                    <input type="text" class="w-full border-2 h-[2.5rem] rounded text-center"
                        v-model="unitManagementStore.unitForm.unit_name" required>
                </div>
                <div class="card flex justify-content-center items-center justify-center mt-5 w-full gap-3">
                    <button type="submit" v-if="!unitManagementStore.onEdit"
                        class="w-[10rem] bg-[#A10E13] rounded hover:bg-red-600 p-3 text-white">Save</button>
                    <button type="button" v-else class="w-[10rem] bg-yellow-400 rounded hover:bg-yellow-200 p-3 text-black"
                        @click="submitUpdateUnit">Update</button>
                    <button type="button" @click="unitManagementStore.setClearUnit"
                        class="w-[10rem] bg-gray-600 rounded hover:bg-gray-500 p-3 text-white">Clear</button>
                </div>
            </form>
        </div>
        <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col h-[89vh]">
            <div class="flex items-end justify-end">
                <span class="p-input-icon-left">
                    <font-awesome-icon icon="magnifying-glass" />
                    <input-text placeholder="Search" class="w-[17rem] h-[4.5vh] rounded-md" />
                </span>
            </div>
            <div class="border rounded-[5px] overflow-y-scroll h-full mt-2">
                <c-table :fields="unitManagementStore.unitManagementFields" :items="unitManagementStore.getUnit">
                    <template #cell(action)="data">
                        <div class="flex items-center justify-center gap-1">
                            <Button severity="warning" class="w-[1rem] items-center justify-center" v-tooltip.top="'Edit Unit'"
                                @click="editUnit(data.item)">
                                <font-awesome-icon icon="pen"></font-awesome-icon>
                            </Button>
                            <Button severity="danger" class="w-[1rem] items-center justify-center" v-tooltip.top="'Delete Unit'"
                                @click="deleteUnit(data.item)">
                                <font-awesome-icon icon="circle-minus"></font-awesome-icon>
                            </Button>
                        </div>
                    </template>
                </c-table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, ref } from "vue";
import CTable from "@/components/Datatable.vue";
import { useUnitManagementStore } from "@/modules/management/unitManagement";
const unitManagementStore = useUnitManagementStore();

const swal = inject("$swal");
const units = ref([])

onMounted(() => {
    loadUnits()
})

const loadUnits = () => {
    unitManagementStore.setUnits().then((response) => {
        // console.log(response)
        units.value = [];
        response.forEach((v) => {
            units.value.push({
                text: v.unit_name,
                unit_id: v.unit_id
            })
            // console.log(units.value)
        })
    })
}
const deleteUnit = (data) => {
    swal({
        icon: "question",
        title: "Delete Unit?",
        text: "Please make sure before to proceed!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
    }).then((response) => {
        if (response.value === true) {
            unitManagementStore.setDeleteUnit(data).then((response) => {
                if (response.status === "success") {
                    swal({
                        icon: "success",
                        title: response.message,
                        timer: 2500
                    })
                } else {
                    swal({
                        icon: "warning",
                        title: response.message,
                        timer: 2500
                    })
                }
            })
        }
    })
}

const editUnit = (data) => {
    unitManagementStore.onEdit = true;
    unitManagementStore.setEditUnit(data)
}
const submitUpdateUnit = () => {
    swal({
        icon: "question",
        title: "Update Unit?",
        text: "Please make sure before to proceed!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
    }).then((response) => {
        if (response.value === true) {
            unitManagementStore.setUpdateUnit().then((response) => {
                if (response.status === "success") {
                    swal({
                        icon: "success",
                        title: response.message,
                        timer: 2500
                    })
                } else {
                    swal({
                        icon: "warning",
                        title: response.message,
                        timer: 2500
                    })
                }
            })
        }
    })
}
const submitUnit = () => {
    swal({
        icon: "question",
        title: "Add Unit?",
        text: "Please make sure before to proceed!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
    }).then((response) => {
        if (response.value === true) {
            unitManagementStore.setInsertUnit().then((response) => {
                if (response.status === "success") {
                    swal({
                        icon: "success",
                        title: response.message,
                        timer: 2500
                    })
                } else {
                    swal({
                        icon: "warning",
                        title: response.message,
                        timer: 2500
                    })
                }
            })
        }
    })
}
</script>