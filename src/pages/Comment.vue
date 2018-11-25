<template>
  <div class="page">
    <page-content>
      <div class="comment-header">
        <p style="font-size:.7rem">我的评分</p>
        <p style="color:black">{{commentsData.average}}</p>
      </div>
      <div class="comment-courierList">
        <p>优鲜达人</p>
        <select class="comment-courierList__selectbox" v-model="selected">
          <option v-for="item in couriers" :key="item.value" >{{item.text}}</option>
        </select>
      </div>
      <div v-for="item in commentLists" :key="item.index" class="comment-detail">
        <div class="comment-detail__courier">
          配送员：{{item.expressServerName}}
        </div>
        <div class="comment-detail__rate">
          评价星级：<i v-for="n in Number(item.stars)" :key="n.id" class="iconfont icon-xing1" style="color:#F3E857"></i>
        </div>
        <div class="comment-detail__tag">
          评价标签：{{item.tag}}
        </div>
        <div class="comment-detail__content">
          评价内容：{{item.otherComment}}
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import Content from '../components/content'
import Icon from '../components/icons'
import { handleLogin } from "@/api/login.js";
import { getComments } from '@/api/comment.js'
export default {
  components: {
    'page-content': Content,
    Icon,
  },
  data() {
    return {
      selected: 1,
        couriers:[
          { text: 'lily-12580', value: 1 },
          { text: 'alice-10096', value: 2 },
          { text: 'jack-22234', value: 3 },
        ],
      score:3.5,
      rate:'✨✨✨',
      courier:'jack',
      tag:'nice!!',
      comments:'环境和空间都还不错！！！',
      commentsData: {},
      commentLists: []
    }
  },
  mounted() {
    handleLogin().then((res) => {
      getComments().then((res) => {
        this.commentsData = res.data.data
        this.commentLists = res.data.data.content
      })
    })
  },
}
</script>
<style lang="less">
.comment-header {
  color: #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999999;
  padding: 0 .625rem;
}
</style>
<style lang="less" scoped>
  .comment-courierList {
    margin: 1rem;
    font-size: .8rem;
  }
  .comment-courierList {
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom: -1rem;
  }
  .comment-courierList__selectbox{
    // border: .1rem solid gray;
    border-radius:5px;
    width: 6.25rem;
    height: 1.2rem;
    margin: .8rem 0;
  }
  .comment-detail {
    margin: 1rem 1rem;
    font-size: .7rem;
    border-bottom: 1px solid rgb(226, 226, 226);
    padding-bottom: .375rem;
  }
  .comment-detail__courier,
  .comment-detail__rate,
  .comment-detail__tag,
  .comment-detail__content {
    margin: .25rem 0;
    font-size: .7rem;
    color:#676767;
    font-weight: bold;
  }
</style>
