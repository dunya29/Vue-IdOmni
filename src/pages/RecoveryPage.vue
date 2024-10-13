<script setup>
import { usersApi } from '@/api/api';
import { isEmail } from '@/functions/validation';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Contacts from '@/components/Contacts.vue';
import PageWrap from '@/components/PageWrap.vue';
const emailVal = ref("")
const emailErrVal = ref("")
const schema = {
  email: async (val) => {
        if (val) {
            if (isEmail(val)) {
                if( emailErrVal.value != val) {
                    if (emailVal.value != val) {
                        try {
                            const { data } = await usersApi.getUser(val);
                            if (data.length == 0) {
                                emailErrVal.value = val
                                return "Пользователь с таким email не найден";
                            } else {
                                emailVal.value = val
                                return true;
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        return true
                    }
                } else {
                    return "Пользователь с таким email не найден";
                }
            } else {
                return "Некорректный E-mail";
            }
        } else {
            return "Заполните поле";
        }
    }
}
const { errors, handleSubmit, isSubmitting, defineField} = useForm({
  validationSchema: schema
});
const [email, emailAttrs] = defineField('email');

const router = useRouter()
const onSubmit = handleSubmit(async values => {
});
onMounted(() => {
    if (localStorage.getItem("user")) {
        router.push('/catalog')
    }
})
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
                        <form class="form">
                            <div class="form__items">
                                <div class="item-form">
                                    <input type="email" 
                                        placeholder="E-mail" 
                                        name="mail" 
                                        v-model="email" 
                                        v-bind="emailAttrs"
                                    />
                                    <div data-error="">{{ errors.email }}</div>
                                </div>
                            </div>
                            <div class="form__footer">
                                <button class="btn-reset main-btn" type="submit" :disabled="isSubmitting"><span>{{ isSubmitting ? 'Отправить ссылку...' : 'Отправить ссылку' }}</span></button>                             
                            </div>
                        </form>
                        <Contacts />
                    </div>  
                </div>
            </div>
        </section>
    </PageWrap>
</template>