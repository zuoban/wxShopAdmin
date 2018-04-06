import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  { path: '/',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: () => import('@/views/dashboard/index') }]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    name: 'Category',
    meta: {title: '类目管理', icon: 'category'},
    children: [
      { path: 'list', name: 'CategoryList', component: () => import('@/views/category/list'), meta: {title: '类目列表', icon: 'list'}, },
      { path: '/category/:id', name: 'CategoryEdit', component: () => import('@/views/category/detail'), hidden: true, meta: {title: '编辑类目', icon: 'edit'} },
      { path: '', name: 'CategoryCreate', component: () => import('@/views/category/detail'), meta: {title: '新增类目', icon: 'add'} }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: {title: '商品管理', icon: 'table'},
    children: [
      { path: 'list', name: 'ProductList', component: () => import('@/views/product/list'), meta: {title: '商品列表', icon: 'list'}, },
      { path: '/product/:id', name: 'ProductEidt', hidden: true, component: () => import('@/views/product/detail'), meta: {title: '编辑商品', icon: 'edit'} },
      { path: '', name: 'ProductCreate', component: () => import('@/views/product/detail'), meta: {title: '新增商品', icon: 'add'} },
    ]
  } ,
  {
    path: '/order',
    redirect: '/order/list',
    name: 'Order',
    meta: {title: '订单管理', icon: 'table'},
    component: Layout,
    children: [
      { path: 'list', name: 'OrderList', component: () => import('@/views/order/list'), meta: {title: '订单列表', icon: 'list'}, },
      ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: {title: 'Form', icon: 'form'}
  //     },
  //   ]
  // },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

