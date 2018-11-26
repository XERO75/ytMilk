<template>
  <div class="page">
    <page-content>
      <div v-if="courierData.name != null"
           class="order-courierWrap">
        <span style="font-weight:bold; font-size:.8rem; ">配送员</span>
        <div class="order-courier">
          <div class="order-courier__detail">
            <img :src="courierData.image"
                 class="order-courier__avatar">
            <div class="order-courier__desc">
              {{courierData.name}}<br>
              <span style="color:#54A93E">{{courierData.phone}}</span>
            </div>
          </div>
          <van-button @click="show = true"
                      type="primary"
                      size="small"
                      square>更换配送员</van-button>
          <van-dialog v-model="show"
                      show-cancel-button
                      :before-close="beforeClose">
            <van-field v-on:send-courier="getExpressId" />
          </van-dialog>
        </div>
      </div>
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.4rem; font-size:.8rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{clientData.memberName}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{clientData.memberPhone}}</span>
        </div>
        <div class="order-client__address">
          <span class="boldFont">地址</span>
          <span>{{clientData.memberAddress}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{clientData.status}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div style="height:3rem;"
               v-for="item in itemLists"
               :key="item.keys">
            <div class="order-product__detail fl">
              <img class="order-product__img"
                   :src="item.image"
                   alt="">
              <span class="order-product__desc">{{item.productName}}</span>
            </div>
            <span class="fr">共{{item.totalCount}}/剩{{item.remain}}/日送{{item.number}}</span>
          </div>
        </div>
        <!-- <div v-for="item in itemLists" :key="item.keys" class="order-product__detailWrap">
          <div class="order-product__detail">
            <img class="order-product__img" src="../assets/images/accept/u250.png" alt="">
            <span class="order-product__desc">{{productDescription}}</span>
          </div>
          <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
        </div> -->
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{clientData.beginDate}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{clientData.deliverType}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{clientData.halfDateType}}</span>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import PopWindow from '../components/popwindow'
import { handleLogin } from "@/api/login.js";
import { getDetails, changeCourier } from '@/api/checkout.js'
import VanField from '../components/van-field/van-field'



export default {
  components: {
    'page-content': Content,
    'm-button': Button,
    PopWindow,
    'van-field': VanField
  },
  data () {
    return {
      show: false,
      courierData: {},
      clientData: {},
      itemLists: {},
      expressServerId: null
    }
  },
  methods: {
    getExpressId (id) {
      this.expressServerId = id
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        let formdata = new FormData()
        formdata.append('orderId', this.$route.query.orderId)
        formdata.append('expressServerId', this.expressServerId)
        changeCourier(formdata).then(res => {
          setTimeout(done, 100)
          console.log('done');
        }).then(this.$router.go(0))
      } else {
        console.log('cancle')
        done()
      }
    }
  },
  mounted () {
    handleLogin().then((res) => {
      getDetails(this.$route.query.orderId).then((res) => {
        this.courierData = res.data.data
        this.clientData = res.data.data.order
        this.itemLists = res.data.data.orderItemList
      })
    })
  }
}
</script>
<style lang="less">
.boldFont {
  font-weight: bold;
}
.order-courierWrap {
  margin: 0.8rem 0.6rem;
}
.order-courier {
  margin-top: 0.5rem;
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
  margin-left: 0.5rem;
}
.order-courier {
  display: flex;
  justify-content: space-between;
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
  height: 2rem;
  // min-width: 20px;
}
.order-product__desc {
  // display: inline-block;
  margin-left: 0.2rem;
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
  // height: 4rem;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

.order-product__deliveryTime {
  border-bottom: 1px solid rgb(226, 226, 226);
}
.pop-change {
  text-align: center;
  font-size: 0.8rem;
}
.selectbox {
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding: 0 0.5rem;
}
</style>
