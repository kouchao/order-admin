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
        <el-input v-model="form.old_price"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.category_id" placeholder="请选择分类">
          <el-option v-for="item of categoryList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveFood($event)" :loading="loading">添加</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  const ajaxConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  export default {
    name: "food-list",
    data() {
      return {
        form: {
          name: '',
          price: '',
          old_price: '',
          describe: '',
          category_id: '',
          image: ''
        },
        categoryList: [],
        loading: false,
        imageUrl: ''
      }
    },
    created() {
      if (this.$route.params.id) {
        this.getFood()
      }
      this.getCategory()
    },
    methods: {
      saveFood(event) {
        event.preventDefault();
        if (this.$route.params.id) {
          this.isEdit(event)
        } else {
          this.isAdd(event)
        }
      },
      getFood() {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/food`;

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
      },
      isAdd: function () {
        var _this = this;
        this.loading = true
        let url = `${this.$baseUrl}/food`;


        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('price', this.form.price);
        formData.append('old_price', this.form.old_price);
        formData.append('describe', this.form.describe);
        formData.append('category_id', this.form.category_id);
        formData.append('image', this.form.image);

        this.$ajax.post(url, formData, ajaxConfig).then(function (res) {
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
        let url = `${this.$baseUrl}/food`;

        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('price', this.form.price);
        formData.append('old_price', this.form.old_price);
        formData.append('describe', this.form.describe);
        formData.append('category_id', this.form.category_id);
        formData.append('image', this.form.image);


        this.$ajax.put(url, formData, ajaxConfig).then(function (res) {
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
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // this.imageUrl = URL.createObjectURL(file.raw);

        this.form.image = file;
        return isJPG && isLt2M;
      }

    }

  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
