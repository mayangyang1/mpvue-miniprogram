<template>
  <div class="container pdb20">
     <radio-group class="radio-group" @change="radioChange" v-if="cardList.length > 0">
      <view class='manage-list' v-for="item in cardList" :key="item">
        <view class='bank-con flex-sb'>
          <view class='title'>{{item.bankName}}</view>
          <view class='title-last-number'>尾号：{{item.lastNum}}</view>
        </view>
        <view class='bank-operation flex-sb'>
          <view class='operation-l'>
              <radio :value="item.realAccount" :checked="!!item.isDefault"/>设为默认银行卡
          </view>
          <view class='operation-r' @click.stop='deleteBankCard(item.realAccount)'>删除</view>
        </view>
      </view>
    </radio-group>
    <div class="no-message" v-else>暂无银行卡</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      cardList: [],
      accountCode: '',
    };
  },
  methods: {
    getBankCardList() { //获取已经绑定的列表
      var that = this;
      utils.postAjax(utils.hostUrl + `/pay/mobile/bankCardList`, {}, {//绑定的银行卡列表
        success: function (res) {
          if (res.data.code === 200 && res.data.content) {
            var conList = res.data.content;
            conList.forEach((_value, _index) => {
                _value.lastNum = _value.realAccount.slice(-4);
            })
            that.cardList = conList
          }else{
            utils.errorToast(res.data.content);
          }
        },
        complete: function() {
          wx.stopPullDownRefresh();
        }
      });
    },
    radioChange(e) {
      var accountCode = e.target.value;
      this.setDefaultBankCard(accountCode);
    },
    setDefaultBankCard(accountCode) {//设置默认银行卡
      utils.postAjax(utils.hostUrl + `/pay/mobile/setDefaultBankCard`, {accountCode: accountCode}, {//设置默认银行卡
        success: function (res) {
          if(res.data.code === 200 && res.data.content) {
            utils.successToast('设置成功');
          }else{
            utils.errorToast('设置失败');
          }
        },
      });
    },
    deleteBankCard(accountCode) { //删除银行卡
      var that = this;
      wx.showModal({
        title:'提示',
        content: '确认删除这张银行卡吗？',
        success:function(res){
          if (res.confirm) {
            var params = {};
            params.accountCode = accountCode; //银行卡code
            utils.postAjax(utils.hostUrl + `/pay/mobile/deleteBankCard`, params, {//删除银行卡
              success: function (res) {
                if(res.data.code === 200 && res.data.content) {
                  that.getBankCardList();
                }else{
                  utils.errorToast(res.data.content);
                }
                
              },
            });
          }
        },
        complete:function() {
          wx.stopPullDownRefresh();
        }
      })
    }
  },
  onShow() {
    this.cardList = [];
    this.getBankCardList();
  },
  onPullDownRefresh() {
    this.cardList = [];
    this.getBankCardList();
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding: 20rpx 0 120rpx 0;
}
.manage-list{
  background-color: #fff;
  margin-bottom: 20rpx;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding-left: 20rpx
  
}
.manage-list .bank-con{
  border-bottom: 1px solid #ccc;
  height: 100rpx;
  padding-right: 20rpx;
  font-size: 34rpx;
}
.title-last-number{
  width: 200rpx;
  margin-left: 20rpx;
  color: #999;
  text-align: right;
}
.manage-list .bank-operation{
  height: 100rpx;
  padding-right: 20rpx;
  font-size: 32rpx;
}
.operation-r{
  padding: 15rpx 40rpx;
  border: 1px solid #ccc;
  color: #454545;
  border-radius: 8rpx;
}
</style>
