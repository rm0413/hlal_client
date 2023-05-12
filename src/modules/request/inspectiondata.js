import { defineStore } from 'pinia'

export const useInspectionDataStore = defineStore({
    id: 'inspectiondata',
    state: () => ({
        inspectionData: [],
        inspectionDataFields: [
            { label: 'Select', key: 'select' },
            { label: 'Item No.', key: 'id' },
            { label: 'Action', key: 'action' },
            { label: 'Unit Name', key: 'unit_name' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
        ],
        inspectionDataForm: {
            inspectionData_unit_name: '',
            inspectionData_supplier: '',
            inspectionData_part_number: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getInspectionDataFields() {
            return this.inspectionDataFields
        }
    }
})