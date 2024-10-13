<script setup>
import Contacts from '@/components/Contacts.vue';
import PageWrap from '@/components/PageWrap.vue';

</script>
<template>
    <PageWrap>
        <section class="log-p log-p--forbidden">
            <div class="container">
                <div class="log-p__inner">
                    <div class="log-p__content">
                        <div class="log-p__top">
                            <h1>Доступ ограничен</h1>
                            <p>Ваш доступ к сайту ограничен из-за того, что вы ввели неверный логин или пароль 10 раз подряд. Для разблокировки и восстановления доступа свяжитесь с нами:</p>                            
                        </div>
                        <Contacts />
                    </div>  
                </div>
            </div>
        </section>
    </PageWrap>
</template>