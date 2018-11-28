<template>
  <div class="signUp">
    <div class="signUp-detail">
      <span class="signUp-detail__depart">{{department}}</span>
      <span class="signUp-detail__comfirm">服务部绑定确认</span>
      <m-button class="signUp-detail__but" size="small" @click.native="signUpExpert">确认绑定</m-button>
    </div>
  </div>
</template>
<script>
  import { Button } from '../components/buttons'
  export default {
    components: {
      'm-button': Button,
      name: 'signUp'
    },
    data() {
      return {
       department:'林和西服务部'
      }
    },
    methods: {
      signUpServer () {
        // this.$router.push({path: '/comment'})
        console.log('comfirm');
      }
    }
  }
</script>
<style lang="less">
  .signUp-detail {
    display: flex;
    height: 800px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .signUp-detail__depart {
    font-size: 18px;
    margin-top: -350px;
  }
  .signUp-detail__comfirm {
    margin: 10px 0 200px;
    font-size: 12px;
    color: #999999;
  }
</style>
