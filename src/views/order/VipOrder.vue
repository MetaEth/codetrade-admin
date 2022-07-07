<template>
  <div class="app-container"
       id="order">
    <p class="page-title">订单列表</p>
    <div class="filter-container">
      <div style="float: right; display: flex">
        <el-select v-model="params.status"
                   style="width: 200px; margin: 0 3px"
                   @change="orderStatus"
                   placeholder="选择订单状态">
          <el-option label="未支付" value="0"></el-option>
          <el-option label="已支付" value="1"></el-option>
        </el-select>
<!--        <el-input v-model.number="params.tel"-->
<!--            style="margin: 0 3px"></el-input>-->
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
              :data="viporder">
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
                       width="220px"
                       prop="userName"
                       align="center">
      </el-table-column>
      <el-table-column label="支付金额"
                       width="80px"
                       prop="payMoney"
                       align="center">
      </el-table-column>
      <el-table-column label="会员类型"
                       prop="vipType"
                       width="120px"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.vipType==1">月度会员</span>
          <span v-if="scope.row.vipType==2">年度会员</span>
          <span v-if="scope.row.vipType==3">三年会员</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="180px"
                       prop="createdAt"
                       align="center">
      </el-table-column>
      <el-table-column label="订单状态"
                       width="120px"
                       prop="status"
                       align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">未支付</el-tag>
          <el-tag v-if="scope.row.status == 1">已支付</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="120px"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="handleDel(scope.$index,scope.row)">删除
          </el-button>
<!--           <el-button size="mini"-->
<!--              type="danger"-->
<!--              v-if="scope.row.status == -1"-->
<!--              @click="handleDel(scope.$index, scope.row)">删除-->
<!--          </el-button>-->
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
import {viporderCount,viporderList,viporderDelete} from "@/api/order";
import moment from 'moment'
import {count} from "@/api/shop";
export default {
  name: "VipOrder",
  mixins: [pageMixin],
  data() {
    return {
      status:"null",
      table_loading:false,
      viporder:[],
    }
  },
  methods: {
    orderStatus(){
      this.get_viporder()
      this.get_count()
    },
    handleSizeChange(e){
      this.get_viporder()
    },
    handleCurrentChange(e){
      this.get_viporder()
    },
    async get_viporder(){
      var data=[]
      var result=await viporderList(this.params)
      for(var object of result){
        data.push({
          id:object._id,
          userName:object.own.username,
          orderId:object.orderId,
          payMoney:object.payMoney,
          status:object.status,
          vipType:object.vipType,
          vipAt:moment(object.vipAt).format('YYYY-MM-DD HH:mm:ss'),
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })
      }
      this.viporder=data
    },
    async get_count(){
      this.total=await viporderCount(this.params)
    },
    handleDel(index, row) {
      this.$confirm('是否删除该订单', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        viporderDelete({id:row.id}).then((res)=>{
          this.viporder.splice(index, 1)
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
  created(){
    this.get_count()
    this.get_viporder()

  }
}
</script>

<style lang="sass" scoped>
#order

</style>
