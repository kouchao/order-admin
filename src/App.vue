<template>
  <div id="app">
    <el-container>
      <el-header>点餐系统后台管理</el-header>
      <el-container>
        <el-aside width="200px">
          <menu-list></menu-list>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>版权所有：寇超</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import menuList from './components/MenuList'
  export default {
    name: 'app',
    data(){
      return {
        id: ''
      }
    },
    components: {
      menuList
    },
    sockets:{
      connect: function(){
        this.id = this.$socket.id
        this.$notify({
          title: '提示',
          message: '已连接服务器',
          duration: 1000
        });
        console.log('$socket.id: ' + this.$socket.id)
      },
      historyChange: function(val){
        if(val.user.msg == '呼叫服务员' || val.user.msg == '提交了菜单'){
          this.$notify({
            title: '提示',
            message: val.user.name + ': ' + val.user.msg,
            duration: 0
          });
        }
      }
    }
  }
</script>

<style>
  .el-header {
    background: #409eff;
    line-height: 60px;
    font-size: 20px;
    color: #fff;
  }

  .el-aside {
    background: #fff;
  }

  .el-main {
    border-left: 1px solid #ebeef5;
  }

  .el-footer {
    background: #409eff;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }

  #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .el-container {
    height: 100%;
  }

  .pagination {
    padding: 15px;
    background: #fff;
    margin: 15px 0;
    text-align: right;
  }


</style>
