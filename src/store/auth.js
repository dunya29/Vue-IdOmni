import { authApi } from '@/api/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        logged: false,
        userData : {
            id: "",
            login: "",
            email: "",
            password: "",
            disable: false,
            isAdmin: false
        }
    }),
    actions: {
        async logIn(params) {
            try {
                await authApi.logIn(params)
                this.logged = true
                this.userData = {...this.userData, ...params}
                localStorage.setItem("user",JSON.stringify(params))
            } catch(err) {{
                console.log(err)
            }}
        },
        async isLogIn() {
            try {
                await authApi.getAuth()
                const user = localStorage.getItem("user")
                if (user) {
                    this.logged = true
                    this.userData = {...this.userData, ...JSON.parse(user)}
                }  
            } catch(err) {
                console.log(err)
            }       
        },
        async logOut() {
            try {
                await authApi.logOut()
                this.logged = false
                this.userData = {
                    id: "",
                    login: "",
                    email: "",
                    password: "",
                    disable: false,
                    isAdmin: false
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
})