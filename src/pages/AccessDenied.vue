<script setup>
import PageWrap from '@/components/PageWrap.vue';

</script>
<template>
    <PageWrap>
        <section class="notfound">
            <div class="container">
                <h1>Доступ ограничен</h1>
                <p class="h4">Вы не имеете доступа к данной странице</p>  
                <div class="btn-main">
                    <RouterLink to="/catalog" class="btn-reset btn-main-body">Вернуться в каталог</RouterLink>
                    <div></div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>


