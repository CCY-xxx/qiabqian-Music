import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: 1,
    list:[],
    attrrs:[]

  },
  mutations: {
    increment (state) {
      state.count++
    },
    addList(state,data){
      state.list.push(data);
    },
    filt(state,data){
      state.list=state.list.filter(item=>item.songinfo.title!==data.songinfo.title);

    }
  }
})
