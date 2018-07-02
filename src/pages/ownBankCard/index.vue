<template>
  <div class="container pdb20 pdt20">
     <block v-for="item in bankCardList" :key="item">
      <div class='bank-card-list pdlr20'>
        <img class='bank_bg' src='/static/images/bank_bg.png'>
        <div class='bank-username'>{{item.userName}}</div>
        <div class='bank-name'>{{item.bankName}}</div>
        <div class='bank-number'>
          <div class='number'> <text class='nosee'>**** **** ****</text> {{item.lastNum}}</div>
          <!-- <div class='tips' v-if="item.isDefault === 1">✔默认</div> -->
        </div>
      </div>
    </block>
    <div class='add-bankcards' @click='bindAddBankCard'><text class='adds'>+</text> <text class='title'>添加银行卡</text></div>
    <div class='manage-bankcard' @click='bindManageBankCard'>管理银行卡</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      bankCardList: []
    };
  },
  methods: {
    getBankCardList() { //获取绑定的银行卡列表
      var that = this;
      var params = {};
      utils.postAjax(utils.hostUrl + `/pay/mobile/bankCardList`, params, {
        success: function (res) {
          if(res.data.code === 200 && res.data.content.length){
            var conList = res.data.content;
            conList.forEach((_value, _index)=>{
              _value.lastNum = _value.realAccount.slice(-4);
              _value.userName = '*' + _value.realAccountName.slice(1);
            })
            that.bankCardList = conList;
          }
        },
        complete:function() {
          wx.stopPullDownRefresh();
        }
      });
    },
    bindAddBankCard() { //添加银行卡
      wx.navigateTo({
        url: '../addBankCard/main'
      })
    },
    bindManageBankCard() { //管理银行卡
      wx.navigateTo({
        url: '../manageBankCard/main'
      })
    }
  },
  onShow() {
    this.bankCardList = [];
    this.getBankCardList();
  },
  onPullDownRefresh() {
   this.bankCardList = [];
    this.getBankCardList();
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  font-size: 28rpx;
  border-top: 20rpx solid #f2f2f2;
  border-bottom:  20rpx solid #f2f2f2;
}
.bank-card-list{
  position: relative;
  font-size: 34rpx;
  height: 260rpx;
  color: #fff;
  margin-bottom: 20rpx;
}
.bank-username{
  position: absolute;
  top: 50rpx;
  left: 80rpx;
  z-index: 3;
  font-size: 36rpx;
}
.bank-name{
  position: absolute;
  top: 120rpx;
  left: 80rpx;
  z-index: 3;
  font-size: 32rpx;
}
.bank-number{
  position: absolute;
  top: 175rpx;
  left: 80rpx;
  z-index: 3;
  font-size: 36rpx;
}
.bank_bg{
  position: relative;
  top: 0;
  left: 0;
  height: 260rpx;
  width: 100%;
  z-index: 2;
}
.bank-number{
  display: block;

}
.nosee{
  position: relative;
  top: 5rpx;
}
.add-bankcards{
  margin: 0 20rpx;
  border: 1px dashed #ccc;
  height: 260rpx;
  font-size: 34rpx;
  color: #999;
  text-align: center;
  line-height: 260rpx;
}
.add-bankcards .adds{
  font-size: 80rpx;
  line-height: 260rpx;
}
.add-bankcards .title{
  position: relative;
  top: -14rpx;
  left: 20rpx;


}
.manage-bankcard{
  margin: 0 20rpx;
  border: 1px solid #ccc;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  margin-top: 40rpx;
  color: #999;
  border-radius: 10rpx;
}
</style>
