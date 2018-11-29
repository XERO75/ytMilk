<template>
  <div class="page">
    <page-content>
      <div class="courier-header">
        <div :class="{'courier-header__active': type == 1}"
             @click="getList()"
             class="courier-header__list">配送员列表</div>
        <div :class="{'courier-header__active': type == 2}"
             @click="getCount()"
             class="courier-header__deliveryCount">配送员送奶统计</div>
      </div>
      <div v-if="type === 1"
           class="courier-ListWrap">
        <div class="courier-subHeader">
          <div class="courier-subHeader__inputWrap">
            <form class="courier-search__form"
                  action="javascript:;"
                  onsubmit="return false;">
              <input class="courier-search__input"
                     type="text"
                     ref="searchInput"
                     autofocus
                     @focus="isFocus = true"
                     @blur="isFocus = false"
                     placeholder="搜索关键字和号码">
            </form>
            <i class="courier-subHeader__searchIcon"></i>
          </div>
          <router-link :to="{path:'courierAdd'}">
            <div class="courier-subHeader__add">
              <i class="iconfont icon-add"></i>
              <a href="javascript:;">新增配送员</a>
            </div>
          </router-link>
        </div>
        <div class="courier-infoWrap">
          <router-link class="courier-info"
                       :to="{path:'courierDetail'}">
            <p>{{courier.name}} - {{courier.tel}}</p>
            <i class="iconfont icon-more"></i>
          </router-link>
          <div class="courier-info">
            <p>{{courier.name}} - {{courier.tel}}</p>
            <i class="iconfont icon-more"></i>
          </div>
        </div>
      </div>
      <div v-if="type === 2"
           class="courier-countWrap">
        <div class="courier-count__header">
          <select class="courier-count__selectbox"
                  v-model="selected">
            <option v-for="item in couriers"
                    :key="item.value">{{item.text}}</option>
          </select>
          <form-item>
            <div class="item-input">
              <input type="text"
                     v-model="date2"
                     @click="$refs.c2.open()"
                     readonly>
            </div>
          </form-item>
          <span>—</span>
          <form-item>
            <div class="item-input">
              <input type="text"
                     v-model="date2"
                     @click="$refs.c2.open()"
                     readonly>
            </div>
          </form-item>
        </div>
        <div class="courier-count__grids">
          <v-table :width="750"
                   :row-height='55'
                   title-bg-color='#F2F2F2'
                   is-vertical-resize
                   style="width:100%"
                   is-horizontal-resize
                   :vertical-resize-offset='5'
                   :columns="columns"
                   :table-data="tableData"
                   row-hover-color="#eee"
                   row-click-color="#edf7ff"></v-table>
        </div>
      </div>

    </page-content>
    <popup :show-title-bar="false"
           ref="c2">
      <calendar :date="date2"
                @change="(d) => {(date2 = d) && $refs.c2.close()}"></calendar>
    </popup>
  </div>

</template>

<script>
import Content from '../components/content'
import searchbar from '../components/searchbar'
import Popup from '../components/popup'
import Calendar from '../components/calendar'
import {
  Form,
  FormItem
} from '../components/form'

export default {
  components: {
    'page-content': Content,
    Calendar,
    'form-list': Form,
    FormItem,
    Popup
  },
  data () {
    return {
      selected: 1,
      couriers: [{
        text: 'lily-12580',
        value: 1
      },
      {
        text: 'alice-10096',
        value: 2
      },
      {
        text: 'jack-22234',
        value: 3
      },
      ],
      type: 1,
      // couriers: [],
      courier: {
        name: "荷里活",
        tel: 13222222222
      },
      date2: '2012-12-12',
      tableData: [{
        "product": "谷元黑米牛奶饮品236ml",
        "number": "1",
      },
      {
        "address": "谷元黑米牛奶饮品236ml",
        "number": "2",
      }
      ],
      columns: [{
        field: 'product',
        title: '产品',
        width: 160,
        titleAlign: 'center',
        columnAlign: 'left',
        isResize: true
      },
      {
        field: 'number',
        title: '数量',
        width: 80,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true
      }
      ]
    }
  },
  methods: {
    mounted () {
      this.courier = courier
    },
    getList () {
      this.type = 1
    },
    getCount () {
      this.type = 2
    }
  }
}
</script>

<style lang="less" scoped>
.courier-header {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-top: 1.2rem;
  font-size: 0.75rem;
}

.courier-header__deliveryCount,
.courier-header__list {
  width: 8rem;
  height: 1.8rem;
  line-height: 1.8rem;
  background: rgb(226, 226, 226);
}
.courier-header__active {
  color: white;
  font-weight: bold;
  background: #54a93e;
}

.courier-subHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0.6rem;
}

.courier-subHeader__inputWrap {
  display: flex;
  width: 9rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.courier-search__form {
  padding: 0.25rem;
}

.courier-search__input {
  width: 6rem;
  outline: none;
  font-size: 0.7rem;
  color: gray;
}

.courier-subHeader__searchIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/searchIcon.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}

.courier-subHeader__add {
  font-size: 0.75rem;
  padding-right: 0.625rem;
}

.courier-subHeader__add a {
  color: rgb(101, 101, 101);
}

.courier-subHeader__addIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/orderDetail/u678.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}

.courier-infoWrap {
  color: gray;
}

.courier-infoWrap :nth-child(1) {
  border-bottom: none;
  // border-bottom: 1px solid gray;
}

.courier-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.65rem;
  height: 2.3rem;
  border: 1px solid #e0e0e0;
  // border-bottom: none;
  padding: 0 0.375rem;
}

.courier-info__upIcon {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url('../assets/images/orderDetail/u678.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-right: 0.25rem;
}
.courier-count__header {
  display: flex;
  margin: 0.9rem 0.8rem;
  justify-content: space-between;
  align-items: center;
}
.courier-count__selectbox {
  width: 6rem;
  padding: 0.4rem;
  border-radius: 5px;
}
.item-input {
  width: 4rem;
  border: 1px solid #e0e0e0;
  padding: 0.2rem;
}
.courier-count__grids {
  margin: 0 0.4rem;
  font-size: 0.7rem;
}
</style>
