<template>
  <div class="van-field">
    <p>更换配送员</p>
    <div class="van-field__select">
      <el-select @change="handleChange" v-model="id"
                 placeholder="请选择">
        <el-option v-for="item in courierLists"
                   :key="item.value"
                   :value="item.id"
                   :label="item.name"
                   >
          <span>{{ item.name }} - {{ item.phone }}</span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { getCouriers } from '@/api/acceptOrder.js'

export default {
  data () {
    return {
      courierLists: [],
      id: '' ,
    }
  },
  mounted () {
    getCouriers(this.$route.query.sn).then((res) => {
      this.courierLists = res.data.data.serverList
    })
  },
  methods: {
    handleChange(id) {
      console.log(this.id);
      this.$emit('send-courier', this.id)
    }
  }
}
</script>

<style lang="less">
.van-field {
  margin-bottom: 1rem;
  
}
.van-field p {
  text-align: center;
}
.orderDetail-list__selectbox {
  border-radius: 5px;
  width: 6.25rem;
  height: 1.2rem;
  margin: 0.8rem 0;
}
.van-field__select {
  text-align: center;
  .el-select, {
    width: 260px;
  }
}
.el-select-dropdown {
  width: 260px!important;
  z-index: 2500!important;
}
</style>

