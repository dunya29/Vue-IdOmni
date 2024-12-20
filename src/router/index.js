import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LoginPage },
    { path: '/register', name: 'register',  component: () => import('../pages/RegPage.vue') },
    { path: '/verify', name: 'verify', component: () => import('../pages/VerifyPage.vue') },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/catalog', name: 'catalog', component: () => import('../pages/CatalogPage.vue'), meta: { transition: 'fadeUp' }},
    { path: '/catalog/:id', name: 'docs', component: () => import('../pages/DocsPage.vue'), meta: { transition: 'fadeUp' } },
    { path: '/access-denied', name: 'access-denied', component: () => import('../pages/AccessDenied.vue') },
    { path: '/forbidden', name: 'forbidden', component: () => import('../pages/ForbiddenPage.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('../pages/ForgotPassPage.vue') },
    { path: '/recovery', name: 'recovery', component: () => import('../pages/RecoveryPage.vue') },
    { path: '/recovery-success', name: 'recovery-success', component: () => import('../pages/RecoverySuccessPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../pages/NotFoundPage.vue') }
  ]
})

export default router
