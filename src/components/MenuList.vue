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
              name: 'food-list'
            }
          }, {
            name: '添加菜品',
            route: {
              name: 'food-add'
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
              name: 'category-list'
            }
          }, {
            name: '添加分类',
            route: {
              name: 'category-add'
            }
          }]
        }, {
          name: '餐桌管理',
          child: [{
            name: '餐桌列表',
            route: {
              name: 'table-list'
            }
          }, {
            name: '添加餐桌',
            route: {
              name: 'table-add'
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
