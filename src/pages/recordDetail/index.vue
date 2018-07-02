<template>
  <div class="container pdb20">
     <div class='transaction-list'>
      <div class='transaction-item flex-sb'>
        <div class='title' v-if="recordDetail.balanceOfPaymentsType == 1">入账金额</div>
        <div class='title' v-if="recordDetail.balanceOfPaymentsType == 2">入账金额</div>
        <div class=' cons main-color'>+ 1233.00</div>
      </div>
      <div class='transaction-item flex-sb'>
        <div class='title'>类型</div>
        <div class=' cons main-color'>{{recordDetail.details}}</div>
      </div>
      <div class='transaction-item flex-sb' v-if="recordDetail.detailType == 1701 || recordDetail.detailType == 1702">
        <div class='title'>出账单位</div>
        <div class='con'>{{recordDetail.oppositeAccountName}}</div>
      </div>
      <div class='transaction-item flex-sb'>
        <div class='title'>交易单号</div>
        <div class='con'>{{recordDetail.transactionCode}}</div>
      </div>
      <div class='transaction-item flex-sb'>
        <div class='title'>交易日期</div>
        <div class='con'>{{recordDetail.transferTime}}</div>
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
      recordDetail: {}
    };
  },
  methods: {
    
  },
  onShow() {
    console.log(this.$root.$mp.query.detailObj)
    this.recordDetail = JSON.parse(this.$root.$mp.query.detailObj);
  },
 
};
</script>

<style scoped>
.container{
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding-top: 30rpx;
  
}
.transaction-list{
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  background-color: #fff;
  padding-left: 30rpx;
}
.transaction-item{
  height: 88rpx;
  border-bottom: 1px solid #e1e1e1;
  padding-right: 20rpx;
}
.transaction-item:last-child{
  border-bottom: none;
}

.transaction-item .title {
  font-size: 32rpx;
  color: #454545;
}
.con{
  font-size: 28rpx;
  color: #888;
}
.transaction-item .cons{
  font-size: 34rpx;
}
</style>
