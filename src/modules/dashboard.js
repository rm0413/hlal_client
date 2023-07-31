import { defineStore } from 'pinia'

import axios from 'axios'
export const useDashboardStore = defineStore({
    id: 'designerSectionAnswer',
    state: () => ({
        chartData: [],
        date_from: null,
        date_to: null
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
        setLoadCountResult(){
            var payload = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            return new Promise((resolve, reject) => {
                axios.get(`load-count-result?date_from=${payload.date_from}&date_to=${payload.date_to}`).then(response => {
                    resolve(response.data)
                    this.chartData = response.data.data[0]
                    console.log(this.chartData)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getCountResult(){
            return this.chartData;
        }
    }
})