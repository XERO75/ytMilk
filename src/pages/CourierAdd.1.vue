<template>
    <page-content>
      <div class="courier-addWrap">
        <i class="iconfont icon-userplus"></i>
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input type="number" v-model="form.phone" oninput="if(value.length>11)value=value.slice(0,11)"></el-input>
          </el-form-item>
        </el-form>
        <btn @click.native="handleChange" style="margin-top:40px" class="btn" size="medium">确认添加</btn>
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
import Field from '../../node_modules/vant/lib/field';
import '../../node_modules/vant/lib/field/style';

Vue.use(Toast)
Vue.use(Field)
export default {
  components: {
    'page-content': Content,
    'btn': Button,
    'm-button': Button,
  },
  data() {
    return {
     labelPosition: 'left',
      form: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    handleChange() {
      let formdata = new FormData()
      formdata.append('name', this.form.name)
      formdata.append('phone',this.form.phone)
      if (this.form.name == "") {
        Toast.fail({message:'请输入姓名',duration:1000});
      } else if(this.form.phone == "" || this.form.phone.length !== 11){
        Toast.fail({message:'手机格式不正确',duration:1000});
      } else {
        addCourier(formdata).then(res => {
          Toast.success({
            duration: 1000,
            message:'添加成功'
          })
          this.$router.go(-1)
        })
      }
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
    margin-top: 2rem;
    .iconfont {
      font-size: 6rem;
      color: #24AD24;
    }
  }
  .courier-input {
    height: 2.5rem;
    width: 12rem;
    margin-left:.5rem;
    border: 1px solid gray;
    border-radius: 10px;
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
