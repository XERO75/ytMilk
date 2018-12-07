<template>
  <page-content>
    <div class="courier-addWrap">
      <i class="iconfont icon-edit"></i>
      <el-form style="width:14rem" :label-position="labelPosition" label-width="80px" size="medium" :model="form">
        <el-form-item label="姓名">
          <el-input placeholder="请输入优鲜达人姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input placeholder="请输入优鲜达人手机号码" type="number" v-model="form.phone" oninput="if(value.length>11)value=value.slice(0,11)"></el-input>
        </el-form-item>
      </el-form>
      <btn @click.native="handleChange" style="margin-top:40px" class="btn" size="large">确认修改</btn>
    </div>
  </page-content>
</template>

<script>
import Content from '../components/content'
import { getCourierDetail, changeInfo } from '../api/courier.js'
import Toast from '../../node_modules/vant/lib/toast';
import '../../node_modules/vant/lib/toast/style';
import Field from '../../node_modules/vant/lib/field';
import '../../node_modules/vant/lib/field/style';
import { Button } from '../components/buttons'

export default {
  components: {
    'page-content': Content,
    'btn': Button,
    // 'm-button': Button,
  },
  data() {
    return {
     labelPosition: 'top',
     name: this.$route.query.expressServerId,
    //  phone: '',
    //  id: '',
    form: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    handleChange() {
      let formdata = new FormData()
      formdata.append('id', this.$route.query.expressServerId)
      formdata.append('name', this.form.name)
      formdata.append('phone',this.form.phone)
      if (this.form.name == "") {
        Toast.fail({message:'请输入姓名',duration:1000});
      } else if(this.form.phone == "" || this.form.phone.length !== 11){
        Toast.fail({message:'手机格式不正确',duration:1000});
      } else {
        changeInfo(formdata).then(res => {
          Toast.success({
            duration: 1000,
            message:'修改成功'
          })
          this.$router.go(-1)
        })
      }
    }
  },
  mounted () {
    getCourierDetail(this.$route.query.expressServerId).then(res => {
      this.form.name = res.data.data.name
      this.form.phone = res.data.data.phone
    })
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
      font-size: 4rem;
      color: rgb(70, 187, 70);
      margin-bottom: 2rem;
    }
    .el-input--medium .el-input__inner {
      height: 45px;
      line-height: 45px;
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
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
  }
</style>
