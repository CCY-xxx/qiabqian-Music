<template>
    <div>

      <TodayRecommend title="今日榜单" type="1"/>
      <NewsMusic></NewsMusic>
      <SwiperBanner></SwiperBanner>
      <MusicListNav></MusicListNav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <TodayRecommend title="热门歌单" type="24"/>
    </div>
</template>
<script>
  import TodayRecommend from '../components/Today_Recommend'
  import NewsMusic from '../components/News_Music'
  import SwiperBanner from '../components/Swiper_Banner'
  import MusicListNav from './musiclist/music-listnav'
    export default {
        data() {
            return {}
        },
        computed: {},
        components: {
          TodayRecommend,
          NewsMusic,
          SwiperBanner,
          MusicListNav
        }
    }
</script>
<style scoped>

</style>
