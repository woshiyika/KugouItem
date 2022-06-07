<template>
    <div class="videoDetail" v-if="MVDetail">
        <div class="back">
            <span class="iconfont icon-31fanhui1" @click="back">返回</span>
            <p class="text">{{MVDetail.name}}</p>
        </div>
        <div class="video_box">
            
            <div v-if="Video">
                <video :src="Video.url" controls ref="video"></video>
            </div>
            <div v-show="NoPlay" class="img iconfont icon-weibiaoti518" @click="playMV">
                <img :src="MVDetail.cover" alt="">
                <div class="information">
                <span class="iconfont icon-shipinbofangliang">{{MVDetail.playCount}}</span>
                <span class="iconfont icon-pinglun">{{MVDetail.commentCount}}</span>
                <span>{{MVDetail.publishTime}}</span>
            </div>
            </div>
            <div :class="['desc',{'auto':desc}]">{{MVDetail.desc}}
                <span class="iconfont icon-31xiala" @click="desc = !desc"></span>
            </div>
            <p class="text">标题：{{MVDetail.name}}</p>
        </div>
        <van-tabs type="line" swipeable animated ref="tabs">
            <van-tab title="相关推荐">
                <div class="similarity" v-if="XsMV">
                    <div class="box" v-for="(item,index) in XsMV" :key="index">
                        <router-link :to="{path:'/MV/detail',query:{id:item.id}}" >
                        <div @click="go">
                            <div class="img">
                                <img :src="item.cover">
                                <div class="information">
                                    <span class="iconfont icon-shipinbofangliang">{{item.playCount | capitalize}}</span>
                                </div>
                            </div>
                            <p>{{item.name}}</p>
                        </div>
                        </router-link>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'评论'+total">
                <div class="comment">
                    <div class="opt">
                        <div v-show="hotOrNew" @click="isHOt">按热度</div>
                        <div v-show="!hotOrNew" @click="isHOt">按时间</div>
                    </div>
                    
                   <ul>
                       <li v-show="hotOrNew" v-for="(item,index) in hotComment" :key="index">
                            <div class="user">
                                <div>
                                    <div class="img">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="username">
                                        {{item.user.nickname}}
                                        <span>{{item.timeStr}}</span>
                                    </div>
                                </div>
                                <p><span class="iconfont icon-shoucang"></span>{{item.likedCount}}</p>
                            </div>
                            <div class="text">
                                <p><em>{{item.content}}</em></p>
                            </div>
                        </li>

                        <li v-show="!hotOrNew" v-for="(item) in newComment" :key="item.id">
                            <div class="user">
                                <div>
                                    <div class="img">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="username">
                                        {{item.user.nickname}}
                                        <span>{{item.timeStr}}</span>
                                    </div>
                                </div>
                                <p><span class="iconfont icon-shoucang"></span>{{item.likedCount}}</p>
                            </div>
                            <div class="text">
                                <p><em>{{item.content}}</em></p>
                            </div>
                        </li>
                   </ul>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {getMvDetail,getMvUrl,getMvXS,getMvComment} from '../assets/api/MVDetail.js';
// {{$router.app._route.query.id}}
export default {
    data(){
        return {
            MVId:null,
            MVDetail:null,
            Video:null,
            NoPlay:true,
            desc:false,
            XsMV:null,
            newComment:null,
            hotComment:null,
            total:null,
            hotOrNew:true
        }
    },
    created(){
        this.MVId = this.$router.app._route.query.id;
        this.getMvDetailFun();
        this.getMvUrlFun();
        this.getMvXSFun();
        this.getMvCommentFun()
    },
    methods:{
        getMvDetailFun(){
            getMvDetail(this.MVId).then(data=>{
                this.MVDetail = data.data
            })
        },
        getMvUrlFun(){
            getMvUrl(this.MVId).then(data=>{
                this.Video=data.data
            })
        },
        getMvXSFun(){
            getMvXS(this.MVId).then(data=>{
                this.XsMV= data.mvs
            })
        },
        getMvCommentFun(){
            getMvComment(this.MVId).then(data => {
                this.total=data.total;
                this.newComment=data.comments;
                this.hotComment=data.hotComments;
            })
        },
        back(){
            window.history.back()
        },
        playMV(){
            this.$refs.video.play()
            this.NoPlay=false
        },
        isHOt(){
            this.hotOrNew =  !this.hotOrNew;
        },go(){
            setTimeout(()=>{
                window.location.reload();
            },500)
             
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
     }
    
}
</script>

<style lang="less">
        .opt{
            display: flex;
            justify-content: flex-end;
            div{
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 30px;
            }
        }
    .videoDetail{
        width: 100%;
        .back{
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            //color: aliceblue;
            //background-color: rgb(0, 182, 254);
            border-bottom: 2px solid #fff;
            span{
                display: block;
                width: 100px;
                height: 100%;
                padding: 0 5px;
                line-height: 40px;
                font-size: 16px;
                color: #00000080;font-weight: 900;
            }
            p{
            //padding: 5px 20px 0 10px;
            height: 100%;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 16px;
            color: #0000007a;
            }
        }
        .video_box{
            position: relative;
            width: 100%;
            video{
                width: 100%;
                height: 35vh;
                background-color: #000;
            }
            .text{
                padding: 5px 20px 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 14px;
                color: rgb(133, 134, 135);
            }
            .desc{
                position: relative;
                width: 100%;
                padding: 5px 30px 0 10px;
                height: 28px;
                overflow: hidden;
                margin-bottom: 10px;
                color: rgb(77, 77, 77);
                span{
                    position: absolute;
                    top: 6px;
                    right: 15px;
                  transition: all .2s ease;
                }
                &.auto{
                    height: auto;
                    span{
                        transform: rotate(180deg);
                    }
                }
            }
            .img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 35vh;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .information{
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    padding: 2.666vw 3.2vw;
                    z-index: 2;
                    color: #fff;
                    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
                    span{
                        padding: 0 5px;
                        font-size: 14px;
                        &::before{
                            margin-right: 5px;
                        }
                    }
                }
                &::after{
                    position: absolute;
                    display: block;
                    top: 0;
                    left: 0;
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-color: rgba(6, 6, 6, 0.27);
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
                    color: #fff;
                }
            }
        }
        .similarity{
            display: flex;
            flex-wrap: wrap;
            padding: 10px 1.333vw;
            .box{
                padding: 5px;
                width: 50%;
                .img{
                    position: relative;
                    width: 100%;
                    border-radius: 5px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                     .information{
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        padding: 1.333vw 1.6vw;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        background: linear-gradient(0deg, rgba(0, 0, 0, 0.85),transparent);
                        z-index: 1;
                        color: #fff;
                        font-size: 13px;
                    }
                }
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 13px;
                    padding: 5px 0 0 0;
                    color: rgb(62, 62, 62);
                }
            }
        }
        .comment{
            width: 100%;
            padding: 0 15px;
            ul{
                 width: 100%;
                 li{
                     margin-bottom: 20px;
                     .user {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        &>div{
                            display: flex;
                            align-items: center;
                        }
                        &>p{
                            display: flex;
                            align-items: center;
                            text-align: justify;
                            font-size: 12px;
                        }
                        .img{
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height: 100%;
                                display: block;
                            }
                        }
                        .username{
                            display: flex;
                            margin-left: 8px;
                            color: #00BAFF;
                            flex-direction: column;
                            span{
                                font-size: 12px;
                                color: #999;
                            }
                        }
                    }
                    .text{
                        width: 100%;
                        padding: 8px 0 0 40px;
                        p{
                            position: relative;
                            font-size: 12px;
                            color: #000;
                            text-align: justify;
                            // word-break: break-word;
                            // max-height: 68px;
                            // text-overflow: ellipsis;
                            // display: -webkit-box;
                            // -webkit-line-clamp: 3;
                            // -webkit-box-orient: vertical;
                            // overflow: hidden;
                            em{
                                font-style: normal;
                                font-size: 14px;
                                line-height: 22px;
                            }
                        }
                    }
                 }
            }
        }
    }
</style>

