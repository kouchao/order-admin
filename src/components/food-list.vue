<template>
  <div>
    <el-table
      v-loading="loading"
      :data="foodList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="old_price"
        label="原价">
      </el-table-column>
      <el-table-column
        prop="price"
        label="现价">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="getInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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
  export default {
    name: "food-list",
    data() {
      return {
        foodList: [],
        loading: false,
        total: 0
      }
    },
    created() {
      this.getFood(0)
    },
    methods: {
      getFood(page) {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/food`;

        let params = {
          page: page,
          size: 10
        }

        this.$ajax(url, {
          params: params
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.foodList = res.data.dataList
            _this.total = res.data.count
          }
        }).finally(function () {
          _this.loading = false
        })
      },

      paginationChange(page) {
        this.getFood(page - 1)
      }
    }

  }
</script>

<style scoped>

</style>
