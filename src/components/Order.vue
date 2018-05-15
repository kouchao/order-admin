<template>
  <div>
    <el-table
      v-loading="loading"
      :data="orderList"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单id">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="pay_time"
        label="支付时间">
      </el-table-column>
      <el-table-column
        prop="table.name"
        label="餐桌">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="goToInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="pay(scope.row.id)" type="text" size="small">支付</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="paginationChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api from '../util/api'
  import moment from 'moment'
  export default {
    name: "Order",
    data() {
      return {
        orderList: [],
        loading: false,
        total: 0,
      }
    },
    created() {
      this.getOrder(0)
    },
    methods: {
      getOrder(page) {
        this.loading = true
        let url = api.order;

        let params = {
          page: page,
          size: 10
        }

        this.$ajax(url, {
          params: params
        }).then(res => {
          if (res.data.code == 0) {
            res.data.dataList.forEach(o =>{
              o.create_time = moment(o.create_time).format('YYYY-MM-DD hh:MM:ss')
              o.pay_time = o.pay_time ? moment(o.pay_time).format('YYYY-MM-DD hh:MM:ss') : '未支付'
            })
            this.orderList = res.data.dataList
            this.total = res.data.count
          }
        }).finally(() => {
          this.loading = false
        })
      },

      paginationChange(page) {
        this.getOrder(page - 1)
      },
      pay(id){
        let url = api.pay

        this.$ajax.put(url, {
          id
        }).then(res => {
          if (res.data.code == 0) {
            this.$alert('支付成功', '提示', {
              confirmButtonText: '确定'
            });
          }
        }).catch(err => {
          this.$alert(res.data.message, '提示', {
            confirmButtonText: '确定'
          });
        }).finally(() => {
          this.loading = false
        })
      },
      goToInfo(id){
        this.$router.push({
          name: 'orderDetail',
          params: {
            id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
