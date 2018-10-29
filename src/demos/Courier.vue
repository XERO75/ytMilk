<template>
  <page-content>
    <div class="courier-header">
      <div class="courier-header__list">配送员列表</div>
      <div class="courier-header__deliveryCount">配送员送奶统计</div>
    </div>
    <div class="courier-subHeader">
      <div class="courier-subHeader__inputWrap">
        <form class="courier-search__form" action="javascript:;" onsubmit="return false;">
          <input class="courier-search__input" type="text" ref="searchInput" autofocus @focus="isFocus = true" @blur="isFocus = false" placeholder="搜索关键字和号码">
        </form>
        <i class="courier-subHeader__searchIcon"></i>
      </div>
      <div class="courier-subHeader__add">
        <i class="courier-subHeader__addIcon"></i>
        <a href="javascript:;">新增配送员</a>
      </div>
    </div>
    <div class="courier-infoWrap">
      <div class="courier-info">
        <p>{{courier.name}} - {{courier.tel}}</p>
        <i class="courier-info__upIcon"></i>
      </div>
      <div class="courier-info">
        <p>{{courier.name}} - {{courier.tel}}</p>
        <i class="courier-info__upIcon"></i>
      </div>
      <div class="courier-info">
        <p>{{courier.name}} - {{courier.tel}}</p>
        <i class="courier-info__upIcon"></i>
      </div>
      <div class="courier-info">
        <p>{{courier.name}} - {{courier.tel}}</p>
        <i class="courier-info__upIcon"></i>
      </div>
      <div class="courier-info">
        <p>{{courier.name}} - {{courier.tel}}</p>
        <i class="courier-info__upIcon"></i>
      </div>
    </div>
  </page-content>
</template>

<script>
  import Content from '../components/content'
  import searchbar from '../components/searchbar'
  export default {
    components: {
      'page-content': Content
    },
    data() {
      return {
        couriers: [],
        courier: {
          name: "荷里活",
          tel: 13222222222
        }
      }
    },
    methods: {
      mounted() {
        this.courier = courier
      },
    }
  }
</script>

<style lang="less" scoped>
  .courier-header {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-top: 1.2rem;
    font-size: .75rem;
  }
  
  .courier-header__list {
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    color: white;
    font-weight: bold;
    background: #54A93E;
  }
  
  .courier-header__deliveryCount {
    width: 8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: rgb(226, 226, 226);
  }
  
  .courier-subHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem .6rem;
  }
  
  .courier-subHeader__inputWrap {
    display: flex;
    width: 9rem;
    justify-content: space-between;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;
  }
  
  .courier-search__form {
    padding: .25rem;
  }
  
  .courier-search__input {
    width: 6rem;
    outline: none;
    font-size: .7rem;
    color: gray;
  }
  
  .courier-subHeader__searchIcon {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/searchIcon.png");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    margin-right: .25rem;
  }
  
  .courier-subHeader__add {
    font-size: .75rem;
    padding-right: .625rem;
  }
  
  .courier-subHeader__add a {
    color: rgb(101, 101, 101);
  }
  
  .courier-subHeader__addIcon {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/orderDetail/u678.png");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    margin-right: .25rem;
  }
  .courier-infoWrap {
    color: gray;
  }
  .courier-infoWrap :nth-last-child(1){
    border-bottom: 1px solid gray;
  }
  
  .courier-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .65rem;
    height: 2.3rem;
    border: 1px solid gray;
    border-bottom: none;
    padding: 0 .375rem;
  }
  
  .courier-info__upIcon {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background-image: url("../assets/images/orderDetail/u678.png");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    margin-right: .25rem;
  }
</style>
