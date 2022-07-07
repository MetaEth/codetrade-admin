<template>
  <div class="app-container" id="product-index">
    <p class="page-title">商品列表</p>
    <div class="filter-container">
      <el-button type="primary"
                 plain
                 class="filter-item"
                 @click="addGoods()">添加商品</el-button>
      <div style="float: right; display: flex">
        <el-cascader placeholder="分类"
                     style="width: 210px;"
                     v-model="value"
                     :options="options"
                     @change="handleChange"></el-cascader>
<!--        <el-select v-model="params.cate_id" placeholder="分类">-->
<!--          <el-option v-for="(item, index) in cate"-->
<!--                     :label="item"-->
<!--                     :value="index"-->
<!--                     :key="index"></el-option>-->
<!--        </el-select>-->
        <el-input placeholder="商品名"
                  style="width: 200px; margin: 0 3px"
                  class="filter-item"
                  v-model="params.title"></el-input>
        <el-button type="primary"
                   class="filter-item"
                   @click="search">搜索</el-button>
      </div>
    </div>
    <el-table v-loading="table_loading"
              ref="tableRef"
              element-loading-text="加载中..."
              border
              highlight-current-row
              row-key='id'
              :data="shop">
      <el-table-column label="ID"
                       align="center"
                       width="50px">
        <template slot-scope="scope">
          <span>{{(params.page-1)*params.pageSize+scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="商品名"
                       width="220px"
                       prop="shop_name">
      </el-table-column>
      <el-table-column align="center"
                       width="100px"
                       label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture"
               style="width: 50px; height:50px; dislay: block">
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="所属分类"
                       prop="cate_id">
        <template slot-scope="scope">

          <span>{{scope.row.classify}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="价格"
                       width="80px"
                       prop="price">
      </el-table-column>
      <el-table-column align="center"
                       label="销量"
                       width="80px"
                       prop="sale_number">
      </el-table-column>
      <el-table-column align="center"
                       label="下载次数"
                       width="80px"
                       prop="download_times">
      </el-table-column>
      <el-table-column align="center"
                       label="创建时间"
                       width="180px"
                       prop="createdAt">
      </el-table-column>
      <el-table-column align="center"
                       label="状态"
                       width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_sale==true"
                  type="success">上架</el-tag>
          <el-tag v-if="scope.row.is_sale==false"
                  type="danger">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="170px"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="page-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     :current-page.sync="params.page"
                     @current-change="handleCurrentChange"
                     :page-sizes="page_sizes"
                     :page-size.sync="params.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { pageMixin } from '@/utils/mixin'
import {shopList,shopDelete,codetypeList,platformList,typeList,count} from "@/api/shop";
import moment from 'moment'
export default {
  name: "ShopList",
  mixins: [pageMixin],
  data() {
    return {

      shop:[],
      table_loading:true,
      value: [],
      options: []
    }
  },
  methods: {
    search() {

    },

    handleChange(value) {
      console.log(value,"iii");
    },
    handleSizeChange(e){
      this.get_shop()
    },
    handleCurrentChange(e){
      this.get_shop()
    },
    //编辑商品,并把用户信息存储在VUEX,方便调用
    handleEdit(info) {
      this.$router.push({path: '/product/editgoods', query: {id: info.id}})
    },
    //删除商品
    handleDel(index, info) {
      console.log(info,"info")
      this.$confirm('删除商品将不可恢复', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shopDelete({id:info.id}).then(()=>{
          this.shop.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //跳转到添加商品
    addGoods() {
      this.$router.push('/product/addgoods')
    },
    async get_shop(){
      var data=[]
      var result=await shopList(this.params)
      for(var object of result){
        data.push({
          id:object._id,
          shop_name:object.shop_name,
          picture: object.picture,
          classify:object.codetype_id.codetype+'->'+object.platform_id.platform_name+'->'+object.type_id.type_name,
          price:Number(object.price).toFixed(2),
          sale_number:object.sale_number,
          download_times:object.download_times,
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          is_sale:object.is_sale,
        })
      }
      this.table_loading=false
      this.shop=data
    },
    async get_type(){
      var data=[]
      var result=await typeList()
      //console.log(result,"type")
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
          if(j==0){
            console.log(j,"j")
            codetype[i].children.push({value:null,label:"不限"})
          }
          codetype[i].children.push({value:result_platform[j]._id,label:result_platform[j].platform_name})
          codetype[i].children[j].children=[]
          //第三层嵌套
          for(var k=0;k<result_type.length;k++){
            if(j==0){

            }else{
              codetype[i].children[j].children.push({value:result_type[k]._id,label:result_type[k].type_name})

            }
          }
        }
      }
      this.options=codetype
      console.log(codetype,"codetype")
    },
    async get_platform(){
      var data=[]
      var result=await platformList()
      //console.log(result,"platform")
    },
    async get_count(){
      this.total=await count()
    }
  },
  created() {
    this.get_shop()
    this.get_codetype()
    //this.get_platform()
    //this.get_type()
    this.get_count()
  }
}
</script>

<style lang="sass">
#product-index
  .search-container
    margin-bottom: 10px
  .hide-expand
    .el-table__expand-column
      .cell
        visibility: hidden
  .img-container
    width: 23px
    height: 23px
    margin: 0 auto
  .sku-table
    td, th
      border-right: none
  .el-table__expanded-cell
    padding: 10px
    background: #f0f0f0

</style>
