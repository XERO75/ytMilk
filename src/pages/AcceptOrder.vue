<template>
  <div class="page">
    <page-content>
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.4rem; font-size:.8rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{name}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{tel}}</span>
        </div>
        <div class="order-client__address">
          <span class="boldFont">地址</span>
          <span>{{address}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{status}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div class="order-product__detail">
            <img class="order-product__img"
                 src="../assets/images/accept/u250.png"
                 alt="">
            <span class="order-product__desc">{{productDescription}}</span>
          </div>
          <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{startData}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{deliveryCycle}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{deliveryTime}}</span>
        </div>
      </div>
      <div class="order-footer">
        <m-button size="large">接受订单</m-button>
      </div>
    </page-content>
  </div>
</template>

<script>
import { Header, HeaderLink, SecondHeader } from '../components/header'
import { Footer } from '../components/footer'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'

export default {
  components: {
    'page-header': Header,
    HeaderLink,
    'page-content': Content,
    btn: Button,
    Icon,
    'm-button': Button,
    'page-footer': Footer
  },
  data () {
    return {
      name: 'jack',
      tel: 11244444444,
      address: 'tianhe distict zhujiang new town',
      status: 'normal',
      total: 3,
      left: 1,
      daily: 1,
      startData: '2018/1/1',
      deliveryCycle: '周一到周日',
      deliveryTime: '上午',
      // productImg:"../assets/images/accept/u250.png",
      productDescription: '谷元黑米牛奶饮品236ml'
    }
  }
}
</script>
<style lang="less">
.boldFont {
  font-weight: bold;
}
.order-clientWrap {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0.6rem;
  font-size: 0.75rem;
}
.order-client__name,
.order-client__tel,
.order-client__address,
.order-client__status {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  border: 1px solid rgb(226, 226, 226);
  border-bottom: none;
}
.order-client__status {
  border-bottom: 1px solid rgb(226, 226, 226);
}
.order-productWrap {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0.6rem;
  font-size: 0.75rem;
}
.order-product__detail {
  display: flex;
  justify-content: space-between;
}
.order-product__img {
  width: auto;
  height: 3rem;
}
.order-product__desc {
  // display: inline-block;
  margin-left: 1rem;
  overflow: hidden;
  width: 7rem;
}
.order-product__detailWrap,
.order-product__startData,
.order-product__deliveryCycle,
.order-product__deliveryTime {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  border: 1px solid rgb(226, 226, 226);
  border-bottom: none;
}
.order-product__detailWrap {
  height: 4rem;
  margin-top: 0.5rem;
}

.order-product__deliveryTime {
  border-bottom: 1px solid rgb(226, 226, 226);
}
.order-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 1rem;
}
</style>
