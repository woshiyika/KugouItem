<template>
    <div class="advertising">
        <div class="img">
            <img src="../../assets/img/618.webp" alt="">
        </div>
        <div class="brand">
            <img src="https://m.kugou.com/v3/static/images/img/icon_kugou2.png" alt="">
        </div>
        <div class="jumpOver" @click="jumpOver">跳过广告{{count}}s</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            count:3,
            countTime:null
        }
    },
    methods:{
        jumpOver(){
            sessionStorage.setItem('advertisingPage',true)
            this.$router.push('/musicIndex');
        }
    },
    mounted(){
        this.countTime = setInterval(()=>{
            this.count -= 1;
            if(this.count <= 0){
               
                clearInterval(this.countTime);
                this.jumpOver();
            }
        },1000)
    },
    beforeDestroy(){
        clearInterval(this.countTime);
    }
}
</script>


<style lang="less">
    .advertising{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 100%;
        width: 100%;
        .img{
            width: 100%;
            height: 80%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .brand{
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            height: 20%;
            img{
                display: block;
                width: 150px;
                height: 40px;
            }
           
        }
        .jumpOver{
            padding: 0 10px 0 10px ;
            position: absolute;
            top: 35px;
            right: 15px;
            height: 30px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.429);
            border-radius: 30px;
            line-height: 30px;
        }
    }
</style>