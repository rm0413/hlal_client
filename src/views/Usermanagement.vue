<template>
  <div class="h-[89vh] w-full grid grid-cols-9 min-[100px]:overflow-y-scroll lg:overflow-y-hidden gap-2">
    <div class="lg:col-span-2 min-[100px]:col-span-9 h-[89vh] flex flex-col">
      <label class="text-[24px] tracking-widest font-bold text-gray-600 font-mono"><font-awesome-icon
          class="h-6 w-6 text-black" icon="users-gear" /> User
        Management</label>
      <div class="flex flex-col justify-center py-3 px-16 bg-[#A10E13] rounded shadow-md text-white mt-4 text-center">
        Add User
      </div>
      <div class="mt-2">
        <label class="">Employee Name</label>
        <drop-down class="w-full md:w-100rem h-[4.5vh] text-center items-center justify-center rounded-md"
          v-model="userManagementStore.employeeForm.system_access_id" :options="options_employee_name" optionLabel="text"
          placeholder="Select Employee Name" />
      </div>{{ userManagementStore.employeeForm.system_access_id }}
      <div class="mt-2">
        <label class="">Employee Role</label>
        <drop-down class="w-full md:w-20rem h-[4.5vh] text-center items-center justify-center rounded-md"
          v-model="userManagementStore.employeeForm.role_id" :options="userManagementStore.getUserRequest.roles"
          optionLabel="role" placeholder="Select Employee Role" />
      </div>
      <div class="card flex justify-content-center items-center justify-center mt-5 w-full gap-3">
        <Button label="Submit" severity="success" class="text-black w-[10rem] rounded-md" @click="addHinseiUser()" />
        <Button label="Clear" severity="secondary" class="text-black w-[10rem] rounded-md" />
      </div>
    </div>
    <div class="lg:col-span-7 min-[100px]:col-span-9 flex flex-col h-[89vh]">
      <div class="flex items-end justify-end">
        <span class="p-input-icon-left">
          <font-awesome-icon icon="magnifying-glass" />
          <input-text v-model="userManagementStore.search_filter" placeholder="Search"
            class="w-[17rem] h-[4.5vh] rounded-md" />
        </span>
      </div>
      <div class="border rounded-[5px] overflow-y-scroll h-full mt-2">
        <c-table :filter="userManagementStore.search_filter" :fields="userManagementStore.getUserManagementFields"
          :thStyle="'bg-[#A10E13] text-white p-3'" :items="userManagementStore.getUserManagement">
          <template #cell(#)="data">
            <div class="flex items-center justify-center">
              {{ data.index + 1 }}
            </div>
          </template>
          <template #cell(photo)="data">
            <div class="flex items-center justify-center">
              <Avatar size="large" :image="data.item.emp_photo"></Avatar>
            </div>
          </template>
          <template #cell(fullname)="data">
            <div class="flex items-center justify-center">
              {{ `${data.item.emp_last_name}, ${data.item.emp_first_name} ` }}
            </div>
          </template>
          <template #cell(action)="data">
            <div class="flex items-center justify-center gap-1">
              <Button @click="edit_user_modal(data)" severity="warning" class="w-[1rem] items-center justify-center">
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
    <dialog ref="edit_modal" class="p-0 rounded transform duration-300 -translate-y-5">
      <div class="flex flex-col">
        <div class="flex justify-between items-center h-[5vh] px-3 text-white bg-[#A10E13]">
          <span> <font-awesome-icon icon="gear"></font-awesome-icon> Action</span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="edit_user_close_modal()">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <div class="flex flex-col p-5 w-[20rem]">
          <label class="flex justify-between px-5">
            <span><b>Current Role:</b> </span>
            <i class="text-[18px]">{{
              !edit_user_form.item.role ? "No role" : edit_user_form.item.role
            }}</i>
          </label>
          <div class="flex flex-col px-5">
            <b>Change Role:</b>
            <div class="ml-3 flex justify-between">
              <label for=""> Administrator </label>
              <button v-if="edit_user_form.item.role === 'ADMIN'">ON</button>
              <button v-else>OFF</button>
            </div>
            <div class="ml-3 flex justify-between">
              <label for=""> Viewer </label>
              <button v-if="edit_user_form.item.role === 'VIEWER'">ON</button>
              <button v-else>OFF</button>
            </div>
            <div class="ml-3 flex justify-between">
              <label for=""> USER </label>
              <button v-if="edit_user_form.item.role === 'USER'">ON</button>
              <button v-else>OFF</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import CTable from "@/components/Datatable.vue";
import { useUserManagementStore } from "@/modules/userManagement";
const userManagementStore = useUserManagementStore();
const user_emp_id = ref([])

const options_employee_name = ref([]);
const options_employee_role = [];

const edit_modal = ref(null);
const user_table = ref(null);

const edit_user_form = ref({
  item: {
    role: "",
  },
});
const edit_role = ref(null);


const edit_user_modal = (data) => {
  edit_modal.value.showModal();
  edit_modal.value.classList.remove("-translate-y-5");
  edit_user_form.value = data;
};
const edit_user_close_modal = () => {
  edit_modal.value.close();
  edit_modal.value.classList.add("-translate-y-5");
};
onMounted(() => {
  userManagementStore.setUserManagement().then((response) => {
    if (response.status === "success") {
      userManagementStore.setUserRequest().then(v => {
        v.data.users.forEach((x, i) => {
          
          if(response.data[i] === undefined){
            options_employee_name.value.push({
              system_access_id: x.system_access_id,
              text: x.name,
              emp_id: x.emp_id
            })
          }
        //   if (x === response.data[i]) {
        //     options_employee_name.value.push({
        //       system_access_id: k.system_access_id,
        //       text: k.name,
        //       emp_id: k.emp_id
        //     }
        })
      })
    } else if (response.status === "warning") {
      console.log(reponse.error)
    } else {
      console.log(response.message)
    }
  })
});

const addHinseiUser = () => {
  userManagementStore.setAddHinseiUser().then(res => {
    console.log(res.status)
  })
}
</script>

<!-- options_employee_name.value.push({
  system_access_id: k.system_access_id,
  text: k.name,
  emp_id: k.emp_id
}) -->