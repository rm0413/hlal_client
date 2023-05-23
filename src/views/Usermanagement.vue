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
        <c-select v-model="userManagementStore.employeeForm.system_access_id" :options="options_employee_name"
          class="text-center"></c-select>
      </div>
      <div class="mt-2">
        <label class="">Employee Role</label>
        <c-select v-model="userManagementStore.employeeForm.role_id" :options="role_options"
          class="text-center"></c-select>
      </div>
      <div class="card flex justify-content-center items-center justify-center mt-5 w-full gap-3">
        <button class="w-[10rem] bg-[#A10E13] rounded hover:bg-red-600 p-3 text-white"
          @click="addHinseiUser()">Save</button>
        <button class="w-[10rem] bg-gray-600 rounded hover:bg-gray-500 p-3 text-white"
          @click="userManagementStore.clearUser()">Clear</button>
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
              <Button severity="danger" class="w-[1rem] items-center justify-center" @click="removeUser(data.item)">
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
          <span> <font-awesome-icon icon="gear"></font-awesome-icon> Action |
            <strong><code>{{ edit_user_form.item.emp_last_name }}</code></strong></span>
          <button class="px-3 py-2 rounded-full hover:bg-red-600" @click="edit_user_close_modal()">
            <font-awesome-icon icon="xmark"></font-awesome-icon>
          </button>
        </div>
        <form method="post" @submit.prevent="updateRole">
          <div class="flex flex-col p-5 w-[20rem]">
            <label class="flex justify-between px-5">
              <span><b>Current Role:</b> </span>
              <i class="text-[18px]">{{
                !edit_user_form.item.role_access
                ? "No role"
                : edit_user_form.item.role_access
              }}</i>
            </label>
            <div class="flex flex-col px-5">
              <b>Change Role:</b>
              <div class="ml-3 flex justify-between mt-2">
                <c-select ref="role_select" :selected="edit_user_form.item.role_access" class="text-center"
                  :options="role_options" v-model="role_selected"></c-select>
              </div>
            </div>
          </div>
          <button type="submit" class="w-full bg-[#A10E13] rounded hover:bg-red-600 p-3 text-white">
            Save
          </button>
          <button type="button" @click="edit_user_close_modal()"
            class="w-full bg-gray-600 rounded hover:bg-gray-500 p-3 text-white">
            Cancel
          </button>
        </form>
      </div>
    </dialog>
    <Toast />
  </div>
</template>
<script setup>
import { onMounted, ref, inject, computed } from "vue";
import CTable from "@/components/Datatable.vue";
import CSelect from "@/components/CSelect.vue";
import { useUserManagementStore } from "@/modules/userManagement";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const swal = inject("$swal");
const userManagementStore = useUserManagementStore();
const options_employee_name = ref([]);
const edit_modal = ref(null);
const edit_user_form = ref({
  item: {},
});
const user_id = ref(null); //id of an item
const role_options = ref([]);
const role_selected = ref(null); //edit user modal selected
const user_employee_id = ref(null);
const user_role_id = ref(null);
const user_system_access_id = ref(null);
const user_data = [];
const popover = ref(null)

const edit_user_modal = (data) => {
  edit_modal.value.showModal();
  edit_modal.value.classList.remove("-translate-y-5");
  edit_user_form.value = data;
  user_id.value = edit_user_form.value.item.user_id;
  user_employee_id.value = edit_user_form.value.item.emp_id;

  userManagementStore.setRemoveUser().then((response) => {
    response.data.forEach((v) => {
      console.log(v);
      if (user_employee_id.value === v.emp_id) {
        user_data.push({
          user_role_id: v.role_id,
          user_system_access_id: v.system_access_id,
        });
      }
    });
  });
};
const edit_user_close_modal = () => {
  edit_modal.value.close();
  edit_modal.value.classList.add("-translate-y-5");
};

const updateRole = () => {
  if (role_selected.value) {
    userManagementStore.setUpdatePortalRoleAccess(user_data, role_selected.value);
    userManagementStore
      .setUpdateUserRole(user_employee_id, role_selected.value)
      .then((response) => {
        console.log(response);
        if (response.status === "success") {
          swal({
            icon: "success",
            title: response.message,
            timer: 2000,
          });
          edit_modal.value.close();
        } else {
          console.log(response.message);
        }
      });
  } else {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Role', life: 3000 });
  }

};

onMounted(() => {
  loadAll();
});

const loadAll = () => {
  userManagementStore.setUserManagement().then((response) => {
    if (response.status === "success") {
      userManagementStore.setUserRequest().then((res) => {
        role_options.value = [];
        options_employee_name.value = [];
        res.data.roles.forEach((v) => {
          role_options.value.push({
            text: v.role,
            value: v.role_id,
          });
        });
        res.data.users.forEach((v) => {
          if (!response.data.some((user) => user.emp_id === v.emp_id)) {
            options_employee_name.value.push({
              system_access_id: v.system_access_id,
              text: v.name,
              emp_id: v.emp_id,
            });
          }
        });
      });
    } else if (response.status === "warning") {
      console.log(reponse.error);
    } else {
      console.log(response.message);
    }
  });
};

const addHinseiUser = () => {
  if (userManagementStore.employeeForm.system_access_id && userManagementStore.employeeForm.role_id) {
    swal({
      icon: "question",
      title: "Are you sure to add this user?",
      text: "Please make sure before to proceed!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    }).then((response) => {
      if (response.value === true) {
        setTimeout(() => {
          userManagementStore.setAddHinseiUser().then((response) => {
            // console.log(res.status);
            if (response.status === "success") {
              loadAll()
              edit_modal.value.close();
              swal({
                icon: "success",
                title: response.message,
                timer: 2000,
              });
            } else if (response.status === "warning") {
              swal({
                icon: "warning",
                title: response.message,
                timer: 2000,
              });
            }
          });
        });
      } else {
        swal({
          icon: "warning",
          title: "Cancelled",
          timer: 2000,
        });
      }
    });
  } else {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select Name or Role.', life: 3000 });
  }
};

const removeUser = (data) => {
  swal({
    icon: "question",
    title: "Are you sure to remove this user?",
    text: "Please make sure before to proceed!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((response) => {
    if (response.value === true) {
      var user_id = data.user_id;
      var employee_id = data.emp_id;
      var role_id = "";
      userManagementStore.setRemoveUser().then((response) => {
        response.data.forEach((v) => {
          console.log(v);
          if (employee_id === v.emp_id) {
            role_id = v.role_id;
          }
        });
        // console.log(role_id)
        if (role_id !== "") {
          userManagementStore.removeUserRole(role_id, user_id).then((response) => {
            if (response.status === "success") {
              loadAll();
              swal({
                icon: "success",
                title: response.message,
                timer: 2000,
              });
            } else if (response.status === "warning") {
              swal({
                icon: "success",
                title: response.message,
                timer: 2000,
              });
            }
          });
        } else {
          console.log("User has no role id");
        }
      });
    }
  });
};
</script>
