<template>
    <page-content>
      <div class="courier-addWrap">
        <div class="courier-add__name">
          <span>姓名</span>
          <input v-model="name" class="courier-input" type="text" maxlength="10" placeholder="">
        </div>
        <div class="courier-add__tel">
          <span>手机</span>
          <input v-model="phone" class="courier-input" type="number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="">
        </div>
        <btn @click.native="handleChange" style="margin-top:20px" class="btn" size="large">确认修改</btn>
      </div>
    </page-content>
</template>

<script>
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'
import { getCourierDetail, changeInfo } from '../api/courier.js'

export default {
  components: {
    'page-content': Content,
    'btn': Button,
    Icon,
    'm-button': Button,
  },
  data() {
    return {
     name: this.$route.query.expressServerId,
     phone: '',
     id: ''
    }
  },
  methods: {
    handleChange() {
      let formdata = new FormData()
      formdata.append('id', this.$route.query.expressServerId)
      formdata.append('name', this.name)
      formdata.append('phone',this.phone)
      changeInfo(formdata).then(res => {
        console.log('success');
        this.$router.go(-1)
      })
    }
  },
  mounted () {
    getCourierDetail(this.$route.query.expressServerId).then(res => {
      this.name = res.data.data.name
      this.phone = res.data.data.phone
    })
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
