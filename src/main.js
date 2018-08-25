import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';

import Antd from 'ant-design-vue'
Vue.use(Antd)

Vue.config.productionTip = false
console.log(router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
