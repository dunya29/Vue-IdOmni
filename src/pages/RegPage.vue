<script setup>
import { authApi } from "@/api/api";
import Contacts from "@/components/Contacts.vue";
import PageWrap from "@/components/PageWrap.vue";
import { isEmail, isPassword } from "@/functions/validation";
import { useAuthStore } from "@/store/auth";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
const storeAuth = useAuthStore();
const emailVal = ref("");
const passwordShow = ref(false);
const passwordTextType = ref(false);
const formError = ref(null);
const schema = {
    login: (val) => (val ? true : "Заполните поле"),
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
    password: (val) =>
        val
            ? isPassword(val)
                ? true
                : "Пароль должен содержать минимум 6 символов"
            : "Заполните поле",
    agree: (val) => (val === true ? true : "Требуется согласие"),
};
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
    validationSchema: schema,
});
const [login, loginAttrs] = defineField("login");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [agree, agreeAttrs] = defineField("agree");

const router = useRouter();
const togglePassVisibility = () => {
    passwordTextType.value = !passwordTextType.value;
};
const onSubmit = handleSubmit(async (values) => {
    const user = {
        email: values.email,
        login: values.login,
        password: values.password,
        userRole: "admin",
        emailVerified: false,
        disable: false,
    };
    try {
        await authApi.createUser(user);
        storeAuth.logOut();
        router.push("/verify");
    } catch (err) {
        console.log(err);
        if (err.status === 401) {
            formError.value = "Пользователь с таким email уже существует";
        }
    }
});
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
                            <h1>Регистрация</h1>
                            <p class="log-p__subtitle">
                                Уже зарегистрированы?
                                <RouterLink :to="{ name: 'login' }" class="link">Войти</RouterLink>
                            </p>
                        </div>
                        <form class="form" @submit.prevent="onSubmit" novalidate>
                            <div class="form__items">
                                <div class="item-form">
                                    <input type="text" placeholder="Логин" v-model="login" v-bind="loginAttrs" />
                                    <div data-error="">{{ errors.login }}</div>
                                </div>
                                <div class="item-form">
                                    <input type="email" placeholder="E-mail" v-model="email" v-bind="emailAttrs" />
                                    <div data-error="">{{ errors.email }}</div>
                                </div>
                                <div class="item-form item-form--password" :class="{'show-eyeBtn': passwordShow, 'show-password': passwordTextType}">
                                    <input :type="passwordTextType ? 'text' : 'password'" placeholder="Пароль" v-model="password" v-bind="passwordAttrs" autocomplete="off" />
                                    <div data-error="">{{ errors.password }}</div>
                                    <button type="button" class="btn-reset item-form__eye" @click="()=>togglePassVisibility()" v-if="passwordShow">
                                    </button>
                                </div>
                            </div>
                            <div class="form__footer">
                                <label class="item-checkbox">
                                    <input name="agree" type="checkbox" id="result" class="checkbox-input" v-model="agree" v-bind="agreeAttrs" />
                                    <span>Даю согласие на обработку персональных данных</span>
                                    <div data-error="">{{ errors.agree }}</div>
                                </label>
                                <div class="form__error" data-error="" v-if="formError">{{ formError }}</div>
                                <button class="btn main-btn" type="submit" :disabled="isSubmitting">
                                    <span :class=" isSubmitting && 'loading'">Зарегистрироваться</span>
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
