<template>
  <!-- <page-header>
        </page-header> -->
  <page-content>
    <router-link :to="{ path: 'comment' }">
      <div class="home-received__comment">
        <a href="#">林和西服务部</a>
        <span>收到的评价 12345</span>
      </div>
    </router-link>
    <div class="home-data">
      <div class="home-data__total">
        当前共<span>234</span>条数据
      </div>
      <div class="home-data__wrapper">
        <router-link :to="{ path: 'acceptOrder' }">
          <a target="_blank" class="home-data__action" href="#">
            <i class="home-data__reIcon icon icon-success"></i>刷新
          </a>
        </router-link>
        <router-link :to="{ path: 'checkout' }">
          <a target="_blank" class="home-data__action" href="#">
            <i class="home-data__exIcon icon icon-error"></i>导出
          </a>
        </router-link>
      </div>
    </div>
    <div class="home-order">
      <div class="home-order__total active">所有订单</div>
      <div class="home-order__sending">配送中订单</div>
      <div class="home-order__unhandle">未处理订单</div>
    </div>
    <div class="home-table" style="margin:.625rem; font-size: .7rem">
      <v-table :width="750"  title-row-height='35' row-height='65' title-bg-color='#F2F2F2' is-vertical-resize style="width:100%" is-horizontal-resize :vertical-resize-offset='5' :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
      <v-pagination class="home-pagination" :total="10" :layout="['prev', 'pager', 'next', 'jumper']"></v-pagination>
    </div>
  </page-content>
</template>

<script>
  import Grid from '../components/grid'
  import {
    Header,
    HeaderLink,
    HeaderTitle
  } from '../components/header'
  import Content from '../components/content'
  
  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid
    },
    data() {
      return {
        tableData: [{
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "拒绝  接受",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "拒绝  接受",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          },
          {
            "address": "上海市黄浦区金陵东路",
            "status": "未处理",
            "action": "查看",
          }
        ],
        columns: [{
            field: 'address',
            title: '用户地址',
            width: 160,
            titleAlign: 'center',
            columnAlign: 'left',
            isResize: true
          },
          {
            field: 'status',
            title: '状态',
            width: 80,
            titleAlign: 'center',
            columnAlign: 'center',
            isResize: true
          },
          {
            field: 'action',
            title: '操作',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center',
            isResize: true
          },
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-received__comment {
    width: auto;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: .75rem;
    margin: .625rem;
    padding-right: .625rem;
    text-align: right;
    border-radius: .5rem;
    border: .07rem dashed transparent;
    background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.4em, white 0, white 0.75em);
  }
  
  .home-received__comment a {
    display: inline-block;
    background: url("../assets/images/index/u15.png") no-repeat;
    background-position: -.1rem .6rem;
    padding-left: 1.4rem;
    background-size: 1.2rem 1.2rem;
    margin-left: 1.2rem;
  }
  
  .home-received__comment span {
    background: rgba(255, 209, 0, 1);
    padding: .3125rem;
  }
  
  .home-data {
    display: flex;
    justify-content: space-between;
    margin: .625rem;
    font-size: .75rem;
  }
  
  .home-data__total {
    font-size: .75rem;
    font-weight: bold;
    margin-top: .25rem;
    // float: left;
  }
  
  .home-data__total span {
    color: #0FC80B;
    margin: .25rem;
  }
  
  .home-data__wrapper {
    display: flex;
  }
  
  .home-data__action {
    width: 3.5rem;
    height: 1.2rem;
    font-size: 1rem;
    padding: 0 .35rem;
    display: inline-block;
    line-height: 1.2rem;
    background: rgb(240, 240, 240);
    font-size: .75rem;
    color: rgb(53, 53, 53);
    border-radius: 4px;
    margin-left: .625rem;
  }
  
  .home-data__reIcon {
    font-size: .65rem;
    color: #fff;
    padding-right: .3rem;
    padding-left: .125rem;
    position: relative;
  }
  
  .home-data__exIcon {
    font-size: .65rem;
    color: #fff;
    padding-right: .3rem;
    padding-left: .125rem;
    position: relative;
  }
  
  .home-order {
    display: flex;
    justify-content: space-between;
    font-size: .75rem;
    text-align: center;
    line-height: 1.8rem;
    color: #fff;
    // font-weight: bold;
    padding: .625rem;
  }
  
  .home-order__sending,
  .home-order__unhandle {
    width: 5rem;
    height: 1.8rem;
    color: gray;
    background: #F2F2F2;
  }
  
  .home-order__total {
    width: 5rem;
    height: 1.8rem;
    background: #54A93E;
  }
  
  .home-pagination {
    display: flex;
    justify-content: space-between;
    margin-top: .325rem;
  }
</style>
