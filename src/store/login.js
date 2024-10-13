import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        logged: false
    }),
    actions: {
        logIn() {
            this.logged = true
        },
        logOut() {
            this.logged = false
        }
    }
})