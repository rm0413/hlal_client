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
            tri_quantity: null,
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
            request_quantity: null,
            unit: null
        },
        units: [],
        unitForm: {
            unit_name: null,
            unit_created_by: null,
            unit_status: null
        },
        view_item_details_fields: [
            { label: '#', key: '#' },
            // { label: 'Selected', key: 'selected' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI No.', key: 'tri_number' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' }
        ],
        search_fields: [
            { label: 'Action', key: 'action' },
            { label: '#', key: '#' },
            { label: 'Trial Number', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'TRI No.', key: 'tri_number' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' }
        ],
        search_filter: ''
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
        setUnits() {
            return new Promise((resolve, reject) => {
                axios.get('unit').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.units = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setClearAgreementList(){
            this.agreementForm = {
                trial_number: null,
                request_date: null,
                additional_request_date: null,
                tri_number: null,
                tri_quantity: null,
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
                request_quantity: null,
                unit: null
            }
        },
        setInsertAgreementList() {
            console.log(this.agreementForm)
            var agreement_data = {
                trial_number: this.agreementForm.trial_number,
                request_date: this.agreementForm.request_date,
                additional_request_qty_date: this.agreementForm.additional_request_date,
                tri_number: this.agreementForm.tri_number,
                tri_quantity: this.agreementForm.tri_quantity,
                request_person: this.agreementForm.request_person,
                superior_approval: this.agreementForm.supperior_approval,
                supplier_name: this.agreementForm.supplier_name,
                part_number: this.agreementForm.part_number,
                sub_part_number: this.agreementForm.sub_part_number,
                revision: this.agreementForm.revision,
                coordinates: this.agreementForm.coordinates,
                dimension: this.agreementForm.dimension,
                actual_value: this.agreementForm.actual_value,
                critical_parts: this.agreementForm.critical_parts.value,
                critical_dimension: this.agreementForm.critical_dimension.value,
                request_type: this.agreementForm.kind_request.value,
                request_value: this.agreementForm.request_value,
                request_quantity: this.agreementForm.request_quantity,
                unit_id: this.agreementForm.unit_name,
                requestor_employee_id: sessionStorage.getItem("employee_id")
            }
            return new Promise((resolve, reject) => {
                axios.post('agreement-list', agreement_data).then(response => {
                    resolve(response.data)
                    this.setClearAgreementList()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setAutoAdd(data){
            console.log(data)
            this.agreementForm = {
                trial_number: data.trial_number,
                request_date: data.request_date,
                additional_request_date: data.additional_request_qty_date,
                tri_number: data.tri_number,
                tri_quantity: data.tri_quantity,
                request_person: data.request_person,
                supperior_approval: data.superior_approval,
                supplier_name: data.supplier_name,
                part_number: data.part_number,
                sub_part_number: data.sub_part_number,
                revision: data.revision,
                coordinates: data.coordinates,
                dimension: data.dimension,
                actual_value: data.trial_number,
                critical_parts: data.critical_parts,
                critical_dimension: data.critical_dimension,
                kind_request: data.request_type,
                request_value: data.request_value,
                request_quantity: data.request_quantity,
                unit: data.unit_name
            }

        }

    },
    getters: {
        getViewItemDetailsFields() {
            return this.view_item_details_fields
        },
        getAgreementList() {
            return this.agreement_list
        },
        getUnit() {
            return this.units
        }
    }
})