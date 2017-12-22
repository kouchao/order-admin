<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <menu-list></menu-list>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import menuList from './components/menuList'
  export default {
    name: 'app',
    components: {
      menuList
    }
  }
</script>

<style>
  .el-header {
    background: #409eff;
  }

  .el-aside {
    background: #fff;
  }

  .el-main {
    border-left: 1px solid #ebeef5;
  }

  .el-footer {
    background: #409eff;
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
