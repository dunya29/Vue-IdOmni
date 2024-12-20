<script setup>
import { authApi } from "@/api/api";
import PageWrap from "@/components/PageWrap.vue";
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const storeAuth = useAuthStore();
const loading = ref(false);
const resendVerificationLink = async () => {
    loading.value = true;
    try {
        await authApi.emailVerify(storeAuth.userData.email);
        router.push("/login");
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    if (storeAuth.userData.emailVerified) {
        router.push("/catalog");
    }
});
</script>
<template>
    <PageWrap>
        <section class="log-p">
            <div class="container">
                <div class="log-p__inner">
                    <div class="log-p__content">
                        <div class="log-p__top">
                            <h1>Подтвердите почту</h1>
                            <p>Прежде чем продолжить, пожалуйста, подтвердите свой адрес электронной почты, перейдя по ссылке, которую мы только что отправили вам по электронной почте. Если вы не получили письмо, мы с удовольствием отправим его повторно.</p>
                        </div>
                        <div class="log-p__btns">
                            <button class="btn main-btn" :disabled="loading" @click="() => resendVerificationLink()">
                                <span :class=" loading && 'loading'">Отправить повторно</span>
                            </button>
                            <RouterLink to="/login" class="btn stroke-btn" @click="() => storeAuth.logOut()"><span>Выйти</span></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>