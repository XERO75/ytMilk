<template>
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
        <a target="_blank"
           class="home-data__action"
           href="#">
          <i class="home-data__reIcon"><img src="../assets/images/index/u110.png"
                 alt=""></i> 刷新
        </a>
        <a target="_blank"
           class="home-data__action"
           href="#">
          <i class="home-data__exIcon"><img src="../assets/images/index/u108.png"
                 alt=""></i> 导出
        </a>
      </div>
    </div>
    <div class="home-order">
      <div class="home-order__total active">所有订单</div>
      <div class="home-order__sending">配送中订单</div>
      <div class="home-order__unhandle">未处理订单</div>
    </div>
    <div class="home-table"
         style="margin:.6rem; font-size: 14px;">

      <v-table :title-row-height='35'
               :row-height='65'
               style="width:100%"
               is-horizontal-resize
               :columns="columns"
               :table-data="tableData"
               title-bg-color='#F2F2F2'></v-table>

      <v-pagination class="home-pagination"
                    :total="10"
                    :layout="['prev', 'pager', 'next', 'jumper']"></v-pagination>
    </div>

  </page-content>
</template>

<script>
import Vue from 'vue'
import Grid from '../components/grid'
import Content from '../components/content'
import { handleLogin } from "@/api/login.js";
import { getTable } from "../api/clientManagement.js";
export default {
  components: {
    'page-content': Content
  },
  data () {
    return {
      tableData: [
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", },
        { "address": "上海市黄浦区金陵东路", "status": "未处理", }
      ],
      // tableData:[],
      columns: [
        {
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
          field: 'custome-adv',
          title: '操作',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'table-operation',
          isResize: true
        }
      ],
      tableList: [],
    }
  },
  methods: {

  },
  mounted () {
    handleLogin().then((res) => {
      console.log(res);
      getTable().then((res) => {
        console.log(res);
      })
    })
  },
  created () {

  }
}
Vue.component('table-operation', {
  template:
    `<span>
          <router-link :to="{ path: 'acceptOrder' }">接受</router-link>&nbsp;
          <router-link :to="{ path: 'checkout' }">查看</router-link>&nbsp;
        </span>
        `,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update () {
      // 参数根据业务场景随意构造
      let params = { type: 'edit', index: this.index, rowData: this.rowData };
      this.$emit('on-custom-comp', params);
    },
    deleteRow () {
      // 参数根据业务场景随意构造
      let params = { type: 'delete', index: this.index };
      this.$emit('on-custom-comp', params);
    }
  }
})
// Vue.component('tb-operation', {
//   template: `<span>
//         <router-link :to="{ path: 'checkout' }">查看</router-link>&nbsp;
//         </span>`,
//   props: {
//     rowData: {
//       type: Object
//     },
//     field: {
//       type: String
//     },
//     index: {
//       type: Number
//     }
//   },
//   methods: {

//   }
// })
</script>

<style lang="less" scoped>
.home-received__comment {
  width: auto;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.75rem;
  margin: 0.625rem;
  padding-right: 0.625rem;
  text-align: right;
  border-radius: 0.5rem;
  border: 0.07rem dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.4em, white 0, white 0.75em);
}

.home-received__comment a {
  display: inline-block;
  background: url('../assets/images/index/u15.png') no-repeat;
  background-position: -0.1rem 0.6rem;
  padding-left: 1.4rem;
  background-size: 1.2rem 1.2rem;
  margin-left: 1.2rem;
}

.home-received__comment span {
  background: rgba(255, 209, 0, 1);
  padding: 0.3125rem;
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

.home-order__sending,
.home-order__unhandle {
  width: 5rem;
  height: 1.8rem;
  color: gray;
  background: #f2f2f2;
}

.home-order__total {
  width: 5rem;
  height: 1.8rem;
  background: #54a93e;
}

.home-pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 0.325rem;
}
</style>
