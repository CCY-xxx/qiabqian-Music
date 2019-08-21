<template>
  <div class="">
    <MusicList :url="url" :type="type" title="新歌速递"></MusicList>
  </div>
</template>
<script>
  import MusicList from '../../components/Music_List'
  export default {
    data() {
      return {
        type:2,
        url:"/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=5&offset=0"
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
