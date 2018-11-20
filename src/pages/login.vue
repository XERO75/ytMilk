<template>
  <div class="login">
    <div class="login-detail">
      <img class="login-detail__img" src="../assets/images/login/ytlogo.jpeg" alt="">
      <!-- <div class="login-detail__img"></div> -->
      <span class="login-detail__desc">已绑定服务部或者配送达人微信直接登录</span>
      <!-- <router-link :to="{ path: 'comment' }"> -->
      <m-button class="login-detail__but" size="medium" @click.native="loginServer">服务部登陆</m-button>
      <!-- </router-link> -->
      <m-button class="login-detail__but" size="medium" @click.native="loginExpert">配送达人登陆</m-button>
    </div>
  </div>
</template>
<script>
  import { Button } from '../components/buttons'
  export default {
    components: {
      'm-button': Button,
      name: 'login'
    },
    data() {
      return {
       
      }
    },
    methods: {
      loginServer () {
        this.$router.push({path: '/comment'})
      },
      loginExpert () {
        // this.$store.state.isLogin = true
        // console.log(this.$store.state.isLogin);
        // this.$router.go(0)
      }
    }
  }
</script>
<style lang="less">
  .login-detail {
    margin: .2rem 2rem;
    display: flex;
    flex-direction: column;
  }
  .login-detail__desc {
    text-align: center;
    margin-top: 10rem;
    font-size: 14px;
    color: gray;
  }
  .login-detail {
    .login-detail__but {
      height: 2.5rem;
      line-height: 2.5rem;
      margin: .6rem 0;
    }
  }
</style>
