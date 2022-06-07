<template>
    <div v-if="SongDetail" >
        <div class="min-playMusic" >
            <div :class="['paly-song',{'play':!isPlay}]"  @click="bigShowFun">
                <img :src="SongDetail.al.picUrl+'?param=64y64'" alt="">
            </div>
            <div class="paly-singer" @click="bigShowFun">
                <h4>{{SongDetail.name}}</h4>
                <h6>{{SongDetail.ar[0].name}}</h6>
            </div>
            <div class="paly-go" >
                <div class="paly-last iconfont icon-shangyishoushangyige" @click="lastSong"></div>

                <div :class="['paly-music','iconfont',{'icon-weibiaoti519':isPlay},{'icon-weibiaoti518':!isPlay}]" @click="palySong"></div>

                <div class="paly-next iconfont icon-xiayigexiayishou" @click="nextSong"></div>

                <div class=" iconfont  icon-liebiao" @click="playShow = !playShow"></div>
            </div>
        </div>

        <div v-show="SongDetail" style="background:#fff" class="bigPlay">
            <div :class="['box-playMusic',{'active':bigShow}]" style="background:#fff">
              <div :style="{'background-image':'url('+SongDetail.al.picUrl+'?param=640y480'+')'}">
                    <div class="playTop" @click="bigShowFun">
                    <span class="iconfont icon-31xiala"></span>
                    </div>
                    <van-tabs background='rgba(255, 255, 255, 0)' swipeable animated line-width="10px" title-active-color=white title-inactive-color="rgba(255, 255, 255, 0.625)">
                    <van-tab title="歌曲">
                        <div :class="['van_song',{'whoLyrics':whoLyrics}]">
                            <div class="lyrics" @click="whoLyrics = !whoLyrics ; lyricOne = true">
                                 <div class="title">
                                        <h4>{{SongDetail.name}}</h4>
                                        <h6>{{SongDetail.ar[0].name}}</h6>
                                    </div>
                                <div class="big_lyrics" v-show="whoLyrics">
                                    <ul :style="{'top':top}" ref="lyrics">
                                        <li :class="{'active':currentRow == index}" v-for="(item,index) in lyric" :key="index">
                                            {{item.text}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="min_lyrics" v-show="!whoLyrics">
                                    <div :class="['img',{'play':!isPlay}]">
                                        <img :src="SongDetail.al.picUrl+'?param=200y200'" alt="">
                                    </div>
                                </div>
                            </div>
                            <div :class="['playFun',{'whoLyrics':!whoLyrics}]">
                                <div class="time">
                                    <div class="left">{{leftTime | playTime}}</div>
                                    <van-slider  @input="lyricInput"  v-model="step" @drag-start="dragStart" @drag-end="dragEnd" @change="dragEnd"  bar-height="1px">
                                        <template #button>
                                            <div class="custom-button"></div>
                                        </template>
                                    </van-slider>
                                    <div class="right">{{rightTime | playTime}}</div>
                                </div>
                                <div class="bt_fun">
                                    <div class="song_mode">
                                        <div @click="typeStack" class="iconfont icon-hanhan-01-01" v-show="type == 1"></div>
                                        <div @click="typeStack" class="iconfont blue icon-suiji" v-show="type == 2"></div>
                                        <div @click="typeStack" class="iconfont blue icon-danquxunhuan" v-show="type == 3"></div>
                                    </div>
                                    <div class="paly-last iconfont icon-shangyishoushangyige" @click="lastSong"></div>
                                    <div :class="['paly-music','iconfont',{'icon-weibiaoti519':isPlay},{'icon-weibiaoti518':!isPlay}]" @click="palySong"></div>
                                    <div class="paly-next iconfont icon-xiayigexiayishou" @click="nextSong"></div>
                                    <div class="paly-collect iconfont icon-shoucang" @click="getLikeFun()" v-if="Like == false"></div>
                                    <div class="paly-nocollect iconfont icon-shoucang" @click="getNoLikeFun()" v-if="Like == true"></div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="相关">
                        <div class="correlation">
                            <div class="singer_information">
                                <div class="top">
                                    <h4>歌手信息</h4>
                                    <div @click="load">
                                        <router-link tag="div" :to="'/singer/detail?id='+ playSongId.ar[0].id">更多<span class="iconfont icon-youbian"></span></router-link>
                                    </div>
                                </div>
                                <div class="singer" v-if="singerDetail">
                                    <div class="person">
                                        <div class="img">
                                            <img :src="singerDetail.artist.cover+'?param=50y50'" alt="">
                                        </div>
                                        <div class="name">
                                            <h4>{{singerDetail.artist.name}}</h4>
                                            <p>{{singerDetail.artist.briefDesc}}</p>
                                        </div>
                                    </div>
                                    <span v-if="likeSinger == false" class="iconfont icon-tianjia" @click="getLikeSingerFun">关注</span>
                                    <span v-if="likeSinger == true" class=" iconfont icon-shanchu" @click="getLikeSingerFun">取消</span>
                                </div>
                                <div class="achievement">
                                    <h4>歌手成就</h4>
                                    <ul>
                                        <li v-for="(item,index) in singerTxt" :key="index">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="resemblance">
                                <h4>相似歌曲</h4>
                                <ul>
                                    <li v-for="(item,index) in simi" :key="index" @click="getId(item.id)">
                                        <div class="img">
                                            <img :src="item.artists[0].picUrl" alt="">
                                        </div>
                                        <div class="text">
                                            <h5>{{item.name}}</h5>
                                            <p>{{item.artists[0].name}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
              </div>
            </div>
        </div>
        <div v-show="bigShow"></div>

        <div class="play_bg" v-show="playShow" @click="playShow = !playShow"></div>     
        <div :class="['play-list',{'active':playShow}]" v-show="playSongList">
            <div class="playTop">
                <div @click="typeStack" class="iconfont icon-hanhan-01-01" v-show="type == 1">顺序播放<span>({{playSongList.length}})</span></div>
                <div @click="typeStack" class="iconfont blue icon-suiji" v-show="type == 2">随机播放<span>({{playSongList.length}})</span></div>
                <div @click="typeStack" class="iconfont blue icon-danquxunhuan" v-show="type == 3">单曲循环<span>({{playSongList.length}})</span></div>
                <div class="iconfont icon-shanchu" @click="delAll"></div>
            </div>
            <div class="playDetail" ref="scroll" v-if="playShow">
                <ul>
                    <li v-for="(item,index) in playSongList" :class="{'playActive':item.id == playSongId.id}" :key="index">
                        <div class="songDetail"  @click="playSongMusic(item)">
                            <span>{{index + 1 }} </span>
                            <div class="playSong">   
                                <h4>{{item.name}}</h4>
                                <h6>{{item.ar[0].name}}</h6>
                            </div>
                        </div>
                        <div class="iconfont icon-shanchu" @click.once ="del(item)" v-show="playSongList.length !== 1"></div>
                    </li>
                    <div class="pullup-tips">
                        <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">Pull up and load more</span>
                        </div>
                        <div v-else class="after-trigger">
                        <span class="pullup-txt">Loading...</span>
                        </div>
                    </div>
                    <li></li>
                </ul>
              
            </div>
        </div>
        <audio v-if="palySong && $route.meta.music" ref="audio" :src="playSong.url" controls   hidden @ended=ended @loadeddata=loadeddata :loop='loop' ></audio>  
    </div>
</template>

<script>
import {palySongUrl,getSongDetail,getSongLyrics,getSingerDetail,getAllSingerDetail,getSiMi,getLike,getLikeList,getNoLike,getLikeSinger,getSingerList} from '../assets/api/palySong.js';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import Pullup from '@better-scroll/pull-up'


BScroll.use(Pullup)
BScroll.use(ObserveDOM)

export default {
    props:["playSongId",'playSongList'],
    data(){
        return {
            playSong:null,//播放歌曲
            isPlay:false, //播放状态
            SongDetail:null, //播放歌曲的数据
            songId:0,   //当歌的Id
            playShow:false,  //列表状态
            type:1,    //歌曲播放类型
            bigShow:false,  //大播放器状态
            loop:false,  //循环
            isPullUpLoad: false,
            data: null,
            start:0,
            end:0,
            saveY:0,
            step:0,     //步长
            isStep:true, //控制滑动
            clearTime:null,
            leftTime:0,
            rightTime:0,
            whoLyrics:true,  //大小歌词的切换
            lyric:null,
            top:'calc(55%)',
            lh:[],
            islh:false,
            currentRow:0,
            lyricOne:true,
            singerDetail:null,
            singerTxt:null,
            simi:null,
            LikeList:null,
            Like:false,
            likeSinger:false,
            singerList:null
        }
    },
    created(){
        if(window.localStorage.getItem('login')){
            this.getLikeListFun();
            this.getSingerListFun()
        }
    },
    methods:{
        //获取url
        palySongUrlFun(){
            this.isPlay=false;
            palySongUrl({id:this.playSongId.id}).then(data => {
                this.playSong = data.data[0];
            })
        },
        // 获取信息
        getSongDetailFun(){
              getSongDetail({ids:this.playSongId.id}).then(data=>{
                  this.SongDetail = data.songs[0];
              })
        },
        getLikeFun(){
            this.getLikeListFun();
            getLike(this.playSongId.id).then(data=>{
                console.log(data)
                this.Like = true;
            })
        },
        getLikeListFun(){
            getLikeList(window.localStorage.getItem('userId')).then(data=>{
                console.log(data);
                this.LikeList = data.ids
            })
        },
        getNoLikeFun(){
            this.getLikeListFun();
            getNoLike(window.localStorage.getItem('userId')).then(data=>{
                console.log(data);
                this.Like = false;
            })
        },
        IfLike(){
             for(var i = 0; i < this.LikeList.length;i++){
                 if(this.LikeList[i] == this.playSongId.id){
                    this.Like = true;
                    break ;
                }else{
                    this.Like =false
                }
            }
            console.log(this.Like)
        },
        getLikeSingerFun(){
            console.log(this.playSongId.ar[0].id)
            //{id:this.playSongId.ar[0].id,t:1}
            getLikeSinger(this.playSongId.ar[0].id,1).then(data=>{
                console.log(data)
                this.likeSinger = true
            })
        },
        getNoLikeSingerFun(){
            console.log(this.playSongId.ar[0].id)
            //{id:this.playSongId.ar[0].id,t:1}
            getLikeSinger(this.playSongId.ar[0].id,0).then(data=>{
                console.log(data)
                this.likeSinger = false;
            })
        },
        getSingerListFun(){
            getSingerList().then(data=>{
                console.log(data)
                this.singerList = data.data;
            })
        },
        ifLikeSinger(){
            for(let i = 0; i<this.singerList.length;i++){
                if(this.singerList[i].id == this.playSongId.ar[0].id){
                    this.likeSinger = true;
                    break;
                }else{
                    this.likeSinger = false;
                }
            }
        },
        getSingerDetailFun(){
            getSingerDetail({id:this.playSongId.ar[0].id}).then(data => {
               this.singerDetail = data.data
            })
        },
        getAllSingerDetailFun(){
            getAllSingerDetail({id:this.playSongId.ar[0].id}).then(data=>{
                if(data.introduction.length == 0){
                    this.singerTxt = ['暂无']
                }else{
                    this.sTxt(data.introduction[0].txt) ;
                }
            
            })
        },
        sTxt(txt){
            this.singerTxt =  txt.split('\n').splice(0,3);
            //console.log(this.singerTxt)
        },
        getSiMiFun(){
            getSiMi({id:this.playSongId.id}).then(data=>{
                this.simi=data.songs
            })
        },
        getId(id){
             if(this.songId == null || this.songId !== id || this.songId == ''){
                 getSongDetail({ids:id}).then(data =>{
                     this.song = data.songs[0]
                     this.$emit('getPlaySongId',this.song);
                 })
             }else{
                  this.$emit('getPlaySongId', '123');
             }
        },
        palySong(){
            if(this.isPlay){
                this.$refs.audio.pause();
                clearInterval(this.clearTime);
            }else{
                this.$refs.audio.play();
                if(this.bigShow){
                    clearInterval(this.clearTime);
                        this.clearTime = setInterval(()=>{
                        let  currentTime = this.$refs.audio.currentTime; //当前歌曲时间
                        let  duration =this.$refs.audio.duration;   //歌曲总时长
                        this.leftTime = currentTime;
                        this.rightTime = duration;     
                        if(this.isStep){
                            this.step = (currentTime / duration) * 100;
                        }    
                        if(this.step == 100){
                            clearInterval(this.clearTime);
                            this.$refs.audio.pause();
                        }
                    },500)
                }
            }
            if(this.islh){
                this.islh = false
                setTimeout(()=>{
                    this.lyricHeight()  
                },10)
            }
        
            this.isPlay=!this.isPlay;
        },
        loadeddata(){
                this.palySong();//自动播放音乐
                let duration = this.$refs.audio.duration;//总时长(秒)
                this.leftTime = 0;
                this.rightTime = duration;
                this.step = 0;
        },
        dragStart(){
            this.isStep=false;
        },
        dragEnd(){
            this.isStep=true;
            let duration = (this.$refs.audio.duration * this.step) / 100;
            this.leftTime = duration;
            this.$refs.audio.currentTime = duration; 
        },
        getSongLyricsFun(){
            getSongLyrics({id:this.playSongId.id}).then(data=>{
                this.songLyric(data.lrc.lyric);
            })
        },
        songLyric(text){
            this.lyric = [];
            let arr = text.split('\n');
            for(let i =  0; i < arr.length ; i++){
                let obj = {};
                let lyricArr=arr[i].split(']');
                if(lyricArr[1]){
                    let time = lyricArr[0].substring(1,lyricArr[0].length-1).split(":");
                    let second = +time[0] * 60 + +(Number(time[1]).toFixed(1));
                    obj.text =lyricArr[1];
                    obj.sec = second;
                    //console.log(lyricArr[1].length)
                    if(lyricArr[1].length > 0){
                        this.lyric.push(obj)  
                    }
                }
            }
        },
        lyricHeight(){
            this.lh = [];
            let allLi=this.$refs.lyrics.querySelectorAll('li');
            for(let i = 0 ;i<allLi.length;i++){
                this.lh.push(allLi[i].clientHeight)
            }
        },
        lyricInput(){
            let currentTime = this.$refs.audio.currentTime ;
            let liHeight = 0;
            for(let i = 0;i < this.lh.length;i++){
                liHeight = liHeight + this.lh[i];
                if(currentTime <= this.lyric[i].sec){
                  this.top = 'calc( 55% '+ ' - ' + liHeight +'px )';
                  this.currentRow = i;
                  break;
                }
              }
          },
        nextSong(){
            this.loop = false;
            this.songId = this.playSongList.findIndex(item => item.id == this.playSong.id);
            if(this.type == 1){
                this.songId =  this.songId+ 1 > this.playSongList.length-1 ? 0 : this.songId+ 1;
            }else if(this.type == 2){
                this.songId =this.randomId();
            }else{
                this.loop = true;
                this.$refs.audio.load()
                this.isPlay=false;
            }
            if(this.playSongList.length-1 == this.songId){
                this.$refs.audio.load();
                this.isPlay=false;
            }
            this.$emit('getPlaySongId',this.playSongList[this.songId]);
        },
        lastSong(){
            this.loop = false;
            this.songId = this.playSongList.findIndex(item => item.id == this.playSong.id);
            if(this.type == 1){
              this.songId =  this.songId - 1 < 0 ? this.playSongList.length-1 :  this.songId - 1;
            }else if(this.type == 2){
                this.songId =this.randomId();
            }else{
                this.loop = true;
                this.$refs.audio.load()
                this.isPlay=false;
            }
            if(this.playSongList.length-1 == this.songId){
                this.$refs.audio.load()
                this.isPlay=false;
            }
            this.$emit('getPlaySongId',this.playSongList[this.songId]);
        },
        ended(){
         this.nextSong();
        },
        playSongMusic(id){
             this.$emit('getPlaySongId',id);
        },
        del(id){
            let index = this.playSongList.findIndex(item => item.id == id.id);
            console.log(index);
            this.$emit('del',index)
            if(id == this.playSongId){
                this.nextSong(id);    
            }
        },
        typeStack(){
            if(this.type == 3){
                this.type = 1;
            }else{
                this.type += 1;
            }
        },
        randomId(){
            return parseInt(Math.random()*this.playSongList.length)
        },
        delAll(){
            this.$emit('delAll');
        },
        bigShowFun(){
            this.bigShow=!this.bigShow;
            if(this.bigShow){
                    clearInterval(this.clearTime);
                    this.clearTime = setInterval(()=>{
                        let  currentTime = this.$refs.audio.currentTime; //当前歌曲时间
                        let  duration =this.$refs.audio.duration;   //歌曲总时长
                        this.leftTime = currentTime;
                        this.rightTime = duration;     
                        if(this.isStep){
                            this.step = (currentTime/duration) *100;
                        }    
                        if(this.step == 100){
                            clearInterval(this.clearTime);
                            this.$refs.audio.pause();
                        }
                    },500) 
            }else{
                clearInterval(this.clearTime);
                this.clearTime=null;
            }
            
        },
        load(){
            this.bigShow = !this.bigShow
            this.$emit('loads')
            // setTimeout(()=>{
            //     window.location.reload()
            // },1000)
        }
    },
    watch:{
        playSongId:{
            handler(){
                this.palySongUrlFun();
                this.getSongDetailFun();
                //获取歌词
                this.getSongLyricsFun();
                this.getSingerDetailFun();
                this.getAllSingerDetailFun();
                this.getSiMiFun()
                this.IfLike()
                this.ifLikeSinger()
                this.islh= true;
                //console.log(this.playSongId)
            },
             deep:true,
        },
        playSongList:{
            handler(){
                if(this.playSong == null){
                    this.$emit('getPlaySongId',this.playSongList[0]);
                }else if(this.playSongList.length == 0){
                    this.$refs.audio.pause();
                    this.isPlay = false;
                }
                
            },
            deep:true,
        },
        leftTime(){
            if(this.whoLyrics){
                if(this.lyricOne){
                    this.lyricHeight();
                    this.lyricOne = false;//控制执行一次
                }
                let currentTime = this.$refs.audio.currentTime ;
                let liHeight = 0;
                for(let i = 0;i < this.lh.length;i++){
                    liHeight = liHeight + this.lh[i];
                    if(currentTime <= this.lyric[i].sec){
                    this.top = 'calc( 55% '+ ' - ' + liHeight +'px )';
                    this.currentRow = i-1;
                    break;
                }
              }
            }
        }
    },
    updated(){
        if(this.playShow){
            this.scroll= new BScroll(this.$refs.scroll,{
            probeType:2,
            click: true,
            observeDOM: true,
            disableTouch: false,
        })
            let liList=this.$refs.scroll.querySelectorAll('li');
            let index = this.playSongList.findIndex(item => item.id == this.playSong.id)
            this.scroll.scrollToElement(liList[index],500);
          //this.scroll.scrollToElement();     
        }  
       
    },
    filters:{
        playTime(data){
            let m = parseInt(data / 60);//分钟
            let s = parseInt(data % 60);//秒
            if(m == 0 && s == 0){
              return "00:00";
            }else{
              return (m < 10?"0"+m:m) + ":" + (s < 10?"0"+s:s);
            }
        }
    },
    beforeUpdate(){
        if(!this.$route.meta.music){
            this.isPlay=false;
            clearInterval(this.clearTime);
            this.clearTime = null;
        }
      
    }
}
</script>


<style lang="less">
.pullup-tips{
     padding: 20px;
    text-align: center;
    color: #999
}
.box-playMusic{
    &.active{
        height: 100%;
    }
    &>div{
        height: 100%;
        background: url('https://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg') no-repeat 0 0;
        background-size: auto 100% ;
        background-position: center center;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 900;
    overflow: hidden;
    transition: all .2s ease;
    
    .van-tabs--line{
        width: 100%;
        height: 100%;
        .van-tabs__wrap{
            background:#000000e6;
            height: 50px;
            //background-color: rgba(0, 0, 0, 0.259);
            padding: 0 60px 0 60px;
        .van-tabs__line{
            background-color: #00beff;
        }
        
        }
        .van-tabs__content{
            width: 100%;
            height: 100%;
            .van-tab__pane{
                width: 100%;
                height: 100%;   
            }
        }
    }
 
     .playTop{
        position: absolute;
        top: 7px;
        left: 20px;
        width: 32px;
        height: 32px;
        z-index: 901;
        span{
            display: block;
            width: 100%;
            height: 100%;
            line-height: 32px;
            text-align: center;
            font-size: 20px;
            color: #fff;
        }
    }
   
}
.van_song{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ffffff36;
    &.active{
        background-color: #ffffff36;
    }
    &.whoLyrics{
            position: relative;
                &::before{
                content: '';
                position: absolute;
                top: -1px;
                left: 0;
                width: 100%;
                height: 25%;
                background:  linear-gradient(180deg, #000000e6, #ffffff00);
                z-index: 901;
            }
            &::after{
                content: '';
                position: absolute;
                bottom: calc(35% - 1px);
                left: 0;
                width: 100%;
                height: 25%;
                background:   linear-gradient(0deg, #000000e6, #ffffff00);
                z-index: 901;
            }
        }
    .lyrics{
        position: relative;
        width: 100%;
        height: 65%;
        
        .title{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: 901;
            h4{
                font-size: 20px;
                text-align: center;
                color: #fff;
            }
            h6{
                margin-top: 10px;
                color: rgba(255, 255, 255, 0.807);
            }
        }
        .big_lyrics{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            transition: all .5s ease;
            
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(153, 153, 153, 0.314);
            }
             ul{
                position: absolute;
                //top: calc(50% - 25%);
                left: 0;
                width: 100%;
                height: 60%;
                transition: all .5s ease;
                li{
                    width: 100%;
                    padding: 0 20px;
                    font-size: 18px;
                    text-align: center;
                    line-height: 30px;
                    color: #fff;
                    &.active{
                            font-weight: 900;
                            color: #02e7f3;
                    }
                }
            }
        }
       
    }
    .playFun{
        width: 100%;
        height: 35%;
        box-sizing: border-box;
        padding: 20px 30px 0 30px;
        background: linear-gradient(180deg, #000000e0, #000000c9);
        &.whoLyrics{
            background: linear-gradient(180deg, #00000000, #000000);
        }   
        &.active{
            background-color: #ccc;
        }
        .time{
            height: 30px;
            width: 100%;
            display: flex;
            align-items: center;
            color: #fff;
            .left,.right{
                width: 50px;
                height: 100%;
                margin: 0 10px;
                line-height: 30px;
            }
        }
        .bt_fun{
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            height: 100px;   
            div{
                font-size: 30px;
                color: #fff;
            }
        }
        .paly-music{
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
        }
    }
 }
.min-playMusic{
    width: 100%;
    height: 54px;
    position: fixed;
    bottom: 0px;
    left: 0;
    background-color: rgba(255, 255, 255, 0.92);
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 15px;
    .paly-song{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        animation: spin 10s linear infinite;
        img{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .paly-song.play{
        
        animation-play-state: paused;
    }
    @keyframes spin {
         0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
    }
    .paly-singer{
        flex: 1;
        padding: 0  0 0 15px;
        overflow: hidden;
        h4{
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(42, 42, 42);
            overflow: hidden;
        }
        h6{
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            display: -webkit-box;
            color: rgb(161, 160, 160);
            overflow: hidden;
        }
    }
    .paly-go{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 150px;
        height: 35px;
       
        div{
            font-size: 20px;
        }
        .paly-music{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid rgb(82, 80, 80);
            line-height: 35px;
            text-align: center;
        }
    }
}
.play_bg{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.362);
    width: 100%;
    height: 100%;
    z-index: 900;
}
.play-list{
    position: fixed;
    bottom: 0;
    left:  0;
    width: 100%;
    height: 0;
    z-index: 999;
    background-color: #fff;
    border-radius: 15px 15px 0 0;
    transition: height .5s ease;
    &.active{
        height: 400px;
    }
    .playTop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom:1px solid rgba(0, 0, 0, 0.866) ;
        padding: 10px  15px 10px 15px;
        .iconfont{
            font-size: 18px;
            &.blue,&.blue::before{
                color: rgba(22, 137, 253, 0.981);
                font-weight: 700;
                
            } 
            span{
                font-size: 16px;
            }
            &::before{
                margin-right: 5px;
                color: rgba(0, 0, 0, 0.837);
                font-size: 16px;
            }
        }
        .icon-shanchu{
            width: 50px;
            height: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 29px;
            &::before{
                font-size: 20px;
                margin: 0;
            }
        }
    }
    .playDetail{
            height: 400px;   
            position :relative;
            overflow: hidden;
        ul {
           
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 70px;
                border-bottom :1px solid #eee;
                padding: 10px 15px;
                &:nth-last-child(1){
                    border: none;
                }
                .songDetail{
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                    }
                    .playSong{
                        display: flex;
                        flex-direction: column;
                        margin-left: 20px;
                        h4{
                            color: #000;
                        }
                        h6{
                            color: rgba(0, 0, 0, 0.35);
                        }
                    }
                }
                .icon-shanchu{
                    width: 50px;
                    height: 29px;
                    line-height: 29px;
                    font-size: 20px;
                    text-align: center;
                }
                &.playActive{
                    color: rgb(17, 188, 255);
                    .songDetail{
                        .playSong{
                            h4,h6{
                                font-weight: 700;
                                 color: rgb(17, 188, 255);
                            }
                        }
                        
                    }
                }
            }
        }
    }
}
.min_lyrics{
    position: relative;
    width: 100%;
    height: 100%;
    .img{
        position: absolute;
        top: calc( 50% - 100px );
        left: calc( 50% - 100px );
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        animation: spin 10s linear infinite;
        &.play{
            animation-play-state: paused;
        }
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
.custom-button {
    width: 10px;
    height: 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 100px;
}
.correlation{
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    background-color: #757575c4;
    &>div{
        width: 100%;
        //height: 200px;
        background-color: #afacac9c;
        border-radius: 10px;
        padding: 10px;
    }
    .singer_information{
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            h4{
                font-size: 18px;
                color: #fff;
            }
            div{
                font-size: 14px;
                color: #ccc;
            }
        }
        .singer{
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-around;  
            width: 100%;
            padding-bottom: 20px;
            border-bottom: 1px solid #d8d8d8;
            .person{
                display: flex;
                align-items: center;
                width: 80%;
                .img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    margin-left: 10px;
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    h4{
                        font-size: 16px;
                        color: #fff;
                    }
                    p{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        color: #d2d2d2;
                    }
                }
            }
            span{
               display: block;
               width: 60px;
               height: 25px;
               text-align: center;
               line-height: 25px;
               border-radius: 20px;
               background-color: rgba(222, 222, 222, 0.41);
               color: #fff;
            }
        }
        .achievement{
            margin-top: 20px;
            width: 100%;
            h4{
                color: #fff;
            }
            ul{
                li{
                    margin-top: 5px;
                    color: #d2d2d2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
    .resemblance{
        margin-top: 20px
        ;
        h4{
            font-size: 18px;
            color: #fff;
        }
        ul{
            width: 100%;
            li{
                margin-top: 5px;
                width: 100%;
                display: flex;
                .img{
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .text{
                    width: 75%;
                    margin-left: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    h5{
                        font-size: 16px;
                        color: #fff;  
                         overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    p{
                        font-size: 14px;
                        color:#d2d2d2;
                    }
                }
            }
        }
    }
}
.paly-nocollect{
    &::before{
        color: #ff617d;
    }
}
.nolike{

}
</style>