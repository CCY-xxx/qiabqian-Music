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

        <LRC :durationTime="durationTime" :currentTime="currentTime" :songid="musicId"/>
        <!--<LRC1  :durationTime="durationTime" :currentTime="currentTime" :songid="currentUrl.songinfo.song_id"></LRC1>-->
<!--<div v-for="(item,index) in items" :key="index">-->
  <!--<LRC :durationTime="durationTime" :currentTime="currentTime" :songid="items[2]" />-->
<!--</div>-->

      </div>
      <div class="iconbox">
    
        <div :class="{love:flag}" @click="chenge"><i @click="emitNew()" class="iconfont icon-shoucang2 left"></i></div>
        <i class="box">
          <button type="button" class="pre" @click="pre">上一曲</button>
          <button @click="stopMusic">播放/暂停</button>
          <button type="button" class="next" @click="next">下一曲</button>
        </i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <div class="song" v-if="currentUrl.bitrate.show_link">
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
        data() {
            return {
              ind:'',
               ins:'',
              musicId:this.$route.params.songid,
              fag:false,
              att:[],
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
        // watch:{
        //   //处理点击下一曲或上一曲第一次无效问题（但是又出了新问题。。。还未解决）
        //   ind(){
        //     this.nextMusic()
        //   },
        //   ins(){
        //     this.pre()
        //   }
            
        // },
      mounted(){
       //获取初始音乐
        const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.musicId;
        this.$axios.get(playUrl)
          .then(res => {
            console.log(res.data);
            this.currentUrl = res.data;
       
            // console.log(this.$store.state.attrrs);
          })
          .catch(error => {
            console.log(error);
          })
        
       setTimeout(()=>{
         
           this.addEventListeners();
      
       },1000)
      this.getatt()
      
      },
      beforeDestroyed(){
        this.removeEventListeners();
      },
        methods: {
      
        getatt(){
              //获取某分类的音乐列表
         const cateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$route.params.type + "&size=50&offset=0"
            api.get(cateUrl).then((data)=>{
              console.log(data.song_list);
            this.att = data.song_list;
            console.log(this.att)
             
           //获取初始音乐的索引
            this.index=this.att.findIndex((item)=>{return item.song_id===this.musicId})
            console.log(this.index)
            })
           
        },
          reqData() {
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.musicId;
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
          next(){
            var count=++this.index
               if(count<this.att.length){
                this.musicId = this.att[count].song_id
                console.log('6')
            }else if(count == this.att.length) {
                console.log('4')
              this.index = 0
             this.musicId = this.att[this.index].song_id
            }
            // console.log(this.musicId)
            this.toggleMusic()
          },
          async toggleMusic() {
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + this.musicId;
             this.currentUrl = await api.get(playUrl)
            // this.currentUrl.songinfo.song_id=JSON.parse(localStorage.getItem('daqq'));
            // this.currentUrl = da;
            // this.musicId=this.currentUrl.songinfo.song_id
            // console.log(this.$route.params.songid)
            // console.log(da.songinfo.song_id)
            console.log(this.musicId)

            // localStorage.setItem('daqq',JSON.stringify( this.currentUrl.songinfo.song_id))
            //           this.addEventListeners();
            // this.addEventListeners();
          },
          pre() {
              // this.ins=0
              var preCount=--this.index
              if(preCount>=0){
                    this.musicId= this.att[preCount].song_id;
                 console.log('7')
              }else{
                 console.log('1')
                 this.index = this.att.length-1;
                    this.musicId= this.att[this.index].song_id;
              }
            
          this.toggleMusic()
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
          
        },
        // watch:{
        //     currentUrl:{
        //       handler(){
        //         console.log(this.currentUrl)
        //          this.musicId= this.currentUrl.songinfo.song_id
        //       },deep:true
        //     }
          
        //   },
        computed: {},
        components: {LRC}
    }
</script>
<style scoped>
  .header{
    height: 60px;
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
     display: flex;
     flex-wrap: wrap;
    align-content: flex-center;
    align-items: center;
    justify-content: space-around;
  }
.box button{
  margin-left:3px;
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
