<template>
  <div class="my-page">
    <!-- <page-header>
    </page-header> -->
    <page-content>
      <div class="page-received__comment">
        林和西服务部
        <span>收到的评价 12345</span>
      </div>
    </page-content>
  </div>
</template>
<script>
import Grid from '../components/grid'
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'

export default {
  components: {
    'page-header': Header,
    HeaderLink,
    HeaderTitle,
    'page-content': Content,
    Grid
  }
}
</script>
<style lang="less">
.page-received__comment{
  font-size: 16px;
  height: 50px;
  width: auto;
  margin: 10px;
  padding-right: 10px;
  text-align: right;
  line-height: 50px;
  border-radius: 2%;
  border: 1px dashed transparent;
  background: linear-gradient(white,white) padding-box,repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.4em,white 0,white 0.75em);
}
.page-received__comment span{
  background:rgba(255, 209, 0, 1);
  padding: 5px;
}
</style>
