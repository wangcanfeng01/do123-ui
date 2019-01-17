<template>
  <div id="common_footer">
    <div class="footer_background">
      <p class="footer_font">#惑因自困生，归处平静里，心亦然清如风，不忘初心，方得始终#</p>
      <p class="footer_font">了解更多，请联系作者<a href='/myself' target='_blank'>@wangcanfeng</a></p>
      <p class="footer_font">© 浙ICP备18011147号-1</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common_footer',
  data () {
    return {
      message: 'test the footer'
    }
  }
}
</script>

<style scoped>
  .footer_background {
    background: #e1e1e8;
    padding-top: 80px;
    padding-bottom: 100px;
  }

  .footer_font {
    font-family: "微软雅黑 Light";
    font-size: 3px;
    text-align: center;
    margin-top: 0px;
  }
</style>
