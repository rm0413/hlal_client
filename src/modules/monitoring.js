import { defineStore } from 'pinia'
import axios from 'axios'

export const useMonitoringStore = defineStore({
    id: 'monitoring',
    state: () => ({
        monitoring: [],
        monitoringFields: [
            { label: 'Select', key: 'select' },
            { label: 'Item No.', key: 'id' },
            { label: 'Action', key: 'action' },
            { label: 'Unit Name', key: 'unit_name' },
            { label: 'Supplier', key: 'supplier' },
            { label: 'Part Number', key: 'part_number' },
        ],
        monitoringForm: {
            monitoring_unit_name: '',
            monitoring_supplier: '',
            monitoring_part_number: '',
        },
        onEdit: false,
        onEditIndex: null,
        units: []
    }),
    actions: {
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
        setUnit(){
            console.log(this.monitoringForm.monitoring_unit_name)
        }
    },
    getters: {
        getMonitoringFields() {
            return this.monitoringFields
        },
        getUnit() {
            return this.units
        },
    }
})