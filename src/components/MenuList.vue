<template>
  <el-menu
    :router="true"
    class="el-menu-vertical-demo">
    <el-submenu :index="index + ''" v-for="(submenu, index) of menuList">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{submenu.name}}</span>
      </template>
      <el-menu-item v-for="(item, index2) of submenu.child" :route="item.route" :index="index + '-' + index2">
        {{item.name}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "MenuList",
    data: function () {
      return {
        menuList: [{
          name: '菜品管理',
          child: [{
            name: '菜品列表',
            route: {
              name: 'foodList'
            }
          }, {
            name: '添加菜品',
            route: {
              name: 'foodAdd'
            }
          }, {
            name: '推荐菜品',
            route: {
              name: 'recommend'
            }
          }]
        }, {
          name: '分类管理',
          child: [{
            name: '分类列表',
            route: {
              name: 'categoryList'
            }
          }, {
            name: '添加分类',
            route: {
              name: 'categoryAdd'
            }
          }]
        }, {
          name: '餐桌管理',
          child: [{
            name: '餐桌列表',
            route: {
              name: 'tableList'
            }
          }, {
            name: '添加餐桌',
            route: {
              name: 'tableAdd'
            }
          }]
        }, {
          name: '订单管理',
          child: [{
            name: '订单列表',
            route: {
              name: 'order'
            }
          },
          // { name: '订单分析',
          //   route: {
          //     name: 'chart'
          //   }
          // }
          ]
        }, {
          name: '用户服务',
          child: [{
            name: '用户呼叫',
            route: {
              name: 'waiter'
            }
          }]
        }]
      }
    }
  }
</script>

<style scoped>

</style>
