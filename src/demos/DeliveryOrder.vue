<template>
  <page-content>
    <div class="del-order__header">
      <a href="" class="del-order__prev">前一天</a>
      <div class="del-order__date">
        <i class="del-order__dateIcon"></i>
        2018-02-03
      </div>
      <a href="" class="del-order__next">后一天</a>
    </div>
    <div class="del-grids">
      <v-table 
        :width="750" 
        title-row-height='35' 
        row-height='65' 
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
  </page-content>
</template>
<script>
  import Content from '../components/content'
  export default {
    components: {
      'page-content': Content
    },
    data() {
      return {
        tableData: [
          {
            "product": "瓶装黑米牛奶110ml",
            "number": "1",
          },
          {
            "product": "瓶装黑米牛奶110ml",
            "number": "1",
          }
        ],
        columns: [{
            field: 'product',
            title: '产品',
            width: 180,
            titleAlign: 'center',
            columnAlign: 'left',
            isResize: true
          },
          {
            field: 'number',
            title: '数量',
            width: 60,
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
    margin: .95rem .4rem;
    font-size: .75rem;
  }
</style>


