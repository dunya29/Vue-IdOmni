import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
    state: () => ({
        loginPage: false,
        deniedPage: false
    }),
    actions: {
        isLoginPage() {
            this.loginPage = true
        },
        noLoginPage() {
            this.loginPage = false
        },
        isDeniedPage() {
            this.deniedPage = true
        },
        noDeniedPage() {
            this.deniedPage = false
        }
    }
})