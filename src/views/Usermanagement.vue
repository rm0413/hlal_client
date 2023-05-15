<template>
    <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
        <div class="lg:col-span-2 min-[100px]:col-span-9 h-[89vh] flex flex-col">
            <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono"><font-awesome-icon
                    class="h-6 w-6 text-black" icon="users-gear" /> User Management</label>
            <div class="flex flex-col justify-center py-3 px-16 bg-[#A10E13] rounded shadow-md text-white mt-4 text-center">
                Add User
            </div>
            <div class="mt-2">
                <label class="">Employee Name</label>
                <drop-down class="w-full md:w-100rem h-[4.5vh] text-center items-center justify-center rounded-md"
                    v-model="selected_employee_name" :options="options_employee_name" optionLabel="name"
                    placeholder="Select Employee Name" />
            </div>
            <div class="mt-2">
                <label class="">Employee Role</label>
                <drop-down class="w-full md:w-20rem h-[4.5vh] text-center items-center justify-center rounded-md"
                    v-model="selected_employee_role" :options="options_employee_role" optionLabel="name"
                    placeholder="Select Employee Role" />
            </div>
            <div class="card flex justify-content-center items-center justify-center mt-5 w-full gap-3">
                <Button label="Submit" severity="success" class="text-black w-[10rem] rounded-md" />
                <Button label="Clear" severity="secondary" class="text-black w-[10rem] rounded-md" />
            </div>
        </div>
        <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col h-[89vh]">
            <div class="flex items-end justify-end">
                <span class="p-input-icon-left">
                    <font-awesome-icon icon="magnifying-glass" />
                    <input-text v-model="value1" placeholder="Search" class="w-[17rem] h-[4.5vh] rounded-md" />
                </span>
            </div>
            <div class="border rounded-[5px] overflow-y-scroll h-full mt-2">
                <c-table :fields="userManagementStore.getUserManagementFields" :thStyle="'bg-[#A10E13] text-white p-3'"
                    :items="[
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                        { name: 'test', image: 'test', email: 'test' },
                    ]">
                    <template #cell(action)>
                        <div class="flex items-center justify-center gap-1">
                            <Button severity="warning" class="w-[1rem] items-center justify-center">
                                <font-awesome-icon icon="gear"></font-awesome-icon>
                            </Button>
                            <Button severity="danger" class="w-[1rem] items-center justify-center">
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
import { ref } from "vue";
import CTable from "@/components/Datatable.vue";
import { useUserManagementStore } from "@/modules/userManagement";
const userManagementStore = useUserManagementStore();

const selected_employee_name = ref();
const selected_employee_role = ref();
const options_employee_name = ref([
    { name: 'Reina Mae Sorisantos', employee_id: 210081 },
]);
const options_employee_role = ref([
    { name: 'Admin', employee_id: 210081 },
]);
</script>