<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="原价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="现价">
        <el-input v-model="form.oldPrice"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.categoryId" placeholder="请选择分类">
          <el-option v-for="item of categoryList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addFood" :loading="loading">添加</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  export default {
    name: "food-list",
    data() {
      return {
        form: {
          name: '',
          price: '',
          oldPrice: '',
          describe: '',
          categoryId: '',
          image: ''
        },
        categoryList: [],
        loading: false
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      addFood(){
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/food`;

        let data = this.form

        this.$ajax.post(url, data).then(function (res) {
          if (res.data.code == 0) {
            _this.$alert('添加成功', '提示', {
              confirmButtonText: '确定'
            });
          }else {
            _this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            });
          }
        }).finally(function () {
          _this.loading = false
        })
      },
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
      getCategory() {
        var _this = this;
        let url = `${this.$baseUrl}/category`;

        let params = {
          page: 0,
          size: 99
        }

        this.$ajax(url, {
          params: params
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.categoryList = res.data.dataList
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
