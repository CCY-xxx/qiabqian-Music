<template>
  <div class="artists">
    <ul class="list">
      <router-link tag="li" :to="{name:'ArtistsDetails',params:{avatar:item.avatar_s500,name:item.name,ting_uid:item.ting_uid}}" :key="index" class="artist" v-for="(item,index) in artistsData">
        <div class="pic">
          <img :alt="item.name" :src="item.avatar_s500">
        </div>
        <div class="info">
          <div>{{ item.name }}</div>
        </div>
      </router-link>
    </ul>
    <button class="bbn" @click="more">加载更多</button>
  </div>
</template>
<script>
  export default {
    name:"artists",
    data(){
      return{
        artistsArr:["2517","7994","1091","45561","2507","245815","1077","1204","1117","82366","2304"],
        artistsList:[
        "2314","1245","5645","7890","7889","3251","8907","3345","2234","3426","5489","2231","2021",
          "2345","2310","2365","5609","3044","3025","2567","2534","2583","2509","2589","7820","1022",
          "1097","1045","1048","1032","1090","1026","4155","5609","4509","3099","6033","3409","1209",],
        artistsData:[]
      }
    },
    mounted(){
      for(var i =0;i<this.artistsArr.length;i++){
        const artistsURL = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid="+ this.artistsArr[i];
        this.$axios.get(artistsURL)
          .then(res => {
            this.artistsData.push({
              avatar_s500:res.data.avatar_s500,
              name:res.data.name,
              ting_uid:res.data.ting_uid
            })
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    methods:{
      more:function() {
        for(var i =0;i<this.artistsList.length;i++){
          const artistsURL = this.HOST + "/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid="+ this.artistsList[i];
          this.$axios.get(artistsURL)
            .then(res => {
              if(res.data.error_code==22551){
                return;
              }
              this.artistsData.push({
                avatar_s500:res.data.avatar_s500,
                name:res.data.name,
                ting_uid:res.data.ting_uid
              })
            })
            .catch(error => {
              console.log(error);
            })
        }
      }
    }

  }

</script>
<style scoped>
  .artists{
    padding: 0 17px;
    background: #fff;
  }

  .list li {
    padding-left: 0;
    min-height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
  }

  .pic{
    width: 54px;
    height: 54px;
    margin-right: 15px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 16px;
  }

  .pic img{
    border-radius: 27px;
    overflow: hidden;
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
