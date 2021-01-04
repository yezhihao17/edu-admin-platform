import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

Vue.use(ElementUI)

// 注册全局时间过滤
Vue.filter('date', (date: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
