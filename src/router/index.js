import { createRouter, createWebHashHistory } from "vue-router";

const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.afterEach((to, from) => {
    var checkToken = localStorage.getItem("userdata")
    if (to.fullPath !== '/') {
        if (!checkToken) {
            window.location.href = 'http://10.164.58.62/FDTP-Portal/public/login'
        } else { console.log('authenticated') }
    }
})

export default router;