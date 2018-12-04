<template>
  <div class="page">
    <page-content>
      <div class="comment-header">
        <p style="font-size:.7rem">我的评分</p>
        <p v-if="commentsData != null" style="color:black">{{commentsData.average}}</p>
        <p v-else style="color:black">0</p>
      </div>
      <div class="comment-courierList">
        <p>优鲜达人</p>
        <el-select @change="handleChange(name)" v-model="name" size="mini">
          <el-option v-for="item in courierLists" :key="item.value" :value="item.name" :label="item.name"><span style="font-size:14px">{{item.name}}-{{item.phone}}</span></el-option>
        </el-select>
        <!-- <el-select @change="handleChange(selected)" v-model="selected" size="mini" placeholder="选择优鲜达人">
          <el-option v-for="item in courierLists" :key="item.value" :value="item.id" :label="item.name"><span style="font-size:12px">{{item.name}}-{{item.phone}}</span></el-option>
        </el-select> -->
      </div>
      <div v-for="item in commentLists"
           :key="item.id"
           class="comment-detail">
        <div class="comment-detail__courier">
          配送员：{{item.expressServerName}}
        </div>
        <div class="comment-detail__rate">
          评价星级：<i v-for="n in Number(item.stars)"
             :key="n.id"
             class="iconfont icon-xing1"
             style="color:#F3E857"></i>
        </div>
        <div class="comment-detail__tag">
          评价标签：{{item.tag.split('#').reverse().join(' ')}}
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
import { handleLogin } from "@/api/login.js";
import { getAllComments, getComments, getCouriers } from '@/api/comment.js'

export default {
  components: {
    'page-content': Content,
  },
  data () {
    return {
      name: null,
      commentsData: {},
      commentLists: [],
      courierLists: []
    }
  },
  methods: {
    handleChange(name) {
      getComments(name).then(res => {
        this.commentsData = res.data.data
        this.commentLists = res.data.data.content
      }).catch(() => { 
        this.commentsData = null
        this.commentLists = null
      });
    }
  },
  mounted () {
    handleLogin().then((res) => {
      getAllComments().then((res) => {
        this.commentsData = res.data.data
        this.commentLists = res.data.data.content
      })
      getCouriers().then(res => {
        this.courierLists = res.data.data.serverList
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
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 0 0.625rem;
}
</style>
<style lang="less" scoped>
.comment-courierList {
  margin: 1rem;
  font-size: 0.8rem;
}
.comment-courierList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1rem;
}
.comment-courierList__selectbox {
  // border: .1rem solid gray;
  border-radius: 5px;
  width: 6.25rem;
  height: 1.2rem;
  margin: 0.8rem 0;
}
.comment-detail {
  margin: 1rem 1rem;
  font-size: 0.7rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-bottom: 0.375rem;
}
.comment-detail__courier,
.comment-detail__rate,
.comment-detail__tag,
.comment-detail__content {
  margin: 0.25rem 0;
  font-size: 0.7rem;
  color: #676767;
  font-weight: bold;
}
</style>
