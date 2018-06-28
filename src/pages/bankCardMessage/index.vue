<template>
  <div class="container pdb20">
    <div class="bankCard-list">
      <div class="bankCard-item flex-fs">
        <div class="title">我的开户行</div>
        <input v-model="mybank" placeholder="请输入开户行" type="text">
      </div>
      <div class="bankCard-item flex-fs">
        <div class="title">我的银行户名</div>
        <input v-model="myname" placeholder="请输入银行户名" type="text">
      </div>
      <div class="bankCard-item flex-fs">
        <div class="title">我的银行账号</div>
        <input v-model="account" placeholder="请输入银行账号" type="text">
      </div>
      <div class="bankCard-item flex-fs">
        <div class="title">描述</div>
        <input v-model="description" placeholder="请输入描述" type="text">
      </div>
    </div>
    <div class="common-btn main-bg-color row" @click="bindsbmit">确认保存</div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      mybank: '',
      myname: '',
      account: '',
      code: '',
      description: '',
    };
  },
  methods: {
    getAccountMessage() { //获取我的收款信息
      var that = this;
      utils.getAjax(utils.hostUrl +'/driver-api/driver-api/person/bank/account',{
        success: function(res){
          if (res.data.code === 200 && res.data.content && JSON.stringify(res.data.content) != "{}") {
            that.init = 0;
            that.mybank = res.data.content.bankName,
            that.myname = res.data.content.bankAccountName,
            that.account = res.data.content.bankAccountNo,
            that.code = res.data.content.code,
            that.description= res.data.content.description
          } else {
            that.init = 1;
          }
        }
      });
    },
    bindsbmit() { //新增/保存我的收款信息
      var that = this;
      var personCode = wx.getStorageSync('userCode');
       var regN = /^([\u4e00-\u9fa5]){2,7}$/;
      var params = {};
      params.personCode = personCode;
      params.bankName = that.mybank;
      params.bankAccountName = that.myname;
      params.bankAccountNo = that.account;
      params.description = that.description;
      if (that.init == 1) { //新增
        if (regN.test(that.myname) && that.account && that.mybank && personCode){
          utils.postAjax(utils.hostUrl + '/driver-api/driver-api/person/bank/account/add',params,{
            success:function(res) {
              if (res.data.code == 200) {
                wx.navigateBack({
                  data: 1
                })
              }else{
                utils.errorToast(res.data.content);
              }
            }
          })
        } else {
          if (!that.mybank) {
            utils.errorToast('请输入开户行');
          }
          if (!regN.test(that.myname)) {
            utils.errorToast('姓名输入有误');
          }
          if (!that.account) {
            utils.errorToast('请输入银行账号');
          }
        }
      } else if (that.init == 0) { //编辑
        if (regN.test(that.myname) && that.account && that.mybank && personCode){
          params.code = that.code;
          utils.postAjax(utils.hostUrl + '/driver-api/driver-api/person/bank/account/edit',params,{
            success:function(res) {
              if (res.data.code == 200) {
                wx.navigateBack({
                  data: 1
                })
              }else{
                utils.errorToast(res.data.content);
              }
            }
          })
        } else {
          if (!that.mybank) {
            utils.errorToast('请输入开户行');
          }
          if (!regN.test(that.myname)) {
            utils.errorToast('姓名输入有误');
          }
          if (!that.account) {
            utils.errorToast('请输入银行账号');
          }
        }
      }
    }
     
  },
  onShow() {
      this.getAccountMessage();
  },  
  
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
}
.bankCard-list{
  padding-left: 20rpx;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.bankCard-item{
  background-color: #fff;
  height: 90rpx;
  border-bottom: 1px solid #ddd;
}
.bankCard-item:last-child{
  border-bottom: none;
}
.bankCard-item .title{
  font-size:32rpx;
  width:240rpx;
}
.bankCard-item input{
  flex: 1;
  color: #888;
}
.common-btn{
  margin: 0 auto;
  margin-top: 70rpx;
  width: 96vw;
}

</style>
