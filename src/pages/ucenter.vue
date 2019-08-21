<template>
  <div class="mod-albums">
    <div class="son">
      <input type="button" @click="flag=!flag" value="编辑" class="edit">
      <input type="button" value="删除" @click="deleteone" class="del" v-show="flag">

      <i v-show="flag">全选</i><input type="checkbox" ref="all" @click="checkall" v-show="flag" v-model="tabox" class="all"></div>
    <div class="container">
      <div class="gallery">

        <div class="scroller" v-for="(item,index) in shouArr" :key="index">
            <router-link :to="{name:'MusicPlay',params:{songid:item.songinfo.song_id,type:22}}" tag="div" class="card url"  >
              <div class="album">
                <img :src="item.songinfo.pic_big" :alt="item.songinfo.title">
                <div class="name">{{item.songinfo.title}}</div>
              </div>
            </router-link>
          <input class="check" type="checkbox" @click="chec(index)" :value="item.songinfo.song_id" v-show="flag" ref="inpu">

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import store from '../stores/store.js'
  export default {
    data() {
      return {
        tabox:'',
        currentUrl:[],
            value:'1',
            shouArr:[],
            flag:false,
             item:{},
            title: "",
            author: "",
            songid: ""
          }
    },
    created(){


    },
   store,
    mounted(){
      this.$store.state.list=JSON.parse(localStorage.getItem('da'));
      var listdata=this.$store.state.list;

      // console.log(this.$store.state.list);
      if(listdata==null){
        alert("歌单为空");
        location.href='/home/hot'
      }else{
        this.shouArr = listdata.reverse();
      }

      // localStorage.setItem('data',JSON.stringify(this.shouArr))

      // this.shouArr.concat(this.shouArr);
    },
    methods: {
          deleteone(){
            this.$store.state.list=JSON.parse(localStorage.getItem('da'));
            // console.log(this.currentUrl);
            for(var i=0;i<this.currentUrl.length;i++){
              this.$store.commit('filt',this.currentUrl[i]);

            }
            localStorage.setItem('da',JSON.stringify(this.$store.state.list))

            location.reload();
          },
      checkall(){
            for(var i=0;i<this.shouArr.length;i++){
              this.chec(i);
              this.$refs.inpu[i].checked=this.$refs.all.checked;
            }
          return;
      },
          chec(id){

              var musicId=this.$refs.inpu[id].value;
               console.log(this.$refs.inpu[id].checked)
               const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid=" + musicId
            this.$axios.get(playUrl)
              .then(res => {
                console.log(res.data);
                if(this.$refs.inpu[id].checked){
                this.currentUrl.push(res.data);
                }else{
                  this.currentUrl= this.currentUrl.filter(item=>item.songinfo.song_id!==musicId);
                  console.log(this.currentUrl)
                }
                
              })
              .catch(error => {
                console.log(error);
              })
          }   
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .son{
    height: 20px;
  }
  .edit{
    display: block;
    width: 30px;
    float:right;
    margin-right:10px;
    padding-right:10px;
  }
  .del{
    width: 30px;
    float: right;
    margin-right:10px;
    padding-right:10px;
  }
  i{
    display: block;
    height: 5px;
    margin-left: 20px;
    text-align: left;
    line-height: 30px;
    color: red;
    font-weight: bold;
  }
  .mod-albums {
    background-color: #fff;
    padding: 10px 17px;
    margin-top:10px;
  }

  .mod-albums .gallery {
    overflow: hidden;
    margin: 20px -5px;
  }
  .mod-albums .gallery .scroller{
    width: 33%;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px 10px;
    position: relative;
  }
  .mod-albums .gallery .card {
    width: 80%;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px 10px;
  }
  input{
    border: 1px solid black;
    width: 20px;
    height: 20px;
    background: gold;
    /*position: absolute;*/
  }
  .mod-albums .gallery .card .album {
    position: relative;
  }

  .mod-albums .gallery .card img {
    width: 100%;
    height: auto;
    border: 1px solid #eee;
  }

  .mod-albums .gallery .card .name {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
    line-height: 14px;
    max-height: 28px;
    margin-bottom: 2px;
  }
</style>
