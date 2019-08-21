<template>
    <div class="footerContent">
    <div class="header">
      <div class="title" >
       
        <div class="music-info" >
          <p>{{ currentUrl.songinfo.title }}</p>
          <p class="author">{{ currentUrl.songinfo.author }}</p>
        </div>
      
      </div>
    </div>

    <div class="song-info" >
      <div class="song-info-img" style="float:left;lineHeight:60px;">
        <img :src="currentUrl.songinfo.pic_big">   
      </div>
      <div class="iconbox" style="float:left;marginTop:-30px;marginLeft:40px">
       
        <i class="box">
          <button type="button" class="pre" @click="pre">上一曲</button>
          <button @click="stopMusic">播放/暂停</button>
          <button type="button" class="next" @click="nextMusic">下一曲</button>
        </i>
        <i class="iconfont icon-xiazai right"></i>
         <span :class="{love:flag}" @click="chenge"><i @click="emitNew()" class="iconfont icon-shoucang2 left"></i></span>
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
export default {
     props:{
      type: {
         type: String,
          default:"1"
       },
       aid:''
},
        data() {
            return {
              ind:'',
               ins:'',
              musicId:this.$store.state.musicid,
              fag:false,
              att:[],
              index:1,
              yuo:'',
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
        watch:{

          //处理点击下一曲或上一曲第一次无效问题（但是又出了新问题。。。还未解决）
          ind(){
          
            this.nextMusic()
           
          },
          ins(){
            this.pre()
          },
          musicId(){
             this.$nextTick(()=>{
            this.init() 
            console.log(this.$store.state.musicid)
            console.log(this.aid)
            })
          }
        },
       
        created(){
            
             this.$nextTick(()=>{
            this.init() 
            console.log(this.aid)
            console.log(this.$store.state.musicid)
            })
        },
      mounted(){
        this.yuo=0
         console.log(this.aid)
        this.$nextTick(()=>{
            this.$store.commit('setId',this.musicId)
            this.init() 
            console.log(this.aid)
            console.log(this.$store.state.musicid)
            })
          console.log(this.musicId)
     console.log(this.$store.state.musictype)
     this.init()
          //获取某分类的音乐列表
      const cateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$store.state.musictype + "&size=50&offset=0"
            api.get(cateUrl).then((data)=>{
              console.log(data.song_list);
            this.att = data.song_list;
            console.log(this.att)
             
           //获取初始音乐的索引
            this.index=this.att.findIndex((item)=>{return item.song_id===this.musicId})
            console.log(this.index)
            })
            
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
        this.addEventListeners();
         
      },
      beforeDestroyed(){
        this.removeEventListeners();
      },
        methods: {
       init(){
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
          async nextMusic() {
          this.ind=0
            // console.log( this.$store.state.attrrs)
            // this.index=data.song_list.length;
            if(this.index<this.att.length){
                 var id = this.att[this.index++].song_id
            }else{
              this.index == this.att.length-1
              var id = this.att[this.index].song_id
            }
             
            if (this.index == this.att.length) {
              this.index = 0
              id = this.att[this.index].song_id
            }
          
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + id;
            let da = await api.get(playUrl)
           
            this.currentUrl = da;
            this.musicId=this.currentUrl.songinfo.song_id
            console.log(this.$route.params.songid)
            console.log(da.songinfo.song_id)
            console.log(this.musicId)

          },
          async pre() {
              this.ins=0
              if(this.index>0){
                   var id= this.att[this.index--].song_id;
                
              }else{
                 this.index = this.att.length-1;
                   var id= this.att[this.index].song_id;
              }
            
            if (this.index < 0) {
              this.index = this.att.length-1;
              id= this.att[this.index].song_id;
            }
         
            const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + id
            let wer = await api.get(playUrl)
            // this.currentUrl.songinfo.song_id=JSON.parse(localStorage.getItem('daqq'));
            this.currentUrl = wer;
              this.musicId=this.currentUrl.songinfo.song_id
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
          
        }
    }

</script>
<style>
.footerContent{
    width:100%;
    height:100px;
    position:fixed;
    bottom:0px;
    left:0px;
    background:#80ffff;
    z-index:2000;
    font-size:10px;
} 
.song-info-img img{
    width:60px;
}
</style>