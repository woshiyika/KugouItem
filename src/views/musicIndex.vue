<template>
    <div>
        <a href="#" class="card_vip">
           <img :src="'https://m.kugou.com/v3/static/images/img/card_vip1.png'" alt="">
         </a>
        <div class="main">
            <div class="title">
                <h2>新歌首发</h2>
            </div>
            <div class="song newSong">
                <div class="song_card"  v-for="index in 6" :key="index">
                    <div class="song_card_0" v-if="newSong" @click="getSongID(newSong[index].id)">
                        <a  class="img"><img :src="newSong[index].picUrl+'?param=103y103'" alt=""></a>
                        <a  class="text">
                            <p>{{newSong[index].name}}</p>
                            <p>{{newSong[index].artist.name}}</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="title">
                <h2>热门歌单</h2>
                <router-link to="/songList">更多</router-link>
            </div>
            <div class="song" v-if="HotList">
                <div class="song_card" v-for="(item) in HotList" :key="item.id">
                    <div class="song_card_0">
                        <router-link :to="{path:'/songList/detail',query:{id:item.id}}" class="img">
                            <img :src="item.coverImgUrl+'?param=103y103'" alt="">
                            <div class="play-sum">{{item.playCount | capitalize}}</div>
                        </router-link>
                        <router-link :to="{path:'/songList/detail',query:{id:item.id}}" class="text">
                            <p>{{item.name}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="title">
                <h2>酷狗热歌榜</h2>
                <router-link to="/topList">更多</router-link>
            </div>
            <div class="list-box" v-if="topList">
                <a  v-for="item in topList" :key="item.id">
                    <router-link :to="{path:'/songList/detail',query:{id:item.id}}">
                        <div class="img">
                             <img :src="item.coverImgUrl+'?param=103y103'" alt="">
                        </div>
                         <div class="list">
                            <div class="text" v-for="i in 3" :key="i">
                                <span>{{i}}</span>
                                <span>{{item.tracks[i-1].name}}</span>
                                <span> - {{item.tracks[i-1].ar[0].name}}</span>
                             </div>
                         </div>
                    </router-link>             
                </a>
            </div>
             <div class="title">
                <h2>热门歌手</h2>
                <router-link to="/singer">更多</router-link>
            </div>
            <div class="swiper-container swiper-singer" v-show="singer">
                <div class="swiper-wrapper" >
                    <div class="swiper-slide" v-for="(item,index) in singer" :key="index">
                        <router-link :to="'/singer/detail?id='+ item.id">
                            <div class="hotSinger-img">
                                 <img :src="item.picUrl +'?param=263y197'" alt="">
                                 <i>单曲数：{{item.musicSize}}</i>
                            </div>
                            <div class="hotSinger-text">
                                <h4>{{item.name}}</h4>
                                <p>{{item.alias[0]}}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- <div class="title">
                <h2>有声小说</h2>
                <a href="#">更多</a>
            </div>
            <div class="song">
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction1.jpg" alt="">
                            <div class="play-sum">1.3万</div>
                            <div class="end">完结</div>
                        </a>
                        <a href="#" class="text">
                            <p>冷王独宠冲喜妃</p>
                        </a>
                    </div>
                </div>
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction2.jpg" alt="">
                            <div class="play-sum">3825</div>
                            <div class="end">完结</div>
                        </a>
                        <a href="#" class="text">
                            <p>重生王妃有点狠|女强文|古代言情|精品多人有声剧</p>
                        </a>
                    </div>
                </div>
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction3.jpg" alt="">
                            <div class="play-sum">6137</div>
                        </a>
                        <a href="#" class="text">
                            <p>穿越七零：丑妻要逆袭 | 重生致富女强爽文免费畅听</p>
                        </a>
                    </div>
                </div>
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction4.jpg" alt="">
                            <div class="play-sum">3346</div>
                        </a>
                        <a href="#" class="text">
                            <p>大奉打更人</p>
                        </a>
                    </div>
                </div>
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction5.jpg" alt="">
                            <div class="play-sum">2754</div>
                            <div class="end">完结</div>
                        </a>
                        <a href="#" class="text">
                            <p>神算夫人：我只想当咸鱼 爆笑重生|实力宠妻</p>
                        </a>
                    </div>
                </div>
                <div class="song_card">
                    <div class="song_card_0">
                        <a href="#" class="img">
                            <img src="img/fiction6.jpg" alt="">
                            <div class="play-sum">5801</div>
                        </a>
                        <a href="#" class="text">
                            <p>弃婿当道</p>
                        </a>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="footer">
            <img src="https://m.kugou.com/v3/static/images/img/icon_kugou2.png" alt="">
            <a href="#">打开酷狗APP，畅听海量音乐</a>
        </div>
    </div>
</template>

<script>
 import { getNewSong,getHotList,getTopList,getPlayListDetail,getHotSinger } from "../assets/api/recommend.js"
import Swiper from 'swiper';

export default {
       data(){
            return {
                newSong:null,
                HotList:null,
                topList:[],
                singer:null,
                isLogin:true,
                isKeep:true
            }
        }, 
        beforeRouteEnter (to, from, next) {
            // 请求第一个接口
            getTopList().then(data=>{
                // next();跳转路由
                next(vm=>vm.getPlayListDetailFun(data.list))
            })
        },
        methods:{
            //获取新歌
            getNewSongFun(){
                getNewSong().then(data=>{
                     this.newSong = data.albums;
                })
            },
            //获取热门榜单
             getHotListFun(){
                getHotList().then(data=>{
                    this.HotList = data.playlists;
                })
            },
            // 获取播放列表
            getPlayListDetailFun(list){
                // 请求第二个接口数据
                if(this.isLogin){
                    for(let i = 0;i < 3;i++){
                    let id = list[i].id; //获取id
                    getPlayListDetail({id}).then(data=>{
                        this.topList.push(data.playlist);
                    })
                    }
                    this.isLogin=false
                }
               
            },
            getHotSingerFun(){
                getHotSinger({type:-1,area:-1,initial:-1,limit:6}).then(data => {
                    this.singer=data.artists
                })
            },
            getSongID(id){
                this.$emit('getPlaySongId',id);
            }
        },
        created(){
            if(this.isKeep){
                this.getNewSongFun();
                
                this.getHotSingerFun();
                this.isKeep=false
            }
            this.getHotListFun();
           
        },beforeCreate(){
             if(!window.sessionStorage.getItem("reload")){
                window.sessionStorage.setItem("reload","true");
                window.location.reload();
            }
        },
        beforeUpdate(){
                  new Swiper('.swiper-singer', {
                        slidesPerView: 1.2,
                        spaceBetween: 25,
                        observer:true,
                        observeParents: true ,
                        loop :true,
                        touchmove:true,
                })
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

.card_vip {
    display: block;
    margin: 5px 15px 0;
    img {
        width: 100%;
        display: block;
    }
}
.main {
    width: 100%;
    padding: 0 15px;
    .swiper-singer{
        height: 290px;
        .swiper-slide{
            background-color: rgba(6, 6, 6, 0.078);
            border-radius: 20px;
            padding: 10px 10px 0 10px;
            a{
                display: block;
                width: 100%;
                height: auto;
                .hotSinger-img{
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        }
                    i{
                        position: absolute;
                        padding:2px 5px;
                        bottom: 10px;
                        right: 5px;
                        height: 20px;
                        border-radius: 10px;
                        background-color: rgba(178, 221, 238, 0.705);
                        color:#fff;
                        display: block;
                    }
                }
                .hotSinger-text{
                    h4{
                        text-align: center;
                        color:#000;
                        font-size: 20px;
                        margin-top: 5px;
                        margin-bottom: 7px;
                    }
                    p{   
                         color:rgba(0, 0, 0, 0.619);
                         text-align: center;
                    }
                }
            }
        }
    }
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding-top: 20px;
    h2 {
        font-size: 16px;
    }
    a {
        display: flex;
        font-size: 12px;
        align-items: center;
        height: 12px;
        line-height: 12px;
    }
    a::after {
        content: '';
        background: url(https://m.kugou.com/v3/static/images/img/icon_arrow_right_gray.png);
        width: 11px;
        height: 11px;
        background-size: 100%;
        display: block;
        margin-left: 2px;
        margin-top: -1px;
    }
}
.newSong{
    p{
        -webkit-line-clamp: 1 !important;
    }
}
.song {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .song_card {
        width: calc(100% / 3);
        .song_card_0 {
            width: 103px;
            height: 144px;
            margin: 0 auto;
            .img {
                display: block;
                width: 100%;
                height: 103px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .play-sum {
                    display: flex;
                    align-items: center;
                    font-size: 10px;
                    color: #fff;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: rgba(75, 84, 91, 0.3);
                    padding: 5px 7px;
                    border-radius: 10px;
                }
                .play-sum::before {
                    content: '';
                    width: 10px;
                    height: 10px;
                    background: url(https://m.kugou.com/v3/static/images/img/icon_play_white.png);
                    background-size: 100%;
                    display: block;
                    margin-right: 3px;
                    margin-top: 1px;
                }
                .end {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.9);
                    border-radius: 5px;
                    top: 5px;
                    left: 5px;
                    padding: 3px 5px;
                    font-size: 10px;
                    color: #fff;
                }
            }

            .text {
                display: block;
                margin-top: 5px;

                p {
                    overflow: hidden;
                    font-size: 12px;
                    line-height: 18px;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;

                    text-overflow: ellipsis;
                    display: -webkit-box;
                }

                p:nth-child(1) {

                    color: #000;

                }

                p:nth-child(2) {

                    color: #818894;


                }
            }
        }
    }
}

.list-box {
    a {
        display: flex;
        margin-top: 10px;
        width: 100%;
        background: rgb(98 119 192 / 4%);
        border-radius: 5px;
        .img {
            border-radius: 10px;
            overflow: hidden;
            img {
                display: block;
                width: 103px;
                height: 103px;
                background-color: skyblue;
            }
        }

        .list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .text {

                font-size: 12px;
                margin-left: 12px;
                margin-top: 10px;

                span:nth-child(1),
                span:nth-child(3) {
                    color: #818894;

                }

                span:nth-child(2) {
                    color: #000;
                }
                span:nth-child(2){
                    padding-left: 12px;
                }

            }

            .text:nth-child(1) {
                margin-top: 0;
            }
        }
    }

    a:nth-child(1) {
        margin-top: 0;
    }
}

.footer {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    height: 244px;
    background: url(https://m.kugou.com/v3/static/images/img/bg_footer1.png) no-repeat;
    background-size: cover;

    img {
        display: block;
        margin-bottom: 25px;
        width: 150px;
        height: 40px;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 40px;
        border: 1px solid #00a9ff;
        border-radius: 20px;
        color: #00a9ff;
        font-size: 13px;
    }

    a::after {
        content: '';
        background: url(https://m.kugou.com/v3/static/images/img/icon_arrow_right_blue.png);
        width: 11px;
        height: 11px;
        background-size: 100%;
        display: block;
        margin-right: 3px;
        margin-top: 0px;
    }
}
</style>