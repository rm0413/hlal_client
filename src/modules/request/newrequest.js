import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewRequestStore = defineStore({
    id: 'newRequest',
    state: () => ({
        agreement_list: [],
        view_item_details_fields: [
            {label: '#', key: '#'},
            {label: 'Selected', key: 'selected'},
            {label: 'Trial Number', key: 'trial_number'},
            {label: 'Request Date', key: 'request_date'},
            {label: 'TRI No.', key: 'tri_number'},
            {label: 'Supplier', key: 'supplier_name'},
            {label: 'Part Number', key: 'part_number'},
            {label: 'Revision', key: 'revision'},
            {label: 'Dimension', key: 'dimension'},
            {label: 'Actual Value', key: 'actual_value'}
        ]
    }),
    actions: {
        setAgreementList(){
            return new Promise((resolve, reject) => {
                axios.get('agreement-list').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.agreement_list = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        }

    },
    getters: {
        getViewItemDetailsFields(){
            return this.view_item_details_fields
        },
        getAgreementList(){
            // alert(1)
            // console.log(this.agreement_list)
            return this.agreement_list
        }
    }
})