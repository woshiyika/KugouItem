<template>
    <div class="listDetail" v-if="palyDetail">
        <div class="top-back">
        <p>{{palyDetail.name}}</p>
                <a @click="goBack">
                    <i></i>
                </a>
        </div>
        <div class="playListMain">
             <div class="img-box">
                <img :src="palyDetail.coverImgUrl" alt="">
                <div class="info-time"><span>上次更新时间：{{getLocalTime()}}</span></div>
             </div>
             <div :class="['listText',{'auto':!isDown}]">
                 <p>{{palyDetail.description}}</p>
                 <div :class="['switch', {'on':isDown},{'off':!isDown}]" @click="isDown = !isDown"></div>
             </div>
            <ul class="song-list">
                <div class="playAll" @click="playAllSong(palyDetail.tracks)"><i class="iconfont icon-weibiaoti518"></i> 播放全部<span>{{palyDetail.tracks.length}}</span></div>
                <li v-for="(item,index) in palyDetail.tracks" :key="index" :class="[{'active-paly': item.id == playSongId}]">
                    <a>
                        <div class="Ranking">
                            <span>{{item.name}} - {{item.ar[0].name}}</span>
                        </div>
                        <span :class="['item-num',{'one':index == 0},{'two':index == 1},{'three':index == 2}]">{{index+1}}</span>
                        <div class="icon">
                            <i :class="['download','iconfont', {'icon-weibiaoti519':item.id == playSongId  },{'icon-weibiaoti518': item.id !== playSongId}]" @click="getSongID(item.id)"></i>
                            <i class="download iconfont icon-tianjia" @click="addSongList(item.id)"></i>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="downUp" v-show='downUp'>已添加到待播放队列~</div>
        <div class="playListFooter">
                更多好歌，尽在酷狗
                <span>打开APP</span>
        </div>
    </div>
</template>

<script>
import {playListDetail,getSongDetail} from '../assets/api/palyListDetail.js';
export default {
    props:['playSongId'],
    created(){
        this.palyId=this.$router.app._route.query.id
      
        this.getPlayListDetail()
    },
    data(){
        return {
            palyId:null,
            palyDetail:null,
            upTime:'',
            isDown:true,
            downUp:false,
            song:null
        }
    },
    methods:{
        goBack(){
            window.history.back()
        },
        getPlayListDetail(){

            playListDetail(this.palyId).then(data => {
      
                if(data.code == 200){
                    this.palyDetail=data.playlist;
                    this.upTime = data.playlist.trackUpdateTime;
                }
              
            })
        }, 
        getLocalTime() {     
            return new Date(this.upTime).toLocaleString().replace(/:\d{1,2}$/,' ');     
        },
         getSongID(id){
             if(this.songId == null || this.songId !== id || this.songId == ''){
                 this.$emit('getPlaySongId',id);
             }else{
                  this.$emit('getPlaySongId', '123');
             }
        },
        addSongList(id){
            this.downUp =true;
            getSongDetail({ids:id}).then(data=>{
                this.song = data.songs[0];
                console.log(this.song);
                this.$emit('addSongList',this.song);
            })
           
            setTimeout(()=>{
                this.downUp = false
            },500)
        }
    }
}
</script>

<style lang="less">
.downUp{
    position: fixed;
    top: calc(50% - 30px);
    left:calc(50% - 100px);
    z-index:999;
    width: 200px;
    height: 30px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
}

.playAll{
    position: relative;
    width: 100%;
    font-size: 18px;
    line-height: 30px;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px solid #000;
    i{
        position: absolute;
        top: 50%;
        left: 0px;
        margin-top: -14px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #000;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        margin-left: 1px;
    }
    span{
        margin-left: 5px;
        color: rgb(135, 133, 133);
        font-size: 14px;
    }
}
.listDetail{
    width: 100%;
    position: relative;
    top:0px;
    z-index: 2;
    .top-back {
        z-index: 1;
        padding: 0 40px;
        position: fixed;
        width: 100%;
        height: 54px;
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
        p {
            height: 100%;
            line-height: 54px;
            font-size: 24px;
            text-align: center;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        a {
           display: block;
           width: 35px;
           height: 44px;
           position: absolute;
           top: 0;
           left: 0;
           text-align: center;
           cursor: pointer;
           i {
                width: 13px;
                height: 23px;
                margin-top: .687265rem;
                display: inline-block;
                background: url(https://m.kugou.com/v3/static/images/index/goback_1.png) no-repeat;
                background-size: 100%;
            }
        }
    }
    .playListMain {
        width: 100%;
        background-color: #fff;
        z-index: 2;
        .img-box {
            position: relative;
            width: 100%;
            height: 225px;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                margin-top: -85px;
            }
            .info-time {
                width: 100%;
                height: 50px;
                background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
                position: absolute;
                bottom: 0;
                left: 0;
                span {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    color: #fff;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .listText{
            position: relative;
            width: 100%;
            padding: 5px 55px 0 15px;
            height: 35px;
            overflow: hidden;
            p{
                line-height: 25px;
                text-align: justify;
            }

            .switch{
                position: absolute;
                top: 0;
                right: 0;
                width: 22px;
                height: 22px;
                margin:7px 11px 0 0 ;
            }
            .switch.on{
                background: url(https://m.kugou.com/v3/static/images/index/close_icon.png) no-repeat;
                background-size: 100%;
            }
            .switch.off{
                background: url( https://m.kugou.com/v3/static/images/index/open_icon.png) no-repeat;
                background-size: 100%;
            }
        }
        .listText.auto{
            height: auto;
        }
        .song-list {
         width: 100%;
         padding-left: 12px;
         background-color: #e3e3e35b;
         //box-shadow:0px 0px 8px 7px #dbd6d6;
         margin-top: 10px;
         border-radius: 20px;
         li {
            width: 100%;
            height: 70px;
            border-bottom: 1px solid #ccc;
            z-index: 2;
             a {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                .Ranking {
                    width: 100%;
                    height: 100%;
                    padding: 0 80px 0 38px;
                    line-height: 70px;
                       overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    span {
                        width: 100%;
                        font-size: 18px;
                        color: #000;
                     
                    }
                }
                .item-num {
                     position: absolute;
                    top: 50%;
                    left: 0;
                    margin-top: -9px;
                    padding: 0 9px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 16px;
                    color: #999;
                    text-align: center;
                    border-radius: 10px;
                }
                .item-num.one {
                    background: #e80000;
                    color: #fff;
                }

                .item-num.two {
                    background: #ff7200;
                    color: #fff;
                }

                .item-num.three {
                    background: #f8b300;
                    color: #fff;
                }
                .icon{
                    position: absolute;
                    display: flex;
                    justify-content: space-evenly;
                    top: 50%;
                    right: 0;
                    width: 70px;
                     margin-right: 11px;
                    margin-top: -11px;
                    .download {
                        display: block;
                        width: 22px;
                        height: 22px;
                        border: 1px solid rgb(98, 96, 96);
                        border-radius: 50%;
                        text-align: center;
                        line-height: 22px;
                        color: #999;
                        margin-left: 1px;
                    }
                     i:nth-child(2):active{
                        color:#2fa1f9;
                        border-color:#2fa1f9 ;
                        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.701);
                    }
                }
                
            }       
        }
        li.active-paly a .Ranking span{
            font-weight: 700;
            color: #2fa1f9;
        }
        }
    }
    .playListFooter {
        padding: 16px 0;
        width: 100%;
        height: 70px;
        text-align: center;
        span {
            width: 90px;
            height: 38px;
            line-height: 38px;
            background: #2fa1f9;
            border-radius: 3px;
            display: inline-block;
            vertical-align: middle;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>