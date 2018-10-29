<template>
  <div class="page">
    <page-content>
      <div class="comment-courierList">
        <p>选择配送员</p>
        <select class="comment-courierList__selectbox" v-model="selected">
              <option v-for="item in couriers" :key="item.value" >{{item.text}}</option>
            </select>
      </div>
      <div class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">接单日期:&nbsp;&nbsp;</span>{{orderTotal}}</p>
          <span style="align-self:center; color:#54A93E">{{orderStatus}}</span>
        </div>
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单号:&nbsp;&nbsp;</span>{{orderSum}}</p>
          <router-link style="align-self:center" :to="{ path: 'billDetail' }">
            {{orderDetail}}
            <!-- <a href="#" style="align-self:center">{{orderDetail}}</a> -->
          </router-link>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{orderPromot}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p><span class="fontBold">联系方式:&nbsp;&nbsp;</span>{{cusAmount}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">下单时间:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">订单总价:&nbsp;&nbsp;</span>{{paidAmount}}</p>
        </div>
      </div>
      <div class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">接单日期:&nbsp;&nbsp;</span>{{orderTotal}}</p>
          <span style="align-self:center; color:#54A93E">{{orderStatus}}</span>
        </div>
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单号:&nbsp;&nbsp;</span>{{orderSum}}</p>
          <router-link style="align-self:center" :to="{ path: 'billDetail' }">
            {{orderDetail}}
            <!-- <a href="#" style="align-self:center">{{orderDetail}}</a> -->
          </router-link>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{orderPromot}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p><span class="fontBold">联系方式:&nbsp;&nbsp;</span>{{cusAmount}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">下单时间:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">订单总价:&nbsp;&nbsp;</span>{{paidAmount}}</p>
        </div>
      </div>
      <div class="orderDetail-list__loadMore">
        <i class="orderDetail-list__upIcon"></i>
        <span>加载更多</span>
      </div>
      <div class="order-footer">
        <btn size="large">确认对账</btn>
      </div>
    </page-content>
  </div>
</template>

<script>
  import {
    Header,
    HeaderLink
  } from '../components/header'
  import Content from '../components/content'
  import Icon from '../components/icons'
  import {
    Button
  } from '../components/buttons'
  
  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      'page-content': Content,
      'btn': Button,
      Icon
    },
    data() {
      return {
        selected: 1,
        couriers: [{
            text: 'lily-12580',
            value: 1
          },
          {
            text: 'alice-10096',
            value: 2
          },
          {
            text: 'jack-22234',
            value: 3
          },
        ],
        orderTotal: 112,
        orderStatus: '已对账',
        orderSum: '1000w',
        orderDetail: '详情',
        orderPromot: 100,
        cusAmount: 110,
        fees: 10,
        paidAmount: 200,
      }
    }
  }
</script>

<style lang="less">
  .fontBold {
    font-weight: bold;
  }
  
  .comment-header {
    color: #999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999999;
    padding: 0 .625rem;
  }
</style>

<style lang="less" scoped>
  .comment-courierList {
    margin: 1rem;
    // margin-bottom: 1.5rem;
    font-size: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -.5rem;
  }
  
  .comment-courierList__selectbox {
    // border: .1rem solid gray;
    border-radius: 5px;
    width: 6.25rem;
    height: 1.2rem;
    margin: .8rem 0;
  }
  
  .orderDetail-list__detail {
    margin: 0 1rem;
    font-size: .75rem;
    border-bottom: 1px solid rgb(226, 226, 226);
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
  .order-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    font-size: 1rem;
  }
</style>
