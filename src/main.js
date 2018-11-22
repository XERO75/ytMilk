import './assets/iconfont/iconfont.css'
import 'vue-easytable/libs/themes-base/index.css'
import '../src/assets/css/base.css'/* 引入公共样式 */
import Vue from 'vue'
import Vum from './vum.js'
import { router } from './router';
// import store from "./store.js";
import FastClick from 'fastclick'
import { VTable, VPagination } from 'vue-easytable'
import './plugins/element.js'

Vue.use(Vum)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

new Vue({
  router,
  // store
}).$mount('#app')

FastClick.attach(document.body)