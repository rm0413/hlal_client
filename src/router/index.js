import { createRouter, createWebHashHistory } from "vue-router";
import Swal from 'sweetalert2/dist/sweetalert2';

const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Monitoring = () => import('@/views/Monitoring.vue')
const Usermanagement = () => import('@/views/Usermanagement.vue')
const Unitmanagement = () => import('@/views/UnitManagement.vue')
const Request = () => import('@/views/Request.vue')
const NewRequest = () => import('@/views/request/NewRequest.vue')
const InspectionData = () => import('@/views/request/InspectionData.vue')
const EditItemDetails = () => import('@/views/request/EditItemDetails.vue')
const DesignerSectionAnswer = () => import('@/views/request/DesignerSectionAnswer.vue')
// const DesignerSectionAnswer = () => import('@/views/request/DesignerSectionAnswer.vue')
const Attachment = () => import('@/views/request/Attachment.vue')
const SavedInputs = () => import('@/views/request/SavedInputs.vue')

const routes = [
    {
        path: '/login/:pathMatch(.*)*',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/request',
        name: 'request',
        component: Request,
    },
    {
        path: '/new-request',
        name: 'new-request',
        component: NewRequest
    },
    {
        path: '/inspection-data',
        name: 'inspection-data',
        component: InspectionData
    },
    {
        path: '/edit-item-details',
        name: 'edit-item-details',
        component: EditItemDetails
    },
    {
        path: '/designer-section-answer',
        name: 'designer-section-answer',
        component: DesignerSectionAnswer
    },
    {
        path: '/attachment',
        name: 'attachment',
        component: Attachment
    },
    {
        path: '/saved-inputs',
        name: 'saved-inputs',
        component: SavedInputs
    },
    {
        path: '/monitoring',
        name: 'monitoring',
        component: Monitoring
    },
    {
        path: '/usermanagement',
        name: 'usermanagement',
        component: Usermanagement
    },
    {
        path: '/unitmanagement',
        name: 'unitmanagement',
        component: Unitmanagement
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    linkActiveClass: "translate-x-3 rounded",
})

router.afterEach((to, from) => {
    var checkToken = sessionStorage.getItem("userdata")
    if (to.name !== 'login') {
        if (!checkToken) {
            window.location.href = 'http://10.164.58.62/FDTP-Portal/public/login'
        } else { console.log('authenticated') }
    }
})

export default router;