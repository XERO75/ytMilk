<template>
  <div class="page">
    <page-content>
      <div class="order-courierWrap">
        <span style="font-weight:bold; font-size:.8rem; ">配送员</span>
        <div class="order-courier">
          <div class="order-courier__detail">
            <img :src="courierData.expressImage"
                 class="order-courier__avatar">
            <div class="order-courier__desc">
              {{courierData.expressName}}<br>
              <span style="color:#54A93E">{{courierData.expressPhone}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">接单日期:&nbsp;&nbsp;</span>{{filterDate(orderData.departmentDate)}}</p>
          <span style="align-self:center;">{{filterStatus}}</span>
        </div>
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单号:&nbsp;&nbsp;</span>{{orderData.sn}}</p>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{orderData.memberName}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p><span class="fontBold">联系方式:&nbsp;&nbsp;</span>{{orderData.memberPhone}}</p>
        </div>
        <div class="orderDetail-list__fees clearFix">
          <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{orderData.memberDistrict}}{{orderData.gaodeAddress}}{{orderData.memberAddress}}{{orderData.memberRoom}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">下单时间:&nbsp;&nbsp;</span>{{filterDate(orderData.createDate)}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">订单总价:&nbsp;&nbsp;</span>￥{{orderData.totalPrice}}</p>
        </div>
        <div class="order-daily__product">
          <span class="fontBold">商品：</span>
        </div>
        <div class="order-product__detailWrap">
          <div v-for="item in orderItemLists" :key="item.index" style="height:3rem;">
            <div class="order-product__detail fl">
              <!-- <img class="order-product__img" :src="xxx" alt=""> -->
              <img class="order-daily__img" :src="item.image" alt="">
              <span class="order-product__desc">{{item.productName}}</span>
            </div>
            <span style="line-height:2rem" class="fr">共{{item.totalCount}}/剩{{item.remain}}/日送{{item.number}}</span>
          </div>
        </div>
      </div>
      <div class="checkoutDetail-list">
        <div class="checkoutDetail-list__total">
          <p><span class="fontBold">订单总价:&nbsp;&nbsp;</span>￥{{orderData.totalPrice}}</p>
        </div>
        <div class="checkoutDetail-list__promot">
          <p><span class="fontBold">优惠价格:&nbsp;&nbsp;</span>￥{{orderData.couponDiscount}}</p>
        </div>
        <div class="checkoutDetail-list__actual">
          <p><span class="fontBold">实付金额:&nbsp;&nbsp;</span>￥{{orderData.actualPay}}</p>
        </div>
        <div class="checkoutDetail-list__fee">
          <p><span class="fontBold">手续费:&nbsp;&nbsp;</span>￥{{orderData.handlingFee}}</p>
        </div>
        <div class="checkoutDetail-list__actualGet">
          <p><span class="fontBold">实收金额:&nbsp;&nbsp;</span>￥{{orderData.actualPay}}</p>
        </div>
      </div>

    </page-content>
  </div>
</template>

<script>
import Vue from 'vue'
import Content from '../components/content'
import { handleLogin } from "@/api/login.js";
import { getOrderStatus } from '@/api/checkout.js'

export default {
  components: {
    'page-content': Content,
  },
  data () {
    return {
      courierData: {},
      clientData: {},
      itemLists: {},
      expressServerId: '',
      originDate: '',
      originStatus: '',
      originDeliverType: '',
      originHalfDateType: '',
      orderData:{},
      orderItemLists: {}
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
    filterDate (x){
      const regexp=/(?:\.0*|(\.\d+?)0+)$/
      return x.toString().replace(regexp,'$1')
    },
  },
  mounted () {
    handleLogin().then((res) => {
      getOrderStatus(this.$route.query.sn).then((res) => {
        this.courierData = res.data.data
        this.orderData = res.data.data.order
        this.orderItemLists = res.data.data.orderItemList
        this.originStatus = res.data.data.order.orderStatus
      })
    })
  }
}
</script>
<style lang="less" scoped>
.boldFont {
  font-weight: bold;
}
.order-courierWrap {
  margin: 0.8rem 1rem;
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
  font-size: 15px;
}


.orderDetail-list__detail {
    margin: 1.5rem 1rem;
    font-size: .75rem;
    border-bottom: 1px solid rgb(226, 226, 226);
    border-top: 1px solid rgb(226, 226, 226);
  }
  .orderDetail-list__status,
  .orderDetail-list__total,
  .orderDetail-list__promot,
  .orderDetail-list__cusAmount,
  .orderDetail-list__fees,
  .orderDetail-list__sum,
  .orderDetail-list__paidAmount {
    display: flex;
    justify-content: space-between;
    margin-bottom: -1.2rem;
  }
  
  .orderDetail-list__paidAmount {
    margin-bottom: -.5rem;
  }
  .order-daily__productImg {
    display: flex;
    align-items: center
  }
  .order-daily__img {
    // width: auto;
    width: 2rem;
    height: 2rem;
    // height: 2.5rem;
    margin: .4rem 0;
  }
  .order-daily__desc {
    margin: 0 .4rem;
    font-size: .7rem;
    // font-weight: bold;
  }
  .checkoutDetail-list {
    margin: -1.5rem 1rem;
    font-size: .75rem;
    .checkoutDetail-list__total,
    .checkoutDetail-list__promot,
    .checkoutDetail-list__actual,
    .checkoutDetail-list__fee,
    .checkoutDetail-list__actualGet {
      display: flex;
      justify-content: space-between;
      margin-bottom: -1.2rem;
    }
  }
  .order-product__detailWrap {
    // display: flex;
    // justify-content: space-between;
    // padding: 0.4rem;
    // border: 1px solid rgb(226, 226, 226);
    border-bottom: none;
  }
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
    margin-left: .4rem;
    overflow: hidden;
    // width: 6rem;
    line-height: 2rem;
  }
</style>
