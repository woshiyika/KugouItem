<template>
    <div class="singerDetail" v-if="detail">
        <div :class="['back',{'scroll': scroll}]">
            <div >
                <span class="iconfont icon-31fanhui1" @click="goBack"></span>
                <div class="singer_name">{{detail.artist.name}}</div>
            </div>
            <span class="iconfont icon-tianjia">关注</span>
        </div>
        <div class="singer">
            <div class="img">
                <img :src="detail.artist.cover">
                <div class="text">{{detail.artist.name}}</div>
            </div>
            <div class="fun">
                <van-tabs animated swipeable lazy-render background="#f2f2f2" line-width="10px">
                    <van-tab title="主页">
                        <div class="home" v-if="desc">
                            <div v-for="(item,index) in desc" class="profile" :key="index">
                                <h4>{{item.ti}}</h4>
                                <div :class="['text',{'auto':autoIndex == index}]"><p v-for="(t,i) in descArr[index]" :key="i">{{t}}</p></div>
                                <div v-show="autoIndex !== index" class="more" @click="auto(index)">查看更多<span class=" iconfont icon-31xiala"></span></div>
                                <div v-show="autoIndex == index" class="nomore" @click="auto(index)">收起<span class=" iconfont icon-31xiala"></span></div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab v-if="single" :title="'单曲/'+single.length">
                        <div class="single">
                            <div class="top">
                                <div class="all" @click="addAll">
                                    <span class="iconfont icon-weibiaoti518"></span>全部播放
                                </div>
                                <div class="newOrHot">
                                    最热歌曲
                                </div>
                            </div>
                            <ul class="list">
                                <li v-for="(item,index) in single" :key="index">
                                   <div>
                                        <span class="iconfont icon-tianjia"  @click="addSongList(item.id)"></span>
                                        <div :class="['txt',{'active':item.id == songId}]">
                                            <h4>{{item.name}}</h4>
                                            <p>{{item.ar[0].name}}</p>
                                        </div>
                                   </div>
                                    <span class="iconfont icon-weibiaoti518" @click="getSongID(item.id)"></span>
                                </li>
                            </ul>
                             
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
          <div class="downUp" v-show='downUp'>已添加到待播放队列~</div>
    </div>
</template>

<script>
import {getArtistDesc,getArtistDetail,getArtists,getSongDetail} from '../assets/api/singerDetail.js';
export default {
    props:['isSinger','playSongId'],
    data(){
        return {
            autoIndex:null,
            singerID:null,
            desc:null,
            descArr:null,
            detail:null,
            scroll:false,
            single:null,
            downUp:false,
            songId:null
        }
    },
    created(){
        this.singerID=this.$router.app._route.query.id;
    },
    methods:{
         goBack(){
            this.$emit('loads')
            window.history.back()
        },
        getArtistDescFun(){
            getArtistDesc(this.singerID).then(data=>{
                this.desc = data.introduction
                this.descFun(this.desc);
                //console.log(this.desc)
            })
        },
        descFun(txt){
           // let obj = {}
            this.descArr = []
      
            for(let i = 0;i<txt.length;i++){
                let arr = txt[i].txt.split('\n')
                this.descArr.push(arr)
            }

        },
        getArtistDetailFun(){
            getArtistDetail(this.singerID).then(data=>{
                this.detail = data.data
            })
        },
        //获取歌手单曲
        getArtistsFun(){
            getArtists(this.singerID).then(data=>{
                this.single = data.hotSongs;
            })
        },
        auto(index){
            console.log(index)
            if(this.autoIndex == index){
                this.autoIndex = null;
            }else{
                this.autoIndex = index;
            }
          
        },
        moveScroll(){
            let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>100){
                this.scroll=true;
            }else{
                this.scroll = false;
            }
        },
         getSongID(id){
             console.log(id)
             if(this.songId == null || this.songId !== id || this.songId == ''){
                 getSongDetail({ids:id}).then(data =>{
                     this.song = data.songs[0]
                     this.$emit('getPlaySongId',this.song);
                 })
             }else{
                  this.$emit('getPlaySongId', '123');
             }
        },
        addSongList(id){
            this.downUp =true;
            getSongDetail({ids:id}).then(data=>{
                this.song = data.songs[0];
                this.$emit('addSongList',this.song);
            })
            setTimeout(()=>{
                this.downUp = false
            },500)
        },
        addAll(){
            this.downUp =true;
            this.$emit('addAll',this.single)
            setTimeout(()=>{
                this.downUp = false
            },500)
        }
    },
    mounted(){
        this.$nextTick(()=>{
            window.addEventListener('scroll',this.moveScroll);
        })
    },
    updated(){
        //this.singerID=this.$router.app._route.query.id;
    },
    watch:{
        singerID(){
            //window.location.reload()
            this.getArtistDescFun();
            this.getArtistDetailFun();
            this.getArtistsFun();
        },
        isSinger(){
            this.singerID=this.$router.app._route.query.id;
        },
        playSongId(){
            this.songId=this.playSongId.id;
        }
    }
}
</script>

<style lang="less">
    .singerDetail{
        position: relative;
        width: 100%;
        height: 100%;
        .back{
            &.scroll{
                background-color: #fff;
                color: #000;
            }
            padding: 0 15px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 54px;
            //background-color:#fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 2;
            color: #fff;
            font-weight: 900;
            &>div{
                display: flex;    
                align-items: center;
                justify-content: space-between;
            }
        }
        .singer{
            width: 100%;
            height: 100%;
            background-color: #f2f2f2;
            .img{
                position: relative;
                width: 100%;
                img{
                    display: block;
                    width: 100%;
                }
                .text{
                    position: absolute;
                    bottom: 25px;
                    left: 15px;
                    font-size: 26px;
                    color: #fff;
                    font-weight: 900;
                }
            }
            .fun{
                background-color: #f2f2f2;
                padding: 0 15px 20px; 
                width: 100%;
                .home{
                    width: 100%;
                    margin-top: 5px;
                    .profile{
                        width: 100%;
                        background-color: #ffffff75;
                        margin-bottom: 20px;
                        border-radius: 10px;
                        padding: 10px;
                        overflow: hidden;
                        .text{
                            width: 100%;
                            height: 80px;
                            transition: all .5s ease;
                            margin-top: 10px;
                            font-size: 12px;
                            text-align: justify;
                            color: #a8a8a8;
                            overflow: hidden;
                            line-height: 20px;
                            &.auto{
                                height: auto;
                            }
                        }
                        .more{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            color: #b4b4b4;
                            span{
                                display: block;
                            }
                        }
                        .nomore{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            color: #b4b4b4;
                            span{
                                display: block;
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                .single{
                    width: 100%;
                    .top{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        .all{
                            display: flex;
                            align-items: center;
                            span{
                                display: block;
                                margin-right: 10px;
                                width: 20px;
                                height: 20px;
                                border: 2px solid #000;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 20px;
                            }
                        }
                        .newOrHot{
                            width: 100px;
                            height: 25px;
                            background-color: #e0e0e0;
                            border-radius: 20px;
                            text-align: center;
                            line-height: 25px;
                            color: #fff;
                            font-weight: 900;
                        }
                    }
                    .list{
                        width: 100%;
                        padding: 10px 0 30px;
                        li{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            padding-right: 20px;
                            margin-top: 10px;
                            &>div{
                                display: flex;
                                align-items: center;
                                  span{
                                    display: block;
                                    width: 15px;
                                    height: 15px;
                                    border: 1px solid #000;
                                    border-radius: 5px;
                                    line-height: 16px;
                                    text-align: center;
                                    color: #ccc;
                                    padding: 0;
                                }
                                .txt{
                                    display: flex;
                                    flex-direction: column;
                                    margin-left: 20px;
                                    &.active{
                                        color: #00b3ff;
                                        font-weight: 900;
                                        p{
                                            color: #00b3ff;
                                        }
                                    }
                                    h4{
                                        margin-bottom: 3px;
                                    }
                                    p{
                                        font-size: 14px;
                                        color:  #a6a6a6;
                                    }
                            }
                            }
                            span{
                                display: block;
                                width: 15px;
                                height: 15px;
                                border: 1px solid rgb(175, 175, 175);
                                border-radius: 5px;
                                line-height: 16px;
                                padding: 0 2px;
                                text-align: center;
                                color: rgb(179, 179, 179);
                            }
                            
                        }
                    }
                }
                .van-tabs__line {
                    position: absolute;
                    bottom: 15px;
                    left: 0;
                    z-index: 1;
                    width: 40px;
                    height: 3px;
                    background-color: #00b3ff;
                    border-radius: 3px;
                }
            }
        }
    }
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
</style>