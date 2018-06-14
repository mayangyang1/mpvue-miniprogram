<template>
  <div class="container pdb20">
    <div class="search-bar">
      <search-bar @searchBar="searchBar"></search-bar>
    </div>
    
    <div class="good-list" v-if="goodList.length">
      <div class="good-item pdl20 pdb20" v-for="item in goodList" :key="item.code">
        <div class="good-item-header flex-sb">
          <div class="adderss flex-fs">
            <div class="from-address text-overflow">{{item.loadingCityName}} {{item.loadingCountyName}}</div>
            <img class="mglr20" src="/static/images/arrow.png" alt="">
            <div class="from-address text-overflow">{{item.unloadingCityName}} {{item.unloadingCountyName}}</div>
          </div>
          <div class="good-time">{{item.publishTime}}</div>
        </div>
        <div class="good-item-list flex-fs">
          <div class="title">线路</div>
          <div class="msg-con blue-color">{{item.routeName}}</div>
        </div>
        <div class="good-item-list  flex-fs">
          <div class="title">货品</div>
          <div class="msg-con blue-color">{{item.goodsName}}</div>
        </div>
        <div class="good-item-list  flex-fs">
          <div class="title">司机运价</div>
          <div class="msg-con" v-if="item.quoteType == 'price'">{{item.quotePrice}}{{unitConfig[item.meterageType]["driver.price"][item.quotePriceUnitCode]}}</div>
          <div class="msg-con" v-if="item.quoteType == 'quote'">司机报价</div>
        </div>
      </div>
    </div>
    <div class="no-message" v-else>暂无货源</div>
    <div class="over" v-if="isSearch" @click="bindCancleSearch"></div>
    <div class="search-condition pdb20" v-if="isSearch">
      <input type="text" @click="bindSelectArea" v-model="fromAreaText" disabled data-types="source"  placeholder="请输入出发地">
      <input type="text" @click="bindSelectArea" v-model="toAreaText" disabled data-types="target" placeholder="请输入目的地">
      <input type="text" v-model="goodsName" placeholder="请输入货品名称">
      <div class="common-btn main-bg-color row" @click="bindSearch">搜索</div>
    </div>

    <!-- 城市选择器start -->
    <view class="address-picker-mack" v-if="addressPickerView">
      <view class="address-picker-view-wrap">
        <view class="button-item">
          <label class="cancel" @click="bindAddressCancel">取消</label>
          <label class="complete" @click="bindAddressComplete">完成</label>
        </view>
        <view class="picker-view-item">
          <picker-view class="picker-view" indicator-style="height: 40px;" :value="province_index" @change="bindProvinceChange">
            <picker-view-column>
              <view class="item" v-for="item in provinceData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
          <picker-view class="picker-view" indicator-style="height: 40px;" :value="city_index" @change="bindCityChange">
            <picker-view-column>
              <view class="item" v-for="item in cityData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
          <picker-view class="picker-view" indicator-style="height: 40px;" :value="district_index" @change="bindDistrictChange">
            <picker-view-column>
              <view class="item" v-for="item in districtData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>
    <!-- 城市选择器end -->
  </div>
</template>

<script>
import Searchbar from "@/components/search";
import * as utils from "../../utils/index.js";
export default {
  data() {
    return {
      isSearch: false,
      userInfo: {},
      mark: 0,
      click: true,
      goodsName: "",
      goodList: [],
      unitConfig: utils.config.unit,
      addressPickerView: false,
      provinceData: [{
        chineseShortName: '请选择',
        code: '',
      }],
      cityData: [{
        chineseShortName: '请选择',
        code: '',
      }],
      districtData: [{
        chineseShortName: '请选择',
        code: '',
      }],
      areaType: '',
      fromAreaText: '',
      toAreaText: '',

    };
  },

  components: {
    "search-bar": Searchbar
  },

  methods: {
    searchBar(_value) {
      //监听tabbar点击事件;
      this.isSearch = _value;
    },
    bindSearch() {
      this.isSearch = false;
      this.mark = 0;
      this.goodList = [];
      this.getGoodsList();
    },
    bindCancleSearch() {
      this.isSearch = false;
    },
    getGoodsList() {
      var that = this;
      if (that.click) {
        var params = {};
        params.size = 10;
        if (that.mark) {
          params.mark = that.mark;
        }
        
        if (that.goodsName) {
          params.goodsName = that.goodsName;
        }
        if (that.formArea){
          if (that.formArea.provinceCode) params.loadingProvinceCode = that.formArea.provinceCode;
          if (that.formArea.cityCode) params.loadingCityCode = that.formArea.cityCode;
          if (that.formArea.districtCode) params.loadingCountyCode = that.formArea.districtCode;
        }
        if (that.toArea) {
          if (that.toArea.provinceCode) params.unloadingProvinceCode = that.toArea.provinceCode;
          if (that.toArea.cityCode) params.unloadingCityCode = that.toArea.cityCode;
          if (that.toArea.districtCode) params.unloadingCountyCode = that.toArea.districtCode;
        }
        utils.ajax(
          "GET",
          utils.hostUrl + `/driver-api/driver-api/freight/list`,
          params,
          {
            success: function(res) {
              var goodList = res.data.content;
              that.goodsName = "";
              if (res.data.code === 200 && goodList.length > 0) {
                goodList.forEach((_value, index) => {
                  if (_value.publishTime) {
                    _value.publishTime = _value.publishTime.substr(0, 16);
                  }
                });
                that.goodList = that.goodList.concat(goodList);
                that.mark = res.data.mark;
              }
            },
            complete: function() {
              that.click = true;
              wx.stopPullDownRefresh();
            }
          }
        );
      }
    },
    // 地区插件方法 -- start
    bindSelectArea(e) {
      this.initProvinceData();
      this.areaType = e.currentTarget.dataset.types;
      this.addressPickerView = true;
    },
    initProvinceData: function () { //省列表 
      var that = this;
      delete that.provinceCode;
      delete that.cityCode;
      delete that.districtCode;
      utils.getAjax(utils.hostUrl +'/org-config/org-config/province/list', {
        success: function (res) {
          if(res.data.code === 200) {
            var provinceData = res.data.content;
            that.provinceData = that.provinceData.concat(provinceData);
            that.cityData = [{
              chineseShortName: '请选择',
              code: '',
            }];
            that.districtData = [{
              chineseShortName: '请选择',
              code: '',
            }];
          }
          
        }
      });
    },
     bindAddressCancel: function(){//取消选择地区
      var that = this;
      delete that.formArea;
      delete that.toArea;
      delete that.provinceCode;
      delete that.cityCode;
      delete that.districtCode;
      delete that.goodsName;
      that.addressPickerView = false;
      that.provinceData = [{
        chineseShortName: '请选择',
        code: '',
      }]
      that.cityData = [{
        chineseShortName: '请选择',
        code: '',
      }]
      that.districtData = [{
        chineseShortName: '请选择',
        code: '',
      }]
    },
    bindAddressComplete: function(){
      var that = this;
      var text = '';
      var provinceCode = '',cityCode ='', districtCode = '';
      if (that.provinceCode) {
        text += " - " + that.provinceData[that.province_index].chineseShortName;
        provinceCode = that.provinceCode;
      }
      if (that.cityCode) {
        text += " - " + that.cityData[that.city_index].chineseShortName;
        cityCode = that.cityCode;
      }
      if (that.districtCode) {
        text += " - " + that.districtData[that.district_index].chineseShortName;
        districtCode = that.districtCode;
      }
      if (that.areaType == 'source'){
        that.formArea = [];
        that.formArea.provinceCode = provinceCode;
        that.formArea.cityCode = cityCode;
        that.formArea.districtCode = districtCode;
        that.fromAreaText = text.substr(3);
        that.addressPickerView = false;
        that.provinceData = [{
          chineseShortName: '请选择',
          code: '',
        }];
        that.cityData = [{
          chineseShortName: '请选择',
          code: '',
        }];
        that.districtData = [{
          chineseShortName: '请选择',
          code: '',
        }];
      } else if (that.areaType == 'target') {
        that.toArea = [];
        that.toArea.provinceCode = provinceCode;
        that.toArea.cityCode = cityCode;
        that.toArea.districtCode = districtCode;
        that.toAreaText = text.substr(3);
        that.addressPickerView = false;
        that.provinceData = [{
          chineseShortName: '请选择',
          code: '',
        }];
        that.cityData = [{
          chineseShortName: '请选择',
          code: '',
        }];
        that.districtData = [{
          chineseShortName: '请选择',
          code: '',
        }];
      }
    },
    bindProvinceChange: function (e) {//选择省并获取城市
      var that = this;
      var index = e.target.value[0];
      that.province_index = index;
      that.provinceCode = that.provinceData[index].code;
      if (!that.provinceCode){
        that.city_index = 0;
        delete that.cityCode;
        that.district_index = 0;
        delete that.districtCode;
        that.cityData = [{
          chineseShortName: '请选择',
          code: '',
        }]
        that.districtData = [{
          chineseShortName: '请选择',
          code: '',
        }]
      }
      utils.getAjax(utils.hostUrl +`/org-config/org-config/city/list?provinceCode=${this.provinceCode}`, {
        success: function (res) {
          var cityData = res.data.content;
          that.cityData = [{
            chineseShortName: '请选择',
            code: '',
          }];
          that.cityData = that.cityData.concat(cityData);
        }
      });
    },
    bindCityChange: function (e) {//选择城市并获取地区
      var that = this;
      var index = e.target.value[0];
      if (!index) {
        that.city_index = 0;
        delete that.cityCode;
        that.district_index = 0;
        delete that.districtCode;
        that.districtData = [{
          chineseShortName: '请选择',
          code: '',
        }]
      }
      that.city_index = index;
      that.cityCode = that.cityData[index].code;
      utils.getAjax(utils.hostUrl +`/org-config/org-config/county/list?cityCode=${this.cityCode}`, {
        success: function (res) {
          var districtData = res.data.content;
          that.districtData = [{
            chineseShortName: '请选择',
            code: '',
          }];
          that.districtData = that.districtData.concat(districtData);
        }
      });
    },
    bindDistrictChange: function(e){//选择地区
      var that =this;
      var index = e.target.value[0];
      if(!index){
        that.district_index = 0;
        delete that.districtCode;
        that.districtData = [{
          chineseShortName: '请选择',
          code: '',
        }];
      }
      that.district_index = index;
      that.districtCode = that.districtData[index].code;
    },
    // 地区插件方法 -- end
    getWebViewParams() { //获取所有的web-view参数并保存到storage里
      var that = this;
      utils.getAjax(utils.hostUrl + '/platform/platform/core/config/other', { 
        success: function (res) {
          if (res.data.code == 200) {
            var aggrementMessage = res.data.content;
            wx.setStorageSync('webViewParams', aggrementMessage);
          }
        }
      })
    }
  },

  created() {
    
  },
  onShow() {
    utils.logins(this);
    this.getGoodsList();
    this.getWebViewParams();
  },
  onPullDownRefresh() {
    this.mark = 0;
    this.goodList = [];
    this.getGoodsList();
  },
  onReachBottom() {
    this.getGoodsList();
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding-top: 100rpx;
}
.search-bar{
  width: 100vw;
  position:fixed;
  top: 0;
  left: 0;
}
.good-item {
  border-top: 1px solid #ccc;
  background-color: #fff;
  margin-top: 30rpx;
}
.good-item-header {
  height: 120rpx;
  border-bottom: 1px solid #ccc;
}
.good-item-header img {
  width: 40rpx;
  height: 30rpx;
}
.from-address {
  width: 220rpx;
  font-size: 32rpx;
}
.good-time {
  width: 170rpx;
  padding-right: 20rpx;
  color: #999;
}
.good-item-list {
  line-height: 50rpx;
  padding-top: 10rpx;
}
.good-item-list .title {
  color: #999;
  margin-right: 40rpx;
}
.msg-con {
  font-size: 30rpx;
}

.search-condition {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  background-color: #fff;
}
.search-condition input {
  height: 70rpx;
  margin: 30rpx;
  border-radius: 10rpx;
  border: 1px solid #ccc;
  padding-left: 20rpx;
}
.common-btn {
  width: 90%;
}

/*..................地区选择器样式start....*/
.address-picker-mack {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
.address-picker-view-wrap {
  width: 100%;
  height: 280px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background: #fff;
}
.address-picker-view-wrap .picker-view-item {
  display: flex;
}
.address-picker-view-wrap .picker-view {
  width: 100%;
  height: 280px;
}
.address-picker-view-wrap .picker-view picker-view-column {
  text-align: center;
}
.address-picker-view-wrap .button-item {
  background: #fbf9fe;
  overflow: hidden;
  padding: 12px 15px;
  font-size: 16px;
}
.address-picker-view-wrap .button-item .cancel {
  float: left;
  color: #999;
}
.address-picker-view-wrap .button-item .complete {
  float: right;
  color: #2da141;
}
/*..................地区选择器样式end...........*/
</style>
