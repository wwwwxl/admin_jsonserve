import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(error => error)
}


import "bootstrap";
// //也可以在这里全局引入 bootstrap.css ;
import "bootstrap/dist/css/bootstrap.css";
import $ from 'jquery'

import animated from 'animate.css'

import Login from './components/Login.vue'
import HomeIndex from './components/HomeIndex.vue'
import UserInfo from './components/UserInfo.vue'
import MainCon from './components/MainCon.vue'

Vue.use(animated)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false

import axiosApi from '@/api/axios.js'

Vue.use(axiosApi);

//设置路由
var router = new VueRouter({
	mode: "history",
	base: __dirname,
	routes: [{
			path: "/",
			name: "login",
			redirect: '/login'
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/home",
			component: HomeIndex,
			meta: { requiresAuth: true },
			children: [
				{
				// userinfo 会被渲染在 home 的 <router-view> 中
				path: '/userinfo',
				component: UserInfo
				},
				{
				// userinfo 会被渲染在 home 的 <router-view> 中
				path: '/',
				name:'maincon',
				redirect: '/maincon'
				},
				{
				// userinfo 会被渲染在 home 的 <router-view> 中
				path: '/maincon',
				component: MainCon
				}
			]
		},
	]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
	const role = sessionStorage.getItem('islogin');
    if (role==""||role==undefined) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


//设置总线
let bus=new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
Vue.prototype.bus = bus
