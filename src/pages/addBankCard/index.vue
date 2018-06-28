<template>
  <div class="container pdb20 pbt20">
    <div class="addCardList">
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">开户行</div>
        <div class="addCard-con flex-fs">
          <input v-model.lazy="bankName" placeholder="请输入开户行" type="text">
        </div>
      </div>
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">银行户名</div>
        <div class="addCard-con flex-fs">
          <input  v-model.lazy="accountName"  placeholder="请输入银行户名" type="text">
        </div>
      </div>
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">银行账号</div>
        <div class="addCard-con flex-fs">
          <input  v-model.lazy="accountNo"  placeholder="请输入银行账号" type="text">
        </div>
      </div>
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">身份证号</div>
        <div class="addCard-con flex-fs">
          <input  v-model.lazy="idCard"  placeholder="请输入身份证号" type="text">
        </div>
      </div>
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">手机号</div>
        <div class="addCard-con flex-fs">
          <input  v-model.lazy="mobile"  placeholder="请输入手机号" type="text">
        </div>
      </div>
      <div class="addCardItem flex-fs pdr20">
        <div class="addCard-title">验证码</div>
        <div class="addCard-con flex-sb">
          <input  v-model.lazy="verificationCode"  placeholder="请输入验证码" type="text">
          <div class="title main-bg-color" v-if="!isVerifyCode" @click="bindPhoneVerfyCode">获取验证码</div>
          <div class="title-c" v-else>重新获取({{time}})</div>
        </div>
      </div>
      <div class="wang-tips main-color">
        交行、平安（含原深发）、上海银行、浦发、邮储，上述银行卡需通过https://www.95516.com/portal.open/init.do开通银联在线支付业务
      </div>
    </div>
    <div class="common-btn main-bg-color row" @click="bindSureAddBankCard">确认</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      bankName: '', //开户行
      mobile: '',
      accountName: '', //银行户名
      accountNo: '', //银行账号
      idCard: '', //身份证号
      verificationCode: '', //验证码
      isVerifyCode: false,
      time: 60,
    };
  },
  methods: {
    sendPhoneCode() { //发送验证码
      utils.postAjax(utils.hostUrl + `/pay/mobile/sendAddBankCardVerifyCode`, {mobile: this.mobile}, {//发送验证码
        success: function (res) {
          
        },
      });
    },
    bindPhoneVerfyCode() {
      var that = this;
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (that.mobile != '' && reg.test(that.mobile)){
        that.isVerifyCode = true;
          that.sendPhoneCode();
          var timer = setInterval(() => {
            var time = that.time;
            if (time > 0) {
              time--;
              that.time = time;
            }
          }, 1000)
          setTimeout(() => {
            clearInterval(timer);
            that.time = 60;
            that.isVerifyCode = false;
          }, 60000)
      } else {
        if (!that.mobile){
          return utils.errorToast('请输入手机号');
        }
        if (!reg.test(that.mobile)){
          return utils.errorToast('手机号不正确');
        }
        
      }
    },
    bindSureAddBankCard() { //确认添加银行卡
      var that = this;
      if(that.click) {
        that.click = false;
        var params = {};
        params.bankName = that.bankName; //开户行
        params.accountName = that.accountName; //姓名
        params.accountNo = that.accountNo; //开户卡号
        params.idCard = that.idCard; //身份证
        params.mobile = that.mobile; //手机号
        params.verificationCode = that.verificationCode; //验证码
        if (params.accountName != '' && params.accountNo != '' && params.idCard != '' && params.mobile != '' && params.verificationCode != '') {
          utils.postAjax(utils.hostUrl + `/pay/mobile/addBankCard`, params, {//添加银行卡
            success: function (res) {
              // if (res.data.code === 200 && res.data.content) {
              //   that.setData({ isAddMessage: true, msg: '成功' });
              // } else {
              //   that.setData({ isAddMessage: true, msg: '失败', failMsg: res.data.content }); 
              // }

            },
            complete:function(){
              that.click = true;
            }
          });
        } else {
          utils.errorToast('请完善信息');
          that.click = true;
        }
      }
    
    }
  },
  onShow() {
    
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-top: 20rpx;
}
.addCardList{
  background-color: #fff;
  padding-left: 20rpx;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

}
.addCardItem{
  height: 88rpx;
  border-bottom: 1px solid #ccc;
}
.addCardItem:last-child{
  border-bottom: none;
}
.addCard-title{
  font-size: 32rpx;
  font-weight: 600;
  width: 180rpx;
}
.addCard-con{
  flex: 1;
}
.addCard-con input{
  height: 100%;
  flex: 1;

}
.addCard-con .title{
  font-size:30rpx;
  border:1px solid #f2f2f2;
  color:#fff;
  padding:15rpx 20rpx;
  border-radius:6rpx;

}
.addCard-con .title-c{
  font-size: 30rpx;
  color: #999;
}
.wang-tips{
  padding:20rpx 40rpx 20rpx 40rpx;

}
.common-btn{
  margin-top: 40rpx;
}
</style>
