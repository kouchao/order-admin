<template>
  <div>
    <el-table
      v-loading="loading"
      :data="recommendList"
      border
      style="width: 100%">
      <el-table-column
        prop="food.name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="food.describe"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="food.old_price"
        label="原价">
      </el-table-column>
      <el-table-column
        prop="food.price"
        label="现价">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="delThis(scope.row.id)" type="text" size="small">取消推荐</el-button>
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
        name: "Recommend",
      data() {
        return {
          recommendList: [],
          loading: false,
          total: 0
        }
      },
      created() {
        this.getRecommend(0)
      },
      methods: {
        getRecommend(page) {
          var _this = this;
          this.loading = true
          let url = `${this.$baseUrl}/recommend`;

          let params = {
            page: page,
            size: 10
          }

          this.$ajax(url, {
            params: params
          }).then(function (res) {
            if (res.data.code == 0) {
              _this.recommendList = res.data.dataList
              _this.total = res.data.count
            }
          }).finally(function () {
            _this.loading = false
          })
        },

        paginationChange(page) {
          this.getRecommend(page - 1)
        },
        delThis(id) {
          console.log(id)
          var _this = this;
          this.$confirm('确定取消推荐吗？', '提示').then(function (res) {

            _this.loading = true
            let url = `${_this.$baseUrl}/recommend`;

            let params = {
              id: id
            }
            _this.$ajax.delete(url, {
              params: params
            }).then(function (res) {
              if (res.data.code == 0) {
                _this.$alert('已取消推荐', '提示', {
                  confirmButtonText: '确定'
                });
                _this.getRecommend(0)
              } else {
                _this.$alert(res.data.message, '提示', {
                  confirmButtonText: '确定'
                });
              }
            }).finally(function () {
              _this.loading = false
            })
          }).catch(function (a) {

          });

        }
      }
    }
</script>

<style scoped>

</style>
