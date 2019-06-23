<template>
  <div class="play">
    <div class="header">
      <div class="title">
        <router-link to="/">
          <i class="iconfont icon-shouye left"></i>
        </router-link>
        <div class="music-info">
          <p>{{ currentUrl.songinfo.title }}</p>
          <p class="author">{{ currentUrl.songinfo.author }}</p>
        </div>
        <router-link to="/search"><i class="iconfont icon-sousuo right"></i></router-link>
      </div>
    </div>

    <div class="song-info">
      <div class="song-info-img">
        <img :src="currentUrl.songinfo.pic_big">

        <LRC :durationTime="durationTime" :currentTime="currentTime" :songid="this.$route.params.songid"/>
        <!--<LRC1  :durationTime="durationTime" :currentTime="currentTime" :songid="currentUrl.songinfo.song_id"></LRC1>-->
<!--<div v-for="(item,index) in items" :key="index">-->
  <!--<LRC :durationTime="durationTime" :currentTime="currentTime" :songid="items[2]" />-->
<!--</div>-->

      </div>
      <div class="iconbox">
        <div :class="{love:flag}" @click="chenge"><i @click="emitNew()" class="iconfont icon-shoucang2 left"></i></div>
        <i class="box">
          <button class="pre" @click="pre">上一曲</button>
          <button @click="stopMusic">播放/暂停</button>
          <button class="next" @click="nextMusic">下一曲</button>
        </i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <div class="song">
      <audio ref="player" :src="currentUrl.bitrate.show_link" controls autoplay loop></audio>
    </div>
  </div>
</template>
<script>
  import '../assets/font/iconfont.css'
  import store from '../stores/store.js'
  import {api} from '../router/api.js'
  import LRC from '../components/LRC'
  // 异步操作
  // const LRC = Vue.component("lrc",(resolve)=>require(["../components/LRC"],resolve))
    export default {
      name:"musicplay",
      props:{
      type: {
         type: String,
          default:"1"
       }
},
        data() {
            return {
              fag:false,
              index:1,
              flag:false,
              ffgg:true,
              currentUrl:{
                songinfo:{
                  title:"",
                  author:"",
                  songid:""
                },
                bitrate:{
                  show_link:""
                }
              },
              currentTime:0,
              durationTime:0
            }

        },
        store,
      mounted(){

        const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.$route.params.songid;
        this.$axios.get(playUrl)
          .then(res => {
            console.log(res.data);
            this.currentUrl = res.data;
            console.log(this.currentUrl.songinfo.song_id);
          })
          .catch(error => {
            console.log(error);
          })
        this.addEventListeners();

      },
      beforeDestroyed(){
        this.removeEventListeners();
      },
        methods: {
          reqData() {
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.$route.params.songid;
            this.$axios.get(playUrl)
              .then(res => {
                this.$store.state.list.forEach(item => {
                  if (item.songinfo.album_title == res.data.songinfo.album_title) {
                    alert("歌单里已存在此歌曲")
                    this.ffgg = false;
                  }
                })
                if (this.ffgg) {
                  this.$store.commit('addList', res.data);
                  alert("已添加到歌单");
                }
                localStorage.setItem('da', JSON.stringify(this.$store.state.list))
              })
              .catch(error => {
                console.log(error);
              })
          },
          chenge() {
            this.flag = true;
            this.ffgg = true;
          },
          emitNew: function () {
            this.reqData();
          },

          addEventListeners() {
            this.$refs.player.addEventListener('timeupdate', this._currentTime),
              this.$refs.player.addEventListener('canplay', this._durationTime)
          },
          removeEventListeners: function () {
            this.$refs.player.removeEventListener('timeupdate', this._currentTime)
            this.$refs.player.removeEventListener('canplay', this._durationTime)
          },
          _currentTime() {
            this.currentTime = this.$refs.player.currentTime
            // currentTime是audio标签提供的获取当前播放时间的方法
          },
          _durationTime() {
            this.durationTime = this.$refs.player.duration
            // duration是audio标签提供的获得歌曲播放整体时间的方法
          },
          async nextMusic() {
            // console.log(this.currentUrl.bitrate);
            const cateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$route.params.type + "&size=10&offset=0"
            let data = await api.get(cateUrl)
            console.log(data.song_list);
            this.$store.state.attrrs = data.song_list;
            // this.index=data.song_list.length;
            if (this.index == this.$store.state.attrrs.length) {
              this.index = 0
            }
            var id = this.$store.state.attrrs[this.index++].song_id
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + id;
            let da = await api.get(playUrl)
            // this.currentUrl.songinfo.song_id=JSON.parse(localStorage.getItem('daqq'));
            this.currentUrl = da;

            // localStorage.setItem('daqq',JSON.stringify( this.currentUrl.songinfo.song_id))
            //           this.addEventListeners();
          },
          async pre() {
            if (this.index <= 0) {
              this.index = this.$store.state.attrrs.length;
            }
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.$store.state.attrrs[this.index--].song_id;
            let wer = await api.get(playUrl)
            // this.currentUrl.songinfo.song_id=JSON.parse(localStorage.getItem('daqq'));
            this.currentUrl = wer;

          },
          stopMusic() {
            if (!this.fag) {
              this.fag=true;
              this.$refs.player.pause();
            }else{
              this.$refs.player.play()
              this.fag=false
            }
          },
          // watch:{
          //   currentUrl:{
          //     handler(){
          //       this.$route.params.songid=this.currentUrl.sond_id;
          //     },deep:true
          //   }
          //
          // },
        },
        computed: {},
        components: {LRC}
    }
</script>
<style scoped>
  .header{
    height: 124px;
    padding:0 15px;
  }
.love{
  color:red;
}
  .music-info{
    flex: 1;
    font-size: 20px;
  }

  .title{
    display: flex;
    text-align: center;
  }

  .left{
    font-size: 30px;
  }

  .ca{
    color: red;
  }

  .right{
    font-size: 30px;
  }

  .song-info{
    padding: 15px;
  }

  .song-info-img{
    text-align: center;
  }

  .song-info-img img{
    width: 50%;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(50,50,50,.31);
  }

  .song-lrc{
    margin-top: 10px;
    min-height: 50px;
  }

  .iconbox{
    display: flex;
    margin-top: 30px;
  }

  .iconbox .box{
    flex: 1;
  }
.box button{
  margin-left: 20px;
  padding: 10px;
  border-radius: 50%;
  outline: none;
}
  .song{
    width: 100%;
    text-align: center;
  }

  .song audio{
    width: 80%;
  }

  .active{
    color: #222;
  }

  .author{
    font-size: 12px;
    color: #999;
  }

</style>
