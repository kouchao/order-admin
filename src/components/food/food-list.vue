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
          <el-popover
            class="el-button el-button--text el-button--small"
            placement="top"
            width="160"
            v-model="scope.row.visible">
            <el-input v-model="priority" placeholder="请输入优先级"></el-input>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="recommend(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="small">推荐</el-button>
          </el-popover>
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
    name: "food-list",
    data() {
      return {
        foodList: [],
        loading: false,
        total: 0,
        priority: ''
      }
    },
    created() {
      this.getFood(0)
    },
    methods: {
      getFood(page) {
        this.loading = true
        let url = `${this.$baseUrl}/food`;

        let params = {
          page: page,
          size: 10
        }

        this.$ajax(url, {
          params: params
        }).then(res => {
          if (res.data.code == 0) {
            res.data.dataList.forEach(o => o.visible = false)

            this.foodList = res.data.dataList
            this.total = res.data.count
          }
        }).finally(() => {
          this.loading = false
        })
      },



      paginationChange(page) {
        this.getFood(page - 1)
      },

      recommend(foodId){
        const url = `${this.$baseUrl}/recommend`
        const data = {
          foodId,
          priority: this.priority || 0
        }

        this.$ajax.post(url, data).then(res => {
          if (res.data.code == 0) {
            this.$alert('推荐成功', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            });
          }
        })

      },
      edit(id) {
        this.$router.push({
          name: 'food-edit',
          params: {
            id: id
          }
        })
      },

      del(id) {
        var _this = this;
        this.$confirm('确定删除吗？', '提示').then(function (res) {

          _this.loading = true
          let url = `${_this.$baseUrl}/food`;

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
              _this.getFood(0)
            } else {
              _this.$alert(res.data.message, '提示', {
                confirmButtonText: '确定'
              });
            }
          }).finally(() => {
            this.loading = false
          })
        }).catch(function (err) {

        });

      }
    }

  }
</script>

<style scoped>

</style>
