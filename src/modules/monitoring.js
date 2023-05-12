import { defineStore } from 'pinia'

export const useMonitoringStore = defineStore({
    id: 'monitoring',
    state: () => ({
        monitoring: [],
        monitoringFields: [
            { label: 'Select', key: 'select' },
            { label: 'Item No.', key: 'id' },
            { label: 'Action', key: 'action' },
            { label: 'Unit Name', key: 'unit_name' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
        ],
        monitoringForm: {
            monitoring_unit_name: '',
            monitoring_supplier: '',
            monitoring_part_number: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getMonitoringFields() {
            return this.monitoringFields
        }
    }
})