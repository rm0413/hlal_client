import { defineStore } from 'pinia'
import axios from 'axios'

const system_id = JSON.parse(localStorage.getItem('system_id'))
axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`;

export const useUserManagementStore = defineStore({
    id: 'usermanagement',
    state: () => ({
        userManagement: [],
        userRequest: [],
        employeeForm: {
            system_access_id: null,
            role_id: null
        },
        userManagementFields: [
            { label: 'ID', key: '#' },
            { label: 'EmployeeID', key: 'emp_id' },
            { label: 'Name', key: 'fullname' },
            { label: 'Image', key: 'photo' },
            { label: 'Email', key: 'emp_email' },
            { label: 'Role', key: 'role_access' },
            { label: 'Position', key: 'position' },
            { label: 'Section', key: 'section_code' },
            { label: 'Status', key: 'emp_system_status' },
            { label: 'Action', key: 'action' },
        ],
        search_filter: ''
        // userManagementForm: {
        //     userManagement_name: '',
        //     userManagement_image: '',
        //     userManagement_email: '',
        // },
        // onEdit: false,
        // onEditIndex: null
    }),
    actions: {
        setUserManagement() {
            return new Promise((resolve, reject) => {
                axios.get('user').then(response => {
                    resolve(response.data)
                    this.userManagement = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setUserRequest() {
            return new Promise((resolve, reject) => {
                axios.get(`http://10.164.58.62/FDTP-Portal/public/api/system-request-users/${system_id}`).then((response) => {
                    resolve(response.data)
                    // console.log(response.data.data)
                    this.userRequest = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setAddUser() {
            var employee_data = {
                system_access_id: this.employeeForm.system_access_id.system_id,
                role_id: this.employeeForm.role_id.role_id
            }
            return new Promise((resolve, reject) => {
                axios.post('http://10.164.58.62/FDTP-Portal/public/api/role-access', employee_data).then((response) => {
                    resolve(response.data)
                    this.userRole = response.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setAddHinseiUser() {
            var add_user_data = {
                employee_id: this.employeeForm.system_access_id.emp_id,
                role_access: this.employeeForm.role_id.role
            }
            // console.log(add_user_data)
            return new Promise((resolve, reject) => {
                axios.post('user', add_user_data).then((response) => {
                    resolve(response.data)
                    this.setUserManagement()
                    this.clearUser()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        clearUser() {
            this.employeeForm = {
                system_access_id: null,
                role_id: null
            }
        },

    },
    getters: {
        getUserManagementFields() {
            return this.userManagementFields
        },
        getUserManagement() {
            return this.userManagement
        },
        getUserRequest() {
            // console.log(this.userManagementRequestUser)
            return this.userRequest
        },
    }
})