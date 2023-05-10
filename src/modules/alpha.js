import { defineStore } from "pinia";

export const useAlphaStore = defineStore('alpha', { 
    state: () => ({
        sidebar: false
    }),
    actions: {
        setSidebar(){
            this.sidebar = !this.sidebar
        }
    },
    getters: {
        getSidebar(){
            return this.sidebar
        }

    }
})