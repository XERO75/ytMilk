<template>
  <div class="search-page">
    <page-content>
      <searchbar @input="input"></searchbar>
      <div class="search-grids">
        <v-table 
          :width="750" 
          :row-height='55' 
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
      </div>
    <div class="search-load">
      <p>加载更多</p>
    </div>
    </page-content>
  </div>
</template>
<script>
import Content from '../components/content'
import Searchbar from '../components/searchbar'

export default {
  components: {
    'page-content': Content,
    Searchbar
  },
  data () {
    return {
      searchInput: '',
      tableData: [{
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
          // {
          //   field: 'action',
          //   title: '操作',
          //   width: 100,
          //   titleAlign: 'center',
          //   columnAlign: 'center',
          //   isResize: true
          // },
          {
            field: 'custome-adv',
            title: '操作',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'tb-operation',
            isResize: true
          }
        ]
    }
  },
  methods: {
    input (v) {
      console.log(v)
    }
  }
}

</script>
<style lang="less" scoped>
  .search-page{
    font-size: .75rem;
  }
  .search-grids {
    margin: .425rem;
    font-size: .75rem;
  }
  .search-load{
    text-align: center;
  }
</style>
