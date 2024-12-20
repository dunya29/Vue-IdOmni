<script setup>
import PageWrap from "@/components/PageWrap.vue";
import { RouterLink } from "vue-router";
</script>
<template>
    <PageWrap>
        <section class="log-p">
            <div class="container">
                <div class="log-p__inner">
                    <div class="log-p__content">
                        <div class="log-p__top">
                            <h1>Пароль изменен</h1>
                            <p>Ваш пароль был изменен, и теперь вы можете использовать его для входа в свой аккаунт</p>
                        </div>
                        <div class="log-p__btns">
                            <RouterLink to="/login" class="btn main-btn"><span>Войти</span></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>