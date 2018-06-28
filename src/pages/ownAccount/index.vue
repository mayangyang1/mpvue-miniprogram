<template>
  <div class="container pdb20">
    <div class="account">
      <div class="account-title">账号余额</div>
      <div class="account-money">¥ {{accountMoney}}</div>
      <div class="account-btn row" @click="bindRaiseCash">提现</div>
      <div class="wave-list">
        <img class="wave1"  src="/static/images/wave1.png" alt="">
        <img class="wave3" src="/static/images/wave3.png" alt="">
        <img class="wave2"   src="/static/images/wave2.png" alt="">
      </div>
    </div>
    <div class="personal-list">
      <div class="personal-item flex-sb pdlr20" @click="bindBankCard">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/bankcard.png" alt="">
          <div>我的银行卡</div>
        </div>  
        <div class="arrow flex-sb">
          <div class="status" v-if="bankCardLen == 0">未绑定</div>
          <div class="status" v-else>{{bankCardLen}}张</div>
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>   
      <div class="personal-item flex-sb pdlr20" @click="bindTransactionMessage">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/transaction.png" alt="">
          <div>交易记录</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>  
      <div class="personal-item flex-sb pdlr20" @click="bindSafetySet">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/safety.png" alt="">
          <div>安全设置</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div> 
    </div>      
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
     accountMoney: '',
     bankCardLen: 0,
     userPhone: ''
    };
  },
  methods: {
    getOwnAccountMessage() { //获取个人账户信息
      var that = this;
      utils.postAjax(utils.hostUrl + `/pay/mobile/userIndex`, {}, {
        success: function (res) {
          if(res.data.code == 200 && res.data.content){
            var data = res.data.content;
            that.accountMoney = data.userInfo.cash.toFixed(2);
            that.bankCardLen = data.bankCardList.length;
            that.userPhone = data.phoneNumber;
            wx.setStorageSync("userPhone", that.userPhone);
          }else{
            utils.errorToast(res.data.content);
          }
        
        },
      });
    },
    bindBankCard() { //我的银行卡列表
      wx.navigateTo({
        url: '../ownBankCard/main'
      })
    }
  },
  onShow() {
    this.getOwnAccountMessage();
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 32rpx;
}
.account{
  position: relative;
  z-index: 1;
  height: 330rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  line-height: 60rpx;
  background: linear-gradient(#f69b2e,#f48400);
}
.account .account-title{
  font-size: 30rpx;
  padding-top: 40rpx;
}
.account .account-money{
  font-size: 50rpx;
  font-weight: 600;
  padding-top: 20rpx;
  padding-bottom: 30rpx;
}
.account-btn{
  font-size: 30rpx;
  border: 1px solid #fff;
  width: 260rpx;
  border-radius: 50rpx;
  line-height: 30rpx;
  padding: 10rpx 0;
  position: relative;
  z-index: 4;
}
.wave-list{
  position: absolute;
  z-index: 1;
  bottom: 0rpx;
  height: 130rpx;
  width: 100vw;
  overflow: hidden;
}
.wave-list image{
  width: 100vw;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: -1000rpx;
  width: 2000rpx;
  height: 80rpx;
}
.wave1{
  animation: wave1 20s linear infinite;
}
.wave2{
  animation: wave2 20s linear infinite;
}
.wave3{
  left: 1000rpx;
  animation: wave3 20s linear infinite;
}

@keyframes wave1{
  0% {transform: translate3d(0rpx,0,0);}
  50% {transform: translate3d(800rpx,0,0);}
  100% {transform: translate3d(0rpx,0,0);}
}
@keyframes wave2 {
  0% {transform: translate3d(800rpx,0,0);}
  50% {transform: translate3d(100rpx,0,0);}
  100% {transform: translate3d(800rpx,0,0);}
}
@keyframes wave3 {
  0% {transform: translate3d(100rpx,0,0);}
  50% {transform: translate3d(800rpx,0,0);}
  100% {transform: translate3d(100rpx,0,0);}
}
.personal-list{
  padding-top: 40rpx;
  position: relative;
  z-index: 5;
}
.personal-item{
  border-bottom: 1px solid #f2f2f2;
  height: 90rpx;
  background-color: #fff;
}
.personal-item .title img{
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
.personal-item .arrow img{
  width: 18rpx;
  height: 18rpx;
} 
.arrow .status{
  font-size: 28rpx;
  color: #999;
  margin-right: 20rpx;
}

</style>
