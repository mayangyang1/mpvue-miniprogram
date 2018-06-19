<template>
  <div class="container">
    <div class="source-route-name flex-fs pdlr20">
      <div class="route-name">运单托运方: {{orderDetailObj.consignOrgName}}</div>
    </div>
    <div class="route-line-name pdl20 mgt20 flex-sb">
      <div class="line-name">{{orderDetailObj.routeName}}</div>
        <img mode="widthFix" v-if="orderDetailObj.driverConfirmStatus == 'none'" src="/static/images/unconfirm.png">
        <img mode="widthFix" v-if="orderDetailObj.driverConfirmStatus == 'reject'" src="/static/images/refuse.png">
    </div>
    <div class='driver-receive flex-fs pdtb20'>
      <div class="tips pdl20"></div>
      <div class='cont mgl20'>
        <div class='route-line bdb pdb20'>
          <div class='route-address'><img class="state" mode='aspectFit' src='/static/images/f.png'>{{orderDetailObj.loadingProvinceName}} {{orderDetailObj.loadingCityName}} {{orderDetailObj.loadingCountyName}}</div>
          <div class='route-message'>{{orderDetailObj.loadingAddr}}</div>
          <div class='route-message'>{{orderDetailObj.loadingOrgName}}</div>
          <div class='route-message'>{{orderDetailObj.loadingUserFullName}} {{orderDetailObj.loadingUserPhone}}</div>
          <img class="state-img" v-if="orderDetailObj.waybillStatus == 'unloading'" mode="widthFix" src="/static/images/unloading.jpg">
          <img class="state-img" v-else-if="orderDetailObj.waybillStatus == 'going'" mode="widthFix" src="/static/images/going.jpg">
          <img class="state-img" v-else-if="orderDetailObj.waybillStatus == 'cancel'" mode="widthFix" src="/static/images/cancel.jpg">
          <img class="state-img" v-else-if="orderDetailObj.waybillStatus == 'settled'" mode="widthFix" src="/static/images/loding.jpg">
          <img class="state-img" v-else mode="widthFix" src="/static/images/finishs.jpg">
          <div class="call-phone" v-if="orderDetailObj.loadingUserPhone" @click="bindCallPhone(orderDetailObj.loadingUserPhone)"><img  mode="widthFix" src="/static/images/phone.png"></div>
        </div>
        <div class='route-line pdt20'>
          <div class='route-address'><img class="state" mode='aspectFit' src='/static/images/z.png'>{{orderDetailObj.unloadingProvinceName}} {{orderDetailObj.unloadingCityName}} {{orderDetailObj.unloadingCountyName}}</div>
          <div class='route-message'>{{orderDetailObj.loadingAddr}}</div>
          <div class='route-message'>{{orderDetailObj.unloadingOrgName}}</div>
          <div class='route-message'>{{orderDetailObj.unloadingUserFullName}} {{orderDetailObj.unloadingUserPhone}}</div>
          <div class="call-phone" v-if="orderDetailObj.unloadingUserPhone" @click="bindCallPhone(orderDetailObj.unloadingUserPhone)"><img  mode="widthFix" src="/static/images/phone.png"></div>
        </div>
      </div>
    </div>
    <div class="title-tips pdlr20">基本信息</div>
    <div class="base-message-list pd20">
      <div class="base-message-item flex-fs">
        <div class="message-title">运单号</div>
        <div class="message-con text-overflow">{{orderDetailObj.waybillNo}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">车牌号</div>
        <div class="message-con text-overflow">{{orderDetailObj.truckLicenseNo}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">运价</div>
        <div class="message-con text-overflow flex-fs">
          <div style="font-size:35rpx;" class="main-color">{{orderDetailObj.driverPrice}}</div>
          <!-- <div>{{unitConfig[orderDetailObj.meterageType]['driver.price'][orderDetailObj.driverPriceUnitCode]}}</div> -->
        </div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">货物</div>
        <div class="message-con text-overflow">{{orderDetailObj.goodsName}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">原始客户</div>
        <div class="message-con text-overflow">{{orderDetailObj.originalConsignOrgName}}</div>
      </div>
    </div>
    <div class="title-tips pdlr20">收发信息</div>
    <div class="base-message-list pd20">
      <div class="base-message-item flex-fs">
        <div class="message-title">发货时间</div>
        <div class="message-con text-overflow">{{orderDetailObj.loadingTime}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">发货重量</div>
        <div class="message-con text-overflow">{{orderDetailObj.loadingGoodsWeight? orderDetailObj.loadingGoodsWeight : ''}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">发货体积</div>
        <div class="message-con text-overflow">{{orderDetailObj.loadingGoodsVolume? orderDetailObj.loadingGoodsVolume : ''}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">发货件数</div>
        <div class="message-con text-overflow">{{orderDetailObj.loadingGoodsNum? orderDetailObj.loadingGoodsNum : ''}}</div>
      </div>
      <div class="base-message-item flex-fs bdb">
        <div class="message-title">发货凭证</div>
        <div class="message-con text-overflow flex-fs">
          <block v-for="_url in driveryUrl" :key="_url">
            <img class="voucher-picture" :src="_url" alt="">
          </block>
        </div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">收货时间</div>
        <div class="message-con text-overflow">{{orderDetailObj.unloadingTime}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">收货重量</div>
        <div class="message-con text-overflow">{{orderDetailObj.unloadingGoodsWeight? orderDetailObj.unloadingGoodsWeight : ''}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">收货体积</div>
        <div class="message-con text-overflow">{{orderDetailObj.unloadingGoodsVolume? orderDetailObj.unloadingGoodsVolume : ''}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">收货件数</div>
        <div class="message-con text-overflow">{{orderDetailObj.unloadingGoodsNum? orderDetailObj.unloadingGoodsNum : ''}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">收货凭证</div>
        <div class="message-con text-overflow flex-fs">
          <block v-for="_url in recivieUrl" :key="_url">
            <img class="voucher-picture" :src="_url" alt="">
          </block>
          
        </div>
      </div>
    </div>
    <div class="erweiimg">
      <img :src="imageUrl" alt="">
      <div class="title">扫描二维码读取运单号</div>
    </div>
    <div class="action-button flex-sb" v-if="orderDetailObj.waybillStatus != 'finish' && orderDetailObj.waybillStatus != 'settled' && orderDetailObj.waybillStatus != 'cancel'">
      <div class="btn-item main-bg-color" @click="doAction(item.actionCode, orderDetailObj.code)" v-for="item in actionObj[orderDetailObj.code]" :key="item">{{item.actionName}}</div>
    </div>
    <waybill-pop :itemValue="itemValue" v-if="isSureWaybill"  @doAgree="doAgree"></waybill-pop>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
import WaybillPop from '@/components/waybillPop';
export default {
  components: {
   'waybill-pop' : WaybillPop
  },
  data() {
    return {
      waybillStatusName: '',
      orderDetailObj: {},
      unitConfig: utils.config.unit,
      imageUrl: '', //二维码图片url
      click: true,
      actionObj: {}, //业务动作集合
      code: '',
      driveryUrl: [],
      recivieUrl: [],
      isSureWaybill: false, //弹窗
    };
  },
  methods: {
    getOrderDetail() { //获取运单详情
      var that = this; 
      utils.getAjax(utils.hostUrl + `/driver-api/driver-api/waybill/detail/${that.code}`, {
        success: function (res) {
          if (res.data.code == 200) {
            that.orderDetailObj = res.data.content || {};
            var waybillStateName = utils.config.waybillStatus[that.orderDetailObj.waybillStatus];
            that.waybillStatusName = waybillStateName;
            var code = that.orderDetailObj.code;
            var timestamp = Date.parse(new Date());
            that.getActionDetail(code); //获取运单详情的业务动作
            that.getImageUrls(that.orderDetailObj.loadingAttachment, 'loadingAttachment');
            that.getImageUrls(that.orderDetailObj.unloadingAttachment, 'unloadingAttachment');
            that.getImageUrl(that.orderDetailObj.waybillNo); //获取二维码图片地址
            that.getActionOperation(code, timestamp) //获取订单的业务操作;
          }else{
            that.action = '';
          }
        }
      });
    },
    doAction(actionCode, code) {//执行业务动作
      var that = this;
      that.code = code;
      switch (actionCode) {
        case 'waybillDriverReject':   //拒绝运单
          return that.driverReject(code);
          break;
        case 'waybillDriverAccept':   //确认运单 
          return that.sureDriverAccept();
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
    getActionDetail(code) { //获取业务动作
      var that = this;
      var params = {};
      var click = that.click;
      if(click) {
        that.click = false;
        params.type = 'driverApi';
        params.businessCodeList = code;
        utils.postAjax(utils.hostUrl + `/driver-api/driverApi/action/list`, params, {
          success: function (res) {
            if (res.data.code == 200) {
              that.actionObj = res.data.content;
            }
          },
          complete: function (res) {
           that.click = true;
          }
        });
      }
    },
    getImageUrls(stringCode, key) { // 获取图片地址的url
      var that = this;
      if (key == 'loadingAttachment'){
        if (stringCode) {
          var arrList = stringCode.split(':');
          if (arrList.length > 0) {
            that.driveryUrl = [];
            for (var i = 0; i < arrList.length; i++) {
              utils.getAjax(utils.hostUrl + "/waybill/fw/image/" + arrList[i] + "/get", {
                success: function (res) {
                  var url = res.data.content.thumbnailList[0].url;
                  that.driveryUrl.push(url);
                },
              });
            } 
          }
        }
      } else if (key == 'unloadingAttachment') {
        if (stringCode) {
          var arrList = stringCode.split(':');
          if (arrList.length > 0) {
            that.recivieUrl = [];
            for (var i = 0; i < arrList.length; i++) {
              utils.getAjax(utils.hostUrl + "/waybill/fw/image/" + arrList[i] + "/get", {
                success: function (res, attch) {
                  var url = res.data.content.thumbnailList[0].url;
                  that.recivieUrl.push(url);
                },
              });
            }
          
          }
        }
      }
    },
    getImageUrl(waybillNo) { //获取二维码图片地址url
      var pic = utils.hostUrl + `/driver-api/driver-api/generate_qr_code/string?value=${waybillNo}`;
      this.imageUrl = pic;
    },
    getActionOperation(code, timestamp) { //获取订单的业务操作
      var that = this;
      utils.postAjax(utils.hostUrl +`/driver-api/driverApi/action/list?businessCodeList=${code}` + `&time=${timestamp}`, {}, {
        success: function (res) {
          that.action = '';
          if (res.data.code == 200 && res.data.content[code]) {
            var data = res.data.content[code][0] || {};
            if (data) {
              that.action = data.actionCode;
            } else {
              that.action = '';
            }
          }
        },
        fail:function(){
         that.action = '';
        }
      });
    },
    bindCallPhone(phone) { //电话
      console.log(phone);
      var phone = phone + '';
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },

    // 业务动作操作list -- start
    driverReject(code) { // 拒绝运单
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
                  // 从新获取业务动作
                  that.getActionDetail(code);
                }else{
                  utils.errorToast(res.data.content);
                }
              }
            })
          }
        }
      })
    },
    sureDriverAccept() { //确认运单弹窗
      var that =this;
      that.isSureWaybill = true;
      that.itemValue = that.orderDetailObj;
      console.log('确认运单')
    },
    driverAccept(code) { //确认运单操作
      var that = this;
      var times = utils.formatTime(new Date()).split(' ')[0].split('/').join('-') + ' ' + utils.formatTime(new Date()).split(' ')[1];
      var params = {};
      params.code = code;
      params.driverConfirmTime = times;
      utils.postAjax(utils.hostUrl + `/driver-api/driver-api/waybill/accept`, params, {
        success: function (res) {
          if (res.data.code == 200) {
            // 从新获取业务动作
           that.getActionDetail(code);
          }else{
            utils.errorToast(res.data.content);
          }
        }
      });
    },
    driverCancel() { //取消运单
      var that = this;
      wx.showModal({
        title: '提示',
        content: '你确认要取消运单？',
        success: function (res) {
          if (res.confirm) {
            var times = utils.formatTime(new Date()).split(' ')[0].split('/').join('-') + ' ' + utils.formatTime(new Date()).split(' ')[1];
            var params = {};
            params.code = that.code;
            params.driverConfirmTime = times;
            utils.postAjax(utils.hostUrl + `/driver-api/driver-api/waybill/cancel`, params, {
              success: function (res) {
                if (res.data.code == 200) {
                  // 从新获取业务动作
                   that.getActionDetail(that.code);
                }else{
                  utils.errorToast(res.data.content);
                }
              }
            });
          }
        }
      })
    },
    driverLoading() { //发货

    },
    driverUnloading() { //收货

    },
    doAgree(isSureWaybill,isSure) {
      var that = this;
      that.isSureWaybill = isSureWaybill;
      if(isSure) {
        that.driverAccept(that.code);
      }
    },
    // 业务动作操作list -- end

  },
  onShow() {
    var that = this;
    that.code = that.$root.$mp.query.code;
    that.getOrderDetail();
  }
};
</script>

<style scoped>
@import '../../../static/detail.css';
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-bottom: 120rpx;
}
.cont{
  min-height: 460rpx;
}
.route-line{
  min-height: 200rpx;
  position: relative;
}
.route-line .call-phone{
  position: absolute;
  top: 90rpx;
  right: 50rpx;
}
.route-line .call-phone img{
  width: 50rpx;
  height: 50rpx;
}
.route-line-name img{
  width: 100rpx;
  height: 60rpx;  
}
.route-line-name{
  height: 100rpx;
  background-color: #fff;
  font-size: 34rpx;
  color: #8e8e8e;
  font-weight: 600;
}
.base-message-item{
  line-height: 60rpx;
}
.erweiimg{
  width: 100%;
  height: 400rpx;
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
  background-color: #fff;
  margin-top: 30rpx;
  padding-bottom: 24rpx;
  margin-bottom: 60rpx;
  color: #454545;
}
.erweiimg image{
  width: 400rpx;
  height: 400rpx;
  margin: 0 auto;
  margin-bottom: 20rpx;
}
.erweiimg .title{
  position: relative;
  top: -70rpx;
}
.action-button{
  height: 120rpx;
  width: 100%;
  background-color: #f2f2f2;
  position: fixed;
  bottom: 0rpx;
  left: 0;
}
.btn-item{
  flex: 1;
  height: 100rpx;
  border-radius: 10rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 34rpx;
  margin: 0 5rpx;
}
.voucher-picture{
  width: 120rpx;
  height: 120rpx;
  margin-left: 20rpx;
}
</style>
