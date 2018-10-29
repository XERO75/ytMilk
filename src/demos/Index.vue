<template>
  <div class="page">
    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'home' }" @click.native="changeView('home')">
        <span class="icon demo-icon-home"></span>
        <label>客户管理</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'deliever-order' }" @click.native="changeView('deliever-order')">
        <span class="icon demo-icon-deliveryOrder"></span>
        <label>送货单</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'search' }" @click.native="changeView('search')">
        <span class="icon demo-icon-search"></span>
        <label>搜索</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'order-detail' }" @click.native="changeView('order-detail')">
        <span class="icon demo-icon-orderOetail"></span>
        <!-- <span class="badge">2</span> -->
        <label>订单细明</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'courier' }" @click.native="changeView('courier')">
        <span class="icon demo-icon-courier"></span>
        <label>配送员</label>
      </footer-item>
    </page-footer>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
import Page from '../components/page'
import { Footer, Item, FooterItem } from '../components/footer'
import Home from './Home'
import DeliveryOrder from './DeliveryOrder.vue'
import Search from './Search'
import OrderDetail from './OrderDetail'
import Noti from './Noti'
import About from './About'
import Courier from './Courier'
// import OHome from './OHome'
// console.log(FooterItem)
export default {
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'deliever-order':DeliveryOrder,
    'order-detail':OrderDetail,
    // 'Ohome': OHome,
    'search': Search,
    'noti': Noti,
    'about': About,
    'courier':Courier
  },
  data () {
    return {
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
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.demo-icon-home {
  background-image: url("../assets/images/index/u76.png");
  background-repeat:no-repeat; 
  background-size: 100%;
}
.demo-icon-deliveryOrder {
  background-image: url("../assets/images/index/u104.png");
  background-repeat:no-repeat; 
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("../assets/images/index/u118.png");
  background-repeat:no-repeat; 
  background-size: 100%;
}
.demo-icon-orderOetail {
  background-image: url("../assets/images/index/u120.png");
  background-repeat:no-repeat; 
  background-size: 100%;
}
.demo-icon-courier {
  background-image: url("../assets/images/index/u122.png");
  background-repeat:no-repeat;
  background-size: 100%;
}
</style>
