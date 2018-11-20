<template>
  <div class="page">
    <!-- <page-header>
      <header-link :left="true" :edge="true" v-back-link><icon icon="back"></icon>Back</header-link>
    </page-header> -->
    <page-content >
      <div class="order-courierWrap">
        <span style="font-weight:bold; font-size:.8rem; ">配送员</span>
        <div class="order-courier">
          <div class="order-courier__detail">
            <div class="order-courier__avatar"></div>
            <div class="order-courier__desc">
              {{name}}<br>
              <span style="color:#54A93E">{{tel}}</span>
            </div>
          </div>
          <m-button size="small" @click.native="$refs.p.open()">更换配送员</m-button>
        </div>
      </div>
      <div class="order-clientWrap">
        <span style="font-weight:bold; margin-bottom:.4rem; font-size:.8rem">客户</span>
        <div class="order-client__name">
          <span class="boldFont">姓名</span>
          <span>{{name}}</span>
        </div>
        <div class="order-client__tel">
          <span class="boldFont">电话</span>
          <span style="color:#54A93E">{{tel}}</span>
        </div>
        <div class="order-client__address">
          <span class="boldFont">地址</span>
          <span>{{address}}</span>
        </div>
        <div class="order-client__status">
          <span class="boldFont">状态</span>
          <span>{{status}}</span>
        </div>
      </div>
      <div class="order-productWrap">
        <span style="font-weight:bold; font-size:.8rem">产品</span>
        <div class="order-product__detailWrap">
          <div class="order-product__detail">
            <img class="order-product__img" src="../assets/images/accept/u250.png" alt="">
            <span class="order-product__desc">{{productDescription}}</span>
          </div>
          <span>共{{total}}/剩{{left}}/日送{{daily}}</span>
        </div>
        <div class="order-product__startData">
          <span class="boldFont">起送日期</span>
          <span>{{startData}}</span>
        </div>
        <div class="order-product__deliveryCycle">
          <span class="boldFont">配送周期</span>
          <span>{{deliveryCycle}}</span>
        </div>
        <div class="order-product__deliveryTime">
          <span class="boldFont">配送时间</span>
          <span>{{deliveryTime}}</span>
        </div>
      </div>
    </page-content>
    <pop-window ref="p">
      <h2 class="pop-change">更换配送员</h2>
      <div class="content-padded">
        <p style="font-size:.8rem">请选择配送员接受该订单</p>
        <select class="selectbox" v-model="selected">
          <option v-for="item in couriers" :key="item.value" >{{item.text}}</option>
        </select>
        <m-button @click.native="$refs.p.close()">确定并更换</m-button>
      </div>
    </pop-window>
  </div>
</template>

<script>
import { Header, HeaderLink,SecondHeader} from '../components/header'
import { Footer } from '../components/footer'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button } from '../components/buttons'
import PopWindow from '../components/popwindow'


export default {
  components: {
    'page-header': Header, HeaderLink,
    'page-content': Content,
    Icon,
    'm-button': Button,
    PopWindow,
  },
  data() {
    return {
      name:"jack",
      tel:11244444444,
      address:"tianhe distict zhujiang new town",
      status:'normal',
      total:3,
      left:1,
      daily:1,
      startData: '2018/1/1',
      deliveryCycle:'周一到周日',
      deliveryTime:'上午',
      // productImg:"../assets/images/accept/u250.png",
      productDescription:"谷元黑米牛奶饮品236ml",
      selected: 1,
      couriers:[
        { text: 'lily-12580', value: 1 },
        { text: 'alice-10096', value: 2 },
        { text: 'jack-22234', value: 3 },
      ],
    }
  }
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
  .order-courier {
    display: flex;
    justify-content: space-between;
  }
  .order-clientWrap{
    display: flex;
    flex-direction: column;
    margin: .8rem .6rem;
    font-size: .75rem;
  }
  .order-client__name,
  .order-client__tel,
  .order-client__address,
  .order-client__status {
    display: flex;
    justify-content: space-between;
    padding: .4rem;
    border: 1px solid rgb(226, 226, 226); 
    border-bottom: none;   
  } 
  .order-client__status{
    border-bottom: 1px solid rgb(226, 226, 226); 
  }
  .order-productWrap {
    display: flex;
    flex-direction: column;
    margin: .8rem .6rem;
    font-size: .75rem;
  }
  .order-product__detail {
    display: flex;
    justify-content: space-between;
  }
  .order-product__img {
    width: auto;
    height: 3rem;
  }
  .order-product__desc {
    // display: inline-block;
    margin-left: 1rem;
    overflow: hidden;
    width: 7rem;
  }
  .order-product__detailWrap,
  .order-product__startData,
  .order-product__deliveryCycle,
  .order-product__deliveryTime {
    display: flex;
    justify-content: space-between;
    padding: .4rem;
    border: 1px solid rgb(226, 226, 226); 
    border-bottom: none;   
  }
  .order-product__detailWrap {
    height: 4rem;
    margin-top: .5rem;
  }
  
  .order-product__deliveryTime {
    border-bottom: 1px solid rgb(226, 226, 226); 
  }
  .pop-change {
    text-align: center;
    font-size: .8rem;
  }
  .selectbox {
    height: 2rem;
    margin-bottom: 1rem;
    font-size: .8rem;
    padding: 0 .5rem;
  }
</style>
