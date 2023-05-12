import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import VueSweetalert2 from 'vue-sweetalert2';
import PrimeVue from 'primevue/config';

import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://10.164.58.62/hinsei/server/public/api/';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUser, faInfoCircle, faBars, faAddressCard, faInfo, faAngleRight, faAngleDown, faClipboardList, faRing, faClone, faColumns,
    faChartArea, faChartPie, faChartLine, faChartBar, faSignOutAlt, faEnvelope, faWindowClose, faComments, faQuestion, faEdit, faBell, faGripLines, faUsers, faDesktop, faLock, faPlusSquare, faPencilAlt, faTrash, faFileLines, faHouse, faUserCircle, faUserPlus, faUserMinus, faSearch, faGear, faMagnifyingGlassPlus, faLayerGroup, faFolderPlus, faPenToSquare, faPuzzlePiece, faTags, faPaperclip, faCircleMinus, faUsersGear, faMagnifyingGlass, faXmark, faCloudArrowUp, faEraser, faDownload, faEye, faPen, faFloppyDisk, faRightFromBracket
}
    from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faInfoCircle, faBars, faAddressCard, faInfo, faAngleRight, faAngleDown, faClipboardList, faRing, faClone, faColumns,
    faChartArea, faChartPie, faChartLine, faChartBar, faSignOutAlt, faEnvelope, faWindowClose, faComments, faQuestion, faEdit, faBell, faGripLines, faUsers, faDesktop, faLock, faPlusSquare, faPencilAlt, faTrash, faFileLines, faHouse, faUserCircle, faUserPlus, faUserMinus, faSearch, faGear, faMagnifyingGlassPlus, faLayerGroup, faFolderPlus, faPenToSquare, faPuzzlePiece, faTags, faPaperclip, faCircleMinus, faUsersGear, faMagnifyingGlass, faXmark, faCloudArrowUp, faEraser, faDownload, faEye, faPen, faFloppyDisk, faRightFromBracket)

import Calendar from 'primevue/calendar';
import Chart from "primevue/chart";

const pinia = createPinia()
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('prime-calendar', Calendar)
app.component('Chart', Chart)

app.use(VueSweetalert2);
app.use(pinia)
app.use(router)
app.use(PrimeVue);

app.mount('#app')