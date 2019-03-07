<template>
  <div id="blog_keyword">
    <el-col :span="20" id="blog-content">
      <el-col :span="11" :offset="1" id="blog-right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>专题列表</span>
            <el-button style="float: right;" type="danger" size="mini" @click="openAddForm">添加专题</el-button>
            <!--添加专题信息弹出框-->
            <el-dialog title="添加专题" :visible.sync="addFormVisible" width="400px">
              <el-form :model="categoryForm">
                <el-form-item label="专题名称" label-width="80px">
                  <el-input v-model="categoryForm.name" autocomplete="off" placeholder="请输入专题名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                  <el-input v-model="categoryForm.description" autocomplete="off" placeholder="写点什么..."
                            type="textarea" :rows="3"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-badge v-for="category in categories" :key="category.id" :value="category.count" class="item"
                    style="margin-left: 20px;margin-bottom: 10px">
            <el-dropdown>
              <el-button>
                <span class="category-text">{{category.name}}</span>
                <img v-if="category.cover" :src="category.cover" class="img-button"/>
                <img v-else src="../../assets/article/cover/category/default.jpg" class="img-button"/>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button style="color: #F56C6C" type="text" @click="deleteCategory(category)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="color: #E6A23C" type="text" @click="openUpdateForm(category)">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="color: #67C23A" type="text" @click="showCategoryForm(category)">详情</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--编辑专题信息弹出框-->
            <el-dialog title="编辑专题" :visible.sync="updateFormVisible" width="400px">
              <el-form :model="categoryForm">
                <el-form-item label="专题名称" label-width="80px">
                  <el-input v-model="categoryForm.name" autocomplete="off" placeholder="请输入专题名称"></el-input>
                </el-form-item>
                <el-form-item label="专题封面" label-width="80px">
                  <el-upload
                    :action="'/ui/blog/meta/uploadCover?id='+categoryForm.id+'&path='+categoryForm.cover"
                    class="upload-category-cover"
                    list-type="picture-card"
                    :on-success="getFileSuccessUrl"
                    :show-file-list="false">
                    <img v-if="categoryForm.cover" :src="categoryForm.cover" class="img-circle">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                  <el-input v-model="categoryForm.description" autocomplete="off" placeholder="写点什么..."
                            type="textarea"
                            :rows="3"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyCategory">确 定</el-button>
              </div>
            </el-dialog>
            <!--展示专题详细信息弹出框-->
            <el-dialog title="专题信息" :visible.sync="showCategory" width="400px">
              <el-form :model="categoryForm">
                <el-form-item label="专题名称" label-width="80px">
                  <el-input v-model="categoryForm.name" autocomplete="off" placeholder="请输入专题名称"></el-input>
                </el-form-item>
                <el-form-item label="专题封面" label-width="80px">
                  <img v-if="categoryForm.cover" :src="categoryForm.cover" class="img-circle">
                  <span v-else>未设置</span>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                  <el-input v-model="categoryForm.description" autocomplete="off" placeholder="写点什么..."
                            type="textarea" :rows="3"></el-input>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-badge>
          <div class="bottom clearfix">
            <el-pagination
              @size-change="categorySizeChange"
              @current-change="categoryPageChange"
              :current-page="categoryCurrentPage"
              :page-sizes="[20, 30, 50, 80]"
              :page-size="categoryPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="categoryTotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix"><span>关键词列表</span></div>
          <el-badge v-for="keyword in keywords" :key="keyword.id" :value="keyword.count" class="item"
                    style="margin-left: 20px;margin-bottom: 10px">
            <el-dropdown>
              <el-button>
                <span class="category-text">{{keyword.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button style="color: #F56C6C" type="text" @click="deleteKeywords(keyword)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>
          <div class="bottom clearfix">
            <el-pagination
              @size-change="keywordSizeChange"
              @current-change="keywordPageChange"
              :current-page="keywordCurrentPage"
              :page-sizes="[20, 30, 50, 80]"
              :page-size="keywordPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="keywordTotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'blog_keyword',
  data () {
    return {
      categoryPageSize: 30,
      categoryCurrentPage: 1,
      categoryTotal: 50,
      categories: [{
        id: 1,
        name: '分类名',
        cover: '',
        count: 12,
        description: '描述信息'
      }],
      keywordPageSize: 30,
      keywordCurrentPage: 1,
      keywordTotal: 50,
      keywords: [{
        id: 1,
        name: '关键词名',
        count: 12
      }],
      updateFormVisible: false,
      addFormVisible: false,
      showCategory: false,
      categoryForm: {
        id: 1,
        name: '',
        cover: '',
        description: ''
      },
      keywordForm: {
        id: 1,
        name: ''
      }
    }
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        // 获取到右侧内容的真实高度
        let right = document.getElementById('blog-content')
        let rightHeight = right.offsetHeight
        this.$emit('listenHeight', rightHeight)
      })
    },
    getCategoryList (currentPage, pageSize) {
      this.$http.get('/ui/blog/meta/categories?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.categories = response.data.data
            this.categoryTotal = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('专题列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getKeywordList (currentPage, pageSize) {
      this.$http.get('/ui/blog/meta/keywords?pageSize=' + pageSize + '&currentPage=' + currentPage).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.keywords = response.data.data
            this.keywordTotal = response.data.total
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('关键字列表查询异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    openUpdateForm (category) {
      this.categoryForm.cover = category.cover
      this.categoryForm.id = category.id
      this.categoryForm.name = category.name
      this.categoryForm.description = category.description
      this.updateFormVisible = true
    },
    openAddForm () {
      this.categoryForm.description = ''
      this.categoryForm.name = ''
      this.categoryForm.cover = ''
      this.categoryForm.id = null
      this.addFormVisible = true
    },
    showCategoryForm (category) {
      this.categoryForm.cover = category.cover
      this.categoryForm.id = category.id
      this.categoryForm.name = category.name
      this.categoryForm.description = category.description
      this.showCategory = true
    },
    modifyCategory () {
      this.updateFormVisible = false
      this.$http.put('/ui/blog/meta/modify/category', this.categoryForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.$message.success('编辑成功！')
            this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('编辑专题信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getFileSuccessUrl (result) {
      if (result.code === '0') {
        this.$message.success('封面上传成功!')
        this.categoryForm.cover = result.data
      } else {
        this.$message.error(result.msg)
      }
    },
    addCategory () {
      this.addFormVisible = false
      this.$http.post('/ui/blog/meta/add/category', this.categoryForm).then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('添加专题信息异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteCategory (category) {
      this.$confirm('确认删除该专题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$http.delete('/ui/blog/meta/categoryDelete/' + category.id + '/' + category.count).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.$message.success('删除成功!')
              this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('删除专题信息异常')
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    deleteKeywords (keyword) {
      this.$confirm('确认删除该关键字?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$http.delete('/ui/blog/meta/keywordDelete/' + keyword.id + '/' + keyword.count).then(response => {
          if (response && response.data) {
            if (response.data.code === '0') {
              this.$message.success('删除成功!')
              this.getKeywordList(this.keywordCurrentPage, this.keywordPageSize)
            } else {
              this.$message.error(response.data.msg)
            }
          } else {
            this.$message.error('删除关键字信息异常')
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    categorySizeChange (pageSize) {
      this.categoryPageSize = pageSize
      this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
    },
    categoryPageChange (currentPage) {
      this.categoryPageSize = currentPage
      this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
    },
    keywordSizeChange (pageSize) {
      this.keywordPageSize = pageSize
      this.getKeywordList(this.keywordCurrentPage, this.keywordPageSize)
    },
    keywordPageChange (currentPage) {
      this.keywordCurrentPage = currentPage
      this.getKeywordList(this.categoryCurrentPage, this.categoryPageSize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getHeight()
    })
    this.getCategoryList(this.categoryCurrentPage, this.categoryPageSize)
    this.getKeywordList(this.categoryCurrentPage, this.categoryPageSize)
  }
}
</script>

<style scoped>
  .img-circle {
    height: 100px;
    width: 100px;
  }

  .img-button {
    width: 4em;
    height: 2em;
    margin-bottom: -0.4em;
  }

  .category-text {
    font-size: 1em;
    font-family: "PingFang SC";
  }

  .bottom {
    border-top: solid 1px #bebebe;
    padding-top: 15px;
    margin-top: 13px;
    line-height: 12px;
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

<style>
  .upload-category-cover .el-upload--picture-card {
    height: 100px;
    width: 100px;
    line-height: 100px;
  }
</style>
