<template>
    <view class="address-picker-mack" v-if="addressPickerView">
        <view class="address-picker-view-wrap">
            <view class="button-item">
                <label class="cancel" @click="bindAddressCancel">取消</label>
                <label class="complete" @click="bindAddressComplete">完成</label>
            </view>
            <view class="picker-view-item">
                <picker-view class="picker-view" indicator-style="height: 40px;" value="{{[province_index]}}" bindchange="bindProvinceChange">
                <picker-view-column>
                    <view class="item" v-for="item in provinceData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" value="{{[city_index]}}" bindchange="bindCityChange">
                <picker-view-column>
                    <view class="item" v-for="item in cityData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" value="{{[district_index]}}" bindchange="bindDistrictChange">
                <picker-view-column>
                    <view class="item" v-for="item in districtData" :key="item.code" style="line-height: 40px">{{item.chineseShortName}}</view>
                </picker-view-column>
                </picker-view>
            </view>
        </view>
  </view>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.address-picker-mack{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
.address-picker-view-wrap{
  width: 100%;
  height: 280px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background: #fff;
}
.address-picker-view-wrap .picker-view-item{
  display: flex;
}
.address-picker-view-wrap .picker-view{
  width: 100%;
  height: 280px;
}
.address-picker-view-wrap .picker-view picker-view-column{
  text-align: center;
}
.address-picker-view-wrap .button-item{
  background: #fbf9fe;
  overflow: hidden;
  padding: 12px 15px;
  font-size: 16px;
}
.address-picker-view-wrap .button-item .cancel{
  float: left;
  color: #999;
}
.address-picker-view-wrap .button-item .complete{
  float: right;
    color: #2da141;
}
</style>


