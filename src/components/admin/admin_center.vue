<template>
  <div id="admin_center">
    <el-col :span="20" id="admin-content">
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count_first">
            <el-row>
              <font-awesome-icon icon="user"/>
              <span>网站用户数</span>
            </el-row>
            <el-row>
              <span>10</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 4%</i></span>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count">
            <el-row>
              <font-awesome-icon icon="user"/>
              <span>新注册用户</span>
            </el-row>
            <el-row>
              <span>50</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 34%</i></span>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count">
            <el-row>
              <font-awesome-icon icon="user"/>
              <span>访客数目</span>
            </el-row>
            <el-row>
              <span>2000</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 34%</i></span>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count">
            <el-row>
              <font-awesome-icon icon="file"/>
              <span>博客总数</span>
            </el-row>
            <el-row>
              <span>103</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 3%</i></span>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count">
            <el-row>
              <font-awesome-icon icon="link"/>
              <span>视频链接数</span>
            </el-row>
            <el-row>
              <span>2500</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 34%</i></span>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" class="tile_count">
            <el-row>
              <font-awesome-icon icon="image"/>
              <span>图片数量</span>
            </el-row>
            <el-row>
              <span>2315</span>
            </el-row>
            <el-row>
              <span>月<i class="el-icon-caret-top"> 3%</i></span>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-card>
          <div slot="header" class="clearfix">
            <h3>网站负荷情况
              <small>cpu使用量</small>
            </h3>
          </div>
          <el-col :span="12" :offset="1">
            <cpu-status style="margin-top: 80px"></cpu-status>
          </el-col>
          <el-col :span="11">
            <h3>当前服务器指标</h3>
            <el-row>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>CPU使用量</span>
                  </div>
                  <el-progress type="circle" :stroke-width=25 :percentage="serverIndex.cpuPercentage"
                               style="margin-bottom: 10px;margin-left: 20%"></el-progress>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>硬盘使用量(40G)</span>
                  </div>
                  <el-progress type="circle" :stroke-width=25 :percentage="serverIndex.diskPercentage"
                               style="margin-bottom: 10px;margin-left: 20%"></el-progress>
                </el-card>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>堆内存使用量(4G)</span>
                  </div>
                  <el-progress type="circle" :stroke-width=25 :percentage="serverIndex.heapPercentage"
                               style="margin-bottom: 10px;margin-left: 20%"></el-progress>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>非堆内存使用量(4G)</span>
                  </div>
                  <el-progress type="circle" :stroke-width=25 :percentage="serverIndex.noheapPercentage"
                               style="margin-bottom: 10px;margin-left: 20%"></el-progress>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-card>
      </el-row>
      <el-row>
        <el-card>
          <div slot="header" class="clearfix">
            <h3>访客信息</h3>
          </div>
          <el-table :data="visitorData">
            <el-table-column prop="username" label="访客名称"></el-table-column>
            <el-table-column prop="facePath" label="访客头像">
              <template slot-scope="scope">
                <img v-if="scope.row.facePath" :src="scope.row.facePath" class="img-circle"/>
                <img v-else :src="defaultFace" class="img-circle"/>
              </template>
            </el-table-column>
            <el-table-column label="访客等级" width="160">
              <template slot-scope="scope">
                <el-popover placement="right" width="230" trigger="hover">
                  <el-table :data="scope.row.roleInfos">
                    <el-table-column width="100" property="roleName" label="角色名称"></el-table-column>
                    <el-table-column width="120" property="roleType" label="角色类型"></el-table-column>
                  </el-table>
                  <el-tag slot="reference">VIP-{{scope.row.userLevel}}</el-tag>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="loginTime" label="登录时间"></el-table-column>
            <el-table-column prop="logoutTime" label="登出时间"></el-table-column>
            <el-table-column prop="remoteIp" label="访客IP"></el-table-column>
            <el-table-column prop="remoteArea" label="访客地域"></el-table-column>
          </el-table>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import cpuStatus from '@/components/chart/cpu_status'

export default {
  name: 'admin_center',
  components: {
    'cpuStatus': cpuStatus
  },
  data () {
    return {
      defaultFace: require('../../assets/face/default.jpg'),
      visitorData: [{
        id: 1,
        username: '王小虎',
        facePath: '',
        roleInfos: [{
          id: 1,
          roleName: '王小虎',
          roleType: 'admin'
        }, {
          id: 2,
          roleName: '王大虎',
          roleType: 'guest'
        }],
        userLevel: '1',
        loginTime: '2016-05-04 00:00:00',
        logoutTime: '2016-05-04 00:00:00',
        remoteIp: '127.0.0.1',
        remoteArea: '绍兴'
      }],
      statisticInfoList: {},
      serverIndex: {
        cpuPercentage: 40,
        heapPercentage: 40,
        noheapPercentage: 40,
        diskPercentage: 40
      }
    }
  },
  methods: {
    selectVisitorList (currentPage, pageSize) {
      this.$http.get('/ui/visitor/select?currentPage=' + currentPage + '&pageSize=' + pageSize).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.visitorData = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询访客信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getServerIndex () {
      this.$http.get('/ui/server/nowIndex').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.serverIndex = response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('查询服务器信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    // 查询最近5条访客信息
    this.selectVisitorList(1, 5)
    this.getServerIndex()
  }
}
</script>

<style scoped>

  .tile_count_first {
    margin-left: 0px;
  }

  .tile_count {
    margin-left: 20px;
  }

  .img-circle {
    border-radius: 50%;
    height: 60px;
    width: 60px;
  }
</style>
