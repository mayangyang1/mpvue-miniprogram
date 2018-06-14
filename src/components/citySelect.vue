<template>
    <div class="address-picker-mack">
      <view class="address-picker-view-wrap">
        <view class="button-item">
          <label class="cancel" @click="bindAddressCancel">取消</label>
          <label class="complete" @click="bindAddressComplete">完成</label>
        </view>
        <view class="picker-view-item">
          <picker-view class="picker-view" indicator-style="height: 40px;" :values="province_index" @change="bindProvinceChange">
            <picker-view-column>
              <view class="item" v-for="item in provinceData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
          <picker-view class="picker-view" indicator-style="height: 40px;" :values="city_index" @change="bindCityChange">
            <picker-view-column>
              <view class="item" v-for="item in cityData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
          <picker-view class="picker-view" indicator-style="height: 40px;" :values="district_index" @change="bindDistrictChange">
            <picker-view-column>
              <view class="item" v-for="item in districtData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </div>
</template>
<script>
import * as utils from '../utils/index.js';
export default {
  props: [],
  data() {
    return {
      provinceData:[{
        chineseShortName: '请选择',
        code: '',
      }],
      cityData: [{
        chineseShortName: '请选择',
        code: '',
      }], //市列表
      districtData: [{
        chineseShortName: '请选择',
        code: '',
      }], //区列表
      province_index: 0,
      city_index: '',
      district_index: '',
    }
  },
  methods:{
    bindAddressCancel() {
      var that =this;
      that.$emit('selectCity', false);
      that.provinceData = [{
        chineseShortName: '请选择',
        code: '',
      }]
      that.cityData = [{
        chineseShortName: '请选择',
        code: '',
      }]
      that.districtsData = [{
        chineseShortName: '请选择',
        code: '',
      }]
    },
    bindAddressComplete() {
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
      that.$emit('selectCity', true, text, provinceCode, cityCode, districtCode);
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
    },
    initProvinceData: function () { //获取省列表 
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
    bindProvinceChange(e) {//切换省选择市
      var that = this;
      var _index = e.target.value[0];
      that.province_index = _index;
      that.provinceCode = that.provinceData[_index].code;
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
    bindCityChange: function (e) {//切换市选择区
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
    bindDistrictChange: function(e){//切换区
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
  },
  created(){
    this.initProvinceData();
  }
}
</script>

<style scoped>
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
</style>


