<template>
    <page-content>
      <div class="courier-addWrap">
        <div class="courier-add__name">
          <span>姓名</span>
          <input v-model="name" class="courier-input" type="text" maxlength="10" placeholder="请输入姓名">
        </div>
        <div class="courier-add__tel">
          <span>手机</span>
          <input v-model="phone" class="courier-input" type="number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入手机号码">
        </div>
        <btn @click.native="handleChange" style="margin-top:20px" class="btn" size="large">确认修改</btn>
      </div>
    </page-content>
</template>

<script>
import Vue from 'vue'
import Content from '../components/content'
import { Button } from '../components/buttons'
import { addCourier } from '../api/courier.js'
import Toast from '../../node_modules/vant/lib/toast';
import '../../node_modules/vant/lib/toast/style';

Vue.use(Toast)
export default {
  components: {
    'page-content': Content,
    'btn': Button,
    'm-button': Button,
  },
  data() {
    return {
     name: '',
     phone: '',
    }
  },
  methods: {
    handleChange() {
      let formdata = new FormData()
      formdata.append('name', this.name)
      formdata.append('phone',this.phone)
      addCourier(formdata).then(res => {
        // Toast.success('success')
        Toast.success({
          duration: 1000,
          message:'success'
        })
        this.$router.go(-1)
      })
    }
  },
  mounted () {
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
    width: 12rem;
    border: 1px solid black;
    border-radius: 25px;
    padding: .7rem 1rem;
  }
  .courier-add__name {
    margin: 1rem;
  }
  .btn {
    width: 14rem;
    // margin-top: 50px;
  }
</style>
