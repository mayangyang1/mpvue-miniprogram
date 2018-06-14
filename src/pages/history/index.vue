<template>
  <div class="container">
     <div class="order-list" v-if="orderList.length">
          <div class="order-item pdb20" v-for="item in orderList" :key="item.code">
            <div class="order-address flex-sb">
              <div class="address flex-fs" v-if="item.routeName">{{item.routeName}}</div>
              <div class="address flex-fs" v-else>
                <div class="from-address text-overflow pdr20">{{item.loadingCityName}} {{item.loadingCountyName}}</div>
                <img model="widthFix" src="/static/images/arrow.png">
                <div class="to-address text-overflow pdl20">{{item.unloadingCityName}} {{item.unloadingCountyName}}</div>
              </div>
              <div class="status main-color" v-if="item.waybillStatus == 'unloading'">代发货</div>
              <div class="status main-color" v-if="item.waybillStatus == 'going'">运输中</div>
              <div class="status main-color" v-if="item.waybillStatus == 'finish'">运单完成</div>
              <div class="status main-color" v-if="item.waybillStatus == 'settled'">结算完成</div>
            </div>
            <div class="order-message pdlr20">
              <div class="message-list">{{item.goodsName}}, {{item.driverPrice}}{{unitConfig[item.meterageType]["driver.price"][item.driverPriceUnitCode]}}</div>
              <div class="message-list flex-fs">
                <div class="car-no">{{item.truckLicenseNo}}</div>
                <div class="driver-time">派车时间：{{item.createTime}}</div>
              </div>
              <div class="message-list flex-fs">
                <div>运单号: {{item.waybillNo}}</div>
              </div>
            </div>
          </div>
      </div>
      <div class="no-message" v-else>暂无历史运单</div> 
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      orderList:[],
      click:true,
      unitConfig: utils.config.unit,
      mark: 0,
      exist: true
    };
  },
  methods: {
    getHistoryOrderList() {
      var that = this;
      var params = {};
      params.waybillStatus = 'finish,cancel';
      params.size = 10;
      if (that.mark) params.mark = that.mark;
      if(that.click) {
        that.click = false;
        utils.ajax('GET', utils.hostUrl +`/driver-api/driver-api/waybill/list`, params, {
          success: function (res) {
            if(res.data.content.length){
              that.orderList = that.orderList.concat(res.data.content);         
              that.mark = res.data.mark;
              that.exist = true;
            }else{
              if(that.mark == 0){
                that.exist = false;
              }
            } 
          },
          complete: function () {
            that.click = true;
            wx.stopPullDownRefresh();
          }, 
          fail: function() {
            utils.errorToast('获取失败');
          }
        });
      }
    }
  },
  onShow() {
    this.getHistoryOrderList();
  },
  onPullDownRefresh() {
    var that = this;
    that.mark = 0;
    that.orderList = [];
    this.getHistoryOrderList();
  },
  onReachBottom() {
    this.getHistoryOrderList();
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
}
.order-item {
  width: 96vw;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  box-shadow: 5rpx 5rpx 10rpx #ccc;
  background-color: #fff;
  margin-top: 20rpx;

}
.order-address img {
  width: 45rpx;
  height: 30rpx;
}
.order-address {
  padding: 0 20rpx;
  height: 100rpx;
  font-size: 34rpx;
  color: #454545;
  font-weight: 600;
  border-bottom: 1rpx solid #ccc;
}
.from-address {
  width: 210rpx;
}
.to-address {
  width: 210rpx;
}
.order-message {
  line-height: 50rpx;
  position: relative;
}
.message-list {
  color: #666;
}
.message-list .car-no {
  color: #000;
  font-size: 30rpx;
  font-weight: 600;
}
.message-list .driver-time{
  color: #999;
  margin-left: 30rpx;
}
.order-message .center-status{
  position: absolute;
  top: 0;
  right: 0;
  width: 80rpx;
  height: 80rpx;
}
</style>
