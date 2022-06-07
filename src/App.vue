<template>
  <div id="app">
    <head-nav :isLogin=isLogin ></head-nav>
    <keep-alive >
        <router-view v-if="$route.meta.keep" @loginOut=loginOut @loginFun=loginFun  @getPlaySongId=getPlaySongId @addSongList=addSongList :playSongId=playSongId  @addAll=addAll ></router-view>
    </keep-alive>
    <router-view :isSinger=isSinger @loginFun=loginFun  @loads="loads" @loginOut=loginOut v-if="!$route.meta.keep" @getPlaySongId=getPlaySongId @addSongList=addSongList :playSongId=playSongId  @addAll=addAll ></router-view>
    <div v-show="playSongId" style="height:54px"></div>
    <play-music @loads="loads" :playSongId=playSongId :playSongList=playSongList @getPlaySongId=getPlaySongId  v-show="playSongId && $route.meta.music " @del=del @delAll=delAll></play-music>
  </div>
  
</template>

<script>
import headNav from './components/headNav.vue';
import playMusic from './components/playMusic.vue'
export default {
    data:function(){
      return {
        playSongId:null,
        playSongList:null,
        isSinger:false,
        isLogin:false
      }
    },
    created(){
      if(window.localStorage.getItem('login')){
        this.isLogin = true;
      }
    },
    methods:{
      getPlaySongId(id){
       this.playSongId = id;
        var index;
        if(this.playSongList == null){
          this.playSongList=[];
          this.playSongList.push(id);
        }else{
           index = this.playSongList.findIndex(item => item.id == id.id)
           if(index == -1 ){
              this.playSongList.push(id);
            }
        } 
      
      },
      addSongList(id){
        var index;
        if(this.playSongList == null){
          this.playSongList=[];
          this.playSongList.push(id);
        }else{
           index = this.playSongList.findIndex(item => item.id == id.id)
           if(index == -1 ){
              this.playSongList.push(id);
            }
        } 
      },
      del(index){
        this.playSongList.splice(index,1);
      },
      delAll(){
        console.log('a')
        this.playSongList.splice(0)
      },
      addAll(arr){
        for(var i = 0; i < arr.length;i++){
          if(this.playSongList == null){
            this.playSongList = []
            this.playSongList.push(arr[i]);
          }else{
            if(this.playSongList.findIndex(item => item.id == arr[i].id) != -1){
              continue;
            }else{
              this.playSongList.push(arr[i])
            }
          }
          
        }
      },
      loads(){
        this.isSinger = !this.isSinger
      },
      loginFun(){
        this.$router.push('/musicIndex')
        setTimeout(()=>{
         window.location.reload();
        },100)
      },loginOut(){
        this.$router.push('/musicIndex')
        this.isLogin = false;
      }
  },
    components:{
      headNav,
      playMusic
    }
}
</script>
<style lang="less">
    @import './assets/css/initialize.css';
      body{
        margin: 0;
      }
      #app{
        width: 100%;
        height: 100%;
      }
</style>


