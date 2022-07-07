<template>
  <div class="app-container"
       id="order">
    <p class="page-title">订单列表</p>
    <div class="filter-container">
      <div style="float: right; display: flex">
        <el-select v-model="status"
                   style="width: 200px; margin: 0 3px"
                   placeholder="选择订单状态">
          <el-option label="取消"
                     value="-1"></el-option>
          <el-option label="待支付"
                     value="0"></el-option>
          <el-option label="待发货"
                     value="1"></el-option>
          <el-option label="待收货"
                     value="2"></el-option>
          <el-option label="完成"
                     value="3"></el-option>
        </el-select>
        <!-- <el-input v-model.number="params.tel"
            style="margin: 0 3px"></el-input> -->
        <el-button type="primary"
                   class="filter-item"
                   @click="search()">搜索</el-button>
      </div>
    </div>
    <el-table v-loading="table_loading"
              ref="tableRef"
              element-loading-text="加载中..."
              border
              highlight-current-row
              row-key='id'
              :data="shoporder">
      <el-table-column label="ID"
                       width="50px"
                       align="center">
        <template slot-scope="scope">
          <span>{{(params.page-1)*params.pageSize+scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号"
                       prop="orderId"
                       align="center">
      </el-table-column>
      <el-table-column label="用户名称"
                       prop="username"
                       align="center">
      </el-table-column>
      <el-table-column label="商品名称"
                       prop="shop_name"
                       align="center">
      </el-table-column>
      <el-table-column label="商品价格"
                       width="80px"
                       prop="shopMoney"
                       align="center">
      </el-table-column>
      <el-table-column label="支付金额"
                       width="80px"
                       prop="payMoney"
                       align="center">
      </el-table-column>
      <el-table-column label="支付时间"
                       prop="createdAt"
                       width="180px"
                       align="center">
      </el-table-column>

      <el-table-column label="订单状态"
                       width="80px"
                       prop="orderStatus"
                       align="center">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-if="scope.row.status == 0">未支付</el-tag>
          <el-tag v-if="scope.row.status == 1">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="120px"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="handleDel(scope.$index,scope.row)">删除
          </el-button>
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
import { pageMixin } from '@/utils/mixin'
import {shoporderList, shoporderCount, shoporderDelete} from "@/api/order";
import moment from 'moment'
export default {
  name: "ShopOrder",
  mixins: [pageMixin],
  data() {
    return {

      table_loading:false,
      status:"0",
      shoporder:[],

    }
  },
  methods: {
    async get_count(){
      this.total=await shoporderCount(this.params)
    },
    async get_shoporder(){
      var data=[]
      var result=await shoporderList(this.params)
      for(var object of result){
        data.push({
          id:object._id,
          orderId:object.orderId,
          username:object.own.username,
          shop_name:object.shop.shop_name,
          shopMoney:Number(object.shopMoney).toFixed(2),
          payMoney:Number(object.payMoney).toFixed(2),
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          status:object.status
        })
      }
      this.shoporder=data
    },
    handleDel(index, row) {
      this.$confirm('是否删除该订单', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shoporderDelete({id:row.id}).then((res)=>{
          this.shoporder.splice(index, 1)
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
    }
  },
  created() {
    this.get_shoporder()
    this.get_count()
  }
}
</script>

<style lang="sass" scoped>
#order

</style>


