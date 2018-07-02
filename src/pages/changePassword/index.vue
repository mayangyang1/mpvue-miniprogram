<template>
  <div class="container">
    <div class="list">
      <div class="item flex-fs pdr20">
        <div class="title">手&nbsp;&nbsp;机&nbsp;&nbsp;号:</div>
        <div class="message flex-sb">
          <input v-model="phone" disabled type="text">
        </div>
      </div>
      <div class="item flex-fs pdr20">
        <div class="title">验&nbsp;&nbsp;证&nbsp;&nbsp;码:</div>
        <div class="message flex-sb">
          <input v-model="versionCode" placeholder="请输入验证码" type="text">
          <div class="tips" v-if="isVerifying">重新获取({{time}})</div>
          <div class="operation" v-else @click="getVersionCode"> 获取验证码</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item flex-fs pdr20">
        <div class="title">登录密码:</div>
        <div class="message flex-sb">
          <input v-model="password" maxlength="6" type="password" placeholder="请输入六位数字" >
        </div>
      </div>
      <div class="item flex-fs pdr20">
        <div class="title">确认密码:</div>
        <div class="message flex-sb">
          <input v-model="surePassword" maxlength="6" type="password" placeholder="请输入六位数字" >
        </div>
      </div>
    </div>
    <div class="common-btn row main-bg-color" @click="bindSubmission">提交</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      phone: '',
      versionCode:'',
      password: '',
      surePassword: '',
      isVerifying: false,
      time: 60,
      click: true

    };
  },
  methods: {
    getVersionCode() {
      var that = this;
      if(that.click) {
        that.click = false;
        utils.postAjax(utils.hostUrl + `/pay/mobile/sendModifyPayPasswordVerifyCode`, {mobile: that.phone}, {//发送重置密码短信
          success: function (res) {
            if (res.data.code === 200) {
              that.isVerifying = true;
              var timer = setInterval(() => {
                var time = that.time;
                if (time > 0) {
                  time--;
                  that.time = time;
                }

              }, 1000);
              setTimeout(() => {
                clearInterval(timer);
                that.isVerifying = false;
                that.time = 60;
              }, 60000)
            }else{
              if(res.data.code === 5074) {
                utils.errorToast('请稍后再试');
              }else{
                utils.errorToast(res.data.content);
              }
              
            }
          },
          complete:function() {
            that.click = true;
          }
        });
      }
    },
    bindSubmission() {  //确认操作
      var that = this;
      var params = {};
      params.mobile = that.phone; //手机号
      params.verifyCode = that.versionCode; //验证码
      params.password = that.password; //密码
      if (that.password === that.surePassword) {
        if (params.mobile != '' && params.verifyCode != '') {
          utils.postAjax(utils.hostUrl + `/pay/mobile/modifyWithdrawPassword`, params, {//修改提现密码
            success: function (res) {
              if (res.data.code === 200 && res.data.content) {
                utils.successToast('操作成功');
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              } else {
                utils.errorToast(res.data.content);
              }

            },
          });
        } else {
          if (params.verifyCode == '') {
            return app.errorToast('请输入验证码');
          }
        }
      } else {
        utils.errorToast('两次密码不一致');
      }
    }
  },
  onShow() {
    var that = this;
    that.phone = '';
    that.versionCode = '';
    that.password = '';
    that.surePassword = '';
    that.time = 60;
    that.click = true;
    that.isVerifying = false;
    
    this.phone = wx.getStorageSync('userPhone');
    var type = this.$root.$mp.query.type;
    var textValue = "";
    if(type == 0) {
      textValue = '设置交易密码';
    }else if(type == 1) {
      textValue = '修改交易密码';
    }else {
      textValue = '忘记交易密码';
    }
    wx.setNavigationBarTitle({
      title: textValue,
    })
  }

};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  font-size: 34rpx;
}
.list{
  background-color: #fff;
  padding-left: 20rpx;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-top: 20rpx;
}
.item {
  background-color: #fff;
  border-bottom: 1px solid #f3f3f3;
  height: 100rpx;

}
.item .title{
  width: 200rpx;
}
.item .message{
  flex: 1;
}
.message input {
  flex: 1;
}
.message .operation{
  color:#fff;
  padding:0 15rpx;
  background-color:#f46d00;
  text-align:center;
  border-radius:5rpx;
  line-height:80rpx;
}
.common-btn{
  margin: 0 auto;
  margin-top: 80rpx;
  width: 96vw;
}
.tips{
  font-size: 28rpx;
  color: #999;
}
</style>
