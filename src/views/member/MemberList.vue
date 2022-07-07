<template>
  <div class="app-container">
    <p class="page-title">会员管理</p>
    <div class="filter-container">
      <div style="float: right; display: flex">
        <el-input placeholder="输入手机号"
                  v-model="params.phone"
                  style="margin: 0 3px"></el-input>
        <el-button type="primary"
                   class="filter-item"
                   @click="search()">搜索</el-button>
      </div>
    </div>
    <el-table v-loading="table_loading"
              element-loading-text="加载中..."
              border
              fit
              highlight-current-row
              :data="user">
      <el-table-column label="ID"
                       align="center"
                       width="60px">
        <template slot-scope="scope">
          <span>{{(params.page-1)*params.pageSize+scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       prop="username"
                       label="会员名称">
      </el-table-column>
      <el-table-column align="center"
                       prop="phone"
                       label="手机号码">
      </el-table-column>
      <el-table-column align="center"
                       prop="money"
                       width="60px"
                       label="余额">
      </el-table-column>
      <el-table-column align="center"
                       width="150px"
                       label="会员类型">
        <template slot-scope="scope">
          <span v-if="scope.row.vip_type==0">未开通</span>
          <span v-if="scope.row.vip_type==1">月度会员</span>
          <span v-if="scope.row.vip_type==2">年度会员</span>
          <span v-if="scope.row.vip_type==3">三年会员</span>

        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="vipAt"
                       label="到期时间">
      </el-table-column>
      <el-table-column align="center"
                       prop="status"
                       width="120px"
                       label="状态">
        <template slot-scope="scope">
          <el-tag type="success">正常</el-tag>
<!--          <el-tag type="warning"-->
<!--                  v-else>封停</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="createdAt"
                       label="注册时间">
      </el-table-column>
      <el-table-column align="center"
                       prop="updatedAt"
                       label="最近登入时间">
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="80px">
        <template slot-scope="scope">
          <el-tooltip content="设置会员是否封停"
                      placement="top">
            <el-switch :active-value="1"
                       :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       @click.native="setStatus(scope.$index, scope.row)"
                       v-model="scope.row.status">
            </el-switch>
          </el-tooltip>
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
import {userList,count} from "@/api/user";
import { pageMixin } from '@/utils/mixin'
import moment from "moment";
export default {
  name: "MemberList",
  mixins: [pageMixin],
  data() {
    return {
      user:[],
      table_loading:true
    }
    return {
      params: {
        name: ''
      }
    }
  },
  methods: {
    search() {
      this.get_user()
      this.get_count()
      console.log(this.phone)
    },
    handleSizeChange(){
      this.get_user()
    },
    handleCurrentChange(){
      this.get_user()
    },
    async get_count(){
      this.total=await count(this.params)
    },
    async get_user(){
      var data=[]
      var result=await userList(this.params)
      for(var object of result){
        data.push({
          username:object.username,
          phone:object.phone,
          money:object.money,
          vip_type:object.vip_type,
          vipAt:moment(object.vipAt).format('YYYY-MM-DD HH:mm:ss'),
          createdAt:moment(object.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt:moment(object.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        })
      }
      this.table_loading=false
      this.user=data
    },
    setStatus(index, row) {
      const status = row.status == 1 ? 0 : 1
      changeStatus({ id: row.id, status: row.status }).then(res => {

      }).catch(err => {
        row.status = status
      })
    },

  },
  created() {
    this.get_user()
    this.get_count()
  }
}
</script>

<style scoped lang="scss">
</style>

