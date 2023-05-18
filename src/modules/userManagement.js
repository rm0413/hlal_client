import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserManagementStore = defineStore({
    id: 'usermanagement',
    state: () => ({
        userManagement: [],
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

    },
    getters: {
        getUserManagementFields() {
            return this.userManagementFields
        },
        getUserManagement() {
            return this.userManagement
        },
    }
})