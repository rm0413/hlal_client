import { defineStore } from 'pinia'

export const useUserManagementStore = defineStore({
    id: 'usermanagement',
    state: () => ({
        userManagement: [],
        userManagementFields: [
            { label: 'Name', key: 'name' },
            { label: 'Image', key: 'image' },
            { label: 'Email', key: 'email' },
            { label: 'Role', key: 'role' },
            { label: 'Position', key: 'position' },
            { label: 'Section', key: 'section' },
            { label: 'Status', key: 'status' },
            { label: 'Action', key: 'action' },
        ],
        userManagementForm: {
            userManagement_name: '',
            userManagement_image: '',
            userManagement_email: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getUserManagementFields() {
            return this.userManagementFields
        }
    }
})