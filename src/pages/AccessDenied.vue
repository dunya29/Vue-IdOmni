<script setup>
import PageWrap from '@/components/PageWrap.vue';

</script>
<template>
    <PageWrap>
        <section class="notfound">
            <div class="container">
                <h1>Доступ ограничен</h1>
                <p class="h4">Вы не имеете доступа к данной странице</p>  
                <RouterLink to="/catalog" class="btn main-btn"><span>Вернуться в каталог</span></RouterLink>
            </div>
        </section>
    </PageWrap>
</template>


