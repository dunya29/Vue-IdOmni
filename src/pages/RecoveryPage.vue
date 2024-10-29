<script setup>
import { authApi } from '@/api/api';
import { isPassword } from '@/functions/validation';
import { useForm } from 'vee-validate';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Contacts from '@/components/Contacts.vue';
import PageWrap from '@/components/PageWrap.vue';
import { useAuthStore } from '@/store/auth';
const storeAuth = useAuthStore()
const schema = {
    password: (val) =>
        val
            ? isPassword(val)
                ? true
                : "Пароль должен содержать минимум 6 символов"
            : "Заполните поле"
}
const router = useRouter()
const route = useRoute()
const { errors, handleSubmit, isSubmitting, defineField} = useForm({
  validationSchema: schema
});
const [password, passwordAttrs] = defineField("password");
const passwordShow = ref(false)
const passwordTextType = ref(false)
const togglePassVisibility = () => {
  passwordTextType.value = !passwordTextType.value
}
const onSubmit = handleSubmit(async values => {
    const email = route.query.email
    try {
        await authApi.recoveryPassword(email, values.password)
        router.push({name: "login"})
    } catch(err) {
        console.log(err)
    }
    
});
onMounted(() => {
    if (storeAuth.logged) {
        router.push({name: 'catalog'})
    }
})
watch(()=> storeAuth.logged, () => {
    if (storeAuth.logged) {
        router.push({name: 'catalog'})
    }
})
watch(() => password.value, () => {
  passwordShow.value = password.value.length > 0 ? true : false
})
</script>

<template>
    <PageWrap>
        <section class="log-p">
            <div class="container">
                <div class="log-p__inner">
                    <div class="log-p__content">
                        <div class="log-p__top">
                            <h1>Новый пароль</h1>
                            <p>Придумайте новый пароль для входа в свой аккаунт</p>
                        </div>
                        <form class="form" @submit.prevent="onSubmit" novalidate>
                            <div class="form__items">
                                <div class="item-form item-form--password" :class="{'show-eyeBtn': passwordShow, 'show-password': passwordTextType}">
                                    <input
                                        :type="passwordTextType ? 'text' : 'password'"
                                        placeholder="Пароль"
                                        name="password"
                                        v-model="password"
                                        v-bind="passwordAttrs"
                                        autocomplete="off"
                                    />
                                    <div data-error="">{{ errors.password }}</div>
                                    <button type="button" 
                                        class="btn-reset item-form__eye" 
                                        @click="()=>togglePassVisibility()"                                    
                                        v-if="passwordShow">
                                    </button>
                                </div>
                            </div>
                            <div class="form__footer">
                                <button class="btn main-btn" type="submit" :disabled="isSubmitting">
                                    <span :class="isSubmitting && 'loading'">Ок</span>
                                </button>                             
                            </div>
                        </form>
                        <Contacts />
                    </div>  
                </div>
            </div>
        </section>
    </PageWrap>
</template>