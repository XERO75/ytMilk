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
         style="margin:.6rem; font-size: 12px;">
      <v-table is-vertical-resize
               is-horizontal-resize
               style="width:100%"
               :title-rows="tableConfig.titleRows"
               :columns="tableConfig.columns"
               :table-data="tableConfig.tableData"
               :paging-index="(pageIndex-1)*pageSize"></v-table>

      <v-pagination @page-change="pageChange"
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
      status: 'UnDeal',
      pageIndex: 1,
      pageSize: 10,
      tableConfig: {
        multipleSort: false,
        // tableData: [],
        tableData: [
          { "address": "上海市黄浦区金陵东路", },
          { "address": "上海市黄浦区金陵东路", }
        ],
        columns: [
          { field: 'address', width: 140, columnAlign: 'left', isResize: true, isFrozen: true },
          { field: 'status', width: 80, columnAlign: 'center', componentName: 'status', isResize: true, isFrozen: true },
          { field: 'operation', width: 80, columnAlign: 'center', componentName: 'operation', isResize: true, isFrozen: true }
        ],
        titleRows: [
          [{ fields: ['address'], title: '用户地址', titleAlign: 'center' },
          { fields: ['status'], title: '状态', titleAlign: 'center' },
          { fields: ['operation'], title: '操作', titleAlign: 'center' }]
        ],
      }
    }
  },
  methods: {
    getTableData () {
      // this.tableConfig.tableData = tableDate.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
    },
    pageChange (pageIndex) {
      this.pageIndex = pageIndex;
      this.getTableData();
      console.log(pageIndex)
    }
  },
  created () {
    this.getTableData();
  },
  mounted () {
    handleLogin().then((res) => {
      console.log(res.data);
      getTable().then((res) => {
        console.log(res.data);
      })
    })
  },
  created () {

  }
}
Vue.component('status', {
  template: `<span>
        <a style="color:red" href="" @click.stop.prevent="accept">未处理</a>
        <a style="color:green" href="" @click.stop.prevent="accept">已派单</a>
        </span>`,
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
    accept () {
      console.log(111);
      this.$router.push({ path: '/checkout' })
    },
    deleteRow () {
      let params = { type: 'delete', index: this.index };
      this.$emit('on-custom-comp', params);
    }
  }
})
Vue.component('operation', {
  template: `<span>
        <a href=""  style="color:red" @click.stop.prevent="deleteRow(rowData,index)">拒绝</a>
        <a href="" style="color:green" @click.stop.prevent="accept">接受</a>
        <a href=""  style="color:green" @click.stop.prevent="accept">查看</a>
        </span>`,
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
    accept () {
      console.log();
      this.$router.push({ path: '/checkout' })
    },
    deleteRow () {
      let params = { type: 'delete', index: this.index };
      this.$emit('on-custom-comp', params);
    }
  }
})

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
