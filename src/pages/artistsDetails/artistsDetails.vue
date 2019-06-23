<template lang="html">
  <div class="">
    <Title :name="this.$route.params.name" :avatar="this.$route.params.avatar"/>
    <List :ting_uid="this.$route.params.ting_uid"/>
  </div>
</template>

<script>

import Title from "../../components/deils/title"
import List from "../../components/deils/list"

export default {
  name:"deils",
  data(){
    return{

    }
  },
  components:{
    Title,
    List
  }
}
</script>

<style lang="css">
</style>
