import { defineStore } from 'pinia'

import axios from 'axios'
export const useEditItemDetailsStore = defineStore({
    id: 'editItemDetails',
    state: () => ({
        editItemDetails: [],
        editItemDetailsFields: [
            { label: 'Action', key: 'action' },
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'Actual Value', key: 'actual_value' },
            { label: 'Kind of Request', key: 'request_type' },
            { label: 'Value of Request', key: 'request_value' },
        ],
        editItemForm: {
            id: null,
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
            unit_id: null
        },
        onEdit: false,
        onEditIndex: null,
        search_filter: '',
    }),
    actions: {
        setAgreementListCode() {
            return new Promise((resolve, reject) => {
                axios.get('load-with-code-request').then(response => {
                    resolve(response.data.data)
                    this.editItemDetails = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setUpdateAgreementList() {
            var payload = {
                id: this.editItemForm.id,
                trial_number: this.editItemForm.trial_number,
                request_date: this.editItemForm.request_date,
                additional_request_qty_date: this.editItemForm.additional_request_date,
                tri_number: this.editItemForm.tri_number,
                tri_quantity: this.editItemForm.tri_quantity,
                request_person: this.editItemForm.request_person,
                superior_approval: this.editItemForm.supperior_approval,
                supplier_name: this.editItemForm.supplier_name,
                part_number: this.editItemForm.part_number,
                sub_part_number: this.editItemForm.sub_part_number,
                revision: this.editItemForm.revision,
                coordinates: this.editItemForm.coordinates,
                dimension: this.editItemForm.dimension,
                actual_value: this.editItemForm.actual_value,
                critical_parts: this.editItemForm.critical_parts,
                critical_dimension: this.editItemForm.critical_dimension,
                request_type: this.editItemForm.kind_request.value,
                request_value: this.editItemForm.request_value,
                request_quantity: this.editItemForm.request_quantity,
                unit_id: this.editItemForm.unit_id,
                requestor_employee_id: sessionStorage.getItem("employee_id")
            }
            return new Promise((resolve, reject) => {
                axios.patch(`agreement-list/${payload.id}`, payload).then(response => {
                    resolve(response.data)
                    this.setAgreementListCode()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setDeleteAgreementList(data) {
            var agreement_id = data.agreement_id_pk
            return new Promise((resolve, reject) => {
                axios.delete(`agreement-list/${agreement_id}`).then(response => {
                    resolve(response.data)
                    this.setAgreementListCode()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getEditItemDetailsFields() {
            return this.editItemDetailsFields
        },
        getEditItemDetails() {
            return this.editItemDetails
        }
    }
})