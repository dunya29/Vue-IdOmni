<script setup>
import { authApi } from "@/api/api";
import Contacts from "@/components/Contacts.vue";
import { isEmail } from "@/functions/validation";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import PageWrap from "@/components/PageWrap.vue";

const storeAuth = useAuthStore();
const emailVal = ref("");
const passVal = ref("");
const passwordShow = ref(false);
const passwordTextType = ref(false);
const formError = ref(null);
const formErrEmail = ref(null);
const formErrCount = ref(0);
const schema = {
    email: (val) => {
        if (val) {
            if (isEmail(val)) {
                if (emailVal.value != val) {
                    emailVal.value = val;
                    formError.value = null;
                }
                return true;
            } else {
                formError.value = null;
                return "Некорректный E-mail";
            }
        } else {
            formError.value = null;
            return "Заполните поле";
        }
    },
    password: (val) => {
        if (val) {
            if (passVal.value != val) {
                passVal.value = val;
                formError.value = null;
            }
            return true;
        } else {
            formError.value = null;
            return "Заполните поле";
        }
    },
};
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
        email: storeAuth.userData.email || "",
    },
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const router = useRouter();
const route = useRoute();
const onSubmit = handleSubmit(async (values) => {
    try {
        const { data } = await authApi.auth(values.email, values.password);
        storeAuth.auth(data);
        if (storeAuth.userData.emailVerified) {
            if (storeAuth.userData.disable) {
                router.push("/forbidden");
            } else if (localStorage.getItem("inviteLink")) {
                let inviteLink = localStorage.getItem("inviteLink");
                if (inviteLink) {
                    let isInvite = JSON.parse(inviteLink);
                    router.push({
                        name: "docs",
                        params: { id: isInvite.id },
                    });
                }
            } else {
                router.push(route.query.redirect || "/catalog");
            }
        } else {
            router.push("/verify");
        }
    } catch (err) {
        console.log(err);
        if (err.status === 401) {
            formError.value = "Неправильный email или пароль";
            if (formErrEmail.value === values.email) {
                formErrCount.value++;
                if (formErrCount.value === 10) {
                    await authApi.disableUser(values.email);
                    router.push("/forbidden");
                }
            } else {
                formErrEmail.value = values.email;
                formErrCount.value = 0;
            }
        }
    }
});
const togglePassVisibility = () => {
    passwordTextType.value = !passwordTextType.value;
};
watch(
    () => storeAuth.userData.email,
    () => {
        if (storeAuth.userData.email) {
            email.value = storeAuth.userData.email;
        }
    },
    { once: true }
);
watch(
    () => password.value,
    () => {
        passwordShow.value = password.value.length > 0 ? true : false;
    }
);
</script>
<template>
    <PageWrap>
        <section class="log-p">
            <div class="container">
                <div class="log-p__inner">
                    <div class="log-p__content">
                        <div class="log-p__top">
                            <h1>вход для клиентов</h1>
                            <p class="log-p__subtitle">
                                Если у вас нет аккаунта. Вы можете
                                <RouterLink :to=" { name: 'register' }" class="link">Зарегистрироваться</RouterLink>
                            </p>
                        </div>
                        <form class="form" @submit.prevent="onSubmit" novalidate>
                            <div class="form__items">
                                <div class="item-form">
                                    <input type="email" placeholder="E-mail" name="mail" v-model="email" v-bind="emailAttrs" />
                                    <div data-error="">{{ errors.email }}</div>
                                </div>
                                <div class="item-form item-form--password" :class="{'show-eyeBtn': passwordShow, 'show-password': passwordTextType}">
                                    <input :type="passwordTextType ? 'text' : 'password'" autocomplete="off" placeholder="Пароль" name="password" v-model="password" v-bind="passwordAttrs" />
                                    <div data-error="">{{ errors.password }}</div>
                                    <button type="button" class="btn-reset item-form__eye" @click="()=>togglePassVisibility()" v-if="passwordShow">
                                    </button>
                                </div>
                            </div>
                            <p class="log-p__passRecBtn">
                                <RouterLink :to="{ name: 'forgot-password' }" class="link">Забыли пароль?</RouterLink>
                            </p>
                            <div v-if="formError && !formErrCount" data-error="" class="form__error">Неправильный логин или пароль</div>
                            <div v-if="formError && formErrCount" data-error="" class="form__error">Пароль введен неверно. Осталось {{ 10 - formErrCount }} попыток</div>
                            <div class="form__footer">
                                <button class="btn main-btn" type="submit" :disabled="isSubmitting">
                                    <span :class=" isSubmitting && 'loading'">Войти</span>
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
