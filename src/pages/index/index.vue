<template>
  <div class="container pdb20">
    <div class="search-bar">
      <!-- 搜索框组件 --start -->
      <search-bar @searchBar="searchBar"></search-bar>
      <!-- 搜索框组件 --end -->      
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
    <!-- 城市选择器组件 --start -->
    <block v-if="addressPickerView" >
      <city-select @selectCity="selectCity"></city-select>
    </block>
    <!-- 城市选择器组件 --start -->
  </div>
</template>

<script>
import Searchbar from "@/components/search";
import CitySelect from "@/components/citySelect";
import * as utils from "../../utils/index.js";
export default {
  data() {
    return {
      isSearch: false,
      mark: 0,
      click: true,
      goodsName: "",
      goodList: [],
      unitConfig: utils.config.unit,
      addressPickerView: false,
      areaType: '',
      fromAreaText: '',
      toAreaText: '',
      formArea: [],
      toArea: [],

    };
  },
  components: {
    "search-bar": Searchbar,
    "city-select": CitySelect
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
        utils.ajax("GET", utils.hostUrl + `/driver-api/driver-api/freight/list`, params, {
            success: function(res) {
              var goodList = res.data.content;
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
              that.goodsName = "";
              that.fromAreaText = "";
              that.toAreaText = "";
              that.formArea = [];
              that.toArea = [];
              that.click = true;
              wx.stopPullDownRefresh();
            }
          }
        );
      }
    },
    // 组件地区插件 --start
    bindSelectArea(e) {
      var that = this;
      that.areaType = e.currentTarget.dataset.types;
      that.addressPickerView = true;
    },
    selectCity(isSelect, text, provinceCode, cityCode, districtCode){
      var that = this;
      if(isSelect) { //完成选择
        if (that.areaType == 'source'){
          that.formArea = [];
          that.formArea.provinceCode = provinceCode;
          that.formArea.cityCode = cityCode;
          that.formArea.districtCode = districtCode;
          that.fromAreaText = text.substr(3);
          that.addressPickerView = false;
        } else if (that.areaType == 'target') {
          that.toArea = [];
          that.toArea.provinceCode = provinceCode;
          that.toArea.cityCode = cityCode;
          that.toArea.districtCode = districtCode;
          that.toAreaText = text.substr(3);
          that.addressPickerView = false;
        }
      }else{ //取消选择
        that.addressPickerView = false;
        delete that.formArea;
        delete that.toArea;
        delete that.goodsName;
      }
    },
    // 组件地区插件 --end
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
</style>
