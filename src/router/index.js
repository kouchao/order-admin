import Vue from 'vue'
import Router from 'vue-router'


import logo from '@/components/logo'


import foodList from '@/components/food/food-list'
import foodAdd from '@/components/food/food-add'


import categoryAdd from '@/components/category/category-add'
import categoryList from '@/components/category/category-list'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logo',
      component: logo
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
    }
  ]
})
