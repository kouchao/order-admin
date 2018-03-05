<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveCategory($event)" :loading="loading">{{$route.params.id ? '保存' : '添加'}}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  export default {
    name: "category-list",
    data() {
      return {
        form: {
          name: '',
        },
        categoryList: [],
        loading: false,
        imageUrl: ''
      }
    },
    created() {
      if (this.$route.params.id) {
        this.getCategory()
      }
      this.getCategory()
    },
    methods: {
      saveCategory(event) {
        event.preventDefault();
        if (this.$route.params.id) {
          this.isEdit(event)
        } else {
          this.isAdd(event)
        }
      },
      getCategory() {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/category`;

        let params = {
          id: this.$route.params.id
        }

        this.$ajax(url, {
          params: params
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.form = res.data.data
          }
        }).finally(function () {
          _this.loading = false
        })
      },
      isAdd: function () {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/category`;

        this.$ajax.post(url, this.form).then(function (res) {
          if (res.data.code == 0) {
            _this.$alert('添加成功', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            _this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            });
          }
        }).finally(function () {
          _this.loading = false
        })
      },
      isEdit: function () {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/category`;

        let formData = new FormData();
        formData.append('id', this.$route.params.id);

        let data = this.form

        data.id = this.$route.params.id

        this.$ajax.put(url, data).then(function (res) {
          if (res.data.code == 0) {
            _this.$alert('修改成功', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            _this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            });
          }
        }).finally(function () {
          _this.loading = false
        })
      }

    }

  }
</script>

<style scoped>
</style>
