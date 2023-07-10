import { defineStore } from "pinia"

import axios from 'axios'
export const useAttachmentsStore = defineStore({
    id: 'attachment',
    state: () => ({
        attachments: [],
        attachmentsField: [
            { label: 'Code', key: 'code' },
            { label: 'Trial No.', key: 'trial_number' },
            { label: 'Request Date', key: 'request_date' },
            { label: 'Supplier', key: 'supplier_name' },
            { label: 'Part Number', key: 'part_number' },
            { label: 'Revision', key: 'revision' },
            { label: 'Dimension', key: 'dimension' },
            { label: 'File Path', key: 'file_path_attachment' },
        ],
        part_number_select: '',
        search_filter: ''

    }),
    actions: {
        setAgreementListCode() {
            return new Promise((resolve, reject) => {
                axios.get('load-with-code-attachment').then(response => {
                    resolve(response.data.data)
                    // console.log(response.data)
                    this.attachments = response.data.data
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setInsertAttachment(data) {
            return new Promise((resolve, reject) => {
                axios.post('attachment', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    resolve(response.data)
                    this.setAgreementListCode()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setLoadPartNumber() {
            return new Promise((resolve, reject) => {
                axios.get('load-part-number-with-code').then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        downloadAttachment(payload) {
            return new Promise((resolve, reject) => {
                axios.get('http://10.164.58.62/hinsei/server/public/download-attachment', payload).then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
    },
    getters: {
        getAttachmentsFields() {
            return this.attachmentsField
        },
        getAttachment() {
            return this.attachments
        }
    }
})