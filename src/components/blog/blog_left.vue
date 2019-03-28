<template>
  <div id="blog_left">
    <el-col :span="leftCol">
      <el-menu :default-active="currentIndex" active-text-color="#ffd04b"
               :unique-opened="true" :collapse="isCollapse"
               :router="true" class="nav_height" :style="leftHeight">
        <el-row style="margin-bottom: 20px">
          <el-col :span="16" :offset="2">
            <span v-show="!isCollapse" style="line-height: 40px;">Hello VIP WCF</span>
          </el-col>
          <el-col :span="4" :offset="collapseOffset">
            <el-button style="height: 40px" @click="handleOpen">
              <font-awesome-icon v-show="isCollapse" icon="angle-double-right"/>
              <font-awesome-icon v-show="!isCollapse" icon="angle-double-left"/>
            </el-button>
          </el-col>
        </el-row>
        <el-menu-item index="/blog/center" v-show="leftMenus.blog_personal">
          <font-awesome-icon icon="desktop"/>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="/blog/writer" v-show="leftMenus.blog_write">
          <font-awesome-icon icon="user-edit"/>
          <span slot="title">写新文章</span>
        </el-menu-item>
        <el-menu-item index="/blog/list" v-show="leftMenus.blog_list">
          <font-awesome-icon icon="list-alt"/>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/blog/manage" v-show="leftMenus.blog_manage">
          <font-awesome-icon icon="toolbox"/>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/blog/keyword" v-show="leftMenus.blog_keyword">
          <font-awesome-icon icon="tags"/>
          <span slot="title">标签/关键字</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_left',
  props: ['leftHeight', 'leftMenus'],
  data () {
    return {
      isCollapse: false,
      pictureOffset: 2,
      collapseOffset: 0,
      leftCol: document.body.clientWidth > 450 ? 3 : 9,
      currentIndex: '/blog/center'
    }
  },
  methods: {
    /**
     * 左边导航栏的缩小与展开
     */
    handleOpen () {
      if (this.isCollapse) {
        this.leftCol = document.body.clientWidth > 450 ? 3 : 9
        this.collapseOffset = 0
        this.pictureOffset = 2
        this.isCollapse = false
      } else {
        this.leftCol = document.body.clientWidth > 450 ? 1 : 4
        this.collapseOffset = 2
        this.pictureOffset = 6
        this.isCollapse = true
      }
    }
  },
  mounted () {
    this.currentIndex = this.$route.path
  }
}
</script>

<style scoped>

</style>
