<template>
<div class="page">
  <div class="page">
    <page-content>
      <div class="courier-header">
        <div :class="{'courier-header__active': type == 1}"
             @click="getList()"
             class="courier-header__list">配送员列表</div>
        <div :class="{'courier-header__active': type == 2}"
             @click="getCount()"
             class="courier-header__deliveryCount">配送员送奶统计</div>
      </div>
      <div v-if="type === 1"
           class="courier-ListWrap">
        <div class="courier-subHeader">
          <div class="courier-subHeader__inputWrap">
            <form class="courier-search__form"
                  action="javascript:;"
                  onsubmit="return false;">
              <input class="courier-search__input"
                     type="text"
                     v-model="searchKey"
                     @input="search"
                     placeholder="关键字或号码">
            </form>
            <i class="courier-subHeader__searchIcon"></i>
          </div>
          <router-link :to="{path:'courierAdd'}">
            <div class="courier-subHeader__add">
              <i class="iconfont icon-add"></i>
              <a href="javascript:;">新增配送员</a>
            </div>
          </router-link>
        </div>
        <div class="courier-infoWrap">
          <div v-if="item.id !== ''" @click="handleGetDetail(item.id)" v-for="item in couriers" :key="item.index" class="courier-info">
            <p>{{item.name}} — {{item.phone}}</p>
            <i class="iconfont icon-more"></i>
          </div>
        </div>
      </div>
      <div v-if="type === 2" class="courier-countWrap">
        <div class="courier-count__header">
          <select @change="handleSelect(id)" class="courier-count__selectbox" v-model="id">
            <option v-for="item in milkCourier" :key="item.name" :value="item.id">{{item.name}}</option>
          </select>
          <div @click="timePickerOne = true;" class="item-input">
            {{filterBegin}}
          </div>
            <van-popup
              v-model="timePickerOne"
              position="bottom">
            <van-datetime-picker
              v-model="beginDate"
              type="date"
              @cancel="onCancel"
              @confirm="confirmOne"/>
            </van-popup>
          <span style="color:gray">—</span>
          <div @click="timePickerTwo = true;" class="item-input">
            {{filterEnd}}
          </div>
            <van-popup
              v-model="timePickerTwo"
              position="bottom"
            >
            <van-datetime-picker
              v-model="endDate"
              type="date"
              @cancel="onCancel"
              @confirm="confirmTwo"
            />
            </van-popup>
        </div>
        <div class="courier-count__grids">
          <el-table
            :data="tableData"
            border
            :header-cell-style='styleObj'
            style="width: 100%">
            <el-table-column
              label="产品"
              align="center">
              <template slot-scope="scope">
                <div class="del-productWrap">
                  <img :src="scope.row.image" class="del-product__img">
                  <span>{{scope.row.name}}{{scope.row.specifications}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span>{{scope.row.number}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </page-content>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Content from '../components/content'
import searchbar from '../components/searchbar'
import Calendar from '../components/calendar'

import { getAllCouriers, getCourierDetail, getMilkCount } from '../api/courier.js'
import _ from 'lodash'; //引入lodash
import axios from 'axios' //引入axios
import Popup from '../../node_modules/vant/lib/popup';
import '../../node_modules/vant/lib/popup/style';
import DatetimePicker from '../../node_modules/vant/lib/datetime-picker';
import '../../node_modules/vant/lib/datetime-picker/style';

Vue.use(Popup);
Vue.use(DatetimePicker);
//请求canceltoken列表
let sources = [];
export default {
  components: {
    'page-content': Content,
    Calendar,
  },
  data () {
    return {
      id:'',
      type: 1,
      searchKey: '',
      couriers: [],
      milkCourier: [],
      // searchCouriers: [],
      timePickerOne: false,
      timePickerTwo: false,
      beginDate: '',
      endDate: '',
      tableData: [],
      styleObj: {'background': '#F2F2F2'}
    }
  },
  computed: {
    filterBegin: function() {
      return this.dateLong2String(this.beginDate.toString())
    },
    filterEnd: function() {
      return this.dateLong2String(this.endDate.toString())
    }
  },
  methods: {
    getList () {
      this.type = 1
      getAllCouriers().then(res => {
        this.couriers = res.data.data.serverList
        this.couriers.unshift({name:'全部配送员',id:''})
      })
    },
    getCount () {
      this.type = 2
      getAllCouriers().then(res => {
        this.milkCourier = res.data.data.serverList
        this.milkCourier.unshift({name:'全部配送员',id:''})
      })
      getMilkCount().then(res => {
        console.log(res);
        this.tableData = res.data.data.content
      })
    },
    search: _.debounce(
      function () {
        let that = this;
        let api = ''
        let api1 = '/app/service_department/servers.htm'
        let api2 = 'api/app/service_department/servers.htm'
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
          if (res.data.code == 1) {
            that.couriers = null
          } else 
          that.couriers = res.data.data.serverList
        }).catch((thrown) => { 
          sc.source = null; //置空请求canceltoken
        })
      },
      500 //空闲时间间隔设置500ms
    ),
    handleGetDetail(id) {
      this.$router.push({path:'/CourierDetail',query:{expressServerId:id}})
    },
    handleSelect(id) {
      this.id = id
      let beginDate = this.dateLong2String(this.beginDate)
      let endDate = this.dateLong2String(this.endDate)
      getMilkCount(this.id, beginDate, endDate).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
        } else {
          this.tableData = null
        }
      })
    },
    onCancel() {
      this.timePickerOne = false
      this.timePickerTwo = false
    },
    confirmOne(picker, value, index) {
      this.beginDate = picker
      let beginDate = this.dateLong2String(this.beginDate)
      let endDate = this.dateLong2String(this.endDate)
      this.timePickerOne = false
      getMilkCount(this.id, beginDate, endDate).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
        } else {
          this.tableData = null
        }
      })
    },
    confirmTwo(picker, value, index) {
      this.endDate = picker
      let beginDate = this.dateLong2String(this.beginDate)
      let endDate = this.dateLong2String(this.endDate)
      this.timePickerTwo= false
      getMilkCount(this.id, beginDate, endDate).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.content
        } else {
          this.tableData = null
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
    }
  },
  created() {
    this.beginDate = new Date()
    this.endDate = new Date()
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.courier-header {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-top: 1.2rem;
  font-size: 0.75rem;
}

.courier-header__deliveryCount,
.courier-header__list {
  width: 8rem;
  height: 1.8rem;
  line-height: 1.8rem;
  background: rgb(226, 226, 226);
}
.courier-header__active {
  color: white;
  font-weight: bold;
  background: #54a93e;
}

.courier-subHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0.6rem;
}

.courier-subHeader__inputWrap {
  display: flex;
  width: 9rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.courier-search__form {
  padding: 0.25rem;
}

.courier-search__input {
  width: 6rem;
  outline: none;
  font-size: 0.7rem;
  color: gray;
}

.courier-subHeader__searchIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/searchIcon.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}

.courier-subHeader__add {
  a {
    color: rgb(101, 101, 101);
  }
  color: rgb(101, 101, 101);
  font-size: 0.75rem;
  padding-right: 0.625rem;
  display: flex;
  align-items: center;
}

.courier-subHeader__addIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/orderDetail/u678.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}

.courier-infoWrap {
  color: gray;
  font-size: 14px;
  margin-bottom: 4rem;
}

.courier-infoWrap :nth-child(1) {
  // border-bottom: none;
  // border-bottom: 1px solid gray;
}

.courier-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.65rem;
  height: 2.3rem;
  border: 1px solid #e0e0e0;
  padding: 0 0.375rem;
}
.courier-infoWrap :not(:first-child){
  border-top: none;
}

.courier-info__upIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/orderDetail/u678.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}
.courier-count__header {
  display: flex;
  margin: 0.9rem 0.8rem;
  justify-content: space-between;
  align-items: center;
}
.courier-count__selectbox {
  width: 5rem;
  padding: 0.35rem;
  border-radius: 5px;
  font-size: 14px;
}
.item-input {
  width: 5rem;
  border: 1px solid #e0e0e0;
  padding: 0.35rem;
  border-radius: 5px;
  text-align: center;
  font-size:14px; 
  color:gray
}
.courier-count__grids {
  margin: 0 0.4rem;
  font-size: 0.7rem;
}
.del-productWrap {
    display: flex;
}
.del-product__img {
    width: auto;
    height: 2rem;
    margin-right: .2rem;
  }
</style>
