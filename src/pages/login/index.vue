<template>
    <div class="container">
        <div class='login-icon'>
            <div class=' icon icon-one'>
            <img mode='aspectFit' src='/static/images/logo.png'>
            </div>
            <div class='icon icon-two'>
            <img mode='aspectFit' src='/static/images/role.jpg'>
            </div>
        </div>
        <div class='login-form'>
            <div class='account'>
            <img src='/static/images/wdb.png'>
            <input type='number' v-model='userAccount' placeholder='请输入手机号'>
            </div>
            <div class='account'>
            <img src='/static/images/wdb.png'>
            <input v-model="userPasswoed"   password placeholder='请输入密码'>
            </div>
            <div class='login-btn' @click='bindLogin'>立即登录</div>
            <div class='operation'>
            <div class='register' @click='bindRegister'>立即注册</div>
            <div class='register' @click='bindFindPassword'>找回密码</div>
            </div>
        </div>
    </div>
</template>
<script>
 import * as utils from '../../utils/index.js';
export default {
  data() {
    return {
      userAccount: "", //登录账号
      userPasswoed: "" //登录密码
    };
  },
  methods: {
    bindLogin() {
        var that =this;
      if (that.userAccount && that.userPasswoed) {
        utils.logins(that, that.userAccount, that.userPasswoed, true);
      } else {
        if (that.userAccount == "") {
          return utils.errorToast("请输入用户名");
        }
        if (that.userPasswoed == "") {
          return utils.errorToast("请输入密码");
        }
      }
    },
    bindRegister() {
        wx.navigateTo({
            url: '../regiest/main'
        })
    },
    bindFindPassword() {
      wx.navigateTo({
        url: '../findpassword/main'
      })
    }
  }
};
</script>
<style scoped>
/* pages/personal/login/login.wxss */
.container {
  width: 100vw;
  height: 100%;
  background-color: #fff;
}
.login-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200rpx;
  margin-bottom: 30rpx;
}
.icon-one image {
  width: 300rpx;
  height: 300rpx;
}
.icon-two image {
  width: 140rpx;
  height: 80rpx;
}
.login-form .account {
  margin: 0 auto;
  width: 80vw;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  height: 80rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
}
.account image {
  width: 50rpx;
  height: 50rpx;
  margin: 0 10rpx;
}
.account input {
  flex: 1;
  font-size: 34rpx;
}
.login-btn {
  width: 80vw;
  height: 80rpx;
  background-color: #f46d00;
  text-align: center;
  line-height: 80rpx;
  font-size: 34rpx;
  margin: 0 auto;
  color: #fff;
  border-radius: 10rpx;
}
.login-btn:active {
  background-color: #f48d00;
  font-size: 37rpx;
}
.operation {
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
  color: #666;
  width: 78vw;
  margin: 0 auto;
  margin-top: 20rpx;
}
.operation .register:active {
  font-size: 32rpx;
  color: #333;
}
</style>
