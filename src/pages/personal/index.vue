<template>
  <div class="container">
    <div class="personal-list">
      <div class="personal-item flex-sb pdlr20" @click="bindBusinessCard">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/carte.png" alt="">
          <div>司机，车辆信息</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>   
      <div class="personal-item flex-sb pdlr20" @click="bindBankCardMessage">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/bankcard.png" alt="">
          <div>我的银行卡</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>  
      <div class="personal-item flex-sb pdlr20" @click="bindOwnAccount">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/tradingaccount.png" alt="">
          <div>我的交易账户</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>  
      <div class="personal-item flex-sb pdlr20" @click="joinCompany">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/joinCompany.png" alt="">
          <div>加入公司</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="personal-item flex-sb pdlr20" @click="bindOilCardMessage">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/oilcard.png" alt="">
          <div>我的油卡信息</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div>  
      <div class="personal-item flex-sb pdlr20" @click="bindCollect">
        <div class="title flex-fs">
          <img mode="widthFix" src="/static/images/collection.png" alt="">
          <div>我的收藏</div>
        </div>  
        <div class="arrow flex-sb">
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </div> 
        
    </div>     
    <div class="common-btn row" @click="bindLoginOut">退出</div> 
  </div>
</template>

<script>
import * as utils from '../../utils/index.js';
export default {
  components: {
    
  },

  data() {
    return {
      logs: []
    };
  },
  methods: {
    bindBusinessCard() {
      wx.navigateTo({
        url: '../businessCard/main'
      })
    },
    bindCollect() {
      wx.navigateTo({
        url: '../collect/main'
      })
    },
    joinCompany() {
      wx.navigateTo({
        url: '../joinCompany/main'
      })
    },
    bindOilCardMessage() {
      wx.navigateTo({
        url: '../oilCardMessage/main'
      })
    },
    bindBankCardMessage() {
      wx.navigateTo({
        url: '../bankCardMessage/main'
      })
    },
    bindOwnAccount() {
      wx.navigateTo({
        url: '../ownAccount/main'
      })
    },
    bindLoginOut() { //退出账号
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确定退出吗?',
        success: function (res) {
          if (res.confirm) {
            that.loginOut();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
    },
    loginOut() {
      utils.getAjax(utils.hostUrl + '/account/weixinLogout', {
        success: function (res){
          if(res.data.code === 200){
            wx.switchTab({
              url: '../index/main',
            })
          }else{
            utils.errorToast(res.data.content)
          }
        }
      })
    }
  },
  created() {
   
  }
};
</script>

<style scoped>
.container{
  width: 100vw;
  min-height: 100vh;
  background-color: #eee;
  font-size: 32rpx;
  padding-bottom: 40rpx;
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
}
.common-btn{
  background-color: #fff;
  color: #454545;
  width: 90vw;
  position: absolute;
  bottom: 60rpx;
  left: 5vw;
}
</style>
