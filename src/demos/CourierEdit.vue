<template>
  <div class="page">
    <page-header>
      <header-link :left="true" :edge="true" v-back-link><icon icon="back"></icon>Back</header-link>
    </page-header>
    <page-content >
      <div class="courier-addWrap">
        <div class="courier-add__name">
          <span>姓名</span>
          <input class="courier-input" type="text" placeholder="jack">
        </div>
        <div class="courier-add__tel">
          <span>手机</span>
          <input class="courier-input" type="number" placeholder="123213213">
        </div>
      <btn style="margin-top:20px" class="btn" size="large">确认修改</btn>
      </div>
    </page-content>
  </div>
</template>

<script>
import { Header, HeaderLink,SecondHeader} from '../components/header'
import { Footer } from '../components/footer'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'

export default {
  components: {
    'page-header': Header, HeaderLink,
    'page-content': Content,
    'btn': Button,
    Icon,
    'm-button': Button,
    'page-footer': Footer,
  },
  data() {
    return {
     
    }
  }
}
</script>
<style lang="less">
  .courier-addWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .courier-input {
    height: 2.5rem;
    width: 10rem;
    border: 1px solid black;
    border-radius: 25px;
    padding: .7rem .5rem;
  }
  .courier-add__name {
    margin: 1rem;
  }
  .btn {
    width: 12rem;
    // margin-top: 50px;
  }
</style>
