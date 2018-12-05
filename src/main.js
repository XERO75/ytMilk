import './assets/iconfont/iconfont.css'
import 'vue-easytable/libs/themes-base/index.css'
import '../src/assets/css/base.css'/* 引入公共样式 */
import Vue from 'vue'
import Vum from './vum.js'
import { router } from './router';
import store from "./store.js";
import FastClick from 'fastclick'
import { VTable, VPagination } from 'vue-easytable'
import './plugins/element.js'
import util from './util.js'

Vue.use(Vum)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(util)

new Vue({
  router,
  store
}).$mount('#app')

Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};

FastClick.attach(document.body)