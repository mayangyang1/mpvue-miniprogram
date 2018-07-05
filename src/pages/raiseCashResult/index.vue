<template>
  <div class="container pdt20">
    <div class='success-message'>
      <div class='raisecash-item flex-sb pdlr20'>
        <div class='title'>提现金额</div>
        <div class='con cash'>¥ {{cash}}</div>
      </div>
      <div class='raisecash-item flex-sb pdlr20'>
        <div class='title'>手续费</div>
        <div class='con cash'>¥ {{memberFees}}</div>
      </div>
      <div class='raisecash-item flex-sb pdlr20'>
        <div class='title'>到账银行卡</div>
        <div class='con cons'>{{bankName}}({{lastNum}})</div>
      </div>
      <div class='raisecash-item flex-sb pdlr20'>
        <div class='title'>创建时间</div>
        <div class='con cons'>{{withdrawCashTime}}</div>
      </div>
    </div>
    <div class='common-btn row' @click='bindSureOperation'>完成</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      cash: '',
      memberFees: '',
      bankName: '',
      lastNum: '',
      withdrawCashTime: '',
    };
  },
  methods: {
    bindSureOperation() {
       wx.navigateBack({
        delta:2
      })
    }
  },
  onShow() {
    var that = this;
    var queryObj = that.$root.$mp.query;
    that.cash = queryObj.cash;
    that.memberFees = queryObj.memberFees;
    that.bankName = queryObj.bankName;
    that.lastNum = queryObj.lastNum;
    that.withdrawCashTime = queryObj.withdrawCashTime;
  }
};
</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  color: #454545;

}
.success-message{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 50rpx;
  background-color: #fff;
  padding: 15rpx 0;
}

.raisecash-item .title{
  font-size: 28rpx;
  color: #999;
}
.raisecash-item .con{
  color: #666;
  font-size: 30rpx;
  text-align: right;
}
.cash{
  font-size: 34rpx;
  color: #454545;
  font-weight: 600;
}
.cons{
  color: #666;
}
.common-btn{
  width: 90vw;
  background-color: #fff;
  color: #454545;
  position:fixed;
  left: 5vw;
  bottom: 200rpx;
  border: 1px solid #ccc;
}

</style>
