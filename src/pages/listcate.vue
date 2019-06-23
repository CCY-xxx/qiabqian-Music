<template>
    <div class="contain">
      <ul class="list" v-for="(listda,index) in listDatas" :key="index">
        <router-link tag="li" class="listone" :to="{name:'LicateDetails',params:{musictype:typeArr[index]}}">
          <img :src="listda.billboard.pic_s444" alt="">
          <ul class="hr">
            <li><i>1</i>{{listda.song_list[0].title}}</li>
            <li><i>2</i>{{listda.song_list[1].title}}</li>
            <li><i>3</i>{{listda.song_list[2].title}}</li>
          </ul>
        </router-link>
      </ul>
    </div>
</template>
<script>
  import {api} from '../router/api.js'
    export default {
        data() {
            return {
              listDatas:[],
              // listData:[],
              typeArr:[],
            }
        },
      // created(){
      //   this.typeArr=
      // },
      created(){
          this.getList();
        // this.typeArr=[1,21,22,24,25,9,6,7,11];
        // this.typeArr.sort();
        // for(var i=0;i<this.typeArr.length;i++){
        //   // console.log(this.typeArr[i]);
        //
        //   const licateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+this.typeArr[i]+"&size=10&offset=0"
        //   this.$axios.get(licateUrl)
        //     .then(res => {
        //       // console.log(this.typeArr);
        //       console.log(res.data);
        //
        //         if(res.data.song_list.length!=0){
        //           this.listDatas.push(res.data);
        //
        //       }
        //       this.listDatas.sort();
        //     })
        //     .catch(error => {
        //       console.log(error);
        //     })
        //
        // }

        // this.listDatas=JSON.parse(localStorage.getItem('dqa'));
      },
        methods: {
          async getList(){
            this.typeArr=[1,21,22,24,25,2,9,23,11];
            // this.typeArr.sort();
            for(var i=0;i<this.typeArr.length;i++){

              const licateUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+this.typeArr[i]+"&size=10&offset=0"
             let data= await api.get(licateUrl)
              this.listDatas.push(data);

            }
            console.log(this.listDatas);
          }
        },
        computed: {},
        components: {}
    }
</script>
<style scoped>
  .contain{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
.list{
  width: 100%;
  /*height: 150px;*/
  /*background: pink;*/
  margin: 0 auto;
}
  .listone{
    width: 100%;
    /*height: 150px;*/
    /*background: blue;*/
    padding: 10px;
    margin: 10px auto;
  }
  img{
    width: 50%;
    float: left;
  }
  .hr{
    display: flex;
    padding-left: 10px;
    flex-wrap: wrap;

    /*flex-direction: row;*/
    flex-direction: column;

  }
  .hr li{
    /*flex-wrap: wrap;*/

    /*overflow: hidden;*/
    width: 200px;
    height: 20px;
    line-height:20px;
    display: flex;
  }
  .hr li i{
    /*background-color: orangered;*/
    color: orangered;
    font-weight: bold;
    font-size:20px;
    padding-right: 10px;
  }
  .hr li:nth-child(1){
    /*background-color: orangered;*/
    color: cornflowerblue;
    font-weight: bold;
  }
  .hr li:nth-child(2){
      /*background-color: orangered;*/
    opacity: 0.8;
    color: cornflowerblue;
    font-weight: bold;
    }
  .hr li:nth-child(3){
    /*background-color: orangered;*/
    opacity: 0.5;
    color: cornflowerblue;
    font-weight: bold;
  }
</style>
