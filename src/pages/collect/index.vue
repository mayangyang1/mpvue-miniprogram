<template>
  <div class="container pdb20">
     <div class="good-list" v-if="dataList.length">
      <div class="good-item pdl20 pdb20" @click="bindGoodsDetails(index)" v-for="item in dataList" :key="item.code">
        <div class="good-item-header flex-sb">
          <div class="adderss flex-fs">
            <div class="from-address text-overflow">{{item.loadingCityName}} {{item.loadingCountyName}}</div>
            <img class="mglr20" src="/static/images/arrow.png" alt="">
            <div class="from-address text-overflow">{{item.unloadingCityName}} {{item.unloadingCountyName}}</div>
          </div>
          <div class="good-time">{{item.publishTime}}</div>
        </div>
        <div class="good-item-list flex-fs" v-if="item.routeName">
          <div class="title">线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;路</div>
          <div class="msg-con main-color">{{item.routeName}}</div>
        </div>
        <div class="good-item-list  flex-fs">
          <div class="title">货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</div>
          <div class="msg-con main-color">{{item.goodsName}}</div>
        </div>
        <div class="good-item-list  flex-fs">
          <div class="title">司机运价</div>
          <div class="msg-con" v-if="item.quoteType == 'price'">{{item.quotePrice}}{{unitConfig[item.meterageType]["driver.price"][item.quotePriceUnitCode]}}</div>
          <div class="msg-con main-color" v-if="item.quoteType == 'quote'">司机报价</div>
        </div>
      </div>
    </div>
    <div class="no-message" v-else>暂无收藏</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      lock:true,
      mark:0,
      dataList: [],
      unitConfig: utils.config.unit,
    };
  },
  methods: {
    getCollectionList() {
      if (this.lock) {
        var that = this;
        that.lock = false;
        var params = {};
        params.size = 10;
        if(that.mark) {
          params.mark = that.mark;
        }
        utils.ajax('GET', utils.hostUrl+`/driver-api/driver-api/freight_collect_record/list`,params, {
          success: function (res) {
            if (res.data.code === 200 && res.data.content.length) {
              that.dataList = that.dataList.concat(res.data.content);
              that.mark = res.data.mark; 
            } else {
              if (that.page == 1) {

              }
            } 
          }, complete: function () {
            that.lock = true;
            wx.stopPullDownRefresh();
          }
        });
      }
    },
    bindGoodsDetails(_index) { //跳转到货源详情
      var code = this.dataList[_index].code;
      wx.navigateTo({
        url: `../sourceGoodsDetails/main?code=${code}`
      })
    }
    
  },
  onShow() {
    var that = this;
    that.mark = 0;
    that.dataList = [];
    that.getCollectionList();
  },
  onPullDownRefresh() {
    var that = this;
    that.mark = 0;
    that.dataList = [];
    that.getCollectionList();
  },
  onReachBottom() {
    this.getCollectionList();
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-top: 1rpx;
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
  margin-right: 77rpx;
}
.msg-con {
  font-size: 30rpx;
}

</style>
