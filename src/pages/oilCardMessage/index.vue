<template>
  <div class="container pdb20">
     <div class="oilCard flex-fs">
       <div class="title">我的油卡号</div>
       <input :focus="!hasCardNo" :disabled="hasCardNo" v-model="fuelCardNo" placeholder="请输入油卡号" type="text">
     </div>
     <div class="common-btn main-bg-color row" v-if="!hasCardNo" @click="bindsbmit">确认保存</div>
     <div class="common-btn main-bg-color row" v-else @click="bindedit">修改</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      fuelCardNo: '',
      hasCardNo: true,
      click: true,
    };
  },
  methods: {
    getOilCardMessage() {  //获取油卡信息
      var that = this;
      utils.getAjax(utils.hostUrl + '/driver-api/driver-api/person/self/info', {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            var obj = res.data.content;
            that.fuelCardNo = obj.fuelCardNo;    
            if (that.fuelCardNo != '' && that.fuelCardNo != null){
              that.hasCardNo = true;
            }else{
              that.hasCardNo = false;
            }
          }else{
            utils.errorToast(res.data.content);
          }
        }
      });
      
    },
    bindedit() { //修改油卡信息
      this.hasCardNo = false
    },
    bindsbmit() { //确认保存油卡信息
      var that = this;
      var params ={};
      params.fuelCardNo = that.fuelCardNo;
      utils.postAjax(utils.hostUrl + '/driver-api/driver-api/person/edit/fuel_card_no', params, {
        success: function (res) {
          if (res.data.code == 200 && res.data.content != void 0){
           that.hasCardNo = true;
          }
        }
      });
    }
  },
  onShow() {
    this.getOilCardMessage();
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-top: 20rpx;
  
}
.oilCard{
  background-color: #fff;
  height: 90rpx;
  padding-left: 20rpx;

}
.oilCard .title{
  width: 220rpx;
  font-size: 32rpx;
}
.oilCard input{
  flex: 1;
  height: 100%;
}
.common-btn{
  width: 96vw;
  margin:0 auto;
  margin-top: 70rpx;
}

</style>
