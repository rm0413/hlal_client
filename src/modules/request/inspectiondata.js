import { defineStore } from 'pinia'

import axios from 'axios'
export const useInspectionDataStore = defineStore({
    id: 'inspectiondata',
    state: () => ({
        inspectionData: [],
        inspectionDataFields: [
            { label: 'Code', key: 'code' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI Number', key: 'tri_number' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Critical Parts', key: 'critical_parts' },
            { label: 'Cpk', key: 'cpk_data' },
            { label: 'Action', key: 'action' },
        ],
        inspectionDataForm: {
            id: null,
            agreement_id_pk: null,
            cpk_data: null,
            inspection_rework: null,
            revised_date: null,
            send_date: null,
        },
        onEdit: false,
        onEditIndex: null,
        search_filter: ""
    }),
    actions: {
        setInspectionDataRequest() {
            return new Promise((resolve, reject) => {
                axios.get('load-with-code-inspection').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.inspectionData = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setInsertInspectionData(data) {
            var payload = {
                agreement_request_id: [],
                cpk_data: this.inspectionDataForm.cpk_data,
                inspection_after_rework: this.inspectionDataForm.inspection_rework,
                revised_date_igm: this.inspectionDataForm.revised_date,
                sent_date_igm: this.inspectionDataForm.send_date,
            }
            data.forEach((v) => {
                payload.agreement_request_id.push(v.agreement_id_pk)
            })
            return new Promise((resolve, reject) => {
                axios.post('inspection-data', payload).then(response => {
                    resolve(response.data)
                    this.setInspectionDataRequest()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setUpdateInspectionData(){
            var payload = {
                id: this.inspectionDataForm.id,
                agreement_request_id: this.inspectionDataForm.agreement_id_pk,
                cpk_data: this.inspectionDataForm.cpk_data,
                inspection_after_rework: this.inspectionDataForm.inspection_rework,
                revised_date_igm: this.inspectionDataForm.revised_date,
                sent_date_igm: this.inspectionDataForm.send_date,
            }
            console.log(payload)
            return new Promise((resolve, reject) => {
                axios.patch(`inspection-data/${payload.id}`, payload).then(response => {
                    resolve(response.data)
                    this.setInspectionDataRequest()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getInspectionDataFields() {
            return this.inspectionDataFields
        },
        getInspectionData() {
            return this.inspectionData
        }
    }
})