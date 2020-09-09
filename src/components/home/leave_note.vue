<template>
  <div id="leave_note">
    <div :style="messageBackground">
      <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 40px">
          <el-card class="box-card" v-for="message in messages" :key="message.id"
                   style="margin-bottom: 10px;opacity: 0.7">
            <div slot="header" class="clearfix">
              <span>{{message.username+' 在 '+message.time+' 留言'}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">标记为已读</el-button>
            </div>
            <div>
              <span>{{message.message}}</span>
            </div>
            <div style="text-align: right">
              <span>{{'邮箱：'+message.email}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leave_note',
  data () {
    return {
      messages: [{
        id: 1,
        username: 'ww',
        message: 'sss',
        email: 'ssss',
        time: '2910-10-10 12;12:12',
        isRead: 0
      }, {
        id: 2,
        username: 'ww',
        message: 'sss',
        email: 'ssss',
        time: '2910-10-10 12;12:12',
        isRead: 0
      }],
      messageBackground: {
        background: 'url(' + require('../../assets/bg/gandam.jpg') + ')',
        backgroundSize: 'cover',
        minHeight: '880px'
      },
      currentPage: 1,
      pageSize: 20,
      total: 200
    }
  },
  methods: {
    getMessages () {
      this.$http.get('/ui/messages/list?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.messages = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('专题列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getMessages()
  }
}
</script>

<style scoped>

</style>
