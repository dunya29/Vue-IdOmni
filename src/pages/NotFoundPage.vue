<script setup>
import PageWrap from '@/components/PageWrap.vue';
import { RouterLink } from 'vue-router';

</script>
<template>
    <PageWrap>
        <section class="notfound">
            <div class="container">
                <h1>Страница не найдена</h1>
                <p class="h4">Страница,которую вы ищите, не существует. Возможно она устарела, удалена или ссылка на нее была введена неверно.</p>  
                <RouterLink :to="{ name: 'login' }" class="btn main-btn"><span>На главную</span></RouterLink>
            </div>
        </section>
    </PageWrap>
</template>