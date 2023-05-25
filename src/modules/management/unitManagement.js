import { defineStore } from "pinia";
import axios from 'axios'

export const useUnitManagementStore = defineStore({
    id: 'unitManagement',
    state: () => ({
        unitManagement: [],
        units: [],
        unitManagementFields: [
            { label: '#', key: 'unit_id' },
            { label: 'Unit Name', key: 'unit_name' },
            { label: 'Created By', key: 'emp_full_name' },
            { label: 'Date Created', key: 'unit_created_date' },
            { label: 'Action', key: 'action' },
        ],
        unitForm: {
            unit_name: null,
            unit_created_by: null,
            unit_status: null
        },
        onEdit: false,
        onEditIndex: null
    }),
    actions: {
        setClearUnit() {
            this.unitForm = {
                unit_name: null,
                unit_created_by: null,
                unit_status: null,
            }
            this.onEdit = false
            this.onEditIndex = null
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
        setInsertUnit() {
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
        setEditUnit(data) {
            this.unitForm = {
                id: data.unit_id,
                unit_name: data.unit_name,
                unit_created_by: sessionStorage.getItem("employee_id"),
                unit_status: "ACTIVE",
            }
        },
        setUpdateUnit() {
            var unit_data = {
                id: this.unitForm.id,
                unit_name: this.unitForm.unit_name,
                unit_created_by: this.unitForm.unit_created_by,
                unit_status: this.unitForm.unit_status
            }
            // console.log(unit_data)
            return new Promise((resolve, reject) => {
                axios.patch(`unit/${unit_data.id}`, unit_data).then(response => {
                    resolve(response.data)
                    this.setUnits()
                    this.setClearUnit()
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setDeleteUnit(data) {
            return new Promise((resolve, reject) => {
                axios.delete(`unit/${data.unit_id}`).then(response => {
                    resolve(response.data)
                    this.setUnits()
                    // console.log(response.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getUnit() {
            return this.units
        }
    }
})