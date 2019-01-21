<template>
  <div id="admin">
    <admin-left :left-height="leftHeight"></admin-left>
    <div ref="admin_right" id="admin_right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import left from '@/components/admin/admin_left'

export default {
  name: 'admin',
  components: {
    'adminLeft': left
  },
  data () {
    return {
      leftHeight: {
        minHeight: '500px',
        height: ''
      }
    }
  },
  mounted () {
    // 获取到右侧内容的真实高度
    var right = document.getElementById('admin_right')
    var rightHeight = right.offsetHeight
    this.leftHeight.height = rightHeight + 'px'
  }
}
</script>

<style scoped>
  #admin_right {
    min-height: 800px;
  }
</style>
<style>
  .admin_content {
    margin-left: 20px;
    margin-top: 20px;
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
