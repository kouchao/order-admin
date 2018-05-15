import Vue from 'vue'
import Router from 'vue-router'


import Logo from '@/components/Logo'


import foodList from '@/components/food/food-list'
import foodAdd from '@/components/food/food-add'
import recommend from '@/components/food/Recommend'


import categoryAdd from '@/components/category/category-add'
import categoryList from '@/components/category/category-list'

import tableAdd from '@/components/table/table-add'
import tableList from '@/components/table/table-list'

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
      path: '/food-list',
      name: 'food-list',
      component: foodList
    },
    {
      path: '/food-add',
      name: 'food-add',
      component: foodAdd
    },
    {
      path: '/food-edit/:id',
      name: 'food-edit',
      component: foodAdd
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/category-list',
      name: 'category-list',
      component: categoryList
    },
    {
      path: '/category-add',
      name: 'category-add',
      component: categoryAdd
    },
    {
      path: '/category-edit/:id',
      name: 'category-edit',
      component: categoryAdd
    },
    {
      path: '/table-list',
      name: 'table-list',
      component: tableList
    },
    {
      path: '/table-add',
      name: 'table-add',
      component: tableAdd
    },
    {
      path: '/table-edit/:id',
      name: 'table-edit',
      component: tableAdd
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
