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

import Login from './components/Login/Login.vue'
import HomeLayOut from './components/Home/HomeLayOut.vue'
import UserInfo from './components/UserInfo/UserInfo.vue'
import SectionLayOut from './components/FloorSection/FloorSection/SectionLayOut.vue'
import RoomLayOut from './components/FloorSection/FloorRoom/RoomLayOut.vue'
import BedLayOut from './components/FloorSection/FloorBed/BedLayOut.vue'

Vue.use(animated)
Vue.use(VueRouter)
Vue.use(ElementUI);

Vue.config.productionTip = false


import axiosApi from '@/api/axios.js'
import cxyreq from  '@/api/ajax.js'
Vue.use(axiosApi);
Vue.use(cxyreq);


//设置路由
var router = new VueRouter({
	mode: "history",
	base: __dirname,
	routes: [{
			path: "/",
			name: "login",
			redirect: "/login"
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/homelatout",
			name:"homelatout",
			component: HomeLayOut,
			redirect:"/sectionlayout",
			meta: { requiresAuth: true },
			children: [
				{
				// userinfo 会被渲染在 home 的 <router-view> 中
				path: "/userinfo",
				component: UserInfo,
				},
				{
				path: "/sectionlayout",
				component: SectionLayOut,
				},
				{
				path: "/roomlayout",
				component: RoomLayOut
				},
				{
				path: "/bedlayout",
				component: BedLayOut
				},
			]
		},
	]
})

router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('islogin');
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
