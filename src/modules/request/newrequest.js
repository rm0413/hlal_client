import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewRequestStore = defineStore({
    id: 'newRequest',
    state: () => ({
        agreement_list: [],
        agreementForm: {
            trial_number: null,
            request_date: null,
            additional_request_date: null,
            tri_number: null,
            request_person: null,
            supperior_approval: null, 
            supplier_name: null,
            part_number: null,
            sub_part_number: null,
            revision: null,
            coordinates: null,
            dimension: null,
            actual_value: null,
            critical_parts: null,
            critical_dimension: null,
            kind_request: null,
            request_value: null,
            request_quantity: null
        },
        units: [],
        unitForm: {
            unit_name: null,
            unit_created_by: null,
            unit_status: null
        },
        view_item_details_fields: [
            { label: '#', key: '#' },
            { label: 'Selected', key: 'selected' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI No.', key: 'tri_number' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' }
        ]
    }),
    actions: {
        setAgreementList() {
            return new Promise((resolve, reject) => {
                axios.get('agreement-list').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.agreement_list = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setClearUnit() {
            this.unitForm = {
                unit_name: null,
                unit_created_by: null,
                unit_status: null,
            }
        },
        setInsertUnits() {
            var unit_data = {
                unit_name: this.unitForm.unit_name,
                unit_created_by: JSON.parse(sessionStorage.getItem("employee_id")),
                unit_status: "ACTIVE"
            }
            // console.log(unit_data)
            return new Promise((resolve, reject) => {
                axios.post('unit', unit_data).then(response => {
                    resolve(response.data)
                    this.setUnits()
                    // console.log(response.data)
                    this.setClearUnit()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setUnits(){
            return new Promise((resolve, reject) => {
                axios.get('unit').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.units = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        }

    },
    getters: {
        getViewItemDetailsFields() {
            return this.view_item_details_fields
        },
        getAgreementList() {
            return this.agreement_list
        },
        getUnit(){
            return this.units
        }
    }
})