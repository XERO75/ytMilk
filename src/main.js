import './assets/iconfont/iconfont.css'
import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import Vum from './vum.js'
import 'vue-easytable/libs/themes-base/index.css'
import '../src/assets/css/base.css' /* 引入公共样式 */
import {VTable, VPagination} from 'vue-easytable'

// pages
import Index from './pages/Index'
import Comment from './pages/Comment'
import AcceptOrder from './pages/AcceptOrder'
import Checkout from './pages/Checkout'
import BillDetail from './pages/BillDetail.vue'
import CourierDetail from './pages/CourierDetail.vue'
import CourierAdd from './pages/CourierAdd.vue'
import CourierEdit from './pages/CourierEdit.vue'

Vue.use(Router)
Vue.use(Vum)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/acceptOrder',
      name: 'acceptOrder',
      component: AcceptOrder
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/billDetail',
      name: 'billDetail',
      component: BillDetail
    },
    {
      path: '/courierDetail',
      name: 'courierDetail',
      component: CourierDetail
    },
    {
      path: '/courierAdd',
      name: 'courierAdd',
      component: CourierAdd
    },
    {
      path: '/courierEdit',
      name: 'courierEdit',
      component: CourierEdit
    }
  ]
})

new Vue({
  router
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)