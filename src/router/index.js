
import HomeView from '@/views/HomeView.vue'
import PersonagensRick from '@/views/PersonagensRick.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: HomeView},
    {
        path: '/character',
        component: PersonagensRick,
        name: 'character'
    },
    {
        path: '/location',
        component: () => import('@/views/LocationsSerie.vue'),
    },{
        path: '/episodeosPers',
        component: () => import('@/views/EpPerson.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router