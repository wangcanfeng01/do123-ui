<template>
  <div id="admin">
    <admin-left :left-height="leftHeight" :leftMenus="leftMenus"></admin-left>
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
      leftMenus: {},
      leftHeight: {
        minHeight: '900px',
        height: ''
      }
    }
  },
  methods: {
    // 获取左侧导航有权限的菜单
    getAdminAuthMenu () {
      this.$http.get('/ui/menu/authMenu').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.leftMenus = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('权限菜单查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getAdminAuthMenu()
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
