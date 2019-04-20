<template>
  <div id="wcf_video">
    <!--// 插入左侧导航-->
    <video-left :left-height="leftHeight" :leftMenus="leftMenus"></video-left>
    <!--//载入右侧数据-->
    <router-view v-on:listenHeight="changeHeight"></router-view>
  </div>
</template>

<script>
import left from '@/components/video/video_left'

export default {
  name: 'wcf_video',
  components: {
    'videoLeft': left
  },
  data () {
    return {
      leftMenus: {},
      leftHeight: {
        minHeight: '4000px',
        height: ''
      }
    }
  },
  methods: {
    // 监听右侧数据的真实高度，从而改变左侧导航栏的高度
    changeHeight (height) {
      this.leftHeight.height = height + 'px'
    }
  }
}
</script>

<style scoped>

</style>
<style>
  #video-content {
    margin-left: 20px;
    margin-top: 20px;
    min-height: 800px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
