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
        prop="food.name"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="completed_number"
        label="完成数量">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button v-if="scope.row.completed_number < scope.row.count" @click="addOne(scope.row)" type="text" size="small">+1</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import api from '../util/api'
  import moment from 'moment'
  export default {
    name: "OrderDetail",
    data() {
      return {
        orderList: [],
        loading: false,
      }
    },
    created() {
      this.getOrder(0)
    },
    methods: {
      getOrder() {
        this.loading = true
        let url = api.orderDetail;

        let params = {
          id: this.$route.params.id
        }

        this.$ajax(url, {
          params: params
        }).then(res => {
          if (res.data.code == 0) {

            res.data.dataList.forEach(o => {
              o.completed_number = o.completed_number || 0
            })
            this.orderList = res.data.dataList
          }
        }).finally(() => {
          this.loading = false
        })
      },
      del(id) {
        this.$confirm('确定删除吗？', '提示').then(res => {

          let url = api.orderDetail;

          let params = {
            id
          }
          this.$ajax.delete(url, {
            params: params
          }).then(res => {
            if (res.data.code == 0) {
              this.getOrder()
            } else {
              this.$alert(res.data.message, '提示', {
                confirmButtonText: '确定'
              });
            }
          })
        });

      },
      addOne(row){
        let {id, completed_number, count} = row
        if(completed_number >= count){
          return false
        }

        completed_number++

        let url = api.orderDetail;

        let params = {
          id,
          completed_number
        }

        this.$ajax.put(url, params).then(res => {
          this.getOrder()
        })
      }
    }
  }
</script>

<style scoped>

</style>
