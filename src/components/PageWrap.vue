
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

import { useCommonStore } from '@/store/common';
const storeCommon = useCommonStore()

onMounted(()=> {
    ['home', 'register', 'login', 'forbidden','forgot-password', 'recovery'].includes(route.name) ? storeCommon.isLoginPage() : storeCommon.noLoginPage();
    ['access-denied', 'notfound'].includes(route.name) ? storeCommon.isDeniedPage() : storeCommon.noDeniedPage()
})
</script>

<template>
    <main class="main">
        <slot></slot>
    </main>   
</template>
