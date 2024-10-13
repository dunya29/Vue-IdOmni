import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        logged: false,
        isAdmin: false
    }),
    actions: {
        logIn() {
            this.logged = true
        },
        logOut() {
            this.logged = false
        },
        adminLogIn() {
            this.isAdmin = true
        },
        adminLogOut() {
            this.isAdmin = false
        }
    }
})