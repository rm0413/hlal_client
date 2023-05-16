<template>
  <div>
    <svg class="absolute z-50 right-[37.8%] top-[42%]">
      <g id="Group_2" data-name="Group 2" class="animate-bounce">
        <g id="Group_1" data-name="Group 1" transform="translate(0 4.119)">
          <path
            id="Path_1"
            data-name="Path 1"
            d="M13.969-.111l56.525,7.52L-.239,31.9Z"
            transform="translate(32.18 28.202) rotate(83)"
            fill="#fff175"
          />
          <g
            id="Path_5"
            data-name="Path 5"
            transform="translate(0 31.852) rotate(-45)"
            fill="none"
          >
            <path d="M0,0,30.9,16.228,48.015,48.015,16.586,31.382Z" stroke="none" />
            <path
              d="M 0.7175788879394531 0.7156753540039062 L 16.80827140808105 31.15959930419922 L 47.282958984375 47.28813552856445 L 30.68162155151367 16.45095825195312 L 0.7175788879394531 0.7156753540039062 M 0 0 L 30.90229797363281 16.22799873352051 L 48.01495742797852 48.01495742797852 L 16.58623886108398 31.38150787353516 L 0 0 Z"
              stroke="none"
              fill="#fff175"
            />
          </g>
        </g>
        <g
          id="Path_6"
          data-name="Path 6"
          transform="translate(67.226 36.046) rotate(83)"
          fill="none"
        >
          <path d="M5.655,34.788l55.63,6.83L0,0Z" stroke="none" />
          <path
            d="M 60.08937835693359 41.16980361938477 L 0.4079058766365051 0.6396446824073792 L 5.914634704589844 34.51797103881836 L 60.08937835693359 41.16980361938477 M 61.28452301025391 41.61879730224609 L 5.654641628265381 34.78829574584961 L 1.505126988377015e-06 -3.256225681980141e-06 L 61.28452301025391 41.61879730224609 Z"
            stroke="none"
            fill="#fff175"
          />
        </g>
      </g>
    </svg>
    <div class="bg-gray-600 h-screen flex items-center justify-center relative">
      <label class="text-white text-[2rem]">Hinsei LSA Agreement List</label>
    </div>
  </div>
</template>
<script setup>
import { inject, onMounted, ref } from "vue";
import { useLoginStore } from "../modules/login";
import { useRouter } from "vue-router";

const loginStore = useLoginStore();
const router = useRouter();
const token = ref(window.location.href.split("/")[6]);
const role = ref( window.location.href.split("/")[7].split("#")[0]);
// const system_id = ref(window.location.href.split("/")[6].split("#")[0] === "#" ? '' : window.location.href.split("/")[6].split("#")[0])
const swal = inject("$swal");

onMounted(() => {
  console.log(window.location.href.split('/'))
  if(token.value){
  loginStore.setLogin(token.value).then((response) => {
    localStorage.setItem("userdata", JSON.stringify(token.value));
    if (response.status === "success") {
      loginStore.setUser(response.data, role.value).then((response) => {
        if (response.status === "success") {
          var login_data = {
            employee_id: response.data,
            role_access: {
              role_access: role.value,
            },
          };
          loginStore.setLoginRole(login_data).then((response) => {
            if (response.status === "success") {
              setTimeout(() => {
                swal({
                  icon: "success",
                  title: "Login Successfully",
                  text: "Welcome " + sessionStorage.getItem("first_name") + "!",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  router.push({ name: "dashboard" });
                });
              }, 1200);
            } else {
              swal({
                icon: "warning",
                title: "User Unauthorized",
                text: "Please request access from the system`s P.I.C ",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                window.location.href = "http://10.164.58.62/FDTP-Portal/public/";
              });
            }
          });
        } else {
          swal({
            icon: "warning",
            title: "Something went wrong",
            text: "Please contact system administrator.",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.href = "http://10.164.58.62/FDTP-Portal/public/";
          });
        }
      });
    } else {
      swal({
        icon: "warning",
        title: "Unauthorized User",
        text: "Redirecting to FDTP-Portal!!",
        timer: 2000,
      }).then(() => {
        window.location.href = "http://10.164.58.62/FDTP-Portal/public/";
      });
    }
  });
} else {
  swal({
        icon: "warning",
        title: "Unauthorized User",
        text: "Redirecting to FDTP-Portal!!",
        timer: 2000,
      }).then(() => {
        window.location.href = "http://10.164.58.62/FDTP-Portal/public/";
      });
}
});
</script>
