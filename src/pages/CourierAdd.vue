<template>
  <div class="addPager" style="background: #f6f6f6; min-height:100vh">
    <page-content>
      <div class="courier-addWrap">
        <i class="iconfont icon-tianjia_toolbar-copy"></i>
        <el-form style="width:90%" :label-position="labelPosition" label-width="80px" size="medium" :model="form">
          <el-form-item label="姓名">
            <el-input placeholder="请输入优鲜达人姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请输入优鲜达人手机号码" type="number" v-model="form.phone" oninput="if(value.length>11)value=value.slice(0,11)"></el-input>
          </el-form-item>
        </el-form>
        <btn @click.native="handleChange" style="margin-top:15px" class="btn" size="large">确认添加</btn>
      </div>
    </page-content>
  </div>
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
    // 'm-button': Button,
  },
  data() {
    return {
     labelPosition: 'top',
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
    margin-top: 1rem;
    .iconfont {
      font-size: 4rem;
      color: rgb(70, 187, 70);
      margin-bottom: 1rem;
    }
    .el-input--medium .el-input__inner {
      height: 35px;
      padding: 28px 15px;
      line-height: 15px;
      font-size: 16px;
      border: 1px solid #D1D1D1;
      border-radius: 6px
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
      color:#9D9B9D;
      
    }
    .button.button-large {
      font-size: 0.8rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
  .el-input__inner::-webkit-input-placeholder {
    color:#7A7877;
    font-size: 16px;
    line-height: 25px;
  }
  .el-input__inner::-moz-placeholder {
    color:#7A7877;
    font-size: 16px;
    line-height: 25px;
  }
  .el-input__inner:-ms-input-placeholder{
    color:#7A7877;
    font-size: 16px;
    line-height: 25px;
  }
  .courier-add__name {
    margin: 1rem;
  }
  .btn {
    width: 90%;
    font-size: 16px;
    font-weight: bold;
  }
  
</style>
