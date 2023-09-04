import { defineStore } from "pinia";

import axios from 'axios'
export const useSavedInputsStore = defineStore({
    id: 'savedInputs',
    state: () => ({
        savedInputs: [],
        savedInputsFields: [
            { label: 'Selected', key: 'selected' },
            { label: '#', key: '#' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI No.', key: 'tri_number' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' },
            { label: 'Kind of Request', key: 'request_type' },
            { label: 'Request Value', key: 'request_value' },
            { label: 'Critical Parts', key: 'critical_parts' },
        ],
        search_filter: "",
    }),
    actions: {
    },
    getters: {
        getSavedInputsFields() {
            return this.savedInputsFields
        },
    }
})