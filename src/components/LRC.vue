<template>
  <div class="lrcContainer">
    <!--<p>{{songid}}</p>-->
    <div class="lrc" ref="lrc">
    {{getAllKey}}
      <!-- <p v-show="(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])" class="lrc-p"  v-for="(item,key,index) in lrcData" :key="index">{{ item }} </p> -->
      <p
        class="lrc-p"
        :class="{active:(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])}"
        v-for="(item,key,index) in lrcData"
        :key="index">
     {{ item }}{{ srcollLrc(key,index) }}
      </p>
    </div>
  </div>
</template>
<script>
  import {api} from '../router/api.js'
    export default {
        props:{
          songid:{
            type:[String,Number],
            default:''
          },
          currentTime:{
            type:[String,Number],
            default:0
          },
          durationTime:{
            type:[String,Number],
            default:0
          }
        },
        data() {
            return {
              lrc:{},
              lrcData:{},
              keyArr:[]
            }
        },
        mounted(){
            console.log(this.songid)
          this.loadMusic();      
      },
        methods: {
          srcollLrc(key, index) {//设置歌词自动滚动
            const lrcDiv = this.$refs.lrc
            //滚动条件
            if (key < this.currentTime && key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
              lrcDiv.style.top = -((index -2) * 30) + "px"//(index-2)设定红色区域歌词在中间
            }
          },
          async loadMusic() {
            // this.songid = JSON.parse(localStorage.getItem('daqq'));
            const LRCUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.lry&songid=" +this.songid;
            // console.log(this.songid);
            // console.log(LRCUrl)
            // this.songid = JSON.parse(localStorage.getItem('daqq'));
            var data = await api.get(LRCUrl)//获取歌词信息
            if(!data.lrcContent){
           
            this.lrcData={}
            return
            }
            //构造歌词展现格式
             var lyrics = data.lrcContent.split("\n");
            var lrcObj = {};
            for (var i = 0; i < lyrics.length; i++) {
              var lyric = decodeURIComponent(lyrics[i]);//decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
              // console.log(lyrics[i],lyric)
              var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;//时间正则表达式
              var timeRegExpArr = lyric.match(timeReg);//匹配时间正则表达式
              // console.log(lyric)//[01:46.83]美好的感觉让我如此满足 
              // console.log(timeRegExpArr)//["[01:46.83]"]
              if (!timeRegExpArr) continue;
              var clause = lyric.replace(timeReg, '');//空字符串替换时间，留下歌词
              // console.log(clause)//美好的感觉让我如此满足 
              for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                var t = timeRegExpArr[k];
                // console.log(t)//[01:46.83]
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),

                  sec = Number(String(t.match(/\:\d*/i)).slice(1));
                  // console.log(t.match(/\[\d*/i),t.match(/\:\d*/i));
                  // //["[01", index: 0, input: "[01:50.78]", groups: undefined]   [":50", index: 3, input: "[01:50.78]", groups: undefined]
                  // console.log(String(t.match(/\[\d*/i)),String(t.match(/\:\d*/i)))//[01  :45
                  // console.log(String(t.match(/\[\d*/i)).slice(1),String(t.match(/\:\d*/i)).slice(1))//01 46
                var time = min * 60 + sec;
                // console.log(time)
                lrcObj[time] = clause;
              }
            }
            this.lrcData = lrcObj;
            // console.log(this.lrcData)
          }
        },
        computed: {
           getAllKey() {
             this.keyArr=[]
            for (var i in this.lrcData) {
              this.keyArr.push(i);
            }
            console.log(this.keyArr);
          },
        },
        watch:{//监听歌曲改变刷新歌词
          songid(){
            this.loadMusic()
          }
        },
        components: {}
      }
</script>
<style scoped>
  .lrcContainer{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
  }

  .lrc{
    width: 100%;
    position: absolute;
    top: 0;
  }
  .active{
    color: red !important;
  }
  .lrc-p{
    height: 30px;
    line-height: 30px;
  }

  .up30{
    margin-top: -30px;
  }

</style>
