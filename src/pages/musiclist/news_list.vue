<template>
  <div class="">
    <MusicList :url="url"></MusicList>
  </div>
</template>
<script>
  import MusicList from '../../components/Music_List'
  export default {
    data() {
      return {
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
