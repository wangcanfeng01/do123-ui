<template>
  <div id="admin">
    <admin-left :left-height="leftHeight"></admin-left>
    <router-view></router-view>
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
        minHeight: '900px',
        height: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
<style>
  #admin-content {
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
