import { authApi } from '@/api/api'
import { defineStore } from 'pinia'
const TOKEN_KEY = "creative-jwt-token"
const userData = {
    id: "",
    login: "",
    email: "",
    password: "",
    userRole: "user",
    disable: false,
    emailVerified: false
}
export const useAuthStore = defineStore('auth', {

    state: () => ({
        logged: false,
        userData,
        isMounted: false
    }),
    actions: {
        auth(params) {
            localStorage.setItem(TOKEN_KEY, params.token)
            this.logInSuccess(params.data)
        },
        logInSuccess(params) {
            this.logged = true
            this.userData = { ...this.userData, ...params }
        },
        async authMe() {
            try {
                const token = localStorage.getItem(TOKEN_KEY)
                const { data } = await authApi.authMe(token)
                this.logInSuccess(data)
            } catch (err) {
                console.log(err)
            } finally {
                this.isMounted = true
            }
        },
        logOut() {
            localStorage.removeItem(TOKEN_KEY)
            this.logged = false
            this.userData = { ...userData }
        }
    }
})