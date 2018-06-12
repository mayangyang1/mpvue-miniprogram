<template>
<div>
  <div class="over"></div>
  <div class="waybill">
    <div class="wabill-header main-bg-color">确认运单</div>
    <div class="wabill-message">
      <div class="message-list flex-fs">
        <div class="title">车牌号:</div>
        <div class="con">{{itemValue.truckLicenseNo}}</div>
      </div>
      <div class="message-list flex-fs">
        <div class="title">货物:</div>
        <div class="con">{{itemValue.goodsName}}</div>
      </div>
      <div class="message-list flex-fs">
        <div class="title">司机运价:</div>
        <div class="con">{{itemValue.driverPrice}}{{unitConfig[itemValue.meterageType]['driver.price'][itemValue.driverPriceUnitCode]}}</div>
      </div>
      <div class="message-list flex-fs">
        <div class="title">原始客户:</div>
        <div class="con">{{itemValue.originalConsignOrgName}}</div>
      </div>
    </div>
    <div class="msg-tips main-color">点击"确认"后,您跟平台之间的协议将立即生效!</div>
    <div class="agree-item flex-fs pdlr20">
      <checkbox-group @change="agreechange">
        <checkbox color='#f48400' :checked='isAgree' class='check-box'></checkbox>
      </checkbox-group>
      <div class='agreeTitle flex-fs'>同意
        <div class='main-color' @click='bindAgreement'> 
          《<span>{{aggrementMessageName}}</span>》 
        </div> 
      </div> 
    </div> 
    <div class="waybill-btn flex-sb">
      <div class=" btns cancle-bnt mgr20" @click="bindCancle">取消</div>
      <div class="btns sure-bnt mgl20 main-bg-color" @click="bindSure">确认</div>
    </div>
  </div>
</div>
  
</template>

<script>
import * as utils from '../utils/index.js';
export default {
  props: ['itemValue'],
  data() {
    return {
      unitConfig: utils.config.unit,
      aggrementMessageName: '',
      aggrementMessageUrl: '',
      isAgree: false,
    }
  },
  methods: {
    bindCancle() {
      this.$emit('doAgree', false,false);
    },
    bindSure() {
      var that = this;
      if(that.isAgree){
       this.$emit('doAgree', false,true);
      }else{
        utils.errorToast('请先同意协议');
      }
      
    },
    bindAgreement() { //跳转到协议详情
    var that =this;
      wx.navigateTo({
        url:`/pages/entrustAgreement/main?secondParty=${that.itemValue.driverFullName}&driverPhone=${that.itemValue.driverPhone}&idNumber=${ that.itemValue.driverIdentityNumber}`,
      })
    },
    agreechange() {
      this.isAgree = !this.isAgree;
    }
  },
  created() {
    var that = this;
    var aggrementObj = wx.getStorageSync('webViewParams');
    that.aggrementMessageName = aggrementObj['other.statement.driverAgreementName'];
  }
};
</script>

<style scoped>
  .waybill{
    width: 80vw;
    background-color: #fff;
    position:fixed;
    left: 10vw;
    top: 200rpx;
    z-index: 3;
    border-radius: 10rpx;
    font-size: 28rpx;
    color: #454545;
  }
  .wabill-header{
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
  }
  .wabill-message{
    margin: 0 10rpx;
    padding: 10rpx 20rpx;
    border-bottom: 1px solid #ccc;
  }
  .message-list{
    line-height: 50rpx;
  }
  .message-list .title{
    color: #999;
    width: 130rpx;
  }
  .msg-tips{
    margin-left: 20rpx;
    padding: 20rpx 0;
  }
  .agree-item{
  
  }
  .waybill-btn{
    padding: 30rpx;
    text-align: center;
    
  }
  .btns{
    flex: 1;
    border: 1px solid #ccc;
    height: 70rpx;
    line-height: 70rpx;
  }
  .cancle-bnt{
    
  }
  .sure-bnt{
    
  }
</style>
