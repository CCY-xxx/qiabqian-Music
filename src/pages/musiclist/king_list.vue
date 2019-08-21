<template>
  <div class="">
    <MusicList :url="url" :type="type" title="热门歌单"></MusicList>
  </div>
</template>
<script>
  import MusicList from '../../components/Music_List'
  export default {
    data() {
      return {
        type:11,
        url:"/v1/restserver/ting?method=baidu.ting.billboard.billList&type=11&size=5&offset=0"
      }
    },
    methods: {},
    computed: {},
    components: {
      MusicList
    }
  }
</script>
<style scoped>

</style>
