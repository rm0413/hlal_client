import { defineStore } from "pinia";

import axios from 'axios'

export const useDesignerSectionAnswerStore = defineStore({
    id: "designSectionAnswer",
    state: () => ({
        designerSectionAnswer: [],
        designerSectionAnswerFields: [
            { label: 'Selected', key: 'selected' },
            { label: 'No.', key: '#' },
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Actual Value', key: 'actual_value' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Critical Dimension', key: 'critical_dimension' },
            { label: 'Kind of Request', key: 'request_type' },
            // { label: 'Action', key: 'action' },
        ],
        designerSectionAnswerForm: {
            id: null,
            agreement_request_id: null,
            request_result: null,
            designer_section_answer: null,
            designer_in_charge: null,
            answer_date: null,
        },
        onEdit: false,
        onUploading: false,
        onSingle: false,
        onEditIndex: null,
        search_filter: '',
        part_number_select: ''
    }),
    actions: {
        setLoadDesignerSection() {
            return new Promise((resolve, reject) => {
                axios.get('load-with-code-designer-section').then(response => {
                    resolve(response.data.data)
                    this.designerSectionAnswer = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        clearDesignerAnswer() {
            this.onEdit = false;
            this.designerSectionAnswerForm = {
                id: null,
                request_result: null,
                designer_section_answer: null,
                designer_in_charge: null,
                answer_date: null,
            }
        },
        setInsertDesignerSectionAnswer(data) {
            return new Promise((resolve, reject) => {
                axios.post(`designer-section-answer`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    resolve(response.data)
                    this.setLoadDesignerSection()
                    this.clearDesignerAnswer()
                    this.setLoadPartNumber()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setUpdateDesignerSectionAnswer() {
            var payload = {
                id: this.designerSectionAnswerForm.id,
                agreement_request_id: this.designerSectionAnswerForm.agreement_request_id,
                request_result: this.designerSectionAnswerForm.request_result,
                designer_answer: this.designerSectionAnswerForm.designer_section_answer,
                designer_in_charge: this.designerSectionAnswerForm.designer_in_charge,
                answer_date: this.designerSectionAnswerForm.answer_date,
                emp_id: sessionStorage.getItem('employee_id')
            }
            return new Promise((resolve, reject) => {
                axios.patch(`designer-section-answer/${payload.id}`, payload).then(response => {
                    resolve(response.data)
                    // console.log(response.data)
                    this.setLoadDesignerSection()
                    this.clearDesignerAnswer()
                    this.onEdit = false
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setLoadPartNumber() {
            return new Promise((resolve, reject) => {
                axios.get('load-part-number-with-designer').then(response => {
                    resolve(response.data)
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setInsertSingleMultipleDesigner(data) {
            var datastorage = []
            data.forEach(v => {
                datastorage.push(JSON.parse(v))
            });
            var payload = {
                agreement_request_id: [],
                designer_answer: this.designerSectionAnswerForm.designer_section_answer,
                designer_in_charge: this.designerSectionAnswerForm.designer_in_charge,
                request_result: this.designerSectionAnswerForm.request_result,
                answer_date: this.designerSectionAnswerForm.answer_date,
                emp_id: sessionStorage.getItem('employee_id'),
                selected_datastorage: []
            }
            datastorage.forEach(v => {
                payload.agreement_request_id.push(v.agreement_id_pk)
                payload.selected_datastorage.push(v)
            });
            return new Promise((resolve, reject) => {
                axios.post('insert-designer-answer', payload).then(response => {
                    resolve(response.data)
                    // console.log(response.data)
                    this.setLoadDesignerSection()
                    this.clearDesignerAnswer()
                    this.setLoadPartNumber()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getDesignerSectionAnswer() {
            // console.log(this.designerSectionAnswer)
            return this.designerSectionAnswer
        },
        getDesignerSectionAnswerFields() {
            return this.designerSectionAnswerFields
        }
    }
})