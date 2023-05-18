import { defineStore } from "pinia";

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: [
            {
                footer: '[#A10E13]',
                header: '[#A10E13]',
                sidebar: 'white',
                sidebar_text: 'black',
                sidebar_icon: 'black', 
                sidebar_route_bg: 'white',
                sidebar_sub_icon: 'blue-600',
                container: 'white',
                _content: 'white',
                aside: 'white',
                _navbar: 'white',
                _navbar_icon: 'black',
                
            },
            {
                footer: 'gray-900',
                header: 'gray-700',
                sidebar: 'gray-700',
                sidebar_text: 'white',
                sidebar_icon: 'white', 
                sidebar_sub_icon: 'blue-300',
                sidebar_route_bg: 'gray-800',
                container: 'gray-700',
                _content: 'gray-200',
                aside: 'gray-700',
                _navbar: 'gray-700',
                _navbar_icon: 'white',
            }
        ],
        theme_select: 0,
    }),
    actions: {
        darkMode(){
            this.theme_select = 1
        },
        onDefault(){
            this.theme_select = 0
        }
    },
    getters: {

    }
})