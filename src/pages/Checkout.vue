<template>
  <div class="page">
    <page-content>
      <div v-if="clientData.orderStatus == 'completed' || clientData.orderStatus == 'Finish' || clientData.orderStatus == 'HoldDelivery' ||clientData.orderStatus == 'OnDelivery'" class="order-courierWrap">
      <!-- <div v-if="courierData.name !== null" class="order-courierWrap"> -->
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
          <span class="boldFont" >地址</span>
          <span style="width:80%; text-align:right;">{{clientData.memberDistrict}}{{clientData.gaodeAddress}}{{clientData.memberAddress}}{{clientData.memberRoom}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <!-- <span>{{clientData.status}}</span> -->
          <span>{{filterStatus}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div style=""
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
          <!-- <span>{{clientData.beginDate}}</span> -->
          <span>{{filterDate}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{filterDeliverType}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{filterHalfDateType}}</span>
        </div>
      </div>
      <van-button v-if="originStatus == 'HoldDelivery'" class="order-footer" type="default" size="large" square>已暂停</van-button>
    </page-content>
  </div>
</template>

<script>
import Vue from 'vue'
import Content from '../components/content'
import PopWindow from '../components/popwindow'
import { handleLogin } from "@/api/login.js";
import { getDetails, changeCourier } from '@/api/checkout.js'
import VanField from '../components/van-field/van-field'
import Button from '../../node_modules/vant/lib/button';
import '../../node_modules/vant/lib/button/style';

Vue.use(Button);
export default {
  components: {
    'page-content': Content,
    PopWindow,
    'van-field': VanField
  },
  data () {
    return {
      show: false,
      courierData: {},
      clientData: {},
      itemLists: {},
      expressServerId: '',
      originDate: '',
      originStatus: '',
      originDeliverType: '',
      originHalfDateType: ''
    }
  },
  watch: {
    
  },
  computed: {
    filterStatus: function() {
      switch (this.originStatus) {
        case "Collaging":
          return "拼团中";
          break;
        case "OnDelivery":
          return "正常派送";
          break;
        case "HoldDelivery":
          return "暂停派送";
          break;
        case "UnSettle":
          return "未分配";
          break;
        case "UnDeal":
          return "未处理";
          break;
        case "Refuse":
          return "已拒绝";
          break;
        case "completed":
          return "已完成";
          break;
        case "cancelled":
          return "已取消";
          break;
        case "Finish":
          return "已评价";
          break;
        case "Closed":
          return "已关闭";
          break;
        default: "unknown"
          break;
      }
    },
    filterDate: function() {
      const regexp=/(?:\.0*|(\.\d+?)0+)$/
      return this.originDate.replace(regexp,'$1')
    },
    filterDeliverType: function() {
      if (this.originDeliverType === "WorkingDay") {
        return "周一到周五"
      } else {
        return "周一到周日"
      }
    },
    filterHalfDateType: function() {
      if (this.originHalfDateType === "Morning") {
        return "上午"
      } else {
        return "下午"
      }
    },
    handleRefresh() {
      this.$router.replace({
        path: '/supplierAllBack',
        name: 'supplierAllBack'
      })
    },
  },
  methods: {
    getExpressId (id) {
      this.expressServerId = id
    },
    handleGetDetail() {
      getDetails(this.$route.query.sn).then((res) => {
        this.courierData = res.data.data
        this.clientData = res.data.data.order
        this.itemLists = res.data.data.orderItemList
        this.originDate = res.data.data.order.beginDate
        this.originStatus = res.data.data.order.orderStatus
        this.originDeliverType = res.data.data.order.deliverType
        this.originHalfDateType = res.data.data.order.halfDateType
      })
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        let formdata = new FormData()
        formdata.append('sn', this.$route.query.sn)
        formdata.append('expressServerId', this.expressServerId)
        changeCourier(formdata).then(res => {
          this.handleGetDetail()
          setTimeout(done, 100)
          console.log('done');
        })
      } else {
        console.log('cancle')
        done()
      }
    }
  },
  mounted () {
    handleLogin().then((res) => {
      this.handleGetDetail()
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
.order-footer {
  position: absolute;
  bottom: 0;
  background : #F2F2F2;
  color : #999999
}
</style>
