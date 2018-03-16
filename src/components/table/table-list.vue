<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="getInfo(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
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
    name: "table-list",
    data() {
      return {
        tableList: [],
        loading: false,
        total: 0
      }
    },
    created() {
      this.getTable(0)
    },
    methods: {
      getTable(page) {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/table`;

        let params = {
          page: page,
          size: 10
        }

        this.$ajax(url, {
          params: params
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.tableList = res.data.dataList
            _this.total = res.data.count
          }
        }).finally(function () {
          _this.loading = false
        })
      },

      paginationChange(page) {
        this.getTable(page - 1)
      },

      edit(id) {
        this.$router.push({
          name: 'table-edit',
          params: {
            id: id
          }
        })
      },

      del(id) {
        var _this = this;
        this.$confirm('确定删除吗？', '提示').then(function (res) {

          _this.loading = true
          let url = `${_this.$baseUrl}/table`;

          let params = {
            id: id
          }
          _this.$ajax.delete(url, {
            params: params
          }).then(function (res) {
            if (res.data.code == 0) {
              _this.$alert('删除成功', '提示', {
                confirmButtonText: '确定'
              });
              _this.getTable(0)
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
