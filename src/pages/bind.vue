<template>
  <div class="signUp">
    <div class="signUp-detail">
      <span class="signUp-detail__depart">{{department}}</span>
      <span class="signUp-detail__comfirm">服务部绑定确认</span>
      <m-button class="signUp-detail__but" size="small" @click.native="handleBind">确认绑定</m-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Button } from '../components/buttons'
  import { handleLogin } from "@/api/login.js";
  import { getDetails, comfirmBind } from '../api/bind.js'
  import Toast from '../../node_modules/vant/lib/toast';
  import '../../node_modules/vant/lib/toast/style';

  Vue.use(Toast)
  export default {
    components: {
      'm-button': Button,
      name: 'signUp'
    },
    data() {
      return {
       department: '',
       departmentId: ''
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
        })
      })
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
