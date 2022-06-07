<template>
    <div>
    <div class="head_music_p" v-show="$route.meta.headNav"></div>
    <div class="head_music" v-show="$route.meta.headNav">
        <router-link to="/musicIndex">
            <img src="https://m.kugou.com/v3/static/images/img/icon_kugou1.png" alt="">
        </router-link>
        <div class="head_d" >
            <a href="#" class="">下载酷狗</a>
            <a >
                <router-link tag="div" to="/loginPage" v-if="!isLogin">登陆/注册</router-link>
                <router-link tag="div" to="/user" v-if="isLogin">
                    <div class="user" v-if="user">
                        <img :src="user.profile.avatarUrl" >{{user.profile.nickname}}
                    </div>
                </router-link>
            </a>
        </div>
    </div>
    <div class="head_nav_p"  v-show="$route.meta.headNav"></div>
    <div class="head_nav" v-show="$route.meta.headNav" >
        <ul>
            <li>
                <router-link  to="/musicIndex">音乐</router-link>
            </li>
            <li>
                <router-link  to="/topList">排行</router-link>
            </li>
            <li>
                <router-link  to="/songList" >歌单</router-link>
            </li>
            <li>
                <router-link  to="/MV">MV</router-link>
            </li>
        </ul>
        <a href="#" class="search"><img src="https://m.kugou.com/v3/static/images/img/icon_search_black.png" alt=""></a>
        <!-- <a href="">用户</a> -->
    </div>
    </div>
</template>

<script>
import {getUserDetail} from '../assets/api/headNav.js';
export default {
    props:['isLogin'],
    data(){
        return {
            user:null,
        }
    },
    created(){
        if(window.localStorage.getItem('userId')){
            this.getUserDetailFun()
        }
    },
    methods:{
        getUserDetailFun(){
            getUserDetail(window.localStorage.getItem('userId')).then(data=>{
                this.user= data
            })
        }
    },watch:{
    }
}
</script>

<style lang="less">
html,body{
    width: 100%;
    height: 100%;
}
.head_music_p {
    width: 100%;
    height: 65px;
}

.head_music {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 65px;
    padding: 0px 15px;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 4;
    a {
        display: block;
        height: 25px;
        width: 94px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .head_d {
        display: flex;
        justify-content: space-between;
        width: 170px;

        a:nth-child(1) {
            width: 72px;
            height: 25px;
            border-radius: 20px;
            background-color: #00baff;
            color: #fff;
            text-align: center;
            line-height: 25px;
            font-size: 12px;
        }

        a:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 88px;
            height: 25px;
            line-height: 25px;
            border-radius: 20px;
            color: #fff;
            font-size: 12px;
            background: linear-gradient(90deg, #f5ce79 0%, #e5bd61 100%);

            img {
                margin-right: 3px;
                width: 15px;
                height: 15px;
            }
            div{
                width: 100%;height: 100%;
                text-align: center;
            }
        }
    }
}

.head_nav_p {
    width: 100%;
    height: 58px;
}

.head_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 65px;
    left: 0;
    width: 100%;
    height: 58px;
    padding: 17px 15px 13px 15px;
    box-sizing: border-box;
    z-index: 3;
    background: linear-gradient(180deg, #F9FAFD 0%, #FFFFFF 100%);

    ul {
        display: flex;
        align-items: center;
        li{
            a {
            font-size: 17px;
            color: #818894;
            margin-left: 25px;
            margin-right: 2px;
            position: relative;
        }
        a.router-link-active {
            margin-top: -3px;
        }

        a.router-link-active::after {
            content: ' ';
            width: 5px;
            height: 5px;
            position: absolute;
            bottom: -8px;
            left: calc(50% - 2.5px);
            border-radius: 50%;
            background: #00BAFF;
        }
         a.router-link-active  {
            color: #000;
            font-size: 21px;
            font-weight: 600;
        }
        } 

         li:nth-child(1) a {
            margin-left: 0;
        }   
    }
    .search {
        display: block;
        width: 17px;
        height: 17px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
.user{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    img{
        border-radius: 50%;
    }
}

</style>