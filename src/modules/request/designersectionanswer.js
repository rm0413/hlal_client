import { defineStore } from 'pinia'

export const useDesignerSectionAnswerStore = defineStore({
    id: 'designerSectionAnswer',
    state: () => ({
        designerSectionAnswer: [],
        designerSectionAnswerFields: [
            { label: 'Select', key: 'select' },
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_no' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Critical Dimension', key: 'critical_dimension' },
            { label: 'Inspection Data', key: 'inspection_data' },
        ],
        designerSectionAnswerForm: {
            designerSectionAnswer_unit_name: '',
            designerSectionAnswer_supplier: '',
            designerSectionAnswer_part_number: '',
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
    },
    getters: {
        getDesignerSectionAnswerFields() {
            return this.designerSectionAnswerFields
        }
    }
})