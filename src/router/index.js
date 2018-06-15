import Vue from 'vue'
import Router from 'vue-router'


import Logo from '@/components/Logo'


import FoodList from '@/components/FoodList'
import FoodAdd from '@/components/FoodAdd'
import Recommend from '@/components/Recommend'


import CategoryAdd from '@/components/CategoryAdd'
import CategoryList from '@/components/CategoryList'

import TableAdd from '@/components/TableAdd'
import TableList from '@/components/TableList'

import Waiter from '@/components/Waiter'
import Chart from '@/components/Chart'

import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logo',
      component: Logo
    },
    {
      path: '/foodList',
      name: 'foodList',
      component: FoodList
    },
    {
      path: '/foodAdd',
      name: 'foodAdd',
      component: FoodAdd
    },
    {
      path: '/food-edit/:id',
      name: 'food-edit',
      component: FoodAdd
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/categoryList',
      name: 'categoryList',
      component: CategoryList
    },
    {
      path: '/categoryAdd',
      name: 'categoryAdd',
      component: CategoryAdd
    },
    {
      path: '/category-edit/:id',
      name: 'category-edit',
      component: CategoryAdd
    },
    {
      path: '/tableList',
      name: 'tableList',
      component: TableList
    },
    {
      path: '/tableAdd',
      name: 'tableAdd',
      component: TableAdd
    },
    {
      path: '/table-edit/:id',
      name: 'table-edit',
      component: TableAdd
    },
    {
      path: '/waiter',
      name: 'waiter',
      component: Waiter
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: OrderDetail
    }



  ]
})
