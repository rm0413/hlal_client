import { defineStore } from 'pinia'

export const useNewRequestStore = defineStore({
    id: 'newRequest',
    state: () => ({
        view_item_details_fields: [
            {label: 'Selected', key: 'select'},
            {label: 'Trial Number', key: 'trial_number'},
            {label: 'Request Date', key: 'request_date'},
            {label: 'TRI No.', key: 'tri_no'},
            {label: 'Supplier', key: 'supplier'},
            {label: 'Part Number', key: 'part_number'},
            {label: 'Revision', key: 'revision'},
            {label: 'Dimension', key: 'dimension'},
            {label: 'Actual Value', key: 'actual_value'}
        ]
    }),
    actions: {

    },
    getters: {
        getViewItemDetailsFields(){
            return this.view_item_details_fields
        }
    }
})