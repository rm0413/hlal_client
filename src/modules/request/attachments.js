import { defineStore } from "pinia"

export const useAttachmentsStore = defineStore({
    id: 'attachment',
    state: () => ({
        attachments: [],
        attachmentsField: [
            { label: 'Code', key: 'code'},
            { label: 'Trail No.', key: 'trial_no'},
            { label: 'Request Date', key: 'request_date'},
            { label: 'Supplier', key: 'supplier'},
            { label: 'Part Number', key: 'part_number'},
            { label: 'Revision', key: 'revision'},
            { label: 'Dimension', key: 'dimension'},
            { label: 'Critical Dimension', key: 'critical_dimension'},
            { label: 'Inspection Data', key: 'inspection_data'}
        ]
    }),
    actions: {

    },
    getters: {
        getAttachmentsFields(){
            return this.attachmentsField
        }
    }
})