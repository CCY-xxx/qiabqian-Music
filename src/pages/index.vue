<template>
    <div class="index">
      <ul>
        <li>
          <router-link to="/home">
            <img src="../assets/logo-ea5.png" alt="">
          </router-link>
        </li>
        <li>
         <router-link to="/artists" >
           歌手
         </router-link>
        </li>
        <li>
          <router-link to="/listcate" >
           榜单
          </router-link>
        </li>
        <li>
          <router-link to="/ucenter" >
            我的
          </router-link>
        </li>
        <li>
          <router-link to="/search" >
           搜索
          </router-link>
        </li>
      </ul>
  <transition>
    <keep-alive name="fadeIn">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </transition>
  <transition name="fadeIn">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
      },
        components: {}
    }
</script>
<style scoped>
  .index img{
    width: 26px;
    height: 26px;
  }

  .index ul{
    display: flex;
    height: 50px;
    line-height: 50px;
    background: #f9f9f9;
  }

  .index ul li {
    flex: 1;
    text-align: center;
  }

  .index ul li a{
    font-size: 16px;
    color: #999;
  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition:all 1s linear;
  }
  .fadeIn-leave-active{
    transition:all 1s linear;
    opacity: 0;
  }
</style>
