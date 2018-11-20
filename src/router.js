import Vue from 'vue';
import Vum from './vum.js'
import Router from 'vue-router';

import Index from './pages/Index'
import Comment from './pages/Comment'
import AcceptOrder from './pages/AcceptOrder'
import Checkout from './pages/Checkout'
import BillDetail from './pages/BillDetail.vue'
import CourierDetail from './pages/CourierDetail.vue'
import CourierAdd from './pages/CourierAdd.vue'
import CourierEdit from './pages/CourierEdit.vue'
import LoginError from './pages/LoginError.vue'

Vue.use(Router)
Vue.use(Vum)

let router = new Router({
  routes: [
    // {
    //   path:'/', 
    //   redirect:'index'
    // },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/LoginError',
      name: 'loginError',
      component: LoginError
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
Vum.router(router)

export {
  router
};
