import Vue from 'vue'
import Router from 'vue-router'
import logo from '@/components/logo'
import foodList from '@/components/food-list'
import foodAdd from '@/components/food-add'

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
    }
  ]
})
