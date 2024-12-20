<script setup>
import { authApi } from "@/api/api";
import { isEmail } from "@/functions/validation";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import Contacts from "@/components/Contacts.vue";
import PageWrap from "@/components/PageWrap.vue";
const schema = {
    email: (val) => {
        if (val) {
            if (isEmail(val)) {
                return true;
            } else {
                return "Некорректный E-mail";
            }
        } else {
            return "Заполните поле";
        }
    },
};
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
    validationSchema: schema,
});
const [email, emailAttrs] = defineField("email");

const router = useRouter();
const onSubmit = handleSubmit(async (values) => {
    try {
        await authApi.forgotPassword(values.email);
        router.push({ name: "recovery" });
    } catch (err) {
        console.log(err);
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
                            <h1>Забыли пароль?</h1>
                            <p>Введите адрес электронной почты, на которой вы зарегистрировались, и мы вышлем ссылку для сброса пароля </p>
                        </div>
                        <form class="form" @submit.prevent="onSubmit" novalidate>
                            <div class="form__items">
                                <div class="item-form">
                                    <input type="email" placeholder="E-mail" name="mail" v-model="email" v-bind="emailAttrs" />
                                    <div data-error="">{{ errors.email }}</div>
                                </div>
                            </div>
                            <div class="form__footer">
                                <button class="btn main-btn" type="submit" :disabled="isSubmitting">
                                    <span :class="isSubmitting && 'loading'">Отправить ссылку</span>
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