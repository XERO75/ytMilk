<template>
  <div class="home-page">
    <page-content>
    <div class="home-commentWrap">
      <span class="home-received__depart"><i class="iconfont icon-shouye"></i>{{listData.serviceDepartmentName}}</span>
      <span @click="handleComments()" class="home-received__comments">收到的评价 {{commentTotal}}</span>
    </div>
    <div class="home-data">
      <div class="home-data__total">
        当前共<span>{{listData.total}}</span>条数据
      </div>
      <div class="home-data__wrapper">
        <a class="home-data__action"
           @click="handleRefresh()"
           href="javascript:;">
          <i class="home-data__reIcon"><img src="../assets/images/index/u110.png" alt=""></i> 刷新
        </a>
        <a target="_blank"
           class="home-data__action"
           href="#">
          <i class="home-data__exIcon"><img src="../assets/images/index/u108.png" alt=""></i> 导出
        </a>
      </div>
    </div>
    <div class="home-order">
      <div :class="{'home-order__active': type !== 'OnDelivery' && type !=='UnSettle'}" @click="handleOrder()" class="home-order__total">所有订单</div>
      <div :class="{'home-order__active ': type == 'OnDelivery'}" @click="handleOrder('OnDelivery')" class="home-order__sending">配送中订单</div>
      <div :class="{'home-order__active': type == 'UnSettle'}" @click="handleOrder('UnSettle')" class="home-order__unhandle">未处理订单</div>
    </div>
    <div class="home-table"
         style="margin:.6rem .6rem 3rem; font-size: 12px;">
      <el-table :data="tableData"
                border
                :highlight-current-row="lineObj"
                :header-cell-style='styleObj'
                style="width: 100%">
        <el-table-column label="用户地址">
          <template slot-scope="scope">
            <span>{{scope.row.memberDistrict}}{{scope.row.gaodeAddress}}{{scope.row.memberAddress}}{{scope.row.memberRoom}}</span>
          </template>               
        </el-table-column>
        <el-table-column label="状态"
                         width="80"
                         align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus == 'Collaging'" style="color: green; font-size:14px">拼团中</span>
            <span v-if="scope.row.orderStatus == 'OnDelivery'" style="color: green; font-size:14px">正常派送</span>
            <span v-if="scope.row.orderStatus == 'HoldDelivery'" style="color: red; font-size:14px" >暂停派送</span>
            <span v-if="scope.row.orderStatus == 'UnSettle'" style="color: red; font-size:14px" >未分配</span>
            <span v-if="scope.row.orderStatus == 'UnDeal'" style="color: red; font-size:14px" >未处理</span>
            <span v-if="scope.row.orderStatus == 'Refuse'" style="color: red; font-size:14px" >已拒绝</span>
            <span v-if="scope.row.orderStatus == 'completed'" style="color: green; font-size:14px">已完成</span>
            <span v-if="scope.row.orderStatus == 'cancelled'" style="color: red; font-size:14px" >已取消</span>
            <span v-if="scope.row.orderStatus == 'Finish'" style="color: green; font-size:14px">已评价</span>
            <span v-if="scope.row.orderStatus == 'Closed'" style="color: red; font-size:14px" >已关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="100"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus == 'UnSettle'"  class="tableWrap">
              <!-- <van-button @click="handleAccept(scope.row.sn)" size="small" type="primary" style="margin-bottom:4px">接受</van-button>
              <van-button @click="handleCancle(scope.row.sn)" size="small" type="" style="background:#FF8001; color:white">拒绝</van-button> -->
              <button @click="handleAccept(scope.row.sn)" class="table-button__accept" style="">接受</button>
              <button @click="handleCancle(scope.row.sn)" class="table-button__reject" style="">拒绝</button>
            </div>
            <span @click="handleCheck(scope.row.sn)" v-else style="color: green; font-size:14px"><i style="font-size:16px" class="iconfont icon-065chakandingdan"></i>查看</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="home-pagination">
        <van-pagination 
          v-model="currentPage" 
          :page-count="totalPage"
          mode="simple" 
          @change="pageChange"
        />
      </div>
    </div>

  </page-content>
  </div>
  
</template>

<script>
import Vue from 'vue'
import Grid from '../components/grid'
import Content from '../components/content'
import { handleLogin } from "@/api/login.js";
import { getComments, getAllOrder, getOrder, getDealing, getUnSettle, getDetails, rejectOrder } from "../api/clientManagement.js";
import Dialog from '../../node_modules/vant/lib/dialog';
import '../../node_modules/vant/lib/dialog/style';
import Pagination from '../../node_modules/vant/lib/pagination';
import '../../node_modules/vant/lib/pagination/style';
import Button from '../../node_modules/vant/lib/button';
import '../../node_modules/vant/lib/button/style';

Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Button);
export default {
  components: {
    'page-content': Content
  },
  data() {
    return {
      type: null,
      styleObj: {'background': '#F2F2F2'},
      lineObj: false,
      tableData: [],
      listData: {},
      commentTotal: 0,
      currentPage: 1,
      totalPage: 1,
      status: ''
    }
  },
  watch: {
    type() {
      this.currentPage = 1
      getOrder(this.type, this.currentPage).then((res) => {
        this.tableData = res.data.data.content
        this.listData = res.data.data
        this.currentPage = res.data.data.pageNumber
        this.totalPage = res.data.data.totalPage
      });
    }
  },
  methods: {
    handleRefresh() {
      this.$router.replace({
        path: '/supplierAllBack',
        name: 'supplierAllBack'
      })
    },
    handleComments() {
      this.$router.push({path:'/comment'})
    },
    handleCheck(id) {
      this.$router.push({path:'/checkout',query:{sn:id}})
    },
    handleAccept(id) {
      this.$router.push({path:'/AcceptOrder',query:{sn:id}})
    },
    handleOrder(type) {
      this.type = type
      getOrder(type, this.currentPage).then((res) => {
        if(res.data.code == 0 && res.data.data.content !== null) {
          this.tableData = res.data.data.content
          this.listData = res.data.data
          this.currentPage = res.data.data.pageNumber
          this.totalPage = res.data.data.totalPage
        } else {
          this.tableData = null
        }
      });
    },
    handelDealing() {
      this.type = 'OnDelivery'
      getDealing().then((res) => {
        this.tableData = res.data.data.content
        this.listData = res.data.data
      }).catch(() => { 
        this.tableData = null
      });
    },
    handelUnSettle() {
      this.type = 'UnSettle'
      getUnSettle().then((res) => {
        this.tableData = res.data.data.content
        this.listData = res.data.data
      }).catch(() => { 
        this.tableData = null
        this.listData.total = 0 
        // this.listData = null
      });
    },
    handleCancle(id) {
      this.$dialog.confirm({
        title: '确定拒绝该订单吗'
      }).then(() => {
        let formdata = new FormData()
        formdata.append('sn', id)
        rejectOrder(formdata).then(res => {
        }).then(this.handleRefresh())
      }).catch(() => {
      });
    },
    handleCurrentChange(val, status) {
      getOrder(val, status).then(res => {
      })
    },
    pageChange(){
      this.handleOrder(this.type)
    }
  },
  created () {
  },
  mounted () {
    // handleLogin().then((res) => {
      getComments().then((res) => {
        if (res.data.code == 0 ) {
          this.commentTotal = res.data.data.total
        } else {
          Toast.fail({message:res.data.errmsg, duration:5000});
        }
      })
      getAllOrder().then((res) => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
          this.listData = res.data.data
          this.currentPage = res.data.data.pageNumber
          this.totalPage = res.data.data.totalPage
        } else {
          Toast.fail({message:res.data.errmsg, duration:5000});
        }
      });
    // })
  }
}

</script>

<style lang="less" scoped>
.home-commentWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.2rem;
  font-size: 14px;
  margin: 0.625rem;
  border-radius: 0.5rem;
  border: 0.07rem dashed transparent;
  background: linear-gradient(white, white) padding-box,repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.4em, white 0, white 0.75em);
}

.home-commentWrap i {
  font-size: 14px;
  margin-right: .2rem;
}
.home-received__depart {
  margin-right: .4rem;
  color: rgb(128, 128, 128);
}
.home-received__comments {
  background: rgba(255, 209, 0, 1);
  color: black;
  padding: 0.2rem;
  // border-radius: 5px;
}

.home-data {
  display: flex;
  justify-content: space-between;
  margin: 0.625rem;
  font-size: 0.75rem;
}

.home-data__total {
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.25rem;
  // float: left;
}

.home-data__total span {
  color: #0fc80b;
  margin: 0.25rem;
}

.home-data__wrapper {
  display: flex;
}

.home-data__action {
  width: 3.5rem;
  height: 1.2rem;
  font-size: 1rem;
  padding: 0 0.35rem;
  display: inline-block;
  line-height: 1.2rem;
  background: rgb(240, 240, 240);
  font-size: 0.75rem;
  color: rgb(53, 53, 53);
  border-radius: 4px;
  margin-left: 0.625rem;
}

.home-data__reIcon {
  display: inline-block;
  width: 1rem;
  height: 0.73rem;
}

.home-data__exIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.65rem;
}

.home-order {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.8rem;
  color: #fff;
  // font-weight: bold;
  padding: 0.625rem;
}

.home-order__total,
.home-order__sending,
.home-order__unhandle {
  width: 5rem;
  height: 1.8rem;
  color: gray;
  background: #f2f2f2;
}

.home-order__active {
  width: 5rem;
  height: 1.8rem;
  background: #54a93e;
  color: #fff;
}

.home-pagination {
  // display: flex;
  // justify-content: center;
  margin-top: 0.3rem;
}
.tableWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .table-button__accept{
    margin-bottom:4px; 
    background: rgb(103, 182, 55); 
    width:3rem;
    color:white;
    border-radius: 5px;
    padding: .2rem;
  }
  .table-button__reject {
    background:#FF8001; 
    color:white;
    width:3rem;
    border-radius: 5px;
    padding: .2rem;
  }
}
</style>
