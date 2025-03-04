import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: HomeView},
    {
        path: '/ricky',
        component: () => import('@/views/PersonagensRick.vue'),
        meta: {
            title: 'Ricky'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    next()
})

export default router