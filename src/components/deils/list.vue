<template lang="html">
  <div class="art-list">
    <ul class="list">
      <router-link tag="li" :to="{name:'MusicPlay',params:{songid:item.song_id,type:1}}" class="song" v-for="(item,index) in listArr" :key="index">
        <div class="left">
          {{ item.title }}
        </div>
      </router-link>
    </ul>
    <button class="bbn" @click="more">加载更多</button>
  </div>
</template>

<script>
export default {
  name: "artlist",
  data() {
    return {
      listArr: [],
      limit: 10
    }
  },
  props: {
    ting_uid: {
      type: String,
      default: "0"
    }
  },
  mounted() {
    const ArtList = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.ting_uid + "&limits=" + this.limit + "&use_cluster=1&order=2"
    this.$axios.get(ArtList)
      .then(res => {
        this.listArr = res.data.songlist
        this.limit=this.limit+10;
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods:{
    more:function() {
      const MoreList = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.ting_uid + "&limits=" + this.limit + "&use_cluster=1&order=2"
      this.$axios.get(MoreList)
        .then(res => {
          this.limit=this.limit+10;
          this.listArr = res.data.songlist;
        })
        .catch(error => {
          console.log(error);
        })
    }
    }

}
</script>

<style scoped>

.art-list{
  padding: 0 17px;
}

.song{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #999;
}
.left{
  font-size: 18px;
}
.bbn{
  width: 200px;
  heigth:50px;
  border-radius: 50px;
  font-size: 20px;
  background: aqua;
  line-height: 50px;
  margin: 20px 220px;
  outline: none;
}

</style>
