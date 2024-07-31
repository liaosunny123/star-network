import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由
const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
        }
    ]
})


export default Router
