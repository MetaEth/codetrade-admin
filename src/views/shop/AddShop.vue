<template>
  <div class="app-container"
       id="add-pro">
    <el-form class="form-container"
             :inline="true"
             status-icon
             :rules="formRules"
             ref="fromInput"
             :model="formValue"
             @submit.native.prevent
             label-width="80px"
             label-position="left">
      <el-row>
        <el-input v-model="formValue.shop_name" style="margin-bottom: 22px" placeholder="请输入项目名称"></el-input>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="分类" prop="valueType">
            <el-cascader
              placeholder="请选择"
              style="width: 220px;"
              v-model="formValue.valueType"
              :options="options"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型" prop="valueCodeType">
            <el-select v-model="formValue.valueCodeType"
                       placeholder="请选择"
                       style="width: 220px">
              <el-option v-for="(item, index) in codetype"
                         :label="item.label"
                         :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标签"
                        prop="cate_id">
            <el-select
              style="width: 220px"
              v-model="formValue.valueLable"
              :multiple-limit=3
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择商品标签">
              <el-option
                v-for="item in label"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>


          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="排序" prop="valueDate">
            <el-date-picker
              style="width: 220px"
              v-model="formValue.valueDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="售价"
                        prop="price">
            <el-input style="width: 220px"
                      type="number"
                      v-model.number="formValue.price"></el-input>
          </el-form-item>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <el-form-item label="售出"-->
<!--                        prop="cate_id">-->
<!--            <el-input style="width: 200px"-->
<!--                      type="number"-->
<!--                      v-model.number="formValue.sales_volume"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>
      <span class="diver">上传项目封面图和项目下载资源</span>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目封面">
            <el-upload
              action="admin/upload/shop_picture"
              list-type="picture-card"
              :on-remove="handleRemovePicture"
              :on-success="handleSuccessPicture"
              style="padding-bottom: 22px"
              :limit="1"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <!--文件上传-->
        <el-col :span="12">
          <el-form-item label="文件资源">
            <el-upload
              action="admin/upload/download_link"
              :on-remove="handleRemoveFile"
              :on-success="handleSuccessFile"
              :on-error="handleErrorFile"
              style="padding-bottom: 22px"
              :limit="1"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="diver">上传项目展示图（选填）</span>
      <el-row>
        <!--文件上传-->
        <el-col :span="30">
          <el-form-item label="项目展示">
            <el-upload
              action="admin/upload/project_display"
              list-type="picture-card"
              multiple
              :on-remove="handleRemoveDisplay"
              :on-success="handleSuccessDisplay"
              style="padding-bottom: 22px"
              :limit="5"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>


        </el-col>
      </el-row>
      <el-input style="padding-top: 22px;padding-bottom: 22px" v-model="formValue.projectExperience" placeholder="请输入项目展示地址（Http开头，选填）"></el-input>
      <span class="diver">详细内容</span>
      <markdown-editor ref="markdownEditor" v-model="formValue.project_introduce" :language="language" height="600px" />
      <el-row>
        <el-col style="padding-top: 40px">
          <el-button type="primary"
                     @click="getHtml"
                     style="float:left">HTML</el-button>
          <el-button type="primary"
                     @click="onSubmit"
                     style="float:right">提交</el-button>
        </el-col>
      </el-row>
      <div v-html="html" />
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import Dropzone from '@/components/Dropzone'
// import tinymce from "@/components/Tinymce"
// import MDinput from "@/components/MDinput"
import { inArray } from "@/utils/index"
import {shopAdd,codetypeList, platformList, typeList} from "@/api/shop";


export default {
  name: "AddShop",
  components: { Dropzone,MarkdownEditor},
  data() {
    return {
      formValue: {
        project_introduce:'',//详情内容
        project_display:[],
        shop_name:'',//项目名称
        picture:[],//项目封面图
        file:[],//项目文件
        projectExperience:'',//项目体验地址
        valueType:'',//第一个选择器
        valueCodeType:'',//第二个选择器
        valueLable:'',//第三个选择器
        valueDate:'',//第四个选择器
        price:'',//第五个选择器
      },
      formRules: {
        price: [
          { required: true, min: 0, message: '售价不得低于0元', trigger: 'blur', type: 'number' }
        ],
        // valueType: [{ required: true, message: '请选择分类', trigger: 'blur',type:null }],
        // valueCodeType:[{required:true, message:'请选择类型', trigger:'blur', type:null}],
        // valueDate:[{required:true, message:'请选择日期', trigger:'blur', type:null}]
      },
      /*自己添加的*/
      value:'',
      label: [{
        value: 'HTML',
        label: 'HTML'
      },{
        value: 'CSS',
        label: 'CSS'
      },{
        value: 'JavaScript',
        label: 'JavaScript'
      },{
        value: 'Koa',
        label: 'Koa'
      },{
        value: 'Mongo',
        label: 'Mongo'
      },{
        value: 'Node',
        label: 'Node'
      },{
        value: 'Python',
        label: 'Python'
      },{
        value: 'Java',
        label: 'Java'
      },{
        value: 'C',
        label: 'C'
      },{
        value: 'C++',
        label: 'C++'
      },{
        value: 'C#',
        label: 'C#'
      },{
        value: 'PHP',
        label: 'PHP'
      },{
        value: 'Go',
        label: 'Go'
      },{
        value: 'SQL',
        label: 'SQL'
      }],
      label_value:'',
      options:[],
      codetype:[
        {
          value: 'true',
          label: '完整项目'
        }, {
          value: 'false',
          label: '模板'
        },
      ],
      html:'',
      multipleLimit:3,
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  created() {
    this.get_codetype()
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  methods: {
    //项目展示
    handleRemoveDisplay(file,fileList){
      this.formValue.project_display.splice(inArray(this.formValue.project_display, file.response.project_display), 1)
    },
    //上传成功
    handleSuccessDisplay(res, file,fileList){
      this.formValue.project_display.push(res.project_display)
    },
    //文件上传
    handleRemoveFile(file, fileList){
      this.formValue.file.splice(inArray(this.formValue.file, file.response.download_link), 1)
    },
    //项目文件上传失败的钩子
    handleErrorFile(err, file, fileList){
      console.log(err,file,fileList)
    },
    //项目文件上传成功的钩子
    handleSuccessFile(res, file, fileList){
      this.formValue.file.push(res.download_link)
    },
    //图片上传成功的钩子
    handleSuccessPicture(res, file, fileList){
      this.formValue.picture.push(res.picture)
    },
    //图片删除钩子
    handleRemovePicture(file, fileList) {
      this.formValue.picture.splice(inArray(this.formValue.picture, file.response.picture), 1)
    },
    //得到html
    getHtml(){
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    async get_codetype(){
      var codetype=[]
      var platform=[]
      var type=[]
      var result_codetype=await codetypeList()
      var result_platform=await platformList()
      var result_type=await typeList()
      //第一层嵌套
      for(var i=0;i<result_codetype.length;i++){
        codetype.push({value:result_codetype[i]._id,label:result_codetype[i].codetype})
        codetype[i].children=[]
        //第二层嵌套
        for(var j=0;j<result_platform.length;j++){
          // if(j==0){
          //   console.log(j,"j")
          //   codetype[i].children.push({value:null,label:"不限"})
          // }
          codetype[i].children.push({value:result_platform[j]._id,label:result_platform[j].platform_name})
          codetype[i].children[j].children=[]
          //第三层嵌套
          for(var k=0;k<result_type.length;k++){
            codetype[i].children[j].children.push({value:result_type[k]._id,label:result_type[k].type_name})
          }
        }
      }
      this.options=codetype
      console.log(codetype,"codetype")
    },

    //提交
    async onSubmit() {

      var params=this.formValue
      if(params.shop_name=='' || params.valueCodeType=='' || params.valueLable=='' || params.valueDate=='' || params.price==''){
        this.$message({ message: '请填写项目基本信息', type: 'warning' })
        return
      }
      if(params.picture.length==0){
        this.$message({ message: '请上传封面图片', type: 'warning' })
        return
      }
      if(params.file.length==0){
        this.$message({ message: '项目文件为空，或者还在继续上传至服务器', type: 'warning' })
        return
      }
      var result=await shopAdd(this.formValue)
      if(result){
        this.$message({ message: '项目上传成功', type: 'success' })
      }
    },
  },
}
</script>

<style lang="sass">
#add-pro
    padding: 10px 50px
    .material-input
      font-weight: 800
      font-size: 23px
      color: rgba(176, 195, 25, 0.8)
    #title-item
      display: block
      .el-form-item__content
        display: block !important
    .diver
      display: block
      font-size: 12px
      color: #ccc
      line-height: 40px
      margin-bottom: 22px
      border-bottom: 1px dashed #ccc
      .el-form-item__error
        position: relative
        padding-top: 0
        top: auto
        left: 10px
        display: inline-block
    .editor-container
      min-height: 500px
      margin: 0 0 30px
      .editor-upload-btn-container
        text-align: right
        margin-right: 10px
        .editor-upload-btn
        display: inline-block
    .table-sku
      font-size: 12px
    .upload-img-col
      display: flex
      justify-content: center
      .upload-img
        display: block
        height: 28px
        width: 28px
    .el-icon-edit
      margin-left: 5px
      line-height: 23px
      &:before
        -webkit-text-fill-color: #409EFF
        fill: #409EFF
</style>
