<template>
  <div class="page">
    <page-content>
      <div class="orderDetail">
        <div class="orderDetail-list">
          <div :class="{'orderDetail-list__active ': type == 1}" @click="getMonth()" class="orderDetail-list__month">月账单</div>
          <div :class="{'orderDetail-list__active ': type == 2}" @click="getDaily()" class="orderDetail-list__day">日细明</div>
        </div>
        <div v-if="type === 1" class="orderDetail-monthWrap">
          <div class="orderDetail-list__status">
            <p style="font-size:14px; font-weight:bold; color:#6666666;">选择状态</p>
            <select class="orderDetail-list__selectbox" v-model="selected.text">
              <option selected>全部配送员</option>
              <option v-for="opt in options" :key="opt.value" >{{opt.text}}</option>
            </select>
          </div>
          <div v-for="item in orderLists" :key="item.index" class="orderDetail-list__detail">
            <div class="orderDetail-list__total">
              <p><span class="fontBold">订单总数:&nbsp;&nbsp;</span>{{item.totalOrder}}</p>
              <span v-if="item.status == 'Unconfirmed'" style="align-self:center; color:#54A93E">未对账</span>
              <span v-if="item.status == 'Confirmed'" style="align-self:center; color:#54A93E">已确认</span>
              <span v-if="item.status == 'Confuse'" style="align-self:center; color:#54A93E">有异议</span>
            </div>
            <div class="orderDetail-list__sum">
              <p><span class="fontBold">订单总额:&nbsp;&nbsp;</span>￥{{item.totalPrice}}</p>
              <router-link style="align-self:center" :to="{ path: 'billDetail' }">
                {{orderDetail}}
              </router-link>
            </div>
            <div class="orderDetail-list__promot">
              <p><span class="fontBold">优惠金额:&nbsp;&nbsp;</span>￥{{item.discountedPrice}}</p>
            </div>
            <div class="orderDetail-list__cusAmount">
              <p><span class="fontBold">客户应收金额:&nbsp;&nbsp;</span>￥{{item.receivablePrice}}</p>
            </div>
            <div class="orderDetail-list__fees">
              <p><span class="fontBold">手续费:&nbsp;&nbsp;</span>￥{{item.handlingFee}}</p>
            </div>
            <div class="orderDetail-list__paidAmount">
              <p><span class="fontBold">实收金额:&nbsp;&nbsp;</span>￥{{item.receivablePrice}}</p>
              <span style="align-self:center">{{item.createDate}}</span>
            </div>
          </div>
          <div class="orderDetail-list__loadMore">
            <i class="orderDetail-list__upIcon"></i>
            <span>加载更多</span>
          </div>
        </div>
        <div v-if="type === 2" class="order-dailyWrap">
          <div class="order-daily__slecetDay">
            <span>选择日期</span>
            <form-item>
              <div class="item-input">
                <input type="text" v-model="date2" @click="$refs.c2.open()" readonly>
              </div>
            </form-item>
          </div>
          <div class="order-daily__info">
            <div class="order-daily__user">
              <span class="fontBold">用户：</span>六六六
            </div>
            <div class="order-daily__tel">
              <span class="fontBold">手机：</span>2334342342
            </div>
            <div class="order-daily__product">
              <span class="fontBold">商品：</span>
            </div>
            <div class="order-daily__productImg">
              <img class="order-daily__img" src="../assets/images/accept/u250.png" alt="">
              <span class="order-daily__desc">谷元黑米牛奶饮品236ml<br>X1</span>
            </div>
            <div class="order-daily__productImg">
              <img class="order-daily__img" src="../assets/images/accept/u250.png" alt="">
              <span class="order-daily__desc">谷元黑米牛奶饮品236ml<br>X1</span>
            </div>
            <div class="order-daily__productImg">
              <img class="order-daily__img" src="../assets/images/accept/u250.png" alt="">
              <span class="order-daily__desc">谷元黑米牛奶饮品236ml<br>X1</span>
            </div>
          </div>
        </div>
      </div>
    </page-content>
    <popup :show-title-bar="false" ref="c2">
      <!-- <calendar :date="date2" @change="(d) => {(date2 = d) && $refs.c2.close()}"></calendar> -->
    </popup>
  </div>
</template>

<script>
  import Content from '../components/content'
  import Popup from '../components/popup'
  // import Calendar from '../components/calendar'
  import {
    Form,
    FormItem
  } from '../components/form'
  import { getMonthDetail } from '../api/orderDetail.js'

  export default {
    components: {
      'page-content': Content,
      // Calendar,
      'form-list': Form,
      FormItem,
      Popup
    },
    data() {
      return {
        selected: {
          text:'全部配送员'
        },
        type: 1,
        selected: 1,
        options: [],
        orderTotal: 112,
        orderStatus: '已对账',
        orderSum: '1000w',
        orderDetail: '详情',
        orderPromot: 100,
        cusAmount: 110,
        fees: 10,
        paidAmount: 200,
        date2: '2012-12-12',
        orderLists: [],
        originStatus: '',
        originDate: '',
      }
    },
    computed: {
      filterStatus: function() {

      },
      filterDate: function() {
        // const regexp=/(?:\.0*|(\.\d+?)0+)$/
      },
    },
    methods: {
      getMonth() {
        this.type = 1
      },
      getDaily() {
        this.type = 2
      }
    },
    mounted: function() {
      getMonthDetail().then(res => {
        let Res = res.data.data
        this.orderLists = Res.content
        // this.originDate = Res.content.beginDate
        console.log(this.orderLists);
      })
    }
  }
</script>

<style lang="less" scoped>
  .fontBold {
    font-weight: bold;
  }
  
  .orderDetail-list {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-top: 1.2rem;
    font-size: .75rem;
  }
  
  .orderDetail-list__status {
    margin: 0 1rem;
  }
  
  .orderDetail-list__month,
  .orderDetail-list__day  {
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: rgb(226, 226, 226);
  }
  
  .orderDetail-list__active {
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  
  .orderDetail-list__selectbox {
    border-radius: 5px;
    width: 6.25rem;
    height: 1.2rem;
    margin: .8rem 0;
  }
  
  .orderDetail-list__detail {
    margin: 0 1rem;
    font-size: .75rem;
    border-bottom: 1px solid rgb(226, 226, 226);
    color: rgb(131, 131, 131);
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
    margin-bottom: .5rem;
  }
  
  .orderDetail-list__total {
    margin-top: .5rem;
  }
  
  .orderDetail-list__loadMore {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .75rem;
    margin-top: .75rem;
  }
  
  .orderDetail-list__upIcon {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/orderDetail/u678.png");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    margin-right: .25rem;
    // top: .12rem;
  }
  
  .order-daily__slecetDay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem .8rem;
  }
  .order-daily__info {
    margin: 1rem .8rem;
    font-size: .8rem;
    border-bottom: 1px solid rgb(226, 226, 226);
  }
  .item-input {
    border: 1px solid gray;
    padding: .4rem .4rem;
    width: 230px;
    border-radius: 5px;
  }
  .order-daily__productImg {
    display: flex;
    align-items: center
  }
  .order-daily__img {
    width: auto;
    height: 2.5rem;
    margin: .4rem 0;
  }
  .order-daily__desc {
    margin: 0 .4rem;
    font-size: .7rem;
    font-weight: bold;
  }
</style>

