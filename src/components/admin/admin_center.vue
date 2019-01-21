<template>
  <div id="admin_center">
    <el-col :span="20" class="admin_content">
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
    </el-col>
    <el-col :span="20" class="admin_content">
      <el-card>
        <div slot="header" class="clearfix">
          <h3>网站负荷情况
            <small>cpu使用量</small>
          </h3>
        </div>
        <el-col :span="6">
          <h3>服务器指标</h3>
          <span>CPU</span>
          <el-progress :text-inside="true" :stroke-width=25 :percentage="40"
                       style="margin-bottom: 10px;"></el-progress>
          <span>内存使用量</span>
          <el-progress :text-inside="true" :stroke-width="25" :percentage="70"
                       style="margin-bottom: 10px;"></el-progress>
          <span>硬盘使用量</span>
          <el-progress :text-inside="true" :stroke-width="25" :percentage="80"
                       style="margin-bottom: 10px;"></el-progress>
        </el-col>
      </el-card>
    </el-col>
    <el-col :span="20" class="admin_content">
      <el-card>
        <div slot="header" class="clearfix">
          <h3>访客信息</h3>
        </div>
        <el-table :data="tableData">
          <el-table-column prop="username" label="用户名">
          </el-table-column>
          <el-table-column prop="role" label="角色">
          </el-table-column>
          <el-table-column prop="address" label="用户ip">
          </el-table-column>
          <el-table-column prop="actionTimes" label="最近一月操作次数">
          </el-table-column>
          <el-table-column prop="actionTime" label="最后操作时间">
          </el-table-column>
          <el-table-column prop="areaInfo" label="地域信息">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'admin_center',
  data () {
    return {
      tableData: [{
        username: 'wcf',
        role: 'admin',
        address: '127.0.0.1',
        actionTimes: '11',
        actionTime: '2018-10-10 00:00:00',
        areaInfo: '绍兴'
      }]
    }
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
</style>
