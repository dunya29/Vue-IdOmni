<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'

const props = defineProps({
    headerLog: Boolean
})
const router = useRouter()
const storeAuth = useAuthStore()
const logIn = () => {
    router.push("/login")
}
const logOut = () => {   
    localStorage.removeItem("user")
    storeAuth.logOut()
    storeAuth.adminLogOut()
    router.push("/login")
}
</script>
<template>
    <!--header-->
    <header class="header" :class="headerLog && 'header--log'">
        <div class="header__content fixed-block">
            <div class="container header__container">
                <div class="header__body">
                    <RouterLink :to="storeAuth.logged ? '/catalog' : '/login'" class="header__logo">
                        <svg viewBox="0 0 40 28" id="logo" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2 0h3.6v3.6H7.2V0zm0 6.803V10.4H3.601v7.2h3.597v6.801h3.6v-3.6h17.603v3.6h-6.8V28h6.8v-3.6h3.6v-6.8H35.6v-7.2h-3.599V6.802h-3.596v-3.2h-3.6v3.2H14.397v-3.2h-3.6v3.2H7.199zm21.202 7.195v-3.595H24.8v3.595h3.603zm-14.004-3.595v3.595H10.8v-3.595h3.598zM3.6 13.998H0v10.4h3.6v-10.4zm14.002 14.003v-3.6h-6.8V28h6.8zM32.002 0h-3.6v3.6h3.6V0zm7.204 13.998h-3.6v10.4h3.6v-10.4z"/>
                        </svg>
                        <span class="header__logo-title">Omni</span>
                    </RouterLink>
                    <div v-if="!headerLog">
                        <button class="btn-reset h4 header__logOut" @click="()=>logOut()" v-if="storeAuth.logged">Выйти</button>
                        <button class="btn-reset h4 header__logOut" @click="()=>logIn()" v-else>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<style>
    .header__logo.router-link-active {
        pointer-events: none;
    }
</style>