import { defineStore } from 'pinia'

import axios from 'axios'
export const useDashboardStore = defineStore({
    id: 'designerSectionAnswer',
    state: () => ({
        chartData: [],
        date_from: null,
        date_to: null,
        activity_logs: [],
        count_request: [],
    }),
    actions: {
        setCountRequest() {
            var payload = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            return new Promise((resolve, reject) => {
                axios.get(`count-request?date_from=${payload.date_from}&date_to=${payload.date_to}`).then(response => {
                    resolve(response.data)
                    this.count_request = response.data.data[0]
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setLoadCountResult() {
            var payload = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            return new Promise((resolve, reject) => {
                axios.get(`load-count-result?date_from=${payload.date_from}&date_to=${payload.date_to}`).then(response => {
                    resolve(response.data)
                    this.chartData = response.data.data[0]
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setActivityLogs() {
            var payload = {
                date_from: this.date_from,
                date_to: this.date_to
            }
            // console.log(payload)
            return new Promise((resolve, reject) => {
                axios.get(`load-activity-logs?date_from=${payload.date_from}&date_to=${payload.date_to}`).then(response => {
                    resolve(response.data)
                    // alert(1)
                    this.activity_logs = response.data.data[0]
                    // console.log(response.data) 
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getCountResult() {
            return this.chartData;
        },
        getActivityLogs() {
            return this.activity_logs;
        },
        getCountRequest() {
            return this.count_request;
        },
    }
})