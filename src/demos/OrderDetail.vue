<template>
 <page-content>
    <div class="orderDetail">
      <div class="orderDetail-list">
        <div class="orderDetail-list__month">月账单</div>
        <div class="orderDetail-list__day">日细明</div>
      </div>
      <div class="orderDetail-list__status">
          <p>选择状态</p>
          <select class="orderDetail-list__selectbox" v-model="selected">
            <option v-for="opt in options" :key="opt.value" >{{opt.text}}</option>
          </select>
      </div>
      <div class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">订单总数:&nbsp;&nbsp;</span>{{orderTotal}}</p>
          <span style="align-self:center; color:#54A93E">{{orderStatus}}</span>
        </div>
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单总额:&nbsp;&nbsp;</span>{{orderSum}}</p>
          <a href="#" style="align-self:center">{{orderDetail}}</a>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">消费:&nbsp;&nbsp;</span>{{orderPromot}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p><span class="fontBold">客户应收金额:&nbsp;&nbsp;</span>{{cusAmount}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">手续费:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">实收金额:&nbsp;&nbsp;</span>{{paidAmount}}</p>
          <span style="align-self:center">2018-02-25</span>
        </div>
      </div>
      <div class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">订单总数:&nbsp;&nbsp;</span>{{orderTotal}}</p>
          <span style="align-self:center; color:#54A93E">{{orderStatus}}</span>
        </div>
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单总额:&nbsp;&nbsp;</span>{{orderSum}}</p>
          <a href="#" style="align-self:center">{{orderDetail}}</a>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">消费:&nbsp;&nbsp;</span>{{orderPromot}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p><span class="fontBold">客户应收金额:&nbsp;&nbsp;</span>{{cusAmount}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">手续费:&nbsp;&nbsp;</span>{{fees}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">实收金额:&nbsp;&nbsp;</span>{{paidAmount}}</p>
          <span style="align-self:center">2018-02-25</span>
        </div>
      </div>
      <div class="orderDetail-list__loadMore">
        <i class="orderDetail-list__upIcon"></i>
        <span>加载更多</span>
      </div>
    </div>
 </page-content>
</template>
<script>
  import Content from '../components/content'
  export default {
    components: {
      'page-content': Content
    },
    data(){
      return{
        selected: 1,
        options:[
          { text: '全部', value: 1 },
          { text: '未对账', value: 2 },
          { text: '已对账', value: 3 },
          { text: '有异议', value: 4 }
        ],
        orderTotal: 112,
        orderStatus: '已对账',
        orderSum: '1000w',
        orderDetail: '详情',
        orderPromot: 100,
        cusAmount:110,
        fees:10,
        paidAmount:200
      }
    },
    created: function(){
      this.options = options;
    }
  }
</script>
<style lang="less" scoped>
  .fontBold {
    font-weight: bold;
  }
  .orderDetail-list{
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-top: 1.2rem;
    font-size: .75rem;
  }
  .orderDetail-list__status{
    margin: 0 1rem;
  }
  .orderDetail-list__month{
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  .orderDetail-list__day{
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    // color: white;
    background: rgb(226, 226, 226);
  }
  .orderDetail-list__selectbox{
    // border: .1rem solid gray;
    border-radius:5px;
    width: 6.25rem;
    height: 1.2rem;
    margin: .8rem 0;
  }
  .orderDetail-list__detail{
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
  .orderDetail-list__paidAmount{
    display: flex;
    justify-content: space-between;
    margin-bottom: -1.2rem;
  }
  .orderDetail-list__paidAmount{
    margin-bottom: .5rem;
  }
  .orderDetail-list__total {
    margin-top: .5rem;
  }
  .orderDetail-list__loadMore{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .75rem;
    margin-top: .75rem;
  }
  .orderDetail-list__upIcon{
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/orderDetail/u678.png");
    background-repeat:no-repeat; 
    background-size: 100%;
    position: relative;
    margin-right: .25rem;
    // top: .12rem;
  }


</style>

