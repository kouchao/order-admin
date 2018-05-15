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
          <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button @click="getQrcode(scope.row)" type="text" size="small">生成二维码</el-button>
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
    <el-dialog title="二维码" :visible.sync="outerVisible" center>
      <div style="text-align: center">
        <qrcode
          :value="$appUrl + '?id=' + qrcodeUrl"
          v-if="qrcodeUrl"
          :options="{ size: 170 }">
        </qrcode>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveImg">下载</el-button>
        <el-button type="primary" @click="print">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Qrcode from '@xkeshi/vue-qrcode'

  export default {
    name: "table-list",
    data() {
      return {
        tableList: [],
        loading: false,
        total: 0,
        qrcodeUrl: '',
        outerVisible: false,
        imgName: ''
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

      },
      getQrcode(row) {
        this.qrcodeUrl = row.id
        this.outerVisible = true
        this.imgName = row.name + '.png'
      },
      saveImg() {
        const myCanvas = document.querySelector('canvas');
        const image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const a = document.createElement('a');
        a.href = image;
        a.download = this.imgName;
        a.click();
      },
      print() {
        const myCanvas = document.querySelector('canvas');
        const image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const newWindow = window.open('_blank');
        newWindow.document.write('<img src="' + image + '"/>');
        newWindow.document.close();
        setTimeout(function () {
          newWindow.print();
          newWindow.close()
        }, 0)

      }
    },
    components: {
      Qrcode
    }

  }
</script>

<style scoped>
  canvas {
    margin: auto;
  }
</style>
