<template>
  <div class="page">
    <page-header>
      <header-link :left="true" :edge="true" v-back-link><icon icon="back"></icon>Back</header-link>
    </page-header>
    <page-content >
      <div class="order-courierWrap">
        <span style="font-weight:bold; font-size:.8rem; ">配送员</span>
        <div class="order-courier">
          <div class="order-courier__detail">
            <div class="order-courier__avatar"></div>
            <div class="order-courier__desc">
              {{name}}<br>
              <span style="color:#54A93E">{{tel}}</span>
            </div>
          </div>
          <router-link :to="{path:'courierEdit'}">
            <m-button size="small">编辑</m-button>
          </router-link>
        </div>
      </div>
      <div class="courier-infoWrap">
        <div class="courier-info__num">
          <p>工号：</p>
          <span>{{num}}</span>
        </div>
        <div class="courier-info__status">
          <p>状态：</p>
          <span>{{status}}</span>
          <div class="courier-info__bage">解绑</div>
        </div>
        <div class="courier-info__code">
          <img src="../assets/images/courier/u1118.png" alt="">
        </div>
        <div class="courier-info__del">
          删除配送员
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import { Header, HeaderLink,SecondHeader} from '../components/header'
import { Footer } from '../components/footer'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'


export default {
  components: {
    'page-header': Header, HeaderLink,
    'page-content': Content,
    Icon,
    'm-button': Button,
  },
  data() {
    return {
      name:"jack",
      tel:11244444444,
      num:'007',
      status:"已绑定"
    }
  }
}
</script>
<style lang="less">
  .boldFont {
    font-weight: bold;
  }
  .order-courierWrap {
    margin: .8rem .6rem;
  }
  .order-courier {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
  }
  .order-courier__detail {
    display: flex;
  }
  .order-courier__avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: rgb(199, 199, 199);
    border-radius: 50%;
  }
  .order-courier__desc {
    margin-left: .5rem;
  }
  .courier-infoWrap {
    margin: 0 .8rem;
    display: flex;
    flex-direction: column;
    font-size: .7rem;
  }
  .courier-info__num,
  .courier-info__status {
    display: flex;
    align-items: center;
    height: 1rem;
    margin-bottom: .3rem;
  }
  .courier-info__bage {
    padding: .1rem .4em;
    background: #ED6F2D;
    color: white;
    border-radius: 5px;
    font-size: .5rem;
    margin-left: .2rem;
  }
  .courier-info__code {
    width: 7.5rem;
    // position: relative;
    margin: 50px auto;
    border: 1px solid gray;
    border-radius: 5px;
    padding: .5rem;
  }
  .courier-info__del{
    margin-top: 2.5rem;
    text-align: center;
    color: #ED6F2D;
  }
</style>
