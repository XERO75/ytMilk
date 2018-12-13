<template>
  <div class="page">
    <page-content>
      <div class="comment-courierList">
        <p>选择配送员</p>
        <select @change="handleSelect(id)" class="comment-courierList__selectbox" v-model="id" style="font-size:14px">
          <option v-for="item in couriers" :key="item.name" :value="item.id" >{{item.name}}</option>
        </select>
      </div>
      <vue-better-scroll
          style="height: 400px"  
          class="wrapper addressWrap"
          ref="scroll"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingUp="onPullingUp">
      <div v-for="item in billLists" :key="item.index" class="orderDetail-list__detail">
        <div class="orderDetail-list__total">
          <p><span class="fontBold">接单日期:&nbsp;&nbsp;</span>{{filterDate(item.departmentDate)}}</p>
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
        <div class="orderDetail-list__sum">
          <p><span class="fontBold">订单号:&nbsp;&nbsp;</span>{{item.sn}}</p>
          <a @click="handleCheckOrder(item.sn)" style="align-self:center">{{orderDetail}}</a>
        </div>
        <div class="orderDetail-list__promot">
          <p><span class="fontBold">姓名:&nbsp;&nbsp;</span>{{item.memberName}}</p>
        </div>
        <div class="orderDetail-list__cusAmount">
          <p @click="onCall(item.memberPhone)"><span class="fontBold">联系方式:&nbsp;&nbsp;</span>{{item.memberPhone}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">地址:&nbsp;&nbsp;</span>{{item.memberDistrict}}{{item.gaodeAddress}}{{item.memberAddress}}{{item.memberRoom}}</p>
        </div>
        <div class="orderDetail-list__fees">
          <p><span class="fontBold">下单时间:&nbsp;&nbsp;</span>{{filterDate(item.createDate)}}</p>
        </div>
        <div class="orderDetail-list__paidAmount">
          <p><span class="fontBold">订单总价:&nbsp;&nbsp;</span>￥{{item.totalPrice}}</p>
        </div>
      </div>
      </vue-better-scroll>
        <!-- <btn size="large">确认对账</btn>
        <btn size="large">有异议</btn> -->
        <div v-if="this.$route.query.status == 'Unconfirmed'" class="bill-bottom">
          <van-button @click="handleComfirm" class="order-footer" type="primary" size="large" square>确认对账</van-button>
          <van-button @click="handleConfuse" class="order-footer" type="default" size="large" square>有异议</van-button>
        </div>
        <van-button v-if="this.$route.query.status == 'Confirmed'" disable class="order-footer__comfirmed" type="default" size="large" square>已对账</van-button>
        <van-button v-if="this.$route.query.status == 'Confuse' && this.billLists !==null" disable style="background:#F2F2F2; color:#9999A0; font-weight:bold" class="order-footer__comfuse" type="default" size="large" square>有异议</van-button>
    </page-content>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Content from '../components/content'
  import { getMonthDetails, getAllCouriers, changeHandler } from '../api/billDetail.js'
  import Button from '../../node_modules/vant/lib/button';
  import '../../node_modules/vant/lib/button/style';
  import Toast from '../../node_modules/vant/lib/toast';
  import '../../node_modules/vant/lib/toast/style';
  import VueBetterScroll from 'vue2-better-scroll'


  Vue.use(Toast)
  Vue.use(Button);
  export default {
    components: {
      'page-content': Content,
      VueBetterScroll
    },
    data() {
      return {
        selected: 1,
        orderStatus: '',
        couriers: [],
        billLists: [],
        id: '',
        orderDetail: '详情',

        pageNumber: 1,
        pageTotal: 1,
        pullUpLoadObj: {
        threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '暂无更多'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: []
      }
    },
    methods: {
      onCall(value) {
        window.location.href = `tel:${value}`;
      },
      filterDate (x){
        const regexp=/(?:\.0*|(\.\d+?)0+)$/
        if (x) {
          return x.toString().replace(regexp,'$1')
        }
      },
      handleSelect(id) {
        console.log(id);
        getMonthDetails(this.$route.query.departmentBillId, id).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.billLists = res.data.data.content
          } else {
            this.billLists = null
          }
        })
      },
      handleComfirm() {
        changeHandler(this.$route.query.departmentBillId, 'Confirmed').then(res => {
          Toast.success({message:'对账成功',duration:1000});
          this.$router.go(-1)
        })
      },
      handleConfuse() {
        changeHandler(this.$route.query.departmentBillId, 'Confuse').then(res => {
          Toast.success({message:'提交成功',duration:1000});
          this.$router.go(-1)
        })
      },
      handleCheckOrder(sn) {
        console.log(sn);
        this.$router.push({path:'/CheckoutOrderDetail',query:{sn:sn}})
      },
      onPullingUp () {
        console.log('上拉加载')
        this.pageNumber ++
        setTimeout(() => {
        if(this.pageTotal >= this.pageNumber) {
          getMonthDetails(this.$route.query.departmentBillId, this.id, this.pageNumber).then(res => {
            console.log(111);
            this.billLists = this.billLists.concat(res.data.data.content)
            this.$refs.scroll.forceUpdate(true)
          })
        } else {
          this.$refs.scroll.forceUpdate(false)
          console.log(222);
        }
        }, 500);
      }
    },
    mounted() {
      getMonthDetails(this.$route.query.departmentBillId).then(res => {
        console.log('montsh',res);
        this.billLists = res.data.data.content
        this.pageNumber = res.data.data.pageNumber
        this.pageTotal = res.data.data.totalPage
        console.log(this.pageNow,this.pageTotal);
      }),
      getAllCouriers().then(res => {
        console.log('getAllCouriers',res);
        this.couriers = res.data.data.serverList
        this.couriers.unshift({name:'全部配送员',id:''})
      })
    },
  }
  
</script>

<style lang="less">
  .fontBold {
    font-weight: bold;
  }
  .page {
    .before-trigger {
      font-size: 14px;
      color: #7a7979;
    }
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
    padding: 1rem 1rem 0;
    // margin-bottom: 1.5rem;
    font-size: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -.5rem;
    position: relative;
    background: #fff;
    z-index: 100;
  }
  .addressWrap {
    position: relative;
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
    margin-bottom: 1rem
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
  .order-footer__comfirmed {
    // color: red
    // display: flex;
    // justify-content: space-between;
    // position: absolute;
    // width: 100%;
    // bottom: 0;
    // font-size: 1rem;
  }
  .order-footer__comfirmed,
  .order-footer__comfuse {
    position: fixed;
    bottom: 0;
  }
  .bill-bottom {
    display: flex;
    bottom: 0;
    position: fixed;
    width: 100%;
    // position: absolute;
  }
</style>
