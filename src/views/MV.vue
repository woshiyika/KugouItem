<template>
    <div class="MV" ref="mv">
        <div class="mv_card" >
            <a  v-for="(item,index) in MvList" :key="index"  >
                <div  v-if=" (index % 9 == 0)" >
                    <div class="video_box">
                        <div :class="['information',{'hd':hd==item.id}]" >
                            <span class="iconfont icon-shipinbofangliang">{{item.playCount | capitalize}}</span>
                            <span class="iconfont icon-pinglun">{{commentCount[index] | capitalize}}</span>
                        </div>
                        <div @click="stop(item.id)" v-if="playDetail">
                            <video  :src="playDetail[index].url"  :ref="item.id" controls></video>
                        </div>
                        <div :class="['video_img','iconfont','icon-weibiaoti518',{'hd':hd == item.id},{'active': poa }]" @click="play(item.id)" >
                            <img  :src="item.cover+'?param=365y205'">
                        </div>
                    </div>
                    <router-link tag="p" :to="{path:'/MV/detail',query:{id:item.id}}">{{item.name}}</router-link>
                </div>
                <router-link :to="{path:'/MV/detail',query:{id:item.id}}" v-else>
                    <div class="video_box" >
                        <div class="information">
                        <span class="iconfont icon-shipinbofangliang">{{item.playCount | capitalize}}</span>
                        <span class="iconfont icon-pinglun">{{commentCount[index] | capitalize}}</span>
                        </div>
                        <div class="video_img">
                            <img  :src="item.cover+'?param=178y100'">
                        </div>
                    </div>
                     <p>{{item.name}}</p>
                </router-link>
            </a>
        </div>
         <h3 class="NotData" v-show="!NotData">下拉加载更多数据...</h3>
         <h3 class="NotData" v-show="NotData">已经没有啦~~~</h3>
    </div>
</template>

<script>

import {getMVList,getMvDetail,getMvUrl} from '../assets/api/MV.js';

export default {
    data(){
        return{
            MvList:null,
            commentCount:[],
            playMv:null,
            isPlayMV:false,
            playDetail:null,
            hd:null,
            poa:false,
            isPlay:true,
            flag:true,
            offset:0,
            NotData:false,
        }
    },
    methods:{
        getMVListFun(){
            getMVList({limit:10}).then(data=>{
                this.MvList = data.data;
            })
        },
        getMVDetailFun(id){
            getMvDetail(id).then(data => {
                this.commentCount.push(data.commentCount);
            })
        },
        getMvUrlFun(id){
            this.playMv=[];
            getMvUrl(id).then(data=>{
                this.playMv.push(data.data);
            })
        },
        play(id){
            this.playDetail=this.playMv;
            this.poa = true;
            if(this.hd != null){
                this.$refs[this.hd][0].pause();
            }
            this.hd=id;
            setTimeout(()=>{
                 this.$refs[this.hd][0].play();
            },0)
                     
        },
        stop(id){
            //this.hd = null
            if(this.isPlay){
                 this.$refs[id][0].pause()
                 this.isPlay=false;
            }else{
                this.isPlay=true;
                this.$refs[id][0].play()
            }
           
        },
        hScroll(){
                 let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动位置
                 
                let lis = this.$refs.mv.getElementsByTagName("a");
                let num = lis.length
                let liHeight = lis[num-11].offsetTop;
                setTimeout(()=>{
                    if(scrollTop > liHeight){ //添加数据
                        this.poa = false;
                        this.hd = null;    
                        this.playDetail = null;
                        this.addData();
                    }
                },1000)
        },
        addData(){
           if(this.flag && !this.NotData){
                    this.flag = false;
                    this.offset +=10;
                    getMVList({limit:10,offset:this.offset}).then(data=>{
                        if(data.data.length){
                            this.MvList = this.MvList.concat(data.data);
                            this.flag = true;
                        }else{
                            this.NotData = true;
                        }
                    })
                }
        }
    },
    created(){
        this.getMVListFun();
    },
    watch:{
        MvList(){
            for(var j = 0;j<this.MvList.length;j++){
                this.getMvUrlFun(this.MvList[j].id)
            }

            for(var i =0;i<this.MvList.length;i++){
                this.getMVDetailFun(this.MvList[i].id)
            }

            this.isPlayMV=true;
        }
    },
    filters: {
        capitalize: function (value) {
            if(value > 10000){
                return (value / 10000).toFixed(2) + '万'
            }else{
                return value;
            }
        }
     },
     mounted(){
          this.$nextTick(()=>{
                window.addEventListener("scroll",this.hScroll);
            })
     }, 
     beforeDestroy(){
            window.removeEventListener("scroll",this.hScroll);
            if(this.hd != null){
                this.$refs[this.hd][0].pause
            }
            this.hd=null
        }
}
</script>

<style lang="less">
.NotData{
    text-align: center;
}
.MV{
    width: 100%;
    .mv_card{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        &>a{  
            display: block;
            box-sizing: border-box;
            width: 50%;
            padding: 5px 5px;
            .video_box{
                position: relative;
                width: 100%;
                .information{
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    padding:2.333vw 3.2vw;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
                    z-index: 1;
                    color: #fff;
                    span{
                        font-size: 3.0vw;
                    }
                }
                video{
                    width: 100%;
                    z-index: 1;
                }
                .video_img{
                    display: block;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    }
                }
            }
          p{
            margin-top: 3px;
            font-size: 13px;
            color: #000;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        a:nth-child(9n+1){
            width: 100%;
            .video_box{
                .video_img{
                    &.hd{
                        display: none;
                    }
                    &.active{
                        position: absolute;
                    } 
                     &::after{
                        position: absolute;
                        display: block;
                        top: 0;
                        left: 0;
                        content: '';
                        width: 100%;
                        height: 100%;
                        background-color: rgba(6, 6, 6, 0.2);
                        z-index: 1;
                    }
                    &::before{
                        position: absolute;
                        top: calc(50% - 25px);
                        left: calc(50% - 25px);
                        font-size: 50px;
                        border: 1px solid #fff;
                        border-radius: 50%;
                        z-index: 2;
                    }
                }
                .information{
                padding: 1.333vw 1.6vw;
                z-index: 2;
                font-size: 3.2vw;
                &.hd{
                        display: none;
                    }
            }
        }
    }
}
}
</style>
