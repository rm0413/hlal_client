import { defineStore } from 'pinia'

import axios from 'axios'
export const useDashboardStore = defineStore({
    id: 'designerSectionAnswer',
    state: () => ({
        designerSectionAnswer: [],
    }),
    actions: {
        setCountRequest() {
            return new Promise((resolve, reject) => {
                axios.get('count-request').then(response => {
                    resolve(response.data)
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
    }
})