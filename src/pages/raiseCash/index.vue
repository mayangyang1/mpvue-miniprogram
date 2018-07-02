<template>
  <div class="container">
    <div class="bank-title pdl20">到账银行卡</div>
    <div class="bank-list">
      <div class="bank-item flex-sb pdlr20">
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
    <div class="common-btn row main-bg-color">提现</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      
    };
  },
  methods: {
    
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
</style>
