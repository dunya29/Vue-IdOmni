<script setup>
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/store/auth';
import { useCommonStore } from '@/store/common';
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
const storeAuth = useAuthStore()
const storeCommon = useCommonStore()
const initApp = ref(false)
onBeforeMount(async ()=> {
    try {
        await storeAuth.isLogIn()
        initApp.value = true
    } catch(err) {
        console.log(err)
    }
})
</script>
<template>
    <simplebar data-simplebar-auto-hide="false" class="body-scrollbar">
        <Header :headerLog="storeCommon.loginPage" />
        <RouterView v-slot="{ Component, route }" v-if="initApp">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" :key="route.path"/>
            </transition>
        </RouterView>  
        <Footer v-if="!storeCommon.loginPage && !storeCommon.deniedPage" />  
    </simplebar>
</template>

<style lang="scss">
[data-simplebar] {
    height: 100%;
    overflow: auto;
}
#app, body {
    height: 100dvh;
    overflow: hidden;  
}
.noscroll .body-scrollbar {
    .simplebar-content-wrapper {
        overflow: hidden !important;
    }
    .simplebar-track.simplebar-vertical {
        visibility: hidden!important
    }
}
.simplebar-scrollbar:before {
    background: black;
    border-radius: 0;
    -webkit-transition: opacity .2s .5s linear;
    transition: opacity .2s .5s linear;
}
.simplebar-scrollbar.simplebar-visible:before {
    opacity: 1
}
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
