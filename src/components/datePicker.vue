<template>
    <div class="time-picker-mack">
        <div class="time-picker-view-wrap">
            <div class="button-item">
                <label class="cancel" @click="bindTimeCancel">取消</label>
                <label class="complete" @click="bindTimeComplete">完成</label>
            </div>
            <div class="picker-view-item">
                <picker-view class="picker-view" indicator-style="height: 40px;" :value="[year_index]">
                <picker-view-column>
                    <view class="item" v-for=" item in yearData" :key="item.code" style="line-height: 40px">{{item}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" :value="[month_index]" @change="bindMonthChange">
                <picker-view-column>
                    <view class="item" v-for="item in monthData" :key="item" style="line-height: 40px">{{item}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" :value="[day_index]" @change="bindDayChange">
                <picker-view-column>
                    <view class="item" v-for="item in dayData" :key="item" style="line-height: 40px">{{item}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" :value="[hour_index]" @change="bindHourChange">
                <picker-view-column>
                    <view class="item" v-for="item in hourData" :key="item" style="line-height: 40px">{{item}}</view>
                </picker-view-column>
                </picker-view>
                <picker-view class="picker-view" indicator-style="height: 40px;" :value="[minute_index]" @change="bindMinuteChange">
                <picker-view-column>
                    <view class="item" v-for="item in minuteData" :key="item" style="line-height: 40px">{{item}}</view>
                </picker-view-column>
                </picker-view>
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from '../utils/index.js';
export default {
  props:{'changeTime':String},
  data() {
    return {
        nowTime: this.changeTime,
        yearData: [],
        monthData: utils.monthData,
        dayData: utils.dayData,
        dayData31:utils.dayData,
        dayData30: utils.dayData.slice(1, utils.dayData.length-1),
        dayData29 :utils.dayData.slice(1, utils.dayData.length-2),
        dayData28 :utils.dayData.slice(1, utils.dayData.length-3),
        hourData: utils.hourData,
        minuteData: utils.minuteData,
        year_index: 0,
        month_index: 0,
        day_index: 0,
        hour_index: 0,
        minute_index: 0
    };
  },
  methods: {
    isLeapYear(year) { //判断是否为闰年
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0); 
    },
    bindTimeCancel() {
        var that = this;
        that.$emit('selectDate', false, that.nowTime);
    },
    bindTimeComplete() {
        var that = this;
        var year = that.yearData[0].slice(0,4);
        var month = that.monthData[that.month_index].slice(0,2);
        var day = that.dayData[that.day_index].slice(0,2);
        var hour = that.hourData[that.hour_index].slice(0,2);
        var minute = that.minuteData[that.minute_index].slice(0,2);
        that.nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00';
        that.$emit('selectDate', false, that.nowTime);
    },
    isDayNumber(month) {
        var dayNumber = '';
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
            return dayNumber = 31;
        }else if(month == 4 || month == 6 || month == 9 || month == 11){
            return dayNumber = 30;
        }else if(month == 2) {
            return dayNumber = 28;
        }
    },
     getDataNumber() {
        var that = this;
        if(that.isLeapYear(that.yearData[0].slice(0,4))){//为润年
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 31){
                return that.dayData = that.dayData31;
            }
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 30){
                return that.dayData = that.dayData30;
            }
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 28){
                return that.dayData = that.dayData29;
            }
        }else{
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 31){
                return that.dayData = that.dayData31;
            }
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 30){
                return that.dayData = that.dayData30;
            }
            if(that.isDayNumber(that.monthData[that.month_index].slice(0,2)) == 28){
                return that.dayData = that.dayData28;
            }
        }
    },
    bindMonthChange(e) {
        console.log(e);
        var that = this;
        var _index = e.target.value[0];
        that.month_index = _index;
        that.getDataNumber();
    },
    bindDayChange(e) {
        var that = this;
        var _index = e.target.value[0];
        that.day_index = _index;
    },
    bindHourChange(e) {
        var that = this;
        var _index = e.target.value[0];
        that.hour_index = _index;
    },
    bindMinuteChange(e) {
        var that = this;
        var _index = e.target.value[0];
        that.minute_index = _index;
    },
    getCurrentTime(changeTime) {
        var that = this;
        var month = changeTime.split('-')[1] + '月';
        var  day =  changeTime.split(' ')[0].split('-')[2] + '日';
        var hour =  changeTime.split(' ')[1].split(':')[0] + '时';
        var minute =  changeTime.split(' ')[1].split(':')[1] + '分';
        that.monthData.forEach((v,i)=>{
            if(month == v) {
                that.month_index = i;
            }
        })
        that.getDataNumber();
        that.dayData.forEach((v, i)=>{
            if(day == v) {
                that.day_index = i;
            }
        })
        that.hourData.forEach((v, i)=>{
            if(hour == v) {
                that.hour_index = i;
            }
        })
        that.minuteData.forEach((v, i)=>{
            if(minute == v) {
                that.minute_index = i;
            }
        })
    }

  },
  created() {
    var date = new Date();
    this.yearData.push(date.getFullYear() + '年');
    this.getCurrentTime( this.nowTime);
  }

};
</script>
<style scoped>
.time-picker-mack{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.time-picker-view-wrap{
  width: 100%;
  height: 280px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background: #fff;
}
.time-picker-view-wrap .picker-view-item{
  display: flex;
}
.time-picker-view-wrap .picker-view{
  width: 100%;
  height: 280px;
}
.time-picker-view-wrap .picker-view picker-view-column{
  text-align: center;
}
.time-picker-view-wrap .button-item{
  background: #fbf9fe;
  overflow: hidden;
  padding: 12px 15px;
  font-size: 16px;
}
.time-picker-view-wrap .button-item .cancel{
  float: left;
  color: #999;
}
.time-picker-view-wrap .button-item .complete{
  float: right;
    color: #2da141;
}
</style>

