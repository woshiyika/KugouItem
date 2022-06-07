<template>
    <div class="loginPage">
          
       <div v-show="isLogin">
            <div class="img_top" >
                <div class="back">
                    <div @click="back">取消</div>
                </div>
                <img src="https://imgessl.kugou.com/h5_pic/20190102152429343803.jpg" alt="">
            </div>
            <div class="login_mode">
                <div class="phone_login login_btn" @click="isLogin=!isLogin">手机号登陆</div>
                <div class="code_login login_btn">二维码登陆</div>
                <div class="email_login login_btn">邮箱登陆</div>
            </div>
            <div class="warn">
                <ul>
                    <li>手机号登陆若未注册过默认注册</li>
                </ul>
            </div>
       </div>
        <div class="login" v-show="!isLogin">
            <div class="login_top">
                <span @click="isLogin=!isLogin" class="iconfont icon-31fanhui1">返回</span>
            </div>
            <div class="panel">
                 <div class="panel1 username" v-show="isNewUser">
                    <span class="iconfont icon-yanzhengyanzhengma">用户名</span>
                    <input type="text"  placeholder="用户名" v-model="userName">
                </div>
                <div class="panel1 phone">
                    <span class="iconfont icon-shoujihao">手机号</span>
                    <input type="text" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="手机号" v-model="phone">
                    <div class="gocode"><div @click="getCaptchaFun">获取验证码</div></div>
                </div>
                <div class="panel1 password">
                    <span class="iconfont icon-mima">密码</span>
                    <input type="password" placeholder="密码" v-model="password">
                </div>
                 <div class="panel1 code">
                    <span class="iconfont icon-yanzhengyanzhengma">验证码</span>
                    <input type="text" oninput="if(value.length>4)value=value.slice(0,4)" placeholder="验证码" v-model="Captcha">
                </div>
                <div class="login_go" @click="Login"><div>登陆/注册</div></div>
            </div>
            <p class="no">未注册过酷狗的手机号，我们将自动帮你注册账号</p>
            <div class="msg" v-show="isMsg">{{msg}}</div>
        </div>
        
    </div>
</template>

<script>
import {getIsNewUser,getLogin,getJoin,getCaptcha,getIsCaptcha} from '../../assets/api/login.js'
export default {
     data(){
            return {
                isLogin:true,
                phone:null,
                password:null,
                Captcha:null,
                userName:null,
                msg:'',
                isMsg:false,
                isNewUser:false,
                isName:true,
                IsCaptcha:false
            }
        },
    methods:{
        back(){
            window.history.back()
        },
        getCaptchaFun(){
            let isPhone = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
            let isUser=null
            if(isPhone.test(this.phone)){
               getIsNewUser(this.phone).then(data=>{
                  isUser = data.exist;
                   //判断是否注册
                   if(isUser == -1){
                    this.isNewUser = true;
                    this.msg = '您未注册，请输入用户名注册'
                    this.isMsg=true
                    setTimeout(() => {
                        this.isMsg=false
                    }, 2000);
                }
               })  
              getCaptcha(this.phone).then(data=>{
                console.log(data);
                if(data.data){
                    this.msg = '验证码已发送'
                    this.isMsg=true
                    setTimeout(() => {
                        this.isMsg=false
                    }, 2000);
                  }
              })
            }else{
                this.msg = '手机号错误，请重新输入~'
                this.isMsg=true
                 setTimeout(() => {
                    this.isMsg=false;
                }, 2000);
            }   
        },
        Login(){
            getIsCaptcha({phone:this.phone,captcha:this.Captcha}).then((data)=>{
                this.IsCaptcha = data.data;
                 if(this.IsCaptcha){
               //判断是否重复用户名
                    if(this.isName){
                     //判断是否注册过，
                        if(this.isNewUser){
                    //未注册过
                    getJoin({phone:this.phone,password:this.password,captcha:this.Captcha,nickname:this.userName}).then(data=>{
                        if(data.code == 200){
                            window.location.reload()
                        }else{
                            this.msg = '用户名重复'
                            this.isMsg=true
                            setTimeout(() => {
                                this.isMsg=false
                            }, 2000);
                        }
                    })
                         }else{
                        // 注册过 验证码功能：captcha:this.Captcha
                        getLogin({phone:this.phone,password:this.password,captcha:this.captcha}).then(data=>{
                            console.log(data)
                            localStorage.setItem("token",data.token);
                            localStorage.setItem("userId",data.profile.userId);
                            localStorage.setItem("login",true);
                            if(data.code == 200){
                                this.msg = '登陆成功'
                                this.isMsg=true
                                setTimeout(() => {
                                    this.isMsg=false
                                }, 2000);
                                this.$emit('loginFun');
                                //this.$router.push('/');
                            }else{
                                this.msg = data.message
                                this.isMsg=true
                                setTimeout(() => {
                                    this.isMsg=false
                                }, 2000);
                            }
                        })
                    }
                    }else{
                        this.msg = '用户名重复'
                        this.isMsg=true
                        setTimeout(() => {
                            this.isMsg=false
                        }, 2000);
                    }
                }else{
                this.msg = '请输入验证码'
                this.isMsg=true
                setTimeout(() => {
                    this.isMsg=false
                    }, 2000);
                }
            })
            }
        },
        // getIsNameFun(){
        //     console.log(this.userName)
        //     getIsName(this.userName).then((data)=>{
        //         console.log(data)
        //         // this.msg = '用户名重复'
        //         //     this.isMsg=true
        //         //     setTimeout(() => {
        //         //         this.isMsg=false
        //         // }, 2000);
        //     })
        // }
}
</script>

<style lang="less">
.msg{
    position: absolute;
    width: 200px;
    height: 40px;
    background-color: skyblue;
    bottom: 30%;
    left: calc(50% - 100px);
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
}
.no{
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
}
    .loginPage{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index:99;
        background-color: #fff;
        .img_top{
            width: 100%;
            img{
                display:block;
                width: 100%;
            }
            .back{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                position: absolute;
                padding: 0 40px;
                top: 0;
                left: 0;
                width: 100%;
                height: 54px;
                background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
                font-size: 18px;
                color: #fff;
                font-weight: 700;
                letter-spacing:1px;
            }
        }
        .login_mode{
            position: relative;
            margin-top: -65px;
            width: 100%;
            .login_btn{
                margin: 0 auto 30px;
                height: 35px;
                background-color: rgb(7, 183, 247);
                width: 70%;
                border-radius: 20px;
                line-height: 35px;
                text-align: center;
                font-size: 18px;
                color: #fff;
            }
            .code_login{
                background-color: rgb(48, 177, 44);
            }
        }
        .warn{
            width: 70%;
            margin: 50px auto;
            text-align: center;
            font-size: 13px;
            color: rgb(105, 105, 105);
        }
        .login{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #f4f4f4;
            .login_top{
                width: 100%;
                height: 54px;
                background-color: skyblue;
                span{
                    display: block;
                    width: 100px;
                    height: 100%;
                    text-align: center;
                    line-height: 54px;
                }
            }
            .panel{
                margin-top: 20px;
                .panel1{
                    display: flex;
                    width: 100%;
                    height: 50px;
                    padding: 0 5px;
                    background-color: #fff;
                    border-top: 1px solid #e7e7e7;
                    // margin-top: 3px;
                    span{
                        display: block;
                        height: 100%;
                        width: 80px;
                        line-height: 50px;
                        text-align:left;
                        font-size: 14px;
                    }
                    input{
                        flex: 1;
                        outline-style: none ;
                        border: 0px;
                        padding-left: 5px;
                     
                    }
                    .gocode{
                        display: block;
                        width: 80px;
                        padding: 0;
                        text-align: center;
                        padding: 5px 0;
                        div{
                            width: 100%;
                            height: 100%;
                            line-height: 40px;
                            font-size: 14px;
                            border-left: 2px solid #e7e7e7;
                            color: #399ddbc2;
                        }
                    }
                }
                .login_go{
                    display: block;
                    width: 100%;
                    height: 50px;
                    padding: 0 15px 0;
                    margin-top: 20px;
                    div{
                        text-align: center;
                        line-height: 50px;
                        width: 100%;
                        height: 100%;
                        background-color: rgb(0, 204, 255);
                        border-radius: 5px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>