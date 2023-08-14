import axios from "axios";
import { defineStore } from "pinia";

axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`;

export const useLoginStore = defineStore({
    id: 'login',
    state: () => ({
        userProfile: null,
        role: null,
        section_code: null
    }),
    actions: {
        setLogin(data) {
            axios.defaults.headers.common.Authorization = `Bearer ${data}`;
            return new Promise((resolve, reject) => {
                axios.post(`http://10.164.58.82/FDTP-Portal/public/api/auth/profile`).then((response) => {
                    resolve(response.data)
                    this.userProfile = response.data.data
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        setUser(data, role) {
            return new Promise((resolve, reject) => {
                axios.get(`user/${data.emp_id}`).then((response) => {
                    resolve(response.data)
                    if (response.data.status === "success") {
                        sessionStorage.setItem("email", this.userProfile.email)
                        sessionStorage.setItem("employee_id", this.userProfile.emp_id)
                        sessionStorage.setItem("employee_status", this.userProfile.is_admin)
                        sessionStorage.setItem("first_name", this.userProfile.first_name)
                        sessionStorage.setItem("last_name", this.userProfile.last_name)
                        sessionStorage.setItem("middle_name", this.userProfile.middle_name)
                        sessionStorage.setItem("photo", this.userProfile.photo)
                        sessionStorage.setItem("position", this.userProfile.position)
                        sessionStorage.setItem("role_access", role)
                        sessionStorage.setItem("section", this.userProfile.section)
                        sessionStorage.setItem("section_code", this.userProfile.section_code)
                        // var login_data = {
                        //     employee_id: data,
                        //     role_access: {
                        //         role_access: role,
                        //     },
                        // };
                        this.role = sessionStorage.getItem('role_access')
                        this.section_code = sessionStorage.getItem('section_code')
                        // this.setLoginRole(login_data);
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setLoginRole(data) {
            var payload = {
                id: data.employee_id.emp_id,
                role_access: data.role_access.role_access,
                employee_id: data.employee_id.emp_id,
                emp_id: sessionStorage.getItem('employee_id')
            }
            return new Promise((resolve, reject) => {
                axios.patch(`user/${payload.id}`, payload).then(response => {
                    resolve(response.data)
                }).then(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {}
})