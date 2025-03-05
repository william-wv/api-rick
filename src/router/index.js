
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: HomeView},
    {
        path: '/personagens/:page?',
        component: () => import('@/views/PersonagensRick.vue'),
        props: true,
        name: 'personagens'
    },
    {
        path: '/location',
        component: () => import('@/views/LocationsSerie.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router