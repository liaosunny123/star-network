import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './style/style.css'
import 'animate.css';

import router from '@/router/index.js'
import store from '@/store/index.js'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import "echarts-gl";

import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//注册全局容器
app.config.globalProperties.$echarts = echarts

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
