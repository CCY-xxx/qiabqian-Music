<template>
  <div class="lrcContainer">
    <!--<p>{{songid}}</p>-->
    <div class="lrc" ref="lrc">
      {{ getAllKey }}
      <!-- <p v-show="(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])" class="lrc-p"  v-for="(item,key,index) in lrcData" :key="index">{{ item }} </p> -->
      <p
        class="lrc-p"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
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
          this.loadMusic();

      },
      // watch: {
      //   songid: {
      //     handler() {
      //       this.songid = JSON.parse(localStorage.getItem('daqq'));
      //     }, deep: true
      //   },
      // },
        methods: {
          srcollLrc(key, index) {
            const lrcDiv = this.$refs.lrc
            if (key < this.currentTime && key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
              lrcDiv.style.top = -((index - 2) * 30) + "px"
            }
          },
          async loadMusic() {
            // this.songid = JSON.parse(localStorage.getItem('daqq'));
            const LRCUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.lry&songid=" +this.songid;
            console.log(this.songid);
            // this.songid = JSON.parse(localStorage.getItem('daqq'));
            var data = await api.get(LRCUrl)
            var lyrics = data.lrcContent.split("\n");
            var lrcObj = {};
            for (var i = 0; i < lyrics.length; i++) {
              var lyric = decodeURIComponent(lyrics[i]);
              var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
              var timeRegExpArr = lyric.match(timeReg);
              if (!timeRegExpArr) continue;
              var clause = lyric.replace(timeReg, '');
              for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                  sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                lrcObj[time] = clause;
              }
            }
            this.lrcData = lrcObj;
          }
        },
        computed: {
          getAllKey() {
            for (var i in this.lrcData) {
              this.keyArr.push(i);
            }
            // console.log(this.keyArr);
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
