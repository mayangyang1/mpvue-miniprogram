<template>
  <div class="container">
    <div class="bank-title pdl20">到账银行卡</div>
    <div class="bank-list">
      <div class="bank-item flex-sb pdlr20" @click="bindSelectBankCard">
        <div class="bank-name">兴业银行(6816)</div>
        <img mode="widthFix" src="/static/images/arrows.png" alt="">
      </div>
    </div>
    <div class="raiseCon pdlr20">
      <div class="raise-title">提现金额</div>
      <div class="raise-input flex-fs ">
        <div>¥</div>
        <input type="text">
      </div>
      <div class="raise-tis flex-fs">当前账户余额4.00元，<div class="all">全部提现</div></div>
    </div>
    <div class="common-btn row main-bg-color" @click="raiseCash">提现</div>
    <!-- 提现弹窗 -->
    <raise-pop @isClose="isClose" v-if="isSureInputPassward"></raise-pop>
    <!-- 银行卡列表 -->
    <div class="over" v-if="selectBank" @click="cancleSelect"></div>
    <div class="bank-list-pop" v-if="selectBank">
      <div class="title-tips">选择到账银行卡</div>
      <div class="bank-item-pop flex-sb mgl20 pdlr20" @click="choiceBankcard">
        <div class="bank-name">建设银行</div>
        <div class="bank-num flex-fs">
          <div class="tis">尾号: 2092</div>
          <img mode="widthFix" class="mgl20" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="bank-item-pop flex-sb mgl20 pdlr20">
        <div class="bank-name">建设银行</div>
        <div class="bank-num flex-fs">
          <div class="tis">尾号: 2092</div>
          <img mode="widthFix" class="mgl20" src="/static/images/arrows.png" alt="">
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
import RaisePop from '@/components/raisePop';
export default {
  components: {
    'raise-pop': RaisePop
  },
  data() {
    return {
      isSureInputPassward: false,
      selectBank: false,
    };
  },
  methods: {
    raiseCash() {
      this.isSureInputPassward = true;
    },
    isClose() {
      this.isSureInputPassward = false;
    },
    bindSelectBankCard() {
      this.selectBank = true;
    },
    choiceBankcard() {
      this.selectBank = false;
    },
    cancleSelect() {
      this.selectBank = false;
    }
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
.bank-title{
  font-size: 32rpx;
  line-height: 100rpx;
  height: 100rpx;

}
.bank-item{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

}
.bank-item .bank-name{
  font-weight: 600;
 
  line-height: 100rpx;
}
.bank-item img{
  width: 18rpx;
  height: 12rpx;
}
.raiseCon{
  margin-top: 30rpx;
  background-color: #fff;
  padding: 30rpx;
}
.raise-title{
  font-weight: 600;
  margin-bottom: 30rpx;
}
.raise-input{
  font-size: 34rpx;
  font-weight: 600;
  padding-bottom: 20rpx;
  margin-bottom: 30rpx;
  border-bottom: 1px solid #ccc;
}
.raise-input input {
  flex: 1;
}
.raise-tis{
  font-size: 30rpx;
}
.raise-tis .all{
  color: #5B6B8A;
}
.common-btn{
  width: 94vw;
  margin: 0 auto;
  margin-top: 200rpx;
}
/* 银行卡列表弹窗-- start */
.bank-list-pop{
  background-color: #fff;
  position:fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
}
.title-tips{
  height: 100rpx;
  border-bottom: 1px solid #ccc;
  line-height: 100rpx;
  padding-left: 20rpx;
}
.bank-item-pop{
  height: 100rpx;
  border-bottom: 1px solid #ccc;

}
.bank-item-pop:last-child {
  border-bottom: none;
}
.bank-num img{
  width: 20rpx;
  height: 20rpx;
}
/* 银行卡列表弹窗-- end */
</style>
