import { defineStore } from "pinia";

export const useSavedInputsStore = defineStore({
    id: 'editItemDetails',
    state: () => ({
        savedInputs: [],
        savedInputsFields: [
            { label: 'Selected', key: 'select' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI No.', key: 'tri_no' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' },
        ],
        savedInputsForm: {
            savedInputs_unit_name: '',
            savedInputs_supplier: '',
            savedInputs_part_number: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getSavedInputsFields() {
            return this.savedInputsFields
        }
    }
})