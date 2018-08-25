import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserIndex from "./views/user/index.vue";
import UserCreate from "./views/user/create.vue";
import UserList from "./views/user/list.vue";

Vue.use(Router)

// 我想要显示在左侧栏的路由与按钮
const menuConfig = [
  {
    show: true,
    route: {
      path: '/', name: 'home', component: Home, meta: {
        icon: 'home',
        text: '首页',
      }
    }
  },
  {
    show: true,
    route: {
      path: '/user',
      name: 'user',
      meta: {
        role: 'admin', 
        icon: 'user',
        text: '用户管理',
        no_breadcrumb_link: true
      },
      component: UserIndex,
      children: [
        { path: '', show: true, name: 'user-list', meta: { text: '用户列表' }, component: UserList },
        { path: 'create', show: true, name: 'user-create', meta: { text: '创建用户'}, component: UserCreate },
      ]
    }
  },

]

// 不想显示的路由
const noShowRoute = [

]

const routes = menuConfig.map(c => c.route).filter(Boolean).concat(noShowRoute);

export { menuConfig }

const router = new Router({
  routes,
})

export default router
