<template>
  <page-content>
    <div class="del-order__header">
      <a @click="handlePrev" class="del-order__prev"><span v-show="this.dayList.length !== 1">前一天</span></a>
      <div class="del-order__date">
        <i class="del-order__dateIcon"></i>
        {{filterDate}}
      </div>
      <a @click="handleNext" class="del-order__next"><span v-show="this.dayList.length !==3" >后一天</span></a>
    </div>
    <div class="del-grids">
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
              <span>{{scope.row.name}}</span>
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
  </page-content>
</template>
<script>
  import Content from '../components/content'
  import { handleLogin } from "@/api/login.js";
  import { getDay } from '../api/deliveryOrder.js'
  export default {
    components: {
      'page-content': Content
    },
    data() {
      return {
        date: null,
        styleObj: {'background': '#F2F2F2'},
        filterDate: '',
        tableData: [],
        dayList: [],
        dateAdd: ''
      }
    },
    methods: {
      handleNext() {
        this.dateAdd = new Date(this.filterDate)
        this.dateAdd.setDate(this.dateAdd.getDate()+1)
        let date = this.dateLong2String(this.dateAdd)
        getDay(date).then(res => {
          let Res = res.data.data
          this.tableData = Res.content
          this.filterDate = Res.chooseDate
          this.dayList.push(this.tableData)
        })
      },
      handlePrev() {
        this.dateAdd = new Date(this.filterDate)
        this.dateAdd.setDate(this.dateAdd.getDate()-1)
        let date = this.dateLong2String(this.dateAdd)
        getDay(date).then(res => {
          let Res = res.data.data
          this.tableData = Res.content
          this.filterDate = Res.chooseDate
          this.dayList.pop()
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
    mounted() {
      this.date = this.getNowFormatDate()
      handleLogin().then(res => {
        getDay().then(res => {
          this.filterDate = res.data.data.chooseDate
          console.log(this.filterDate);
          this.tableData = res.data.data.content
          this.dayList.push(this.tableData)
          console.log(this.dayList);
        })
      })
    },
  }
</script>
<style lang="less" scoped>
  .del-order__header {
    height: 3rem;
    background: #54A93E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 .375rem;
    font-size: .75rem;
  }
  .del-order__date {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .del-order__header a{
    display: block;
    color: #eee;
    width: 20%;
    text-align: center;
    // width: 50px;
  }
  .del-order__dateIcon{
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/deliveryOrder/u406.png");
    background-repeat:no-repeat; 
    background-size: 100%;
    position: relative;
    top: .12rem;
  }
  .del-grids{
    margin:.6rem; 
    font-size: 12px;
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


