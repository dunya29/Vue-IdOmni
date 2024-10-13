
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

import { useCommonStore } from '@/store/common';
const storeCommon = useCommonStore()

onMounted(()=> {
    ['register', 'login', 'forbidden', 'recovery'].includes(route.name) ? storeCommon.isLoginPage() : storeCommon.noLoginPage();
    ['access-denied', 'notfound'].includes(route.name) ? storeCommon.isDeniedPage() : storeCommon.noDeniedPage()
})
</script>

<template>
    <div class="page-wrap">
        <slot></slot>
    </div>   
</template>
