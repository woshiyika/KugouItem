<template>
       <div class="list-box-page">
                <div  v-for="item in topList" :key="item.id">
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
                </div>
            </div>
</template>

<script>
import { getTopList,getPlayListDetail } from "../assets/api/recommend.js"
export default {
    data:function(){
        return {
            topList:[],
            isKeep:true
        }
    },
     beforeRouteEnter (to, from, next) {
            // 请求第一个接口
            getTopList().then(data=>{
                // next();跳转路由
                next(vm=>vm.getPlayListDetailFun(data.list))
            })
        },methods:{
            getPlayListDetailFun(list){
                if(this.isKeep){
                    // 请求第二个接口数据
                    for(let i = 0;i < list.length;i++){
                        let id = list[i].id; //获取id
                        getPlayListDetail({id}).then(data=>{
                            this.topList.push(data.playlist);
                        })
                    }
                    this.isKeep=false;
                }
               
            }
        }
}
</script>

<style lang="less">
.list-box-page {
    padding: 0 15px;
    a{
        display: flex;
        width: 100%;
        margin:12px 0;
        //background: rgba(98, 119 ,192 ,0.06);
        border-radius: 8px;
        box-shadow: 0px 0px 7px 0px #00000024;
        .img {
            border-radius: 10px;
            overflow: hidden;
            img {
                display: block;
                width: 103px;
                height: 103px;
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
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;

                span:nth-child(1),
                span:nth-child(3) {
                    color: #818894;
                }
                span:nth-child(2) {
                    color: #000;
                    margin: 0 0 0 5px;   
                     overflow: hidden;
                }
            }
            .text:nth-child(1) {
                margin-top: 0;
            }
        }
    }
    a  a{
        margin: 0;
    }
}
</style>