<template>
  <div class="search-page">
    <page-content>
      <form action="/">
        <van-search placeholder="请输入搜索关键词" show-action @search="search" v-model="searchKey" />
        <!-- <searchbar v-model="searchKey" @input="search"></searchbar> -->
          <!-- <div slot="action" @click="search">搜索</div>
        </van-search> -->
      </form>
      <div class="search-grids">
        <el-table :data="tableData"
                border
                :header-cell-style='styleObj'
                style="width: 100%">
        <el-table-column label="用户地址">
          <template slot-scope="scope">
            <span>{{scope.row.memberDistrict}}{{scope.row.gaodeAddress}}{{scope.row.memberAddress}}{{scope.row.memberRoom}}</span>
          </template>               
        </el-table-column>
        <el-table-column label="状态"
                         width="90"
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
                         width="90"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus == 'UnSettle'"  class="tableWrap">
              <button @click="handleAccept(scope.row.sn)" class="table-button__accept" style="">接受</button>
              <button @click="handleCancle(scope.row.sn)" class="table-button__reject" style="">拒绝</button>
            </div>
            <span v-else @click="handleCheck(scope.row.sn)" style="color: green; font-size:14px"><i style="font-size:16px" class="iconfont icon-065chakandingdan"></i>查看</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <p v-if="tableData !== null" class="search-button"><a @click="next" >加载更多</a></p>
    </page-content>
  </div>
</template>
<script>
import Vue from 'vue'
import Content from '../components/content'
import Search from '../../node_modules/vant/lib/search';
import '../../node_modules/vant/lib/search/style';
import Toast from '../../node_modules/vant/lib/toast';
import '../../node_modules/vant/lib/toast/style';
import { handleLogin } from "@/api/login.js";
import { getAllOrder, searchOrder, rejectOrder } from '@/api/search.js'
import _ from 'lodash'; //引入lodash
import axios from 'axios' //引入axios
import Searchbar from '../components/searchbar'
import Button from '../../node_modules/vant/lib/button';
import '../../node_modules/vant/lib/button/style';

//请求canceltoken列表
let sources = [];
Vue.use(Search);
Vue.use(Toast)
Vue.use(Button)
export default {
  components: {
    'page-content': Content,
    Searchbar
  },
  data () {
    return {
      styleObj: {'background': '#F2F2F2'},
      tableData: [],
      listData: {},
      searchKey: '',
      pageNumber: 1,
      searchInput: ''
    }
  },
  methods: {
    //准备搜索
    search: _.debounce(
      function () {
        let that = this
        let api = ''
        let api1 = '/app/service_department/search.htm'
        let api2 = 'api/app/service_department/search.htm'
        _.remove(sources, function (n) {
          return n.source === null;
        });
        sources.forEach(function (item) {
          if (item !== null && item.source !== null && item.status === 1) {
            item.status = 0;
            item.source.cancel('取消上一个')
          }
        });
        var sc = {
          source: axios.CancelToken.source(),
          status: 1 //状态1：请求中，0:取消中
        };
        sources.push(sc);
        this.searchKey == '' ? api=api2 : api = api1
        axios.get(api, {
          cancelToken: sc.source.token,
          params: {
            keyword: this.searchKey,
            WX_TYPE: 'OfficialAccount'
          }
        }).then(function (res) {
          //请求成功
          sc.source = null; //置空请求canceltoken
          console.log('搜索成功');
          console.log('返回的值是',res.data);
          if( res.data.data != null ){
            that.tableData = res.data.data.content
            that.listData = res.data.data
            console.log('成功赋值啦');
          } else {
            that.tableData = null
            console.log('无数据');
          }
        }).catch(() => { 
          console.log('请求失败');
          that.tableData = null
          sc.source = null; //置空请求canceltoken
        })
      },
      500 //空闲时间间隔设置500ms
    ),
    handleCancle(id) {
      this.$dialog.confirm({
        title: '确定拒绝该订单吗'
      }).then(() => {
        let formdata = new FormData()
        formdata.append('sn', id)
        rejectOrder(formdata).then(res => {
          console.log('order cancled');
        }).then(this.$router.go(0))
      }).catch(() => {
        console.log('u cancled');
      });
    },
    handleAccept(id) {
      this.$router.push({path:'/AcceptOrder',query:{sn:id}})
    },
    handleCheck(id) {
      this.$router.push({path:'/checkout',query:{sn:id}})
    },
    next() {
      if (this.searchKey == '') {
        this.pageNumber ++
        searchOrder(this.pageNumber).then(res => {
          if (res.data.data != null) {
            this.tableData = this.tableData.concat(res.data.data.content)
            Toast.success('加载成功');
          } else {
            console.log('无数据');
            Toast.fail('暂无数据');
          }
        })
      } else {
        this.pageNumber ++
        searchOrder(this.pageNumber, this.searchKey).then(res => {
          console.log(res);
          if (res.data.data != null) {
            this.tableData = this.tableData.concat(res.data.data.content)
          } else {
            console.log('无数据');
            Toast.fail('暂无数据');
          }
        })
      }
    },
    input (v) {
      console.log(v)
    }
  },
  mounted () {
    // handleLogin().then((res) => {
      getAllOrder().then((res) => {
        this.tableData = res.data.data.content
        this.listData = res.data.data
      });
    // })
  }
}

</script>
<style lang="less" >
  .search-page{
    font-size: .75rem;
    .vertical-align:middle{
      font-size: 19px;
    }
    .van-field__control {
      padding: 6px 0 ;
    }
    .van-cell__left-icon {
      padding: 6px;
    }
    .van-field {
      margin-bottom: 0!important;
    }
  }
  .search-grids {
    // margin:.6rem .6rem 4rem; 
    font-size: 12px;
    margin: .425rem;
    // font-size: .75rem;
  }
  .search-load{
    text-align: center;
  }
  .search-button {
    text-align: center;
    margin-bottom: 3.5rem;
    a {
      text-decoration:none;
      color:rgb(122, 121, 121); 
    }
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
