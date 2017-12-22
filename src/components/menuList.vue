<template>
  <el-menu
    :router="true"
    class="el-menu-vertical-demo">
    <el-submenu :index="index + ''" v-for="(submenu, index) of menuList">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{submenu.name}}</span>
      </template>
      <el-menu-item v-for="(item, index2) of submenu.child" :route="item.path" :index="index + '-' + index2">{{item.name}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "menu-list",
    data: function () {
      return {
        menuList: [{
          name: '菜品管理',
          child: [{
            name: '菜品列表',
            path: {
              name: 'food-list'
            }
          }, {
            name: '添加菜品',
            path: {
              name: 'food-add'
            }
          }]
        }, {
          name: '分类管理',
          child: [{
            name: '分类列表',
            path: '123'
          }]
        }]
      }
    }
  }
</script>

<style scoped>

</style>
