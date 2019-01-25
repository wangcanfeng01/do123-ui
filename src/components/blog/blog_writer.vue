<template>
  <div id="blog_writer">
 <mavon-editor
      :subfield="subfield"
      :code_style="code_style"
      :ishljs="true"
      :externalLink="externalLink"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'blog_writer',
  data () {
    return {
      subfield: false,
      code_style: 'solarized-dark',
      externalLink: {
        markdown_css: function () {
          // 这是你的markdown css文件路径
          return '/markdown/github-markdown.min.css'
        },
        hljs_js: function () {
          // 这是你的hljs文件路径
          return '/highlightjs/highlight.min.js'
        },
        hljs_css: function () {
          // 这是你的代码高亮配色文件路径
          return '/highlightjs/styles/solarized-dark.min.css'
        },
        hljs_lang: function (lang) {
          // 这是你的代码高亮语言解析路径
          return '/highlightjs/languages/' + lang + '.min.js'
        },
        katex_css: function () {
          // 这是你的katex配色方案路径路径
          return '/katex/katex.min.css'
        },
        katex_js: function () {
          // 这是你的katex.js路径
          return '/katex/katex.min.js'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
<style>
  .op-icon {
    font-size: 1.2em !important;
    margin-right: 0.5em !important;
  }
  .v-note-edit{
    min-height: 600px!important;
  }
</style>
