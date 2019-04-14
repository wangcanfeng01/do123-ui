<template>
  <div id="search">
    <div :style="searchBackground">
      <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 160px">
          <p class="title_font">DO123</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8" style="margin-bottom: 250px;">
          <el-input placeholder="请输入内容" v-model="searchKey" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button>搜索一下</el-button>
        </el-col>
      </el-row>
    </div>
    <my-footer style="margin-top: 0px;margin-bottom: 0px"></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/common/common_footer'

export default {
  name: 'search',
  components: {
    'myFooter': myFooter
  },
  data () {
    return {
      searchKey: '',
      searchBackground: {
        background: 'url(' + require('../../assets/bg/seed.jpg') + ')',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

<style scoped>
  .title_font {
    font-size: 3em;
    letter-spacing: 13px;
    font-family: 'Arvo';
    font-weight: 700;
    color: #ed786a;
    text-shadow: 0.05em 0.075em 0 rgba(0, 0, 0, 0.1);
    border: 0;
    text-align: center;
  }
</style>
