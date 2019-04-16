<template>
  <div id="video">
    <!--// 插入左侧导航-->
    <video-left :left-height="leftHeight" :leftMenus="leftMenus"></video-left>
    <!--//载入右侧数据-->
    <router-view v-on:listenHeight="changeHeight"></router-view>
  </div>
</template>

<script>
import left from '@/components/video/video_left'

export default {
  name: 'video',
  components: {
    'videoLeft': left
  },
  data () {
    return {
      leftMenus: {},
      leftHeight: {
        minHeight: '900px',
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
