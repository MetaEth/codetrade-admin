<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12"
              style="height: 300px;"
              id="member">
      </el-col>
      <el-col :span="12"
              id="sales"
              style="height: 300px;">
      </el-col>
    </el-row>
    <el-row class="enter-container">
      <el-col :span="6">
        <div class="enter"
             @click="gotoUrl('/member/index')">
          <div class="img">
            <svg-icon icon-class="admin-manage"></svg-icon>
          </div>
          <div class="text">
            <div class="number">100</div>
            <div class="title">会员数量</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="enter"
             @click="gotoUrl('/product/goods')">
          <div class="img">
            <svg-icon icon-class="product"></svg-icon>
          </div>
          <div class="text">
            <div class="number">1000</div>
            <div class="title">商品数量</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="enter"
             @click="gotoUrl('/order/order')">
          <div class="img">
            <svg-icon icon-class="order"></svg-icon>
          </div>
          <div class="text">
            <div class="number">50</div>
            <div class="title">订单数量</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="enter"
             @click="gotoUrl('/system/database')">
          <div class="img">
            <svg-icon icon-class="system"></svg-icon>
          </div>
          <div class="text">
            <div class="number time">2018-05-25 14:10:36</div>
            <div class="title">系统备份时间</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              id="order"
              style="height: 300px;">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'index',
  data () {
    return {
      echarts1: null,
      echarts2: null,
      echarts3: null,
      enter: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
    })
  },
  mounted () {
    this.$nextTick(() => {
      this._getData1()
      this._getData2()
      this._getData3()
    })
  },
  methods: {
    gotoUrl (url) {
      this.$router.push(url)
    },
    initChart1 () {
      this.echarts1 = echarts.init(document.getElementById('member'))
      this.echarts1.setOption({
        title: {
          x: 'center',
          text: '销售额度'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {}
        }]
      })
    },
    initChart2 () {
      this.echarts2 = echarts.init(document.getElementById('sales'))
      this.echarts2.setOption({
        title: {
          x: 'center',
          text: '注册人数'
        },
        legend: {
          x: 'right',
          data: ['注册人数', '活跃人数']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
        ]
      })
    },
    initChart3 () {
      this.echarts3 = echarts.init(document.getElementById('order'))
      this.echarts3.setOption({
        title: {
          x: 'center',
          text: '订单状态'
        },
        legend: {
          data: ['取消订单', '待支付订单', '待发货订单', '待收货订单', '完成订单'],
          x: 'right'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [],
        animationEasing: 'elasticOut',
        animationDelayUpdate (idx) {
          return idx * 5
        }
      })
    },
    _getData1 () {
      this.echarts1.showLoading()
      this.echarts1.setOption({
        xAxis: { data: ['05-10', '05-11', '05-12', '05-13', '05-14', '05-15', '05-16'] },
        series: [{ data: [10, 20, 30, 40, 50, 100, 1000] }]
      })
      this.echarts1.hideLoading()
    },
    _getData2 () {
      this.echarts2.showLoading()
      this.echarts2.setOption({
        xAxis: { data: ['05-10', '05-11', '05-12', '05-13', '05-14', '05-15', '05-16']},
        series: [
          { data: [10, 10, 15, 10, 2, 5, 10], type: 'bar', name: '注册人数', barWidth: '40%' },
          { data: [0, 0, 0, 0, 1, 0, 0], type: 'bar', name: '活跃人数', barWidth: '40%' }
        ]
      })
      this.echarts2.hideLoading()
    },
    _getData3 () {
      this.echarts3.setOption({
        xAxis: { data: ['05-10', '05-11', '05-12', '05-13', '05-14', '05-15', '05-16']},
        series: [
          {
            data: [0, 5, 10, 13, 15, 20, 25],
            type: 'bar',
            name: '取消订单',
            animationDelay (idx) {
              return idx * 10
            }
          }, {
            data: [0, 1, 2, 5, 0, 10, 15],
            type: 'bar',
            name: '待支付订单',
            animationDelay (idx) {
              return idx * 10 + 100
            }
          }, {
            data: [10, 2, 5, 10, 100, 15, 20],
            type: 'bar',
            name: '待发货订单',
            animationDelay (idx) {
              return idx * 10 + 200
            }
          }, {
            data: [20, 10, 30, 40, 50, 80, 10],
            type: 'bar',
            name: '待收货订单',
            animationDelay (idx) {
              return idx * 10 + 300
            }
          }, {
            data: [10, 1, 20, 30, 40, 50, 60],
            type: 'bar',
            name: '完成订单',
            animationDelay (idx) {
              return idx * 10 + 400
            }
          }]
      })
    }
  },
  beforeDestroy () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .enter-container {
      margin: 30px 0;
      .enter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        margin: 10px 30px;
        box-shadow: 0 0 3px #000;
        .img {
          background: #2ec7c9;
          border-right: 1px solid #fff;
          svg {
            width: 30px;
            height: 30px;
            margin: 30px;
            fill: #fff;
          }
        }
        .text {
          flex: 1;
          text-align: center;
          .number {
            font-size: 30px;
          }
          .time {
            font-size: 15px;
          }
          .title {
            color: #ccc;
          }
        }
        &:hover {
          background-color: #7cbdbc;
          color: #fff;
          .img {
            background-color: #7cbdbc;
            // svg {
            //     fill: #2ec7c9;
            // }
          }
          .title {
            color: #fff;
          }
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>


