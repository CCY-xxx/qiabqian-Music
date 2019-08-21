<template>
    <div class="">
      <MusicList :url="url" :type="type" title="今日榜单"></MusicList>
    </div>
</template>
<script>
  import MusicList from '../../components/Music_List'
    export default {
        data() {
            return {
              type:1,
              url:"/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=5&offset=0"
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
