<script setup>
import { usersApi } from "@/api/api";
import Contacts from "@/components/Contacts.vue";
import PageWrap from "@/components/PageWrap.vue";
import { isEmail, isPassword } from "@/functions/validation";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
const emailVal = ref("")
const passwordShow = ref(false)
const passwordTextType = ref(false)
const schema = {
    login: (val) => (val ? true : "Заполните поле"),
    email: async (val) => {
        if (val) {
            if (isEmail(val)) {
              if ( emailVal.value != val) {
                try {
                    const { data } = await usersApi.getUser(val);
                    if (data.length > 0) {
                      emailVal.value = val
                        return "Пользователь с таким email уже существует";
                    } else {
                        return true;
                    }
                } catch (err) {
                    console.log(err);
                }
              } else {
                return "Пользователь с таким email уже существует";
              }

            } else {
                return "Некорректный E-mail";
            }
        } else {
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
  passwordTextType.value = !passwordTextType.value
}
const onSubmit = handleSubmit(async (values) => {
    const data = {
        email: values.email,
        login: values.login,
        password: values.password,
    };
    try {
        await usersApi.setUser(data);
        router.push("/login");
    } catch (err) {
        console.log(err);
    }
});
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
                            <h1>Регистрация</h1>
                            <p class="log-p__subtitle">
                                Уже зарегистрированы?
                                <RouterLink to="/login" class="link">Войти</RouterLink>
                            </p>
                        </div>
                        <form class="form" @submit.prevent="onSubmit">
                            <div class="form__items">
                                <div class="item-form">
                                    <input
                                        type="text"
                                        placeholder="Логин"
                                        v-model="login"
                                        v-bind="loginAttrs"
                                    />
                                    <div data-error="">{{ errors.login }}</div>
                                </div>
                                <div class="item-form">
                                    <input
                                        type="email"
                                        placeholder="E-mail"
                                        name="mail"
                                        v-model="email"
                                        v-bind="emailAttrs"
                                    />
                                    <div data-error="">{{ errors.email }}</div>
                                </div>
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
                                <div class="checkbox">
                                    <input
                                        name="agree"
                                        type="checkbox"
                                        id="result"
                                        class="checkbox-input"
                                        v-model="agree"
                                        v-bind="agreeAttrs"
                                    />
                                    <label for="result" class="checkbox-label">Даю согласие на обработку персональных данных</label>
                                    <div data-error="">{{ errors.agree }}</div>
                                </div>
                                <button class="btn-reset main-btn" type="submit" :disabled="isSubmitting"><span :class=" isSubmitting && 'loading'">Зарегистрироваться</span></button>                          
                            </div>
                        </form>
                        <Contacts />
                    </div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>
