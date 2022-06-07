<template>
    <div class="userPage" v-if="user">
        <div class="top">
            <div class="back" @click="back"><span class="iconfont icon-31fanhui1"></span></div>
            <router-link to="/search" tag="div" class="search"><input type="text"></router-link>
            <div class="my">我的</div>
        </div>
        <div class="model">
            <div class="userModel" :style="{'background-image':'url('+user.profile.backgroundUrl+')'}">
            <div class="left">
                <div class="img">
                    <img :src="user.profile.avatarUrl" alt="">
                </div>
                <div class="txt">
                    <div class="lv">
                        <h4>{{user.profile.nickname}}</h4>
                        <p v-if="user.profile.vipType != 0">SVIP</p>
                        <p v-else>开通VIP</p>
                        <p >LV.{{user.level}}</p>
                    </div>
                    <div class="fans">
                        <p>{{user.profile.follows}} 关注</p>
                        <p>{{user.profile.followeds}} 粉丝</p>
                    </div>
                </div>
            </div>
            <div class="right">
                编辑资料
            </div>
        </div>
        </div>
        <div class="userFun">
            <van-tabs background=#f7f7f7 swipeable animated>
                <van-tab title="音乐">
                    <div class="musicList">
                        <div class="topList" v-if="List">
                            <router-link tag="div" :to="{path:'/songList/detail',query:{id:List[0].id}}" class="love">
                                <div class="img" >
                                    <img :src="List[0].coverImgUrl">
                                </div>
                                <div class="count">喜欢
                                    <span>{{List[0].trackCount}}</span>
                                </div>
                            </router-link>
                            <div class="latelyPlay" v-if="Recent">
                                <div class="img" >
                                    <img v-for="item of 3" :key="Recent[item-1].song.id" :src="Recent[item-1].song.al.picUrl+'?param=51y51'">
                                </div>
                                <div class="count">记录
                                    <span>{{Recent.length}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="songList">
                            <ul v-if="List">
                                <h3>歌单</h3>
                                <li v-for="(item,index) in List" :key="index">
                                    <router-link tag="div" :to="{path:'/songList/detail',query:{id:item.id}}">
                                        <img :src="item.coverImgUrl" alt="">
                                        <div class="txt">
                                            <h4>{{item.name}}</h4>
                                            <p>{{item.trackCount}} 首</p>
                                        </div>
                                    </router-link>
                                </li>
                                <li style="height:20px"></li>
                            </ul>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="功能">
                    <div class="dropOut" @click="getLogOutFun">退出登陆</div>
                </van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<script>
import {getUserDetail,getRecent,getUserPlayList,getLogOut} from '../../assets/api/userPage.js';
export default {
    created(){
        this.getUserDetailFun();
        this.getRecentFun();
        this.getUserPlayListFun();
    },
    data(){
        return {
            user:null,
            Recent:null,
            List:null
        }
    },
    methods:{
        back(){
            window.history.back()
        },
        getUserDetailFun(){
            getUserDetail(window.localStorage.getItem('userId')).then(data=>{    
                this.user=data  
            })
        },getRecentFun(){
            getRecent(window.localStorage.getItem('userId')).then(data=>{
                this.Recent = data.allData
            })
        },getUserPlayListFun(){
            getUserPlayList(window.localStorage.getItem('userId')).then(data=>{
                console.log(data.playlist)
                this.List = data.playlist
            })
        },getLogOutFun(){
            getLogOut().then(data => {
                console.log(data)
                if(data.code == 200){
                    localStorage.removeItem('login')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    this.$emit('loginOut');
                }
            })
        }
    }
}
</script>

<style lang="less">
    .userPage{
        width: 100%;
        height: 100%;
        padding: 10px 0px;
        background-color: #f8f8f8;
        .top{ 
            padding: 0 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .search{
                input{
                    border: 1px solid #ccc;
                    border-radius: 20px;
                }
            }
        }
        .model{
            padding: 0 15px;
        }
        .userModel{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            width: 100%;
            height: 100px;
            border-radius: 20px;
            margin-top: 20px;
            background-size: 100% 100%;
            .left{
                display: flex;
                align-items: center;
                height: 100%;
                color: #fff;
                .img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: pink;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .txt{
                    .lv{
                        display: flex;
                        align-items: center;
                        p{
                            font-size: 12px;
                        }
                        p:nth-child(2){
                            margin:  0 5px;
                            background-color: rgb(255, 211, 16);
                            padding: 0px 5px;
                            font-size: 10px;
                            border-radius: 20px;
                        }
                    }
                    .fans{
                        display: flex;
                        align-items: center;
                        p{
                            font-size: 14px;
                            margin-right: 10px;
                        }
                    }
                }
            }
            .right{
                padding: 5px 10px;
                background-color: rgb(157 153 153 / 43%);
                color: #fff;
                border-radius: 20px;
               
            }
        }
        .userFun{ 
            margin-top: 20px;
            padding: 10px 0;
            background-color: #f7f7f7;
            .musicList{
                margin-top: 20px;
                width: 100%;
                padding: 10px 0;
                .topList{
                    display: flex;
                    justify-content: space-between;
                    height: 90px;
                    &>div{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin: 0 15px;
                        width: 48%;
                        height: 100%;
                        padding: 10px;
                        background-color: #f2f2f2;
                        border-radius: 10px;
                        box-shadow: 1px 1px 5px 2px #e3e4ea;
                        .img{
                            position: relative;
                            width: 60px;
                            height: 60px;
                            border-radius: 10px;
                            &>img{
                                position: absolute;
                                display: block;
                                border-radius: 5px;
                            }
                            img:nth-child(1){
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: pink;
                                z-index: 3;
                            }
                             img:nth-child(2){
                                bottom: 0;
                                left: 40%;
                                width: 85%;
                                height: 85%;
                                background-color: skyblue;
                                z-index: 2;
                            }
                               img:nth-child(3){
                                bottom: 0;
                                left: 74%;
                                width: 70%;
                                height: 70%;
                                background-color: rgb(1, 8, 10);
                                z-index: 1;
                            }
                        }
                        .count{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                    &>div:nth-child(1){
                        margin-right: 7.5px;
                    }
                    &>div:nth-child(2){
                        margin-left: 7.5px;
                    }
                }
                .songList{
                    width: 100%;
                    padding: 0 15px;
                    margin-top: 15px;
                    ul{
                        li{
                            margin-top: 10px;
                            &>div{
                                display: flex;
                                align-items: center; 
                            }
                            img{
                                display: block;
                                width: 50px;
                                height: 50px;
                                border-radius: 10px;
                                margin-right: 10px;
                            }
                            h4{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical
                            }
                            p{
                                font-size: 12px;
                                color: #9e9e9e;
                            }
                        }
                    }
                }
            }
        }
    }
    .van-tabs__line {
    position: absolute;
    bottom: 15px;
    left: 0;
    z-index: 1;
    width: 20px;
    height: 3px;
    background-color: #00d0ff;
    border-radius: 3px;
}
.dropOut{
    width: 130px;
    height: 30px;
    background-color: #ccc;
    margin: 10px auto;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
}
</style>