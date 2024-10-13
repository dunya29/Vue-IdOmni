<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/store/auth';
import { useCommonStore } from '@/store/common';
import { loginApi } from './api/api';
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';
const storeAuth = useAuthStore()
const storeCommon = useCommonStore()
onMounted(async ()=> {
    const user = localStorage.getItem("user")
    if (user) {
        const email = JSON.parse(user).email
        try {
            const {data} = await loginApi.checkAdmin(email)
            if (data.length > 0) {
                storeAuth.adminLogIn()
            }
        } catch(err) {
            console.log(err)
        }
        storeAuth.logIn()
    } else {
        storeAuth.logOut()
    }
})
</script>
<template>
    <Header :headerLog="storeCommon.loginPage" />
    <RouterView v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" :key="route.path"/>
        </transition>
    </RouterView>  
    <Footer v-if="!storeCommon.loginPage && !storeCommon.deniedPage" /> 
</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.4s ease-in-out;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .fadeUp-enter-active,
    .fadeUp-leave-active {
        transition: all 0.6s ease;
    }
    .fadeUp-enter-from,
    .fadeUp-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }
</style>
