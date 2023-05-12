import { defineStore } from 'pinia'

export const useEditItemDetailsStore = defineStore({
    id: 'editItemDetails',
    state: () => ({
        editItemDetails: [],
        editItemDetailsFields: [
            { label: 'Action', key: 'action' },
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_no' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' },
            { label: 'Kind of Request', key: 'kind_of_request' },
            { label: 'Value of Request', key: 'value_of_request' },
        ],
        editItemDetailsForm: {
            editItemDetails_unit_name: '',
            editItemDetails_supplier: '',
            editItemDetails_part_number: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getEditItemDetailsFields() {
            return this.editItemDetailsFields
        }
    }
})