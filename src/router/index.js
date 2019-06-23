import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Artists from '../pages/artists'
import Home from '../pages/home'
import ListCate from '../pages/listcate'
import Search from '../pages/search'
import Ucenter from '../pages/ucenter'
import HotList from '../pages/musiclist/hot_list'
import KingList from '../pages/musiclist/king_list'
import NewsList from '../pages/musiclist/news_list'
import MoreList from '../pages/morelist'
import MusicPlay from '../pages/musicplay'
import ArtistsDetails from "@/pages/artistsDetails/artistsDetails"
import LicateDetails from "@/pages/licateDetails/licateDetails"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/musicplay',
      name:'MusicPlay',
      component:MusicPlay
    },
    {
      path:'/',
      name:'Index',
      redirect:'/home',
      component:Index,
      children:[
    {
      path:'home',
      component:Home,
      meta:{keepAlive:true,title:'首页'},
      redirect:"/home/hot",
      children:[
        {
          path:'hot',
          component:HotList
        },
        {
          path:'news',
          component:NewsList
        },
        {
          path:'king',
          component:KingList
        },
      ]
    },
        {
          path:'more',
          name:'MoreList',
          component:MoreList
        },
        {
          path:'artists',
          component:Artists
        },
        {
          path:'listcate',
          component:ListCate
        },
        {
          path:'search',
          component:Search
        },
        {
          path:'ucenter',
          name:Ucenter,
          component:Ucenter
        },
        {
          path:"artistsdetails",
          name:"ArtistsDetails",
          component:ArtistsDetails
        },
        {
          path:"licatedetails",
          name:"LicateDetails",
          component:LicateDetails
        }
    ]
    }
  ]
})
