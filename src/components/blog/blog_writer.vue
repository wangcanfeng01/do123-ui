<template>
  <div id="blog_writer">
    <el-row>
      <el-col :span="12">
        <el-input
          placeholder="请输入标题"
          v-model="articleTitle"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-select v-model="category" clearable placeholder="请选择文章分类">
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="18">
        <fieldset class="fieldset-border">
          <legend class="legend-font">关键字</legend>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
        </fieldset>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="18">
        <mavon-editor
          :subfield="subfield"
          :code_style="code_style"
          :ishljs="true"
          :externalLink="externalLink">
        </mavon-editor>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="4" :offset="1">
        <el-switch
          v-model="allowComment"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="允许评论"
          inactive-text="不可评论">
        </el-switch>
      </el-col>
      <el-col :span="4">
        <el-switch
          v-model="allowSee"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="所有人可见"
          inactive-text="仅自己可见">
        </el-switch>
      </el-col>
      <el-col :span="5" :offset="5">
        <el-button>返回列表</el-button>
        <el-button type="success">文章发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'blog_writer',
  data () {
    return {
      articleTitle: '',
      category: '',
      categories: [{
        value: '选项1'
      }, {
        value: '选项2'
      }, {
        value: '选项3'
      }, {
        value: '选项4'
      }, {
        value: '选项5'
      }],
      dynamicTags: ['test01', 'test02'],
      inputVisible: true,
      inputValue: '',
      allowComment: true,
      allowSee: true,
      subfield: false,
      code_style: 'solarized-dark',
      externalLink: {
        markdown_css: function () {
          // 这是markdown css文件路径
          return '/markdown/github-markdown.min.css'
        },
        hljs_js: function () {
          // 这是hljs文件路径
          return '/highlightjs/highlight.min.js'
        },
        hljs_css: function () {
          // 这是代码高亮配色文件路径
          return '/highlightjs/styles/solarized-dark.min.css'
        },
        hljs_lang: function (lang) {
          // 这是代码高亮语言解析路径
          return '/highlightjs/languages/' + lang + '.min.js'
        },
        katex_css: function () {
          // 这是katex配色方案路径路径
          return '/katex/katex.min.css'
        },
        katex_js: function () {
          // 这是katex.js路径
          return '/katex/katex.min.js'
        }
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    margin-top: 10px;
    vertical-align: center;
  }

  .fieldset-border {
    border: 2px solid #c09992;
    border-radius: 5px;
    padding: 0px 20px 20px 20px;
  }

  .legend-font {
    border: 0;
    width: auto;
    margin-left: 20px;
    font-size: 1.2em;
  }
</style>
<style>
  .op-icon {
    /*font-size: 1.2em !important;*/
    /*margin-right: 0.5em !important;*/
  }

  .v-note-edit {
    min-height: 500px !important;
  }
</style>
