<template>
  <div class="signUp">
    <div class="signUp-detail">
      <icon icon="success-fill icons"></icon>
      <span class="signUp-detail__depart">绑定{{department}}</span>
      <span class="signUp-detail__comfirmOne">联系人：{{contact}}</span>
      <span class="signUp-detail__comfirmTwo">联系电话：{{contactWay1}}/{{contactWay2}}</span>
      <span class="signUp-detail__comfirmThree">联系地址：{{address}}</span>
      <van-button @click.native="handleBind" type="primary" size="large">立即绑定</van-button>
    </div>
    <div class="signUp-contact">客服电话：4008881956</div>
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
  import Icon from '../components/icons'

  Vue.use(Toast)
  Vue.use(Button);
  export default {
    components: {
      // 'm-button': Button,
      name: 'signUp',
      Icon
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
      // handleLogin().then(res => {
        this.departmentId = this.$route.query.departmentId
        getDetails(this.departmentId).then(res => {
          console.log(res);
          this.department = res.data.name
          this.address = res.data.address
          this.contact = res.data.contact
          this.contactWay1 = res.data.contactWay1
          this.contactWay2 = res.data.contactWay2
        })
      // })
    }
  }
</script>
<style lang="less">
  .signUp-detail {
    display: flex;
    height: 100%;
    margin: 20px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 100px;
      color: green;
    }
  }
  .signUp-detail__depart {
    font-size: 20px;
    // margin-top: -350px;
  }
  .signUp-detail__comfirmOne {
    font-size: 16px;
    color: #999999;
    margin-top: 2rem;
  }
  .signUp-detail__comfirmTwo {
    // margin: 0 0 100px;
    font-size: 16px;
    color: #999999;
  }
  .signUp-detail__comfirmThree {
    margin: 0 0 50px;
    font-size: 16px;
    color: #999999;
  }
  .icons {
    font-size: 6rem;
    color: #3cc51f;
  }
  .signUp-contact {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 16px;
    color:gray;
    margin-bottom: .8rem;
  }
</style>
