import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: "首页", icon: "el-icon-s-home" }

    }]
  },
  {
    path: '/admin',
    component:Layout,
    name: 'Admin',
    meta: {title: '后台管理', icon: 'table'},
    children: [
      {
        path: 'adminlist',
        component: () => import('@/views/admin/AdminList'),
        name: 'AdminList',
        meta: { title: '管理员列表' }
      },
      {
        path: 'addadmin',
        component: () => import('@/views/admin/AddAdmin'),
        name: 'AddAdmin',
        meta: { title: '添加管理员' }
      },
      {
        path: 'editadmin',
        component: () => import('@/views/admin/EditAdmin'),
        name: 'EditAdmin',
        meta: { title: '编辑管理员' },
        hidden: true
      }
    ]
  },
  {
    path:'/member',
    component:Layout,
    name: 'Member',
    alwaysShow: true,
    meta:{title: '会员管理',icon: 'el-icon-user-solid'},
    children: [
      {
        path:'memberlist',
        component: () => import('@/views/member/MemberList'),
        name: 'MemberList',
        meta: { title: '会员列表' }
      }
    ]
  },
  {
    path:'/system',
    component:Layout,
    name: 'System',
    alwaysShow: true,
    meta: {title: "系统管理",icon: 'el-icon-s-tools'},
    children: [
      {
        path:'database',
        component: () => import('@/views/system/DataBase'),
        name: 'Database',
        meta: { title: "数据库备份" }
      }
    ]
  },
  {
    path:'/shop',
    component:Layout,
    name: 'Shop',
    meta: {title: "商品管理",icon: 'el-icon-s-shop'},
    children: [
      {
        path:'/shoplist',
        name: 'ShopList',
        component:()=>import('@/views/shop/ShopList'),
        meta: {title: '商品列表'}
      },
      {
        path: '/addshop',
        name: 'AddShop',
        component:()=>import('@/views/shop/AddShop'),
        meta: {title: "添加商品"}
      },
      {
        path: '/editshop',
        name: 'EditShop',
        component:()=>import('@/views/shop/EditShop'),
        meta: {title: "编辑商品"},
        hidden: true
      },
      {
        path: '/shopcate',
        name: 'ShopCate',
        component:()=>import('@/views/shop/ShopCate'),
        meta: {title: "商品分类"}
      }
    ]
  },
  {
    path: '/order',
    component:Layout,
    name: 'Order',
    meta: {title: "订单管理",icon: 'el-icon-s-goods'},
    children: [
      {
        path:'/shoporder',
        name: 'ShopOrder',
        component:()=>import('@/views/order/ShopOrder'),
        meta: {title: "商品订单"}
      },
      {
        path:'/viporder',
        name: 'VipOrder',
        component:()=>import('@/views/order/VipOrder'),
        meta: {title: "会员订单"}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
