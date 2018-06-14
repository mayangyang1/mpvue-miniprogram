<template>
  <div class="container pdb20">
      <div class="history-order flex-fe main-color">
        <div class="pdr20">历史运单</div>
      </div>
      <waybill-pop :itemValue="itemValue" v-if="isSureWaybill" @doAgree="doAgree"></waybill-pop>
      <div class="order-list" v-if="orderList.length">
          <div class="order-item " v-for="item in orderList" :key="item.code">
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
               <img v-if="item.driverConfirmStatus == 'none'" class="center-status" model="widthFix" src="/static/images/unconfirm.png" alt="">
              <div class="message-list">{{item.loadingOrgName}} — {{item.unloadingOrgName}}</div>
              <div class="message-list">{{item.goodsName}}， {{item.driverPrice}}{{unitConfig[item.meterageType]['driver.price'][item.driverPriceUnitCode]}}</div>
              <div class="message-list flex-fs">
                <div class="car-no">{{item.truckLicenseNo}}</div>
                <div class="driver-time">派车时间：{{item.createTime}}</div>
              </div>
            </div>
            <div class="action flex-fe">
              <block v-for="(_value, _index) in actionObj[item.code]" :key="_index">
                <div class="mini-button main-bg-color" @click="doAction(_value.actionCode, item.code, index)">{{_value.actionName}}</div>
              </block>
            </div>
          </div>
      </div>
      <div class="no-message" v-else>暂无运单</div>
  </div> 
</template>

<script>
import WaybillPop from '@/components/waybillPop'
import * as utils from "../../utils/index.js";
export default {
  components: {
    'waybill-pop': WaybillPop
  },

  data() {
    return {
      orderList: [],
      click: true,
      mark:0,
      exist: false,
      unitConfig: utils.config.unit,
      actionObj: {}, //业务动作集合
      isSureWaybill: false,
      code:'',
      businessCodeListString: ''
    };
  },
  methods:{
    getOrderList() { //获取运单列表
      var that = this;
      if(that.click){
        that.click = false;
        var params = {};
        params.waybillStatus = 'unloading,going';
        params.size = 10;
        if(that.mark) {
          params.mark = that.mark;
        }
        utils.ajax('GET', utils.hostUrl + `/driver-api/driver-api/waybill/list`, params, {
          success:function(res) {
            if(res.data.code === 200 && res.data.content.length > 0) {
              that.orderList = that.orderList.concat(res.data.content);
              that.mark = res.data.mark;
              that.exist = true;
              var businessCodeList = [];
              that.orderList.forEach((_value, _index)=>{
                businessCodeList.push(_value.code);
              })
              that.businessCodeListString = businessCodeList.join(',');
              that.getActionList(that.businessCodeListString);
            }else{
              if(that.mark === 0) {
                that.exist = false;
              }
            }
          },
          complete:function() {
            that.click = true;
           wx.stopPullDownRefresh();
          }

        });
      }
    },
    getActionList(businessCodeList) { //获取业务动作
      var that = this;
      var params = {};
      params.type = 'driverApi';
      params.businessCodeList = businessCodeList;
      utils.postAjax(utils.hostUrl + `/driver-api/driverApi/action/list`, params, {
        success: function (res) {
          if (res.data.code == 200) {
            that.actionObj = res.data.content;
          }
        },
        fail: function (res) {

        }
      });
    },
    doAction(actionCode , code, index) { //执行业务动作
      var that = this;
      that.code = code;
      switch (actionCode) {
        case 'waybillDriverReject':   //拒绝运单
          return that.driverReject(code);
          break;
        case 'waybillDriverAccept':   //确认运单 
          return that.sureDriverAccept(index);
          break;
        case 'waybillDriverCancel':   //取消运单
          return that.driverCancel(code);
          break;  
        case 'waybillDriverLoading':   //发货
          return that.driverLoading();
          break;
        case 'waybillDriverUnloading':   //收货
          return that.driverUnloading();
          break;
        default:
          break;
      }
    },
    driverReject(code) { //拒绝运单
      var that = this;
       wx.showModal({
        title: '提示',
        content: '确认要拒绝运单吗？',
        success: function (res) {
          if (res.confirm) {
            var times = utils.formatTime(new Date()).split(' ')[0].split('/').join('-') + ' ' + utils.formatTime(new Date()).split(' ')[1];
            var params = {};
            params.code = code;
            params.driverConfirmTime = times;
            utils.postAjax(utils.hostUrl + `/driver-api/driver-api/waybill/reject`, params, {
              success: function (res) {
                if (res.data.code == 200) {
                  // 从新获取列表
                  that.orderList = [];
                  that.mark = 0;
                  that.getOrderList();
                }else{
                  utils.errorToast(res.data.content);
                }
              }
            })
          }
        }
      })
    },
    sureDriverAccept(_index) {
      var that =this;
      that.isSureWaybill = true;
      that.itemValue = that.orderList[_index];
    },
    driverAccept(code) { //确认运单
      var that = this;
      var times = utils.formatTime(new Date()).split(' ')[0].split('/').join('-') + ' ' + utils.formatTime(new Date()).split(' ')[1];
      var params = {};
      params.code = code;
      params.driverConfirmTime = times;
      utils.postAjax(utils.hostUrl + `/driver-api/driver-api/waybill/accept`, params, {
        success: function (res) {
          if (res.data.code == 200) {
            // 从新获取列表
            that.getActionList(that.businessCodeListString);
          }else{
            utils.errorToast(res.data.content);
          }
        }
      });
    },
    driverCancel(code) { //取消运单
      var that = this;
      wx.showModal({
        title: '提示',
        content: '你确认要取消运单？',
        success: function (res) {
          if (res.confirm) {
            var times = utils.formatTime(new Date()).split(' ')[0].split('/').join('-') + ' ' + utils.formatTime(new Date()).split(' ')[1];
            var params = {};
            params.code = code;
            params.driverConfirmTime = times;
            utils.postAjax(utils.hostUrl + `/driver-api/driver-api/waybill/cancel`, params, {
              success: function (res) {
                if (res.data.code == 200) {
                  // 从新获取列表
                  that.orderList = [];
                  that.mark = 0;
                  that.getOrderList();
                }else{
                  utils.errorToast(res.data.content);
                }
              }
            });
          }
        }
      })
    },
    driverLoading(code) { //发货

    },
    driverUnloading(code) { // 收货

    },
    doAgree(isSureWaybill,isSure) {
      var that = this;
      that.isSureWaybill = isSureWaybill;
      if(isSure) {
        that.driverAccept(that.code);
      }
    },
  },
  onShow() {
   this.getOrderList();
  },
  onPullDownRefresh() {
    var that = this;
    that.orderList = [];
    that.mark = 0;
    that.getOrderList();
  },
  onReachBottom() {
    this.getOrderList();
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
.history-order {
  height: 60rpx;
  font-size: 34rpx;
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
  width: 240rpx;
}
.to-address {
  width: 240rpx;
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
.action{
  height: 100rpx;
  border-top: 1px solid #ccc;
}
.mini-button{
  margin-right: 20rpx;
}
.order-message .center-status{
  position: absolute;
  top: 0;
  right: 0;
  width: 80rpx;
  height: 80rpx;
}
</style>
