<template>
  <div class="page">
    <page-content>

        <div class="orderDetail">
          <div class="orderDetail-list">
            <div :class="{'orderDetail-list__active ': type == 1}"
                @click="getMonth()"
                class="orderDetail-list__month">月账单</div>
            <div :class="{'orderDetail-list__active ': type == 2}"
                @click="getDaily()"
                class="orderDetail-list__day">日明细</div>
          </div>
          <div v-if="type === 1" class="orderDetail-monthWrap">
            <div class="orderDetail-list__status">
              <p style="font-size:14px; font-weight:bold; color:#6666666;">选择状态</p>
              <select @change="handleSelect(id)" class="orderDetail-list__selectbox" v-model="id">
                <option v-for="item in options" :key="item.value" :value="item.id">{{item.value}}</option>
              </select>
            </div>
            
              <div v-for="item in orderLists"
                  :key="item.index"
                  class="orderDetail-list__detail">
                <div class="orderDetail-list__total">
                  <p><span class="fontBold">订单总数:&nbsp;&nbsp;</span>{{item.totalOrder}}</p>
                  <span v-if="item.status == 'Unconfirmed'"
                        style="align-self:center; color:#54A93E">未对账</span>
                  <span v-if="item.status == 'Confirmed'"
                        style="align-self:center; color:#54A93E">已确认</span>
                  <span v-if="item.status == 'Confuse'"
                        style="align-self:center; color:#54A93E">有异议</span>
                </div>
                <div class="orderDetail-list__sum">
                  <p><span class="fontBold">订单总额:&nbsp;&nbsp;</span>￥{{item.totalPrice}}</p>
                  <a @click="handleDetail(item.id, item.status)"
                    style="align-self:center">详情</a>
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
                  <span style="align-self:center">{{handleFilterDate(item.createDate)}}</span>
                </div>
              </div>
            
          </div>
          <div v-if="type === 2"
            class="order-dailyWrap">
            <div class="order-daily__slecetDay">
              <span style="font-size:14px;" class="fontBold">选择日期</span>
              <div @click="timePickerOne = true;"
                  class="item-input"
                  style="font-size:14px">
                {{filterBegin}}
              </div>
              <van-popup v-model="timePickerOne"
                        position="bottom">
                <van-datetime-picker v-model="beginDate"
                                    type="date"
                                    @cancel="onCancel"
                                    @confirm="confirmOne" />
              </van-popup>
            </div>
            <div class="wrapper">
              <div v-for="item in dayLists"
                  :key="item.index"
                  class="order-daily__info">
                <div class="order-daily__sn">
                  <span class="">订单号：{{item.sn}}</span>
                  <span v-if="item.orderStatus == 'OnDelivery'" style="align-self:center; color:#54A93E">正常派送</span>
                  <span v-if="item.orderStatus == 'HoldDelivery'" style="align-self:center; color:red">暂停派送</span>
                  <span v-if="item.orderStatus == 'UnSettle'" style="align-self:center; color:red">未分配</span>
                  <span v-if="item.orderStatus == 'UnDeal'" style="align-self:center; color:red">未处理</span>
                  <span v-if="item.orderStatus == 'Refuse'" style="align-self:center; color:red">已拒绝</span>
                  <span v-if="item.orderStatus == 'completed'" style="align-self:center; color:#54A93E">已完成</span>
                  <span v-if="item.orderStatus == 'cancelled'" style="align-self:center; color:red">已取消</span>
                  <span v-if="item.orderStatus == 'Finish'" style="align-self:center; color:#54A93E">已评价</span>
                  <span v-if="item.orderStatus == 'Closed'" style="align-self:center; color:red">已关闭</span>
                </div>
                <div class="order-daily__user">
                  <span class="">用户：</span>{{item.memberName}}
                </div>
                <div class="order-daily__tel">
                  <span class="">手机：</span>{{item.memberPhone}}
                </div>
                <div class="order-daily__product">
                  <span class="">商品：</span>
                </div>
                <div v-for="n in item.orderItems"
                    :key="n.index"
                    class="order-daily__productImg">
                  <img class="order-daily__img"
                      :src="n.image"
                      alt="">
                  <span class="order-daily__desc">{{n.productName}}{{n.specifications}}<br>X{{n.number}}</span>
                </div>
                <div class="order-daily__user">
                  <span class="">订单总价</span>￥{{item.totalPrice}}
                </div>
              </div>
            </div>

          </div>
        </div>

    </page-content>
    <!-- <calendar :date="date2" @change="(d) => {(date2 = d) && $refs.c2.close()}"></calendar> -->
    <!-- <div class="orderDetail-list__loadMore">
    <span v-if="this.orderLists !== null" style="margin-bottom:4rem"><a @click="next">加载更多</a></span>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Content from '../components/content'
import { getMonthDetail, getDayDetail } from '../api/orderDetail.js'
// import VueBetterScroll from 'vue2-better-scroll'
import Popup from '../../node_modules/vant/lib/popup';
import '../../node_modules/vant/lib/popup/style';
import DatetimePicker from '../../node_modules/vant/lib/datetime-picker';
import '../../node_modules/vant/lib/datetime-picker/style';
import List from '../../node_modules/vant/lib/list';
import '../../node_modules/vant/lib/list/style';
import axios from 'axios' //引入axios

// Vue.use(VueBetterScroll)
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(List);
export default {
  name: 'xxx',
  components: {
    'page-content': Content,
  },
  data () {
    return {
      type: 1,
      id: '',
      options: [
        { id: "", value: ' 全部' },
        { id: "Unconfirmed", value: '未对账' },
        { id: "Confirmed", value: '已对账' },
        { id: "Confuse", value: '有异议' }
      ],
      orderLists: [],
      originStatus: '',
      originDate: '',
      pageNumber: 1,
      timePickerOne: false,
      beginDate: '',
      dayLists: [],
      productList: [],
      pageNumber: '1',
      // mescroll: null,
      // mescrollUp: {
      //   callback: this.upCallback,
      // },
      // dataList: [] // 列表数据
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    filterBegin: function () {
      return this.dateLong2String(this.beginDate.toString())
    },
    
  },
  methods: {
    getMonth () {
      this.type = 1
      getMonthDetail().then(res => {
        let Res = res.data.data
        this.orderLists = Res.content
      }).catch((err) => {
        console.log(err);
      })
    },
    getDaily () {
      this.type = 2
      getDayDetail(this.dateLong2String(this.beginDate)).then(res => {
        this.dayLists = res.data.data.content
        this.productList = res.data.data.content.orderItems
      }).catch((err) => {
        console.log(err);
      })
    },
    next () {
      this.pageNumber++
      getMonthDetail(this.pageNumber).then(res => {
        this.dataList.push(res.data.data.content)
      })
    },
    filterStatus (val) {
      switch (val) {
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
    handleDetail (id, status) {
      this.$router.push({ path: 'billDetail', query: { departmentBillId: id, status: status } })
    },
    onCancel () {
      this.timePickerOne = false
    },
    confirmOne (picker, value, index) {
      this.beginDate = picker
      let beginDate = this.dateLong2String(this.beginDate)
      this.timePickerOne = false
      getDayDetail(beginDate).then(res => {
        if (res.data.code == 0) {
          this.dayLists = res.data.data.content
        } else {
          this.dayLists = null
        }
      })
    },
    handleSelect (id) {
      getMonthDetail(this.pageNumber, id).then(res => {
        if (res.data.code == 0) {
          this.orderLists = res.data.data.content
        } else {
          this.orderLists = null
        }
      })
    },
    dateLong2String (time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    handleFilterDate(val){
      if(val){
        let arr = val + ''
        return arr.slice(0,10)
      }
    }
  },
  mounted () {
    this.getMonth()
  },
  created () {
    this.beginDate = new Date()
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
  font-size: 0.75rem;
}

.orderDetail-list__status {
  margin: 0 1rem;
  align-items: center;
}

.orderDetail-list__month,
.orderDetail-list__day {
  width: 8rem;
  height: 1.8rem;
  line-height: 1.8rem;
  background: rgb(226, 226, 226);
}

.orderDetail-list__active {
  color: white;
  font-weight: bold;
  background: #54a93e;
}

.orderDetail-list__selectbox {
  border-radius: 5px;
  font-size: 14px;
  width: 6.25rem;
  height: 1.2rem;
  margin: 0.8rem 0;
}

.orderDetail-list__detail {
  margin: 0 1rem;
  font-size: 0.75rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  color: rgb(131, 131, 131);
}
.orderDetail-list__detail:nth-last-child(1) {
  margin-bottom: 10em;
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
  margin-bottom: 0.5rem;
}

.orderDetail-list__total {
  margin-top: 0.5rem;
}

.orderDetail-list__loadMore {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  margin-top: 0.75rem;
}

.orderDetail-list__upIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../assets/images/orderDetail/u678.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
  // top: .12rem;
}

.order-daily__slecetDay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0.8rem;
}
.order-daily__info {
  margin: 1rem 0.8rem;
  font-size: 14px;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-bottom: .8rem;
}
.item-input {
  border: 1px solid rgb(226, 226, 226);
  padding: 0.4rem 0.4rem;
  color: gray;
  width: 5rem;
  text-align: center;
  border-radius: 5px;
}
.order-daily__productImg {
  display: flex;
  align-items: center;
}
.order-daily__img {
  width: auto;
  height: 2.5rem;
  margin: 0.4rem 0;
}
.order-daily__desc {
  margin: 0 0.4rem;
  font-size: 0.7rem;
  // font-weight: bold;
}
.wrapper:nth-last-child(1) {
  margin-bottom: 4rem;
}
.mescroll {
  // position: fixed;
  top: 100px;
  bottom: 0;
  height: auto;
}
.order-daily__slecetDay {
  .van-popup {
    z-index: 99999999!important;
  }
}
.order-daily__sn {
  display: flex;
  justify-content: space-between;
}
</style>

