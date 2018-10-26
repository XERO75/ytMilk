<template>
  <page-content>
    <div class="courier">
      <div class="courier-list">配送员列表</div>
      <div class="courier-deliveryCount">配送员送奶统计</div>
    </div>
    <div class="courier-searchWrap">
      <input type="text" placeholder="abc">
      <div class="courier-add">
        <i class="courier-add-addIcon"></i>
        <span></span>
      </div>
    </div>
  </page-content>
</template>
<script>
  import Content from '../components/content'
  import searchbar from '../components/searchbar'
  export default {
    components: {
      'page-content': Content
    }
  }
</script>
<style lang="less" scoped>
  .courier{
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-top: 1.2rem;
    font-size: .75rem;
  }
  .courier-list{
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  .courier-deliveryCount{
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    // color: white;
    background: rgb(226, 226, 226);
  }
</style>
