<template>
  <page-content>
    <div class="del-order__header">
      <a href="" class="del-order__prev">前一天</a>
      <div class="del-order__date">
        <i class="del-order__dateIcon"></i>
        {{date}}
      </div>
      <a href="" class="del-order__next">后一天</a>
    </div>
    <div class="del-grids">
      <el-table
        :data="tableData"
        border
        :header-cell-style='styleObj'
        style="width: 100%">
        <el-table-column
          prop="product"
          label="产品"
          align="center">
          <template slot-scope="scope">
            <div class="del-productWrap">
              <img src="../assets/images/u505.png" class="del-product__img">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="del-grids">
      <v-table 
        :width="750" 
        :title-row-height='35' 
        :row-height='65' 
        title-bg-color='#F2F2F2' 
        is-vertical-resize 
        style="width:100%" 
        is-horizontal-resize 
        :vertical-resize-offset='5' 
        :columns="columns" 
        :table-data="tableData" 
        row-hover-color="#eee" 
        row-click-color="#edf7ff"
      ></v-table>
    </div> -->
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
        tableData: [{
          product: '2016-05-02',
          amount: '王小虎'
        }]
      }
    },
    methods: {

    },
    mounted() {
      this.date = this.getNowFormatDate()
      handleLogin().then(res => {
        getDay().then(res => {
          console.log(res);
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
  .del-order__header a{
    display: block;
    color: #eee;
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


