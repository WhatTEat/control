import Vue from "vue";
import Router from "vue-router"
import login from "../views/Login"
import home from '../views/Home'
import examine from "../views/examine"
import homepage from '../views/Homepage'
import userManagement from "../views/userManagement";
Vue.use(Router)

export default new Router({
  routes:[
    {
      path:"/login",
      name:"login",
      component:login
    },
    {
      path:'/home',
      name:'home',
      component:home,
      children:[
        {
          path:'/examine',
          name:'examine',
          component:examine
        },
        {
          path:'/homepage',
          name:'homepage',
          component:homepage
        },
        {
          path:'/userManagement',
          name:'userManagement',
          component:userManagement
        },
        {
          path: '/home',
          redirect: '/homepage'  // 所有路径都重定向到`/login`
        }
      ]
    },{
      path: '*',
      redirect: '/login'  // 所有路径都重定向到`/login`
    }
  ]

  })
