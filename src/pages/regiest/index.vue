<template>
  <div class="container">
        <div class='register-list'>
            <div class='title'>手机号</div>
            <input v-model="phone" placeholder='请输入手机号'>
        </div>
        <div class='register-list'>
            <div class='title'>验证码</div>
            <input v-model="versionCode" placeholder='请输入验证码'>
            <div class='getCode' v-if="isVersion" @click='getVersionCode'>获取验证码</div>
            <div class='getCode' v-else >重新获取({{timer}})</div>
        </div>
        <div class='register-list'>
            <div class='title'>姓 名</div>
            <input v-model="userName" placeholder='请输入你的真实姓名'>
        </div>
        <div class='register-list setMargin'>
            <div class='title'>密 码</div>
            <input v-model="password" password='true' placeholder='请输入密码'>
        </div>
        <div class='register-list'>
            <div class='title'>确认密码</div>
            <input v-model="surePassword" password='true' placeholder='请再次输入密码'>
        </div>
        <div class='agreement-con'>
            <!-- <checkbox checked='{{false}}' color='#f46d00'></checkbox> -->
            <div>同意<text class='agreement'>《天盾物流注册服务协议》</text></div>
        </div>
        <div class='register' @click="registerUser">注册</div>
    </div>
</template>

<script>
import * as utils from '../../utils/index.js';
export default {
  components: {
    
  },
  data() {
    return {
      phone: '', //手机号
      versionCode: '', //验证码
      userName: '', //用户名
      password: '', //用户名
      surePassword: '', //确认密码
      isVersion: true,
      timer: 60,
      click: true,
    };
  },
  methods:{
    getVersionCode(){
      var that = this;
      var regM = /^1[345789]{1}\d{9}$/;
      if(that.click) {
        that.click = false;
        if(that.phone && regM.test(that.phone)){
          that.versionCodeAjax(that.phone);
        }else{
          if(!that.phone){
             utils.errorToast('请输入手机号');
          }else{
            utils.errorToast('手机号不正确');
          }
          that.click = true;
        }
      }
      
    },
    versionCodeAjax(phone){
      var that = this;
      var time = that.timer;
      utils.postAjax(utils.hostUrl + '/account/account/send/verify_code',{mobilePhone: phone},{
        success:function(res) {
          if(res.data.code === 200) {
            that.isVersion = false;
            var timer = setInterval(() => {
              if (time > 0) {
                time--;
                that.timer = time;
              }
              if (time <= 0) {
                clearInterval(timer);
                that.timer = 60;
                that.isVersion = true;
              }
            }, 1000)
          }
        },
        complete:function() {
          that.click = true;
        }
      })
    },
    registerUser() { //注册用户

    }

  },
  created() {
   
  }
};
</script>

<style>
.container{
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  font-size: 34rpx;
  padding-top: 30rpx;
}
.register-list{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90rpx;
  border-bottom: 1px solid #ccc;
  padding-left: 20rpx;
  background-color: #fff;
}
.register-list .title{
  width: 150rpx;
}
.register-list input{
  flex: 1;
}
.register-list .getCode{
  font-size: 28rpx;
  height: 90rpx;
  width: 200rpx;
  text-align: center;
  border-left: 1px solid #ccc;
  line-height: 90rpx;
  background-color: #eee;
  color: #666;
}
.register-list .getCode:active{
  background-color: #eee;
  color: #999;
}
.setMargin{
  margin-top: 30rpx;
}
.agreement-con{
  display: flex;
  justify-content: flex-start;
  height: 80rpx;
  align-items: center;
  padding-left: 20rpx;
}
 
.agreement{
  color: #f46d00;
}

.register{
  width: 80vw;
  height: 80rpx;
  background-color: #f46d00;
  text-align: center;
  line-height: 80rpx;
  font-size: 34rpx;
  margin: 0 auto;
  color: #fff;
  border-radius: 10rpx;
  margin-top: 50rpx;
}
.register:active{
  background-color: #f48d00;
  font-size: 37rpx;
}
</style>
