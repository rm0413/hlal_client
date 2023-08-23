import { defineStore } from "pinia";
import axios from "axios";

const system_id = JSON.parse(localStorage.getItem("system_id"));
axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
  localStorage.getItem("userdata")
)}`;

export const useUserManagementStore = defineStore({
  id: "usermanagement",
  state: () => ({
    userManagement: [],
    userRequest: [],
    employeeForm: {
      system_access_id: null,
      role_id: null,
    },
    userManagementFields: [
      { label: "ID", key: "#" },
      { label: "EmployeeID", key: "emp_id" },
      { label: "Name", key: "fullname" },
      { label: "Image", key: "photo" },
      { label: "Email", key: "emp_email" },
      { label: "Email Notification", key: "email_notif" },
      { label: "Role", key: "role_access" },
      { label: "Position", key: "position" },
      { label: "Section", key: "section_code" },
      { label: "Status", key: "emp_system_status" },
      { label: "Action", key: "action" },
    ],
    search_filter: "",
    options_employee_name: [],
    role_options: [],
    updateEmailNotif:{}
  }),
  actions: {
    setUserManagement() {
      return new Promise((resolve, reject) => {
        axios
          .get("user")
          .then((response) => {
            resolve(response.data);
            this.userManagement = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async setEmployeeOptions() {
      this.options_employee_name = [];
      this.role_options = [];
      await this.setUserManagement().then((response) => {
        // resolve(response)
        this.setUserRequest().then((res) => {
          res.data.users.forEach((v) => {
            if (response.data.some((user) => user.emp_id === v.emp_id)) return;
            this.options_employee_name.push({
              system_access_id: v.system_access_id,
              text: v.name,
              emp_id: v.emp_id,
            });
          });
          res.data.roles.forEach((v) => {
            this.role_options.push({
              text: v.role,
              value: v.role_id,
            });
          });
        });
      });
    },
    setUserRequest() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://10.164.58.82/FDTP-Portal/public/api/system-request-users/${system_id}`
          )
          .then((response) => {
            resolve(response.data);
            // console.log(response.data.data)
            this.userRequest = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setAddUser(data) {
      // console.log(data)
      return new Promise((resolve, reject) => {
        axios
          .post("http://10.164.58.82/FDTP-Portal/public/api/role-access", data)
          .then((response) => {
            resolve(response.data);
            this.userRole = response.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    clearUser() {
      this.employeeForm = {
        system_access_id: null,
        role_id: null,
      };
    },
    setAddHinseiUser() {
      var add_user_data = {
        employee_id: this.employeeForm.system_access_id.emp_id,
        role_access: this.employeeForm.role_id.text,
        emp_id: sessionStorage.getItem("employee_id"),
      };
      var employee_data = {
        system_access_id: this.employeeForm.system_access_id.system_access_id,
        role_id: this.employeeForm.role_id.value,
      };
      return new Promise((resolve, reject) => {
        axios
          .post("user", add_user_data)
          .then((response) => {
            resolve(response.data);
            this.setAddUser(employee_data);
            this.setUserManagement();
            this.clearUser();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    setRemoveUser() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://10.164.58.82/FDTP-Portal/public/api/system-load-all-users/${system_id}`
          )
          .then((response) => {
            // console.log(response.data)
            resolve(response.data);
            this.setUserRequest();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setRemoveFdtpPortalAccess(data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://10.164.58.82/FDTP-Portal/public/api/role-access/${data}`
          )
          .then(function (response) {
            resolve(response.data);
            this.setUserRequest();
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    removeUserRole(role_id, user_id) {
      var emp_id = sessionStorage.getItem("employee_id");
      return new Promise((resolve, reject) => {
        axios
          .delete(`delete-user/${user_id}/${emp_id}`)
          .then((response) => {
            resolve(response.data);
            this.setRemoveFdtpPortalAccess(role_id);
            this.setUserManagement();
            this.setUserRequest();
            this.userManagement = response.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUpdateUserRole(user_employee_id, role_selected) {
      var data = {
        id: user_employee_id.value,
        employee_id: user_employee_id.value,
        role_access: role_selected.text,
        emp_id: sessionStorage.getItem("employee_id"),
      };
      return new Promise((resolve, reject) => {
        axios
          .patch(`user/${data.id}`, data)
          .then((response) => {
            resolve(response.data);
            this.setUserManagement();
            this.setUserRequest();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUpdateEmailNotification() {
      return new Promise((resolve, reject) => {
        axios
          .patch(`employee-notification/${this.updateEmailNotif.employee_id}`, this.updateEmailNotif)
          .then((response) => {
            resolve(response.data);
            this.setUserManagement();
            this.setUserRequest();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUpdatePortalRoleAccess(user_data, role_selected) {
      // console.log(user_data)
      var data = {
        id: user_data[0].user_role_id,
        system_access_id: user_data[0].user_system_access_id,
        role_id: role_selected.value,
      };
      return new Promise((resolve, reject) => {
        axios
          .put(
            `http://10.164.58.82/FDTP-Portal/public/api/role-access/${data.id}`,
            data
          )
          .then(function (response) {
            resolve(response.data);
            // console.log(response.data)
            this.setUserManagement();
            this.setUserRequest();
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
  getters: {
    getUserManagementFields() {
      return this.userManagementFields;
    },
    getUserManagement() {
      return this.userManagement;
    },
    getUserRequest() {
      return this.userRequest;
    },
  },
});
