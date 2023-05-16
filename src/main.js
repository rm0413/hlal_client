import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import VueSweetalert2 from 'vue-sweetalert2';

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://10.164.58.62/hinsei/server2/public/api/';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUser, faInfoCircle, faBars, faAddressCard, faInfo, faAngleRight, faAngleDown, faClipboardList, faRing, faClone, faColumns,
    faChartArea, faChartPie, faChartLine, faChartBar, faSignOutAlt, faEnvelope, faWindowClose, faComments, faQuestion, faEdit, faBell, faGripLines, faUsers, faDesktop, faLock, faPlusSquare, faPencilAlt, faTrash, faFileLines, faHouse, faUserCircle, faUserPlus, faUserMinus, faSearch, faGear, faMagnifyingGlassPlus, faLayerGroup, faFolderPlus, faPenToSquare, faPuzzlePiece, faTags, faPaperclip, faCircleMinus, faUsersGear, faMagnifyingGlass, faXmark, faCloudArrowUp, faEraser, faDownload, faEye, faPen, faFloppyDisk, faRightFromBracket
}
    from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faInfoCircle, faBars, faAddressCard, faInfo, faAngleRight, faAngleDown, faClipboardList, faRing, faClone, faColumns,
    faChartArea, faChartPie, faChartLine, faChartBar, faSignOutAlt, faEnvelope, faWindowClose, faComments, faQuestion, faEdit, faBell, faGripLines, faUsers, faDesktop, faLock, faPlusSquare, faPencilAlt, faTrash, faFileLines, faHouse, faUserCircle, faUserPlus, faUserMinus, faSearch, faGear, faMagnifyingGlassPlus, faLayerGroup, faFolderPlus, faPenToSquare, faPuzzlePiece, faTags, faPaperclip, faCircleMinus, faUsersGear, faMagnifyingGlass, faXmark, faCloudArrowUp, faEraser, faDownload, faEye, faPen, faFloppyDisk, faRightFromBracket)


const pinia = createPinia()
const app = createApp(App)

import Chart from "primevue/chart";
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload'
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css'; 


app.component('font-awesome-icon', FontAwesomeIcon)

app.component('Chart', Chart)
app.component('multiselect', MultiSelect)
app.component('drop-down', Dropdown)
app.component('input-text', InputText)
app.component('Button', Button)
app.component('FileUpload', FileUpload)
app.component('Dialog', Dialog)

app.use(VueSweetalert2);
app.use(pinia)
app.use(router)
app.use(PrimeVue);
app.use(ToastService)

app.mount('#app')