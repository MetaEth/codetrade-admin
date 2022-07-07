<template>
  <div class="app-container">
    <!--源码类型-->
    <p class="page-title">源码类型</p>
    <el-table v-loading="table_loading"
              element-loading-text="加载中..."
              border
              fit
              highlight-current-row
              :data="codeType">
      <el-table-column label="ID"
                       align="center"
                       width="60px">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="类型">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    v-model="scope.row.codetype"></el-input>
          <span v-else>{{scope.row.codetype}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="排序(降序)"
                       width="100px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    type="number"
                    v-model.number="scope.row.sort"></el-input>
          <span v-else>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="添加时间"
                       prop="createdAt">
      </el-table-column>
      <el-table-column align="center"
                       width="400px"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit"
                     icon="el-icon-refresh"
                     size="mini"
                     type="warning"
                     @click="handleCancel_codetype(scope.row)">取消
          </el-button>
          <el-button v-if="scope.row.edit"
                     icon="el-icon-circle-check-outline"
                     size="mini"
                     type="success"
                     @click="handleEdit_codetype(scope.$index, scope.row)">保存
          </el-button>
          <el-button v-else
                     size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="scope.row.edit=!scope.row.edit">编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-close"
                     @click="handleDel_codetype(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--平台-->
    <p class="page-title">平台</p>
    <div class="filter-container">
      <el-button type="primary"
                 plain
                 class="filter-item"
                 @click="addCate_platform()">添加平台</el-button>
    </div>
    <el-table v-loading="table_loading"
              element-loading-text="加载中..."
              border
              fit
              highlight-current-row
              :data="platForm">
      <el-table-column label="ID"
                       align="center"
                       width="60px">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="类型">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    v-model="scope.row.platform_name"></el-input>
          <span v-else>{{scope.row.platform_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="排序(降序)"
                       width="100px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    type="number"
                    v-model.number="scope.row.platform_sort"></el-input>
          <span v-else>{{scope.row.platform_sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="添加时间"
                       prop="createdAt">
      </el-table-column>
      <el-table-column align="center"
                       width="400px"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit"
                     icon="el-icon-refresh"
                     size="mini"
                     type="warning"
                     @click="handleCancel_platform(scope.row)">取消
          </el-button>
          <el-button v-if="scope.row.edit"
                     icon="el-icon-circle-check-outline"
                     size="mini"
                     type="success"
                     @click="handleEdit_platform(scope.$index, scope.row)">保存
          </el-button>
          <el-button v-else
                     size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="scope.row.edit=!scope.row.edit">编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-close"
                     @click="handleDel_platform(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showDialog_platform"
               title="添加平台"
               width="30%">
      <el-form :model="form_platform"
               status-icon
               label-width="100px"
               :rules="formRule_platform"
               ref="cateForm"
               @submit.native.prevent>
        <el-form-item label="平台名"
                      prop="platform_name">
          <el-input v-model="form_platform.platform_name"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="platform_sort">
          <el-input v-model.number="form_platform.platform_sort"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button type="primary"
                       @click="onSubmit_platform">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--分类-->
    <p class="page-title">分类</p>
    <div class="filter-container">
      <el-button type="primary"
                 plain
                 class="filter-item"
                 @click="addCate_type()">添加分类</el-button>
    </div>
    <el-table v-loading="table_loading"
              element-loading-text="加载中..."
              border
              fit
              highlight-current-row
              :data="Type">
      <el-table-column label="ID"
                       align="center"
                       width="60px">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="类型">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    v-model="scope.row.type_name"></el-input>
          <span v-else>{{scope.row.type_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="排序(降序)"
                       width="100px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit"
                    class="edit-input"
                    size="small"
                    type="number"
                    v-model.number="scope.row.type_sort"></el-input>
          <span v-else>{{scope.row.type_sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="添加时间"
                       prop="createdAt">
      </el-table-column>
      <el-table-column align="center"
                       width="400px"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit"
                     icon="el-icon-refresh"
                     size="mini"
                     type="warning"
                     @click="handleCancel_type(scope.row)">取消
          </el-button>
          <el-button v-if="scope.row.edit"
                     icon="el-icon-circle-check-outline"
                     size="mini"
                     type="success"
                     @click="handleEdit_type(scope.$index, scope.row)">保存
          </el-button>
          <el-button v-else
                     size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="scope.row.edit=!scope.row.edit">编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-close"
                     @click="handleDel_type(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showDialog_type"
               title="添加分类"
               width="30%">
      <el-form :model="form_type"
               status-icon
               label-width="100px"
               :rules="formRule_type"
               ref="cateForm"
               @submit.native.prevent>
        <el-form-item label="分类名"
                      prop="type_name">
          <el-input v-model="form_type.type_name"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="type_sort">
          <el-input v-model.number="form_type.type_sort"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button type="primary"
                       @click="onSubmit_type">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { pageMixin } from '@/utils/mixin'
import {codetypeList,codetypeAdd,typeList,typeAdd,platformList,platformAdd} from "@/api/shop";
import moment from 'moment'
import request from "@/utils/request";
export default {
  name: "ShopCate",
  mixins: [pageMixin],
  data() {
    return {
      table_loading:false,
      platForm:[],
      codeType:[],
      Type:[],
      showDialog_platform:false,
      showDialog_type: false,
      params: {
        name: '',
      },
      /**
       * form_type
       */
      form_type: {
        type_name: '',
        type_sort: 1,
      },
      formRule_type: {
        type_name: [
          { required: true, message: '请输入分类名', trigger: 'blur' }
        ],
        type_sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: "number", message: '必须是数字', trigger: 'blur' }
        ]
      },
      //inputValue: '',
      /**
       * form_codetype
       */
      form_codetype: {
        codetype: '',
        sort: 1,
      },
      formRule_codetype: {
        codetype: [
          { required: true, message: '请输入分类名', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: "number", message: '必须是数字', trigger: 'blur' }
        ]
      },
      /**
       * form_platform
       */
      form_platform: {
        platform_name: '',
        platform_sort: 1,
      },
      formRule_platform: {
        platform_name: [
          { required: true, message: '请输入平台名', trigger: 'blur' }
        ],
        platform_sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: "number", message: '必须是数字', trigger: 'blur' }
        ]
      },
    }
  },

  methods: {


    /**
     * codetype的按钮
     */
    //修改分类
    handleEdit_codetype(index, row) {
      // editCate(row).then(res => {
      //   this.$message({
      //     message: res.msg,
      //     type: 'success'
      //   })
      //   row.old_name = row.name
      //   row.edit = false
      // })
      row.edit = false
      console.log("你好")
    },
    //取消修改分类
    handleCancel_codetype(row) {
      row.edit = false
    },
    //删除分类
    handleDel_codetype(index, row) {
      this.$confirm('会删除该分类的所有商品', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCate({ id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.list.splice(index, 1)
        })
      })
    },
    //添加顶级分类
    addCate_codetype() {
      this.form_codetype.codetype = ''
      this.form_codetype.sort = 1
      this.showDialog = true
    },
    //添加分类提交
    onSubmit_codetype() {
      this.$refs.cateForm.validate(valid => {
        if (!valid) {
          return false
        }

        console.log(this.form_type,"this.form")
      })
    },
    /**
     * platform的按钮
     */
    //修改分类
    handleEdit_platform(index, row) {
      // editCate(row).then(res => {
      //   this.$message({
      //     message: res.msg,
      //     type: 'success'
      //   })
      //   row.old_name = row.name
      //   row.edit = false
      // })
      row.edit = false
      console.log("你好")
    },
    //取消修改分类
    handleCancel_platform(row) {
      row.edit = false
    },
    //删除分类
    handleDel_platform(index, row) {
      this.$confirm('会删除该分类的所有商品', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCate({ id: row.id }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.list.splice(index, 1)
        })
      })
    },
    //添加顶级分类
    addCate_platform() {
      this.form_type.type_name = ''
      this.form_type.type_sort = 1
      this.showDialog_platform = true
    },
    //添加分类提交
    onSubmit_platform() {
      this.$refs.cateForm.validate(valid => {
        if (!valid) {
          return false
        }
        platformAdd(this.form_platform).then((res)=>{
          this.get_platform()
          this.showDialog_platform=false
        })
        console.log(this.form_platform,"this.form")
      })
    },
    /**
     * type的按钮
     */
    handleEdit_type(index, row) {
      // editCate(row).then(res => {
      //   this.$message({
      //     message: res.msg,
      //     type: 'success'
      //   })
      //   row.old_name = row.name
      //   row.edit = false
      // })
      row.edit = false
      console.log("你好")
    },
    //取消修改分类
    handleCancel_type(row) {
      row.edit = false
    },
    //删除分类
    handleDel_type(index, row) {
      this.$confirm('会删除该分类的所有商品', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$message({
          message: '模拟执行',
          type: 'success'
        })
      })
    },
    //添加顶级分类
    addCate_type() {
      this.form_type.type_name = ''
      this.form_type.type_sort = 1
      this.showDialog_type = true
    },
    //添加分类提交
    onSubmit_type() {
      this.$refs.cateForm.validate(valid => {
        if (!valid) {
          return false
        }
        typeAdd(this.form_type).then((res)=>{
          this.get_type()
          this.showDialog_type=false
        })
        //console.log(this.form_type,"this.form")
      })
    },
    async get_codetype(){
      var data=[]
      var result=await codetypeList()
      for(var object of result){
        data.push({
          codetype:object.codetype,
          sort:object.sort,
          edit:false,
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })
      }
      this.codeType=data
    },
    async get_platform(){
      var data=[]
      var result=await platformList()
      for(var object of result){
        data.push({
          platform_name:object.platform_name,
          platform_sort:object.platform_sort,
          edit:false,
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })
      }
      this.platForm=data
    },
    async get_type(){
      var data=[]
      var result=await typeList()
      for(var object of result){
        data.push({
          type_name:object.type_name,
          type_sort:object.type_sort,
          edit:false,
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })
      }
      this.Type=data
    },
  },
  created() {
    this.get_type()
    this.get_codetype()
    this.get_platform()
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.search-container {
  margin-bottom: 5px;
  margin-top: 5px;
}

.page-container {
  float: right;
  margin: 20px;
}

.button-new-tag {
  margin-left: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
