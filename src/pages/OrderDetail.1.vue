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
            <!-- <select class="orderDetail-list__selectbox" v-model="selected.text">
              <option v-for="opt in options" :key="opt.value" >{{opt.text}}</option>
            </select> -->
            <select @change="handleSelect(id)" class="orderDetail-list__selectbox" v-model="id">
              <option v-for="item in options" :key="item.value" :value="item.id">{{item.value}}</option>
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
              <a @click="handleDetail(item.id)" style="align-self:center">详情</a>
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
            <!-- <i class="orderDetail-list__upIcon"></i> -->
            <span v-if="this.orderLists !== null" style="margin-bottom:4rem"><a @click="next">加载更多</a></span>
          </div>
        </div>
        <div v-if="type === 2" class="order-dailyWrap">
          <div class="order-daily__slecetDay">
            <span style="font-size:14px">选择日期</span>
            <div @click="timePickerOne = true;" class="item-input" style="font-size:14px">
              {{filterBegin}}
            </div>
              <van-popup
                v-model="timePickerOne"
                position="bottom"
              >
              <van-datetime-picker
                v-model="beginDate"
                type="date"
                @cancel="onCancel"
                @confirm="confirmOne"
              />
              </van-popup>
          </div>
          <div class="wrapper">
            <div v-for="item in dayLists" :key="item.index" class="order-daily__info">
              <div class="order-daily__user">
                <span class="">用户：</span>{{item.memberName}}
              </div>
              <div class="order-daily__tel">
                <span class="">手机：</span>{{item.memberPhone}}
              </div>
              <div class="order-daily__product">
                <span class="">商品：</span>
              </div>
              <div v-for="n in item.orderItems" :key="n.index" class="order-daily__productImg">
                <img class="order-daily__img" src="../assets/images/accept/u250.png" alt="">
                <span class="order-daily__desc">谷元黑米牛奶饮品236ml<br>X1</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </page-content>
      <!-- <calendar :date="date2" @change="(d) => {(date2 = d) && $refs.c2.close()}"></calendar> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import Content from '../components/content'
  // import Popup from '../components/popup'
  // import Calendar from '../components/calendar'
  import {
    Form,
    FormItem
  } from '../components/form'
  import { getMonthDetail, getDayDetail } from '../api/orderDetail.js'
  // import VueBetterScroll from 'vue2-better-scroll'
  import Popup from '../../node_modules/vant/lib/popup';
  import '../../node_modules/vant/lib/popup/style';
  import DatetimePicker from '../../node_modules/vant/lib/datetime-picker';
  import '../../node_modules/vant/lib/datetime-picker/style';
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'


  // Vue.use(VueBetterScroll)
  Vue.use(Popup);
  Vue.use(DatetimePicker);
  export default {
    components: {
      'page-content': Content,
      // Calendar,
      'form-list': Form,
      FormItem,
      // Popup
    },
    data() {
      return {
        selected: {
          text:'全部配送员'
        },
        type: 1,
        selected: 1,
        id: '',
        options: [
          {id:"",value:'全部'},
          {id:"Unconfirmed",value:'未对账'},
          {id:"Confirmed",value:'已对账'},
          {id:"Confuse",value:'有异议'}
        ],
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
        pageNumber: 1,
        timePickerOne: false,
        beginDate: '',
        dayLists: [],
        productList: []
      }
    },
    computed: {
      filterBegin: function() {
        return this.dateLong2String(this.beginDate.toString())
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
      },
      next() {
        console.log(12);
        this.pageNumber++
        getMonthDetail(this.pageNumber).then(res => {
          this.orderLists.push(res.data.data.content)
        })
      },
      handleDetail(id) {
        // console.log(item.id);
        console.log(id);
        this.$router.push({path:'billDetail',query:{departmentBillId:id}})
      },
      onCancel() {
        this.timePickerOne = false
      },
      confirmOne(picker, value, index) {
        this.beginDate = picker
        // console.log(this.dateLong2String(this.beginDate))
        let beginDate = this.dateLong2String(this.beginDate)
        // let endDate = this.dateLong2String(this.endDate)
        this.timePickerOne = false
        getDayDetail(beginDate).then(res => {
          if (res.data.code == 0) {
            this.dayLists = res.data.data.content
          } else {
            this.dayLists = null
          }
        })
      },
      dateLong2String(time){
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        month = month < 10 ? "0"+month:month;
        day = day < 10 ? "0"+day:day;
        return year+"-"+month+"-"+day;
      },
      handleSelect(id) {
        // this.id = id
        console.log(id);
        getMonthDetail(this.pageNumber, id).then(res => {
          if (res.data.code == 0) {
            this.orderLists = res.data.data.content
          } else {
            this.orderLists = null 
          }
        })
      },
    },
    mounted () {
      getMonthDetail().then(res => {
        let Res = res.data.data
        this.orderLists = Res.content
        console.log(this.orderLists);
      }),
      // console.log(1111,this.beginDate);
      console.log(this.dateLong2String(this.beginDate));
      getDayDetail(this.dateLong2String(this.beginDate)).then(res => {
        // console.log(222,res);
        this.dayLists = res.data.data.content
        this.productList = res.data.data.content.orderItems
      })
    },
    created() {
      this.beginDate = new Date()
    },
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
    font-size: 14px;
    border-bottom: 1px solid rgb(226, 226, 226);
  }
  .item-input {
    border: 1px solid gray;
    padding: .4rem .4rem;
    width: 12rem;
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
    // font-weight: bold;
  }
  .wrapper:nth-last-child(1) {
    margin-bottom: 4rem;
  }
</style>

