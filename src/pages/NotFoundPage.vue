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
                <div class="btn-main">
                    <RouterLink to="/login" class="btn-reset btn-main-body">На главную</RouterLink>
                    <div></div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>