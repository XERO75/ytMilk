<template>
  <div class="page">
    <page-content>
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.4rem; font-size:.8rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{orderData.memberName}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{orderData.memberPhone}}</span>
        </div>
        <div class="order-client__address">
          <span class="boldFont">地址</span>
          <span>{{orderData.memberAddress}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{orderData.status}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div style="height:3rem;" v-for="item in itemLists" :key="item.keys">
            <div class="order-product__detail fl">
              <img class="order-product__img" :src="item.image" alt="">
              <span class="order-product__desc">{{item.productName}}{{item.specifications}}</span>
            </div>
            <span class="fr">共{{item.totalCount}}/剩{{item.remain}}/日送{{item.number}}</span>
          </div>
          <!-- <div class="order-product__detail">
            <img class="order-product__img" src="../assets/images/accept/u250.png" alt="">
            <span class="order-product__desc">{{productDescription}}</span>
          </div>
          <span>共{{total}}/剩{{left}}/日送{{daily}}</span> -->
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{orderData.beginDate}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{orderData.deliverType}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{orderData.halfDateType}}</span>
        </div>
      </div>
      <van-button  @click="show = true" class="order-footer" type="primary" size="large" square>接受订单</van-button>
      <van-dialog
        v-model="show"
        show-cancel-button
        :before-close="beforeClose">
        <van-field v-on:send-courier="getExpressId"/>
      </van-dialog>
    </page-content>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { Footer } from '../components/footer'
import Content from '../components/content'
import { handleLogin } from "@/api/login.js";
import { getDetails, getCouriers, acceptOrder } from '@/api/acceptOrder.js'
import Button from '../../node_modules/vant/lib/button';
import '../../node_modules/vant/lib/button/style';
import VanField from '../components/van-field/van-field'
// import Dialog from '../../node_modules/vant/lib/dialog';
// import '../../node_modules/vant/lib/dialog/style';

Vue.use(Button);
export default {
  components: {
    'page-content': Content,
    'page-footer': Footer,
    'van-field': VanField
  },
  data () {
    return {
      show: false,
      username: '',
      password: '',
      orderData: {},
      itemLists: {},
      courierLists: [],
      expressServerId: null
    }
  },
  methods: {
    getExpressId (id) {
      this.expressServerId = id
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        let formdata = new FormData()
        formdata.append('orderId', this.$route.query.orderId)
        formdata.append('expressServerId', this.expressServerId)
        acceptOrder(formdata).then(res => {
          setTimeout(done, 100)
        })
        this.$router.push({path:'/checkout',query:{orderId:this.$route.query.orderId}})
      } else {
        done()
      }
    }
  },
  mounted() {
    getDetails(this.$route.query.orderId).then((res) => {
      this.orderData = res.data.data.order
      this.itemLists = res.data.data.orderItemList
    })
  }
}
</script>
<style lang="less" scoped>
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
// .order-product__detail {
//   display: flex;
//   justify-content: space-between;
// }
.order-product__detail {
  display: flex;
  justify-content: space-between;
}
.order-product__img {
  width: auto;
  height: 2rem;
}
.order-product__desc {
  // display: inline-block;
  margin-left: .2rem;
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
  display: flex;
  flex-direction: column;
  margin-top: .5rem;
}

.order-product__deliveryTime {
  border-bottom: 1px solid rgb(226, 226, 226);
}
.order-footer {
  position: fixed;
  bottom: 0;
}
</style>
