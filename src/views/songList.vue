<template>
    <div class="song_list" v-if="songList">
        <ul class="songLists">
            <li class="list" v-for="(item,index) in songList" :key="index">
                <router-link :to="{path:'/songList/detail',query:{id:item.id}}" >
                    <div class="img">
                        <img :src="item.coverImgUrl+'?param=100y100'" alt="">
                    </div>
                    <div class="songContent">
                        <div class="content iconfont icon-youbian">
                            <p>{{item.name}}</p>
                            <p class="iconfont icon-18erji-2">{{item.playCount}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>
 import { getSongList } from "../assets/api/songList.js"
export default {
    props:['isShow'],
    data(){
        return {
            songList:null,
            isKeep:true
        }
    },
    methods:{
        getSongListFun(){
            if(this.isKeep){
                getSongList().then(data=>{
                    if(data.code == 200){
                        this.songList=data.playlists;
                    }
                })
                this.isKeep=false;
            }
        }
    },
    created(){
        this.getSongListFun();
    }
}
</script>

<style lang="less">
    .song_list{
        padding: 0px 15px 0px  15px;
    }
    .songLists{
     
        width: 100%;
      
        .list{
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            border-radius: 10px;
            margin-top: 15px;
            padding: 15px 0px;
            margin-right: 5px;
            box-shadow: 0px 4px 8px 0px #dbd6d6;
            a{
                width: 100%;
       
                display: flex;
                .img{
                    border-radius: 5px;
                    overflow: hidden;
                    margin-left: 10px;
                    img{
                        display: block;
                        width: 100px;
                        height: 100px;
                    }
                }
                .songContent{
                    display: flex;
                    flex: 1;
                    .content{
                          width: 100%;
                          display: flex;
                          flex-wrap: wrap;
                          align-items: center;
                          position: relative;
                          padding-left: 10px;
                         p{
                            padding-left: 10px;
                            width: 200px;
                            font-size: 18px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            color: rgb(139, 116, 116);
                         }
                         p:nth-child(2){

                             padding-left: 12px;
                         }
                         p:nth-child(2)::before{
                             margin-right: 5px;
                             color: #ccc;
                         }
                    }
                    .content::before{
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        margin-top: -15px ;
                        font-size: 30px;
                        color:#ccc;
                    }
                }
            }
        }
    }
</style>