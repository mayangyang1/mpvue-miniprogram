<template>
  <div class="container">
    <div class="bank-title pdl20">到账银行卡</div>
    <div class="bank-list">
      <block v-for="item in bankCardList" :key="item.bankId" v-if="item.selectCards == true">
        <div class="bank-item flex-sb pdlr20" @click="bindSelectBankCard">
          <div class="bank-name">{{item.bankName}}({{item.lastNum}})</div>
          <img mode="widthFix" src="/static/images/arrows.png" alt="">
        </div>
      </block>  
    </div>
    <div class="raiseCon pdlr20">
      <div class="raise-title">提现金额</div>
      <div class="raise-input flex-fs ">
        <div>¥</div>
        <input maxlength="10" focus='true' v-model="cash" @input="bindCash" type="digit">
      </div>
      <div class="raise-tis flex-fs" v-if="!cashMoney">当前账户余额{{totalMoney}}元，<div class="all" @click="bindRaiseAllMoney">全部提现</div></div>
      <div class="raise-tis flex-fs" v-if="cashMoney && cashMoney - totalMoney <= 0">额外扣除¥{{deductions}}手续费</div>
      <div class="raise-tis flex-fs wang" v-if="cashMoney - totalMoney > 0">输入金额超过账户余额</div>
    </div>
    <div class="common-btn row main-bg-color" @click="raiseCash">提现</div>
    <!-- 提现弹窗 -->
    <raise-pop @isClose="isClose" @onAction="onAction" :cash="cash" :accountNo="accountNo" :cashMoney="cashMoney" :deductions="deductions"  v-if="isSureInputPassward"></raise-pop>
    <!-- 银行卡列表 -->
    <div class="over" v-if="selectBank" @click="cancleSelect"></div>
    <div class="bank-list-pop" v-if="selectBank">
      <div class="title-tips">选择到账银行卡</div>
      <block v-for="item in bankCardList" :key="item.bankId">
        <div class="bank-item-pop flex-sb mgl20 pdlr20" @click="choiceBankcard(item.realAccount)">
          <div class="bank-name">{{item.bankName}}</div>
          <div class="bank-num flex-fs">
            <div class="tis">尾号: {{item.lastNum}}</div>
            <img mode="widthFix" class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
      </block>
    </div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
import RaisePop from '@/components/raisePop';
export default {
  components: {
    'raise-pop': RaisePop
  },
  data() {
    return {
      isSureInputPassward: false,
      selectBank: false,
      bankCardList: [],
      cash: '',
      accountNo: '',
      totalMoney: '',
      deductions: '',
      cashMoney: '',
      isFocus: true,
    };
  },
  methods: {
    raiseCash() {
      var that = this;
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/; //校验金钱的格式；
      if(that.cash){
        if (reg.test(that.cashMoney)) {
          if (Number(that.cashMoney) + that.deductions - that.totalMoney > 0) {//当提现金额大于余额时则不能进行提现操作
            utils.errorToast('余额不足以提现');
          } else {
            that.checkPassword();
          }
        } else {
          utils.errorToast('金额格式有误')
        }
      }else{
        utils.errorToast('请输入金额');
      }
    },
    isClose() {
      this.isSureInputPassward = false;
    },
    bindSelectBankCard() {
      this.selectBank = true;
    },
    choiceBankcard(realAccount) {
      var that = this;
      that.bankCardList.forEach((_value, _index)=>{
        if(_value.realAccount == realAccount) {
          _value.selectCards = true;
          that.accountNo = realAccount;
        }else {
          _value.selectCards = false;
        }
      })
      that.selectBank = false;
      that.reiseCashCaculate(that.cash);
    },
    cancleSelect() {
      this.selectBank = false;
    },
    getBankCardList() { //获取银行卡列表
      var that = this;
      utils.postAjax(utils.hostUrl + `/pay/mobile/bankCardList`, {}, {//绑定的银行卡列表
        success: function (res) {
          if (res.data.code === 200 && res.data.content.length) {
            var conList = res.data.content;
            conList.forEach((_value, _index) => {
              _value.lastNum =_value.realAccount.slice(-4);
              if (_value.isDefault === 1){
                _value.selectCards = true;
                that.accountNo = _value.realAccount;
              }else{
                _value.selectCards = false;
              }
            })
            that.bankCardList = conList;
          }
        },
      });
    },
    checkPassword() { //检查提现密码是否存在
      var that = this;
      utils.postAjax(utils.hostUrl + `/pay/mobile/checkWithdrawPassword`, {}, {
        success: function (res) {
          if (res.data.code === 200 && res.data.content.result == true) {
            that.isSureInputPassward = true;
            that.cashMoney = Number(that.cash).toFixed(2)
            that.isFocus = true
          }else{
            wx.navigateTo({
              url: '../changepassward/changepassward?type=0',
            })
          }
        },
      });
    },
    reiseCashCaculate(amount) { //提现费用计算
      var that = this;
      var params = {};
      params.amount = Number(amount);
      if (params.amount > 0){
        params.bankAccountNo = that.accountNo;
        utils.postAjax(utils.hostUrl + `/pay/mobile/withdrawCharge`, params, {
          success: function (res) {
            if (res.data.code == 200 && res.data.content) {
              var con = res.data.content;
              if (amount == con.amount) {
                that.deductions = con.serviceCharge;
              } else {
                utils.errorToast('余额不足以提现');
              }
            } else {
              utils.errorToast(res.data.content);
            }
          },
        });
      }
    },
    bindCash() {
      var that =this;
      var amount = that.cash;
      var num = amount.split('.')[1];
      if(num && num.length){
        var numLength = num.length;
        if (numLength < 2) {
          that.cash = amount;
          that.cashMoney = amount;
          that.reiseCashCaculate(amount);
        } else if (numLength === 2) {
          wx.setStorageSync('cashValue', amount);
          that.cash = amount;
          that.cashMoney = amount;
          that.reiseCashCaculate(amount);
        } else if (numLength > 2) {
          var cashValue = wx.getStorageSync('cashValue');
          that.cash = cashValue;
          that.cashMoney = cashValue;
        }
      }else{
        that.cash = amount;
        that.cashMoney = amount;
        that.reiseCashCaculate(amount);
      }
    },
    bindRaiseAllMoney(){//全部提现逻辑
      var that =this;
      var params = {};
      params.amount = that.totalMoney;
      params.bankAccountNo = that.accountNo;
      utils.postAjax(utils.hostUrl + `/pay/mobile/withdrawCharge`, params, {
        success: function (res) {
          if (res.data.code == 200 && res.data.content) {
            var con = res.data.content;
            that.cash = con.amount;
            that.deductions = con.serviceCharge;
            that.cashMoney = con.amount;
            wx.setStorageSync('cashValue', con.amount);
          }else{
            utils.errorToast(res.data.content);
          }
        },
      });
    },
    onAction() {
      this.isSureInputPassward = false;
    }  
  },
  mounted() {
    this.cash = '';
    this.bankCardList = [];
    this.getBankCardList();
    this.totalMoney = this.$root.$mp.query.accountMoney;
  }

};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 32rpx;
}
.bank-title{
  font-size: 32rpx;
  line-height: 100rpx;
  height: 100rpx;

}
.bank-item{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

}
.bank-item .bank-name{
  font-weight: 600;
 
  line-height: 100rpx;
}
.bank-item img{
  width: 18rpx;
  height: 12rpx;
}
.raiseCon{
  margin-top: 30rpx;
  background-color: #fff;
  padding: 30rpx;
}
.raise-title{
  font-weight: 600;
  margin-bottom: 30rpx;
}
.raise-input{
  font-size: 34rpx;
  font-weight: 600;
  padding-bottom: 20rpx;
  margin-bottom: 30rpx;
  border-bottom: 1px solid #ccc;
}
.raise-input input {
  flex: 1;
  padding-left: 20rpx;
}
.raise-tis{
  font-size: 30rpx;
}
.raise-tis .all{
  color: #5B6B8A;
}
.wang{
  color: #FD0807;
}
.common-btn{
  width: 94vw;
  margin: 0 auto;
  margin-top: 200rpx;
}
/* 银行卡列表弹窗-- start */
.bank-list-pop{
  background-color: #fff;
  position:fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
}
.title-tips{
  height: 100rpx;
  border-bottom: 1px solid #ccc;
  line-height: 100rpx;
  padding-left: 20rpx;
}
.bank-item-pop{
  height: 100rpx;
  border-bottom: 1px solid #ccc;

}
.bank-item-pop:last-child {
  border-bottom: none;
}
.bank-num img{
  width: 20rpx;
  height: 20rpx;
}
/* 银行卡列表弹窗-- end */
</style>
