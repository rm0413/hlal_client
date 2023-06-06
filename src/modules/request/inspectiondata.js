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
        ],
        inspectionDataForm: {
            cpk_data: null,
            inspection_rework: null,
            revised_date: null,
            send_date: null,
        },
        onEdit: false,
        onEditIndex: null
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
        clearInspectionData(){
            this.inspectionDataForm = {
                cpk_data: null,
                inspection_rework: null,
                revised_date: null,
                send_date: null,
            }
        }
    },
    getters: {
        getInspectionDataFields() {
            return this.inspectionDataFields
        },
        getInspectionData(){
            return this.inspectionData
        }
    }
})