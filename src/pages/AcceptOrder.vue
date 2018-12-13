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
          <span style="width:80%; text-align:right;">{{orderData.memberDistrict}}{{orderData.gaodeAddress}}{{orderData.memberAddress}}{{orderData.memberRoom}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{filterStatus}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div style="" v-for="item in itemLists" :key="item.keys">
            <div class="order-product__detail fl">
              <img class="order-product__img" :src="item.image" alt="">
              <span class="order-product__desc">{{item.productName}}{{item.specifications}}</span>
            </div>
            <span class="fr">共{{item.totalCount}}/剩{{item.remain}}/日送{{item.number}}</span>
          </div>
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
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
      <van-button  @click="show = true" class="order-footerWrap" type="primary" size="large" square>接受订单</van-button>
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
import Toast from '../../node_modules/vant/lib/toast';
import '../../node_modules/vant/lib/toast/style';
// import Dialog from '../../node_modules/vant/lib/dialog';
// import '../../node_modules/vant/lib/dialog/style';

Vue.use(Toast)
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
      expressServerId: '',
      originDate: '',
      originStatus: '',
      originDeliverType: '',
      originHalfDateType: '',
      code: 0
    }
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
    }
  },
  methods: {
    getExpressId (id) {
      this.expressServerId = id
    },
    beforeClose(action, done) {
      if (action === 'confirm' && this.expressServerId != '') {
        let formdata = new FormData()
        formdata.append('sn', this.$route.query.sn)
        formdata.append('expressServerId', this.expressServerId)
        acceptOrder(formdata).then(res => {
          setTimeout(done, 500)
        })
        this.$router.push({path:'/'})
        // this.$router.push({path:'/checkout',query:{sn:this.$route.query.sn}})
      } else {
        Toast.fail({message:'请选择配送员',duration:1000});
        done()
      }
    }
  },
  mounted() {
    getDetails(this.$route.query.sn).then((res) => {
      if (res.data.code == 0) {
        this.orderData = res.data.data.order
        this.itemLists = res.data.data.orderItemList
        this.originDate = res.data.data.order.beginDate
        this.originStatus = res.data.data.order.orderStatus
        this.originDeliverType = res.data.data.order.deliverType
        this.originHalfDateType = res.data.data.order.halfDateType
        if (this.originStatus === 'OnDelivery') {
          this.$router.push({path:'/checkout',query:{sn:this.$route.query.sn}})
        }
      }
      else if (res.data.code == 12) {
        Toast.fail({message:'无法查看',duration:1000});
        setTimeout(() => {
          this.$router.push({path:'/checkout',query:{sn:this.$route.query.sn}})
        }, 500);
      }
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
.order-footerWrap {
  position: absolute;
  bottom: 0;
}
</style>
