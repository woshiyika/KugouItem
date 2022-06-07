<template>
    <div class="guidePage">
        <div class="swiper-container-guidePage">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../../assets/img/01.webp" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../../assets/img/02.webp" alt="">
                </div>
                <div class="swiper-slide" @click="goHome">
                    <img src="../../assets/img/03.webp" alt="">
                </div>
            </div>
                <!-- Add Pagination -->
            <div class="swiper-pagination  swiper-pagination-guidePage"></div>
        </div>
    </div>
</template>
<script>
    import Swiper from "swiper"

    export default {
        mounted(){
            new Swiper('.swiper-container-guidePage', {
                pagination: '.swiper-pagination-guidePage',
                paginationClickable: true
            });
        },
        methods:{
            goHome(){
                window.localStorage.setItem("guidePage","true");
                this.$router.push("/");
            }
        }
    }
</script>

<style lang="less">
.guidePage{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    text-align: center;
    background-color: #fff;
    .swiper-container-guidePage{
        width: 100%;
        height: 100%;
        .swiper-wrapper{
            width: 100%;
            height: 100%;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-guidePage{

        }
    }
}
</style>