import { defineStore } from 'pinia'

import axios from 'axios'
export const useDesignerSectionAnswerStore = defineStore({
    id: 'designerSectionAnswer',
    state: () => ({
        designerSectionAnswer: [],
        designerSectionAnswerFields: [
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Critical Dimension', key: 'critical_dimension' },
            { label: 'Inspection Data', key: 'cpk_data' },
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
        setLoadDesignerSection(){
            return new Promise((resolve, reject) => {
                axios.get('load-with-code-designer-section').then(response => {
                    resolve(response.data.data)
                    this.designerSectionAnswer = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getDesignerSectionAnswerFields() {
            return this.designerSectionAnswerFields
        },
        getDesignerSectionRequest(){
            return this.designerSectionAnswer
        }
    }
})