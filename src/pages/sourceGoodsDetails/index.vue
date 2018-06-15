<template>
  <div class="container">
    <div class="source-route-name flex-fs pdlr20">
      <div class="route-name">货源托运方: {{sourceDetailObj.consignOrgName}}</div>
    </div>
    <div class='driver-receive flex-fs pdtb20 mgt20'>
      <div class="tips pdl20"></div>
      <div class='cont mgl20'>
        <div class='route-line bdb pdb20'>
          <div class='route-address'><img class="state" mode='aspectFit' src='/static/images/f.png'>{{sourceDetailObj.loadingProvinceName}} {{sourceDetailObj.loadingCityName}} {{sourceDetailObj.loadingCountyName}}地址</div>
          <div class='route-message'>{{sourceDetailObj.loadingAddress}}</div>
          <div class='route-message'>{{sourceDetailObj.loadingOrgName}}</div>
          <img class="state-img" v-if="sourceDetailObj.status == 'pushling'" mode="widthFix" src="/static/images/loding.jpg">
          <img class="state-img" v-if="sourceDetailObj.status == 'finished'" src="/static/images/finish.jpg">
        </div>
        <div class='route-line pdt20'>
          <div class='route-address'><img class="state" mode='aspectFit' src='/static/images/z.png'>{{sourceDetailObj.unloadingProvinceName}} {{sourceDetailObj.unloadingCityName}} {{sourceDetailObj.unloadingCountyName}}地址</div>
          <div class='route-message'>{{sourceDetailObj.unloadingAddress}}</div>
          <div class='route-message'>{{sourceDetailObj.unloadingOrgName}}</div>
        </div>
      </div>
    </div>
    <div class="title-tips pdlr20">联系人</div>
    <div  class="concat-phone flex-fs pdlr20">
      <div class="user-name mgr20">{{sourceDetailObj.contactUserFullName}}</div>
      <div class="main-color">{{sourceDetailObj.contactPhone}}</div>
    </div>
    <div class="title-tips pdlr20">基本信息</div>
    <div class="base-message-list pd20">
      <div class="base-message-item flex-fs">
        <div class="message-title">货源号</div>
        <div class="message-con text-overflow">{{sourceDetailObj.freightNo}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">货物</div>
        <div class="message-con text-overflow">{{sourceDetailObj.goodsName}}</div>
      </div>
      <div class="base-message-item flex-fs" v-if="sourceDetailObj.routeName">
        <div class="message-title">线路</div>
        <div class="message-con text-overflow">{{sourceDetailObj.routeName}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">司机运价</div>
        <div class="message-con text-overflow flex-fs" v-if="sourceDetailObj.quoteType == 'price'"><div style="font-size:35rpx;" class="main-color">{{sourceDetailObj.quotePrice}}</div>{{unitConfig[sourceDetailObj.meterageType]["driver.price"][sourceDetailObj.quotePriceUnitCode]}}</div>
        <div class="message-con text-overflow main-color" v-if="sourceDetailObj.quoteType == 'quote'">司机报价</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">原始客户</div>
        <div class="message-con text-overflow">{{sourceDetailObj.originalConsignOrgName}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">需求车次</div>
        <div class="message-con text-overflow">{{sourceDetailObj.truckQty}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">已接车次</div>
        <div class="message-con text-overflow">{{sourceDetailObj.acceptTruckNumber}}</div>
      </div>
      <div class="base-message-item flex-fs">
        <div class="message-title">备注</div>
        <div class="message-con text-overflow">{{sourceDetailObj.description}}</div>
      </div>
    </div>
    <div class="title-tips pdlr20">接货记录</div>
    <div class="record-con">
      <div class="current-use-car flex-fs pdlr20">
        <div>当前使用车辆: </div>
        <div class="car-no main-color"> {{truckLicenseNo}}</div>
      </div>
      <div class="record-list pdl20">
        <div class="record-item pdr20 flex-sb" v-for="item in recordList" :key="item.code">
          <div class="record-message">
            <div  class="flex-fs">
              <div class="title-s">接货车辆</div>
              <div class="con mgl20 car-msg">{{item.truckLicenseNo}}</div>
            </div>
            <div  class="flex-fs">
              <div class="title-s">司机运价</div>
              <div class="con mgl20">{{item.driverPrice}}{{unitConfig[item.meterageType]["driver.price"][item.driverPriceUnitCode]}}</div>
            </div>
            <div  class="flex-fs">
              <div class="title-s">接货时间</div>
              <div class="con mgl20">{{item.createTime}}</div>
            </div>
          </div>
          <div class="record-status ">
            <block v-if="item.driverAcceptStatus == 'undispatched'">
              <div class="truck-status">等待派车</div>
              <div class="operation-btn" @click="cancleReceiveGoods(item.code, index)">取消接货</div>
            </block>
            <block v-if="item.driverAcceptStatus == 'ignored'">
              <div class="truck-status">已忽略派车</div>
              
            </block>
            <block v-if="item.driverAcceptStatus == 'dispatched' || item.driverAcceptStatus == 'comfirmed'">
              <div class="truck-status">已派车</div>
              <div class="operation-btn">查看运单</div>
            </block>
             <block v-if="item.driverAcceptStatus == 'canceled'">
              <div class="truck-status">已取消</div>
            </block>
          </div>
        </div>
      </div>
    </div>
    <div class="receive-btn ">
      <div v-if="sourceDetailObj.status != 'finished' && sourceDetailObj.allowAcceptWaybill == true" @click="bindreceiving" class=" btn common-btn main-bg-color">
         我要接单 
      </div>
      <div class='flex-sb' v-if="sourceDetailObj.status != 'finished'">
        <div class="row btnt mg20" @click="bindCollect">
        {{isCollect?'取消收藏':'收藏货源'}}
        </div>
        <div class='row btnt mg20' @click='bindReturnBack'>返回首页</div>
      </div>
    </div>
    <!-- 接单弹窗 -- start -->
    <div class='driver-quotation' v-if="isQuotation">
      <div class='over'></div>
      <div class='quotation-con'>
        <div class="quotation list flex-sb">接货</div>
        <div class='list flex-sb transport'>
          <div class='transport-line'>运输线路</div>
          <div class='line flex-sb'>
            <div class='begin-line text-overflow'>{{sourceDetailObj.loadingCityName}}{{sourceDetailObj.loadingCountyName}}</div>
            <img src="/static/images/arrow.png">
            <div class='end-line text-overflow'>{{sourceDetailObj.unloadingCityName}}{{sourceDetailObj.unloadingCountyName}}</div>
          </div>
        </div>
        <div class='transport-offer list flex-sb'>
          <div class='offer-title'>运费报价</div>
          <input type='digit' :disabled='isDisable' v-model='prices' auto-focus='true' placeholder='请输入报价'>
          <div class='company' v-if="sourceDetailObj.quotePriceUnitCode == 'yuanpertruck'">元/车</div>
          <div class='company' v-if="sourceDetailObj.quotePriceUnitCode == 'yuanpercube'">元/方</div>
          <div class='company' v-if="sourceDetailObj.quotePriceUnitCode == 'yuanperitem'">元/件</div>
          <div class='company' v-if="sourceDetailObj.quotePriceUnitCode == 'yuanperton'">元/吨</div>
        </div>
        <div class="agree-item list flex-fs">
          <checkbox-group @change="agreechange">
            <checkbox color='#f48400' :checked='isagree' class='check-box'></checkbox>
          </checkbox-group>

          <div class='agreeTitle'>同意
            <div class='agreelink main-color' @click='bindagrrement'> 
                《<text>{{aggrementMessageName}}</text>》
            </div> 
          </div> 
        </div> 
        <div class='list delivery-btn'>
          <div class='delivery' @click='cancleDelivery'>取消接货</div>
          <div class='delivery sur main-color' @click='sureDelivery'>确认接货</div>
        </div>
      </div>
    </div>
    <!-- 接单弹窗 -- end -->
  </div>
</template>

<script>
import * as utils from '../../utils/index.js';
export default {
  data() {
    return {
     isCollect: false,
     collect: {},
     quoteType: '',
     sourceDetailObj: {},
     driverAcceptStatus: '',
     code: '',
     haveVersion: false,
     haveCar: false,
     truckLicenseNo: '', //车牌号
     unitConfig: utils.config.unit,
     recordList:[],
     mark:0,
     isQuotation: false, //接单弹窗
     isDisable: false,
     prices: '', //接单价格
     isagree: false,
     click: true,
     aggrementMessageName: '',
    };
  },
  methods: {
    getSourceDetails(freightCode) {
      var that = this;
      utils.getAjax(utils.hostUrl + `/driver-api/driver-api/freight/${freightCode}/get`, {
        success: function (res) {
          if (res.data.code == 200) {
            var data = res.data.content;
            var driverAcceptStatus = data.driverAcceptStatus != null ? data.driverAcceptStatus : 'none';
            var quoteType = data.quoteType;
            that.quoteType = quoteType;
            that.sourceDetailObj = data;
            that.driverAcceptStatus = driverAcceptStatus;
            that.getIsCollection(freightCode); //判断收藏状态
            that.isPersonCertification(); //查询人员信息认证状态
            that.isTruckCertification(); //车辆认证信息状态
            that.getRecordList(freightCode); //接单记录列表
          }
        }
      });
    },
    getIsCollection(freightCode) { //收藏状态
      var that =this;
      utils.getAjax(utils.hostUrl + `/driver-api/driver-api/driver_api_collect_record/1/${freightCode}/get`, {
        success: function (res) {
          if (res.data.content) {
            that.code = res.data.content.code;
            that.isCollect = true;
          } else {
            that.isCollect = false;
          }
        }
      });
    },
    isPersonCertification() { //查询当前登录人信息认证状态
      var that = this;
      utils.getAjax(utils.hostUrl + '/driver-api/driver-api/person/self/info', {
        success: function (res) {
          if (res.data.code === 200) {
            that.haveVersion = res.data.content.certStatus;
          }
        }
      });
    },
    isTruckCertification() { //查询当前登录人车辆信息认证状态
      var that = this;
      utils.getAjax(utils.hostUrl + '/driver-api/driver-api/truck/list?size=1', {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            that.haveCar = res.data.content[0].certStatus;
            that.truckLicenseNo = res.data.content[0].truckLicenseNo || '';
          }
        }
      });
    },
    getRecordList(freightCode) { //获取接货记录
      var that = this;
      var params = {};
      params.freightCode = freightCode;
      params.size = 10;
      if (that.mark) params.mark = that.mark;
      utils.ajax('GET', utils.hostUrl + `/driver-api/driver-api/freight/accept_record_list`, params, {
        success: function (res) {
          if (res.data.code === 200 && res.data.content.length) {
            that.recordList = that.recordList.concat(res.data.content);
            that.mark = res.data.mark;
          } else {
            if(res.data.content.length == 0) {

            }else{
              utils.errorToast(res.data.content);
            }
          }
        }, complete: function () {
          wx.stopPullDownRefresh();
        }
      });
    },
    cancleReceiveGoods( code, _index) { //取消接货
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确认取消接货？',
        success: function(res) {
          if(res.confirm) {
            var params = {};
            params.code = code;
            utils.postAjax(utils.hostUrl + `/driver-api/driver-api/freight_accept_record/cancel/${code}`, params, {
              success: function (res) {
                if (res.data.code === 200) {
                  that.recordList[_index].driverAcceptStatus = 'canceled';
                }
              }
            });
          }
        }
      })
    },
    bindreceiving() { //接单弹窗
      var that = this;
      if (that.haveVersion == 'authenticated' && that.haveCar == 'authenticated') { //人是否认证
          var regiestCon = wx.getStorageSync('webViewParams');
          that.aggrementMessageName = regiestCon['other.statement.tradeRulesName'];
          if (that.quoteType == 'price') { //一口价
            that.isQuotation = true;
            that.prices = that.sourceDetailObj.quotePrice;
            that.isDisable = true;
          } else if (that.quoteType == 'quote') { // 司机要价 
            that.isQuotation = true;
            that.isDisable = false;
            that.prices = '';
          }
      } else if (that.haveVersion != 'authenticated' && that.haveCar != 'authenticated'){
          utils.errorToast('人车都未认证');
      
      } else{
        if (that.haveVersion != 'authenticated') {
          utils.errorToast('人未认证通过');
        } else if (that.haveCar != 'authenticated') {
          utils.errorToast('车未认证通过');
        }
      }
    },
    cancleDelivery() { //取消接货
      this.isQuotation = false;
      this.isagree = false;
    },
    sureDelivery() { //确认接货
      var that = this;
      var click = that.click;
      if (click) {
        that.click = false;
        if (that.isagree){ //同意协议
          if (that.freightCode) {
            var params = {};
            if (that.isDisable) { 
              that.acceptwaybill(params, that.freightCode);
            } else {
              params.price = that.prices;
              params.priceUnitCode = that.sourceDetailObj.quotePriceUnitCode;
              if(params.price){
                that.acceptwaybill(params, that.freightCode);
              }else{
                utils.errorToast('请输入报价');
                that.click = true;
              }
              
            }
          }else{
            that.click = true;
          }
        }else{
          utils.errorToast('请同意交易规则');
          that.click = true;
        }
      }
    },
    acceptwaybill(params, freightCode) { //接单
      var that = this;
      utils.postAjax(utils.hostUrl + `/driver-api/driver-api/freight/accept_waybill/${freightCode}`, params, {
        success: function (res) {
          if (res.data.code === 200) {
            that.isQuotation = false;
            that.driverAcceptStatus = res.data.content.driverAcceptStatus;
             that.isagree = false;
            // 重新获取接单记录列表
            that.mark = 0;
            that.recordList = [];
            that.getRecordList(that.freightCode);
          } else {
            utils.errorToast(res.data.content);
          }
        },
        complete: function () {
          setTimeout(()=>{
            that.click = true;
          },500)
          
        }
      });
    },
    agreechange() { //协议
      this.isagree = !this.isagree;
    },
    bindReturnBack() { //返回首页
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    bindagrrement() { //查看平台交易规则
      var url = wx.getStorageSync('webViewParams')['other.statement.tradeRulesUrl'];
      wx.navigateTo({
        url: `../agreement/main?url=${url}`
      })
    },
    bindCollect() { //收藏或者取消货源
      var that = this;
      var params = {};
      if (!that.isCollect) {
        params.collectSource = 1;
        params.collectSourceCode = that.freightCode;
        utils.postAjax(utils.hostUrl + '/driver-api/driver-api/driver_api_collect_record/add', params, {
          success: function (res) {
            if (res.data.code === 200) {
              that.isCollect = true;
              that.code = res.data.content.code;
              utils.successToast('收藏成功');
            }
          }
        });
      } else {
        var code = that.code;
        utils.postAjax(utils.hostUrl + `/driver-api/driver-api/driver_api_collect_record/${code}/delete`, {}, {
          success: function (res) {
            if (res.data.code === 200) {
              that.isCollect = false;
              that.code = '';
              utils.successToast('已取消收藏');
            }
          }
        });
      }
    }
  },
  mounted(){
    var that = this;
   var code = that.$root.$mp.query.code;
   that.freightCode = code;
   that.mark = 0;
   that.recordList = [];
   that.getSourceDetails(code);
  },
  onReachBottom() {
    var code = this.$root.$mp.query.code;
    this.getRecordList(code);
  }
};
</script>

<style scoped>
.container{
  background-color: #f2f2f2;
  padding-bottom: 240rpx;
}
.source-route-name{
  height: 100rpx;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  font-size: 34rpx;
  color: #8e8e8e;
  font-weight: 600;
}
.driver-receive{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
}
.driver-receive .tips{
  border-right: 1px solid #f2f2f2;
  width: 35rpx;
  height: 300rpx;
  margin-right: 30rpx;
  align-self: flex-start;
}
.cont{
  min-height: 400rpx;
  line-height: 50rpx;
  flex: 1;
}
.route-line {
  min-height: 178rpx;
}
.route-line .state-img{
  width: 160rpx;
  height: 80rpx;
  position: absolute;
  top: 20rpx;
  right: 0;
}
.route-address{
  position: relative;
  font-size: 36rpx;
  font-weight: 600;
  width: 450rpx;
}
.route-line .state{
  position:absolute;
  top:0;
  left:-87rpx;
  width:80rpx;
  height:80rpx;
}
.route-message{
  font-size: 28rpx;
  width: 530rpx;
}
.title-tips{
  height: 80rpx;
  line-height: 80rpx;
  background-color: #f2f2f2;
  font-size: 32rpx;
  font-weight: 600;
}
.concat-phone{
  background-color: #fff;
  font-size: 32rpx;
  margin-right: 10rpx;
  height: 100rpx;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.user-name{
  color: #666;
}
.base-message-list{
  background-color: #fff;
  line-height: 50rpx;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.message-title{
  width: 200rpx;
  color: #999;
}
.message-con{
  flex: 1;
  font-size: 30rpx;
  color: #454545;
}
/* 接单记录 --start */
.record-con{
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-bottom:  1px solid #ccc;
}
.current-use-car{
  height: 100rpx;

}
.current-use-car .car-no{
  font-size: 30rpx;
  margin-left: 20rpx;
}
.record-list{
  line-height: 50rpx;
}
.record-item{
  border-top: 1px solid #f2f2f2;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
}
.record-message .con{
  font-size: 30rpx；
}
.car-msg{
  font-weight: 600;  
}
.record-message .title-s{
  color: #999;
  font-size: 28rpx;
}
.record-status{
  font-size: 30rpx;
  color: #666;
  text-align: center;
}
/* 接单记录 --end */

/* 按钮样式 -- satart */
.record-status .operation-btn{
  border: 1px solid #ccc;
  padding: 3rpx 20rpx;
  font-weight: 600;
}
.receive-btn{
  position:fixed;
  bottom:0;
  left:0;
  width:100vw;
  background-color:#f2f2f2;
  padding-top:20rpx;
}
.receive-btn .btn{
  line-height: 80rpx;
  text-align: center;
  width: 95%;
}
.receive-btn .btnt{
  flex: 1;
  height: 88rpx;
  background-color: #fff;
  border-radius: 10rpx;
  color: #000;
  text-align: center;
  font-size: 36rpx;
}
/* 按钮样式 -- end */
/* .................操作弹窗 start............  */
.driver-quotation{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.quotation-con{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 90vw;
  height: 512rpx;
  background-color: #fff;
  z-index: 3;
  border-radius: 20rpx;
}
.quotation-con .list{
  height: 100rpx;
  border-bottom: 1px solid #d6d6d6;
  margin: 0 30rpx;
  background-color: #fff;
}
.quotation-con .list:nth-child(5){
  border-bottom: none;
}
.transport img{
  width: 27rpx;
  height: 11rpx;
  display: block;
  margin: 0 auto;
}
.transport-line{
  width: 140rpx;
}
.line .begin-line{
  margin-right: 10rpx;
  width: 200rpx;
}
.line .end-line{
  margin-left: 10rpx;
  width: 200rpx;
}
.quotation{
  font-size: 34rpx;
  color: #454545;
}
.transport{
  font-size: 34rpx;
  color: #999;
}
.transport-offer{
  font-size: 34rpx;
  color: #999;
  padding-left: 20rpx;
}
.transport-offer input{
  width: 360rpx;
}
.delivery-btn .delivery{
  width: 50%;
  height: 100rpx;
  font-size: 34rpx;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  line-height: 100rpx;
}
.delivery-btn .sur{
  border-left: 1px solid #d6d6d6;
}
.agree-item .check-box{
  transform: scale(.9);
}
.agree-item .agreeTitle{
  display: flex;
  font-size: 32rpx;
}
.agreeTitle .agreelink{
  font-size: 32rpx;
}
/* .................操作弹窗 end............  */
</style>