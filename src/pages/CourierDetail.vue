<template>
  <div class="page">
    <page-content >
      <div class="order-courierWrap">
        <span style="font-weight:bold; font-size:.8rem; ">配送员</span>
        <div class="order-courier">
          <div class="order-courier__detail">
            <img :src="courierData.image" class="order-courier__avatar">
            <div class="order-courier__desc">
              {{courierData.name}}<br>
              <span style="color:#54A93E">{{courierData.phone}}</span>
            </div>
          </div>
          <!-- <router-link :to="{path:'courierEdit'}"> -->
            <m-button @click.native="handleEdit" size="small">编辑</m-button>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="courier-infoWrapper">
        <div class="courier-info__num">
          <p>工号：</p>
          <span>{{courierData.code}}</span>
        </div>
        <div class="courier-info__status">
          <p>状态：</p>
          <span>{{courierData.bindStatus}}</span>
          <div v-if="courierData.bindStatus === '已绑定'" @click="handleUnbind" class="courier-info__bage">解绑</div>
        </div>
        <div class="courier-info__code">
          <!-- <img src="../assets/images/courier/u1118.png" alt=""> -->
          <qrcode :value="courierData.QRURL" :options="{ size: 130 }"></qrcode>
        </div>
        <div @click="handleDelete" class="courier-info__del">
          删除配送员
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import { Footer } from '../components/footer'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'
import { getCourierDetail, deleteCourier, unbindCourier } from '../api/courier.js'
import Vue from 'vue';
import VueQrcode from '@xkeshi/vue-qrcode';
import Toast from '../../node_modules/vant/lib/toast';
import '../../node_modules/vant/lib/toast/style';

Vue.use(Toast)
Vue.component(VueQrcode.name, VueQrcode);
export default {
  components: {
    'page-content': Content,
    Icon,
    'm-button': Button,
  },
  data() {
    return {
      courierData:{}
    }
  },
  methods: {
    handleDelete() {
      this.$dialog.confirm({
        title: '确定删除吗'
      }).then(() => {
        deleteCourier(this.$route.query.expressServerId).then(res => {}).then(res => {
          Toast.success({message:'删除成功',duration:1000});
          this.$router.go(-1)
        })
      }).catch(() => {
        console.log('u cancled');
      });
      
    },
    handleUnbind() {
      this.$dialog.confirm({
        title: '确定解绑吗'
      }).then(() => {
        unbindCourier(this.$route.query.expressServerId).then(res => {}).then(res => {
          Toast.success({message:'解绑成功', duration:1000});
          this.$router.go(0)
        })
      }).catch(() => {
        console.log('u cancled');
      });
    },
    handleEdit() {
      this.$router.push({path: '/courierEdit', query: {expressServerId: this.$route.query.expressServerId}})
    }
  },
  mounted() {
    getCourierDetail(this.$route.query.expressServerId).then(res => {
      console.log(res.data);
      this.courierData = res.data.data
    })
  },
}
</script>
<style lang="less">
  .boldFont {
    font-weight: bold;
  }
  .order-courierWrap {
    margin: .8rem .6rem;
  }
  .order-courier {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
  }
  .order-courier__detail {
    display: flex;
  }
  .order-courier__avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: rgb(199, 199, 199);
    border-radius: 50%;
  }
  .order-courier__desc {
    margin-left: .5rem;
  }
  .courier-infoWrapper {
    margin: 0 .8rem;
    display: flex;
    flex-direction: column;
    font-size: .7rem;
  }
  .courier-info__num,
  .courier-info__status {
    display: flex;
    align-items: center;
    height: 1rem;
    margin-bottom: .3rem;
  }
  .courier-info__bage {
    padding: .1rem .4em;
    background: #ED6F2D;
    color: white;
    border-radius: 5px;
    font-size: .5rem;
    margin-left: .2rem;
  }
  .courier-info__code {
    width: 7.5rem;
    // position: relative;
    margin: 50px auto;
    border: 1px solid gray;
    border-radius: 5px;
    padding: .5rem;
  }
  .courier-info__del{
    margin-top: 2.5rem;
    text-align: center;
    color: #ED6F2D;
  }
</style>
