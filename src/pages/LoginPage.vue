<script setup>
import { inviteApi, loginApi, usersApi } from '@/api/api';
import Contacts from '@/components/Contacts.vue';
import { isEmail } from '@/functions/validation';
import { useForm } from 'vee-validate';
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'
import PageWrap from '@/components/PageWrap.vue';

const storeAuth = useAuthStore()
const emailVal = ref("")
const emailErrVal = ref("")
const passwordShow = ref(false)
const passwordTextType = ref(false)
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
    },
  password: val => (val ? true : "Заполните поле"),
}
const { errors, handleSubmit, isSubmitting, defineField} = useForm({
  validationSchema: schema
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const router = useRouter()
const passwordErrRef = ref(0)
const onSubmit = handleSubmit(async values => {
    try {
        const { data } = await usersApi.checkUser(values.email, values.password)
        if (data.length === 0) {
            passwordErrRef.value++
            if (passwordErrRef.value == 10) {
                router.push('/forbidden')
            }
        } else {
            let params = {...data[0], password:values.password}
            localStorage.setItem("user",JSON.stringify(params))
            storeAuth.logIn()
            try {
                const {data} = await loginApi.checkAdmin(params.email)
                if (data.length > 0) {
                    storeAuth.adminLogIn()
                }
            } catch(err) {
                console.log(err)
            }
            let inviteLink = localStorage.getItem("inviteLink")
            if (inviteLink) {
                let invitePage = JSON.parse(inviteLink)
                try {
                    const {data} = await inviteApi.checkInviteLink(invitePage.id, invitePage.link)
                    if (data.length > 0) {
                        try {
                            const {data} = await inviteApi.checkUser(invitePage.id, params.email )
                            if (data.length === 0) {
                                try {
                                    let newInviteUser = {
                                        "login": params.login,
                                        "email": params.email
                                    }
                                    const {data} = await inviteApi.setUser(params.id, newInviteUser )
                                } catch(err) {
                                    console.log(err)
                                }
                            }
                            router.push("/catalog/"+params.id)
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        router.push("/access-denied")
                    }
                } catch(err) {
                    console.log(err)
                } finally {
                    localStorage.removeItem("inviteLink")
                }
            } else {
                router.push('/catalog')
            }
        }       
    } catch(err) {
      console.log(err)
    } 
});
const togglePassVisibility = () => {
  passwordTextType.value = !passwordTextType.value
}
onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
        email.value = JSON.parse(userData).email
        password.value = JSON.parse(userData).password
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
                            <h1>вход для клиентов</h1>
                            <p class="log-p__subtitle">
                                Если у вас нет аккаунта. Вы можете
                                <RouterLink to="/register" class="link">Зарегистрироваться</RouterLink>
                            </p>
                        </div>
                        <form class="form"  @submit.prevent="onSubmit">
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
                                <div class="item-form item-form--password" :class="{'show-eyeBtn': passwordShow, 'show-password': passwordTextType}">
                                    <input 
                                        :type="passwordTextType ? 'text' : 'password'" 
                                        autocomplete="off" 
                                        placeholder="Пароль" 
                                        name="password" 
                                        v-model="password" 
                                        v-bind="passwordAttrs"
                                    />    
                                    <div data-error="" v-if="passwordErrRef">Пароль введен неверно. Осталось {{ 10 - passwordErrRef }} попыток</div> 
                                    <div data-error="" v-else>{{ errors.password }}</div> 
                                    <button type="button" 
                                        class="btn-reset item-form__eye" 
                                        @click="()=>togglePassVisibility()"                                    
                                        v-if="passwordShow">
                                    </button>
                                </div>
                            </div>
                            <p class="log-p__passRecBtn">
                                <RouterLink to="/recovery" class="link">Забыли пароль?</RouterLink>
                            </p>
                            <div class="form__footer">
                                <button class="btn-reset main-btn" type="submit" :disabled="isSubmitting"><span :class=" isSubmitting && 'loading'">Войти</span></button>
                            </div>
                        </form>
                        <Contacts />
                    </div>
                </div>
            </div>
        </section>
    </PageWrap>
</template>
