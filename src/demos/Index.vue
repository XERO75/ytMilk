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
      <footer-item v-bind:class="{ 'active' : currentView === 'Ohome' }" @click.native="changeView('Ohome')">
        <span class="icon demo-icon-search"></span>
        <label>搜索</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'noti' }" @click.native="changeView('noti')">
        <span class="icon demo-icon-noti"></span>
        <!-- <span class="badge">2</span> -->
        <label>订单细明</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
        <span class="icon demo-icon-me"></span>
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
import Noti from './Noti'
import About from './About'
import OHome from './OHome'
console.log(FooterItem)
export default {
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'deliever-order':DeliveryOrder,
    'Ohome': OHome,
    'search': Search,
    'noti': Noti,
    'about': About
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
.demo-icon-noti {
  background-image: url("../assets/images/index/u120.png");
  background-repeat:no-repeat; 
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("../assets/images/index/u122.png");
  background-repeat:no-repeat;
  background-size: 100%;
}
</style>
