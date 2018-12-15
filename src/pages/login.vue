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
  import Vue from 'vue'
  import Toast from '../../node_modules/vant/lib/toast';
  import '../../node_modules/vant/lib/toast/style';
  import { Button } from '../components/buttons'
  import { departmentLogin, expressLogin } from "@/api/login.js"

  Vue.use(Toast)
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
        window.location.href="http://yantang.ittun.com/app/department/dist/index.html?WX_TYPE=OfficialAccount@/"; 
        // departmentLogin().then(res => {
        //   if (res.data.code === 0) {
        //     window.location.href="http://yantang.ittun.com/app/department/dist/index.html?WX_TYPE=OfficialAccount@/"; 
        //   } else Toast.fail({message:res.data.errmsg,duration:3000});
        // })
      },
      loginExpert () {
        window.location.href="http://yantang.ittun.com/app/express/dist/index.html?WX_TYPE=OfficialAccount@/"; 
        // expressLogin().then(res => {
        //   if (res.data.code === 0) {
        //     window.location.href="http://yantang.ittun.com/app/express/dist/index.html?WX_TYPE=OfficialAccount@/"; 
        //   } else Toast.fail({message:res.data.errmsg,duration:3000});
        // })
      }
    }
  }
</script>
<style lang="less">
  .login-detail__img {
    margin-top: 1rem;
  }
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
