<template>
  <div class="signUp">
      

    <div class="signUp-detail">
      <i class="iconfont icon-success"></i>
      <span class="signUp-detail__depart">绑定服务部</span>
      <!-- <span class="signUp-detail__depart">{{department}}</span> -->
      <!-- <span class="signUp-detail__comfirmOne">立即绑定 {{department}} </span> -->
      <span class="signUp-detail__comfirmOne">立即绑定 {{department}}</span>
      <span class="signUp-detail__comfirmTwo">{{contact}} {{address}} {{contactWay1}}<span v-if="contactWay2 != ''">/</span>{{contactWay2}}</span>
      <!-- <m-button class="signUp-detail__but" size="small" @click.native="handleBind">确认绑定</m-button> -->
      <van-button @click.native="handleBind" type="primary" size="large">立即绑定</van-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  // import { Button } from '../components/buttons'
  import { handleLogin } from "@/api/login.js";
  import { getDetails, comfirmBind } from '../api/bind.js'
  import Toast from '../../node_modules/vant/lib/toast';
  import '../../node_modules/vant/lib/toast/style';
  import Button from '../../node_modules/vant/lib/button';
  import '../../node_modules/vant/lib/button/style';

  Vue.use(Toast)
  Vue.use(Button);
  export default {
    components: {
      // 'm-button': Button,
      name: 'signUp'
    },
    data() {
      return {
       department: '',
       departmentId: '',
       address: '',
       contact: '',
       contactWay1: '',
       contactWay2: ''
      }
    },
    methods: {
      handleBind() {
        comfirmBind(this.$route.query.departmentId).then(res => {
          if (res.data.code == 0) {
            Toast.success('绑定成功');
            this.$router.push({path:'/'})
          }else {
            Toast.fail(res.data.errmsg);
          }
        }).catch(() => {
          Toast.fail('请求失败');
        })
      }
    },
    mounted () {
      handleLogin().then(res => {
        this.departmentId = this.$route.query.departmentId
        getDetails(this.departmentId).then(res => {
          console.log(res);
          this.department = res.data.name
          this.address = res.data.address
          this.contact = res.data.contact
          this.contactWay1 = res.data.contactWay1
          this.contactWay2 = res.data.contactWay2
        })
      })
    }
  }
</script>
<style lang="less">
  .signUp-detail {
    display: flex;
    // height: 800px;
    margin: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 100px;
      color: green;
    }
  }
  .signUp-detail__depart {
    font-size: 18px;
    // margin-top: -350px;
  }
  .signUp-detail__comfirmOne {
    font-size: 14px;
    color: #999999;
  }
  .signUp-detail__comfirmTwo {
    margin: 0 0 100px;
    font-size: 14px;
    color: #999999;
  }
</style>
