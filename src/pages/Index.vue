<template>
  <div class="page">
    <!-- <sign-up v-if="isSign == true">sss</sign-up> -->
    <!-- <service-signup v-if="isSign == true"></service-signup> -->
    <login v-if="isLogin == false"
           class="loginPage"></login>
    <div v-if="isLogin == true"
         class="page">
      <page-footer>
        <footer-item v-bind:class="{ 'active' : currentView === 'home' }"
                     @click.native="changeView('home')">
          <i class="iconfont icon-duoren"></i>
          <label>客户管理</label>
        </footer-item>
        <footer-item v-bind:class="{ 'active' : currentView === 'deliever-order' }"
                     @click.native="changeView('deliever-order')">
          <i class="iconfont icon-songhuodan"></i>
          <label>送货单</label>
        </footer-item>
        <footer-item v-bind:class="{ 'active' : currentView === 'search' }"
                     @click.native="changeView('search')">
          <i class="iconfont icon-search"></i>
          <label>搜索</label>
        </footer-item>
        <footer-item v-bind:class="{ 'active' : currentView === 'order-detail' }"
                     @click.native="changeView('order-detail')">
          <i class="iconfont icon-order_icon"></i>
          <label>订单细明</label>
        </footer-item>
        <footer-item v-bind:class="{ 'active' : currentView === 'courier' }"
                     @click.native="changeView('courier')">
          <i class="iconfont icon-ren1"></i>
          <label>配送员</label>
        </footer-item>
      </page-footer>
      <keep-alive>
        <component :is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import login from './login.vue'
import serviceSignUp from './serviceSignUp.vue'
import signUp from './signUp.vue'
import Home from './Home'
import Page from '../components/page'
import { Footer, Item, FooterItem } from '../components/footer'
import DeliveryOrder from './DeliveryOrder.vue'
import Search from './Search'
import OrderDetail from './OrderDetail'
import Courier from './Courier'
export default {
  components: {
    login,
    'sign-up':signUp,
    'service-signup':serviceSignUp,
    'home': Home,
    'page-footer': Footer,
    'footer-item': Item,
    'deliever-order': DeliveryOrder,
    'order-detail': OrderDetail,
    'search': Search,
    'courier': Courier
  },
  data () {
    return {
      // isLogin: this.$store.state.isLogin,
      // isSign: true,
      // isLogin: false,
      isLogin: true,
      currentView: 'home'
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    }
  }
}
</script>

<style lang="less">
.home-table {
  .v-table-body-class {
    height: auto !important;
  }
}
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.iconfont {
  font-size: 1.1rem;
}
</style>
