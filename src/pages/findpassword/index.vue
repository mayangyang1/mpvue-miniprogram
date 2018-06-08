<template>
    <div class="container">
        <div class='register-list'>
            <div class='title'>手机号</div>
            <input v-model='phone' type='number' placeholder='请输入手机号'>
        </div>
        <div class='register-list'>
            <div class='title'>验证码</div>
            <input v-model='versionCode' type='number' placeholder='请输入验证码'>
            <div class='getCode' v-if="isVersion" @click='bindCode'>获取验证码</div>
            <div class='getCode' v-else >重新获取({{timer}})</div>
        </div>
        <div class='register-list'>
            <div class='title'>新密码</div>
            <input v-model='password' password='true' placeholder='请输入密码'>
        </div>
        <div class='register' @click='bindResetpassword'>重置密码</div>
    </div>
</template>
<script>
import * as utils from '../../utils/index.js'
export default {
  data() {
    return {
      isVersion: true, //是否获取验证码
      click: true,
      timer: 60,
      phone: '',
      versionCode: '', //验证码
      password: '', //密码
    };
  },
  methods: {
    getVerificationCode(phone) {
      var that = this;
      utils.postAjax(utils.hostUrl + "/account/account/reset_password/send/verify_code",{ mobilePhone: phone },{
          success: function(res) {
            if (res.data.code === 200) {
              var time = that.timer;
              var timer = setInterval(() => {
                if (time > 0) {
                  time--;
                  that.isVersion = false;
                }
                if (time <= 0) {
                  clearInterval(timer);
                  that.timer = 60;
                  that.isVersion = true;
                }
              }, 1000);
            }
          },
          complete: function() {
            that.click = true;
           
          }
        }
      );
    },
    bindCode() {
      var that = this;
      var regM = /^1[345789]{1}\d{9}$/;
      if(that.click){
        that.click = false;
        if(that.phone && regM.test(that.phone)){
          that.getVerificationCode(that.phone);
        }else{
          if(!that.phone) {
            utils.errorToast('请输入手机号');
          }else{
            utils.errorToast('手机号不正确');
          }
          that.click = true;
        }
      }
    },
    bindResetpassword() { //重置密码
      var that = this;
      if(that.phone && that.versionCode && that.password) {
        that.resetPassword();
      }else{
        if(!that.phone) {
          return utils.errorToast('请输入手机号');
        }
        if(!that.versionCode) {
          return utils.errorToast('请输入验证码');
        }
        if(!that.password) {
          return utils.errorToast('请输入密码');
        }
      }
    },
    resetPassword() {
      var that = this;
      if(that.click) {
        that.click = false;
        var params = {};
        params.newPassword = that.password
        params.mobilePhone = that.phone
        params.verificationCode = that.versionCode
        utils.postAjax(utils.hostUrl + '/account/account/reset_password', params, {
          success: function (res) {
            if(res.data.code === 200){
              utils.successToast('修改成功！');
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },2000)
              
            }else{
              utils.errorToast(res.data.message);
            }
          },
          complete:function(){
            that.click = true;
          }
        })
      }
      
    }
  }
};
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  font-size: 34rpx;
  padding-top: 30rpx;
}
.register-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90rpx;
  border-bottom: 1px solid #ccc;
  padding-left: 20rpx;
  background-color: #fff;
}
.register-list .title {
  width: 150rpx;
}
.register-list input {
  flex: 1;
}
.register-list .getCode {
  height: 90rpx;
  width: 200rpx;
  text-align: center;
  border-left: 1px solid #ccc;
  line-height: 90rpx;
  background-color: #eee;
  color: #666;
}
.register-list .getCode:active {
  background-color: #eee;
  color: #999;
}
.setMargin {
  margin-top: 30rpx;
}
.agreement-con {
  display: flex;
  justify-content: flex-start;
  height: 80rpx;
  align-items: center;
  padding-left: 20rpx;
}

.agreement {
  color: #f46d00;
}

.register {
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
.register:active {
  background-color: #f48d00;
  font-size: 37rpx;
}
.container {
  background-color: #fff;
  padding-top: 0rpx;
  height: 100vh;
}
</style>

