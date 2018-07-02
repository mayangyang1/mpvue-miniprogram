<template>
  <div class="container pdb20">
     <div class='transaction-list' v-if="recordList.length > 0">
      <block v-for="item in recordList" :key="item.accountCode" >
        <div class='transaction-item flex-sb'  @click='bindTransactionDetail(item)'>
          <div class='flex-fs'>
            <div class='item-icon'>
              <img v-if="item.detailType == 1001" src='/static/images/putforward.png'>
                <img v-if="item.detailType == 1701 || item.detailType == 1702" src='/static/images/transaction-r.png'>
              <img v-if="item.detailType == 1003 || item.detailType == 1002" src='/static/images/cashfailure.png'> 
              <img v-if="item.detailType == 1801 || item.detailType == 1802" src='/static/images/cancle-waybill.jpg'>
            </div>
            <div class='item-con'>
              <div class='title'>{{item.details}}
                <text v-if="item.transactionType === 10 && item.detailType !=1003">(尾号{{item.lastNum}})</text>
              </div>
              <!-- <div class='item-company'>上海畅兴物流</div> -->
              <div class='item-time'>{{item.transferTime}}</div>
            </div>
          </div>
          <div class='item-right'>
            <div class='money' v-if="item.balanceOfPaymentsType === 1">
              <text>+</text> {{item.transferAmount}}</div>
            <div class='money' v-if="item.balanceOfPaymentsType === 2">
              <text>-</text> {{item.transferAmount}}</div>
            <!-- <div class='status'>交易成功</div> -->
          </div>
        </div>
      </block>
    </div>
    <div class='no-message' v-if="recordList.length <= 0">暂无数据</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      recordList: [],
      page:1,
    };
  },
  methods: {
    getRecordList() { //获取交易记录列表
      var that = this;
      var params = {};
      params.page = that.page; //页码  
      params.size = 10; //页长
      utils.postAjax(utils.hostUrl + `/pay/mobile/tradeLog`, params, {//获取交易记录
        success: function (res) {
          if (res.data.code === 200 && res.data.content) {
            var dataList = res.data.content.dataList;
            if (dataList.length) {
              that.page++;
              var recordList = that.recordList.concat(dataList);
              recordList.forEach((_value, _index) => {
                _value.lastNum = _value.oppositeAccount.slice(-4);
                _value.transferAmount = Number((_value.transferAmount)).toFixed(2);
                _value.details = that.getDetailType(_value.detailType);
              })
              that.recordList = recordList;
            }
          } else {
            utils.errorToast(res.data.content);
          }
        },
        complete: function () {
          wx.stopPullDownRefresh();
        }
      });
    },
    getDetailType(typeCode) { //获取交易类型
      var detailType = "";
      if(typeCode == 1001) {
          return detailType = '提现';
        } else if (typeCode == 1002) {
          return detailType = '核心企业提现手续费';
        } else if (typeCode == 1003) {
          return detailType = '提现手续费';
        } else if (typeCode == 1004) {
          return detailType = '提现失败回冲';
        } else if (typeCode == 1006) {
          return detailType = '手续费回冲';
      } else if (typeCode == 1701) {
        return detailType = '运单支付';
      }else if(typeCode == 1702) {
        return detailType = '运单支付'
      } else if (typeCode == 1801 || typeCode == 1802) {
        return detailType = '撤销运单支付'
      }
    },
    bindTransactionDetail(details) { //查看交易记录详情
    var detailObj = {};
    detailObj.transferAmount = details.transferAmount;
    detailObj.balanceOfPaymentsType = details.balanceOfPaymentsType;
    detailObj.details = details.details;
    detailObj.oppositeAccountName = details.oppositeAccountName; 
    detailObj.transferTime = details.transferTime; 
    detailObj.transactionCode = details.transactionCode;
    detailObj.detailType = details.detailType;
    wx.navigateTo({
      url: '../recordDetail/main?detailObj=' + JSON.stringify(detailObj)
    })
    }
  },
  onShow() {
    this.recordList = [];
    this.page = 1;
    this.getRecordList();
  },
  onPullDownRefresh() {
    this.recordList = [];
    this.page = 1;
    this.getRecordList();
  },
  onReachBottom() {
    this.getRecordList();
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding: 20rpx 0;
}
.transaction-list{
  padding-left: 20rpx;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.transaction-item{
  padding: 20rpx 20rpx 20rpx 0;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5
}
.transaction-item:last-child{
  border-bottom: none;
}
.item-icon image{
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
}
.item-con{
  border-left: 1px solid #e5e5e5;
  padding-left: 20rpx;
}
.item-con .title{
  font-size: 34rpx;
  font-weight: 600;
}
.item-con .item-company{
  font-size: 28rpx;
  color: #999;
}
.item-con .item-time{
  font-size: 28rpx;
  color: #999;
  margin-top: 30rpx;
}
.item-right{
  text-align: right;
}
.item-right .money{
  font-size: 34rpx;
  font-weight: 600;
  color: #f46d00;
}
.item-right .status{
  font-size: 28rpx;
  color: #999;
  margin-top: 30rpx;
}
</style>
