<template>
  <div class="container">
        <div class='register-list'>
            <div class='title'>手机号</div>
            <input v-model="phone" placeholder='请输入手机号'>
        </div>
        <div class='register-list'>
            <div class='title'>验证码</div>
            <input v-model="versionCode" placeholder='请输入验证码'>
            <div class='getCode' v-if="isVersion" @click='getVersionCode'>获取验证码</div>
            <div class='getCode' v-else >重新获取({{timer}})</div>
        </div>
        <div class='register-list'>
            <div class='title'>姓 名</div>
            <input v-model="userName" placeholder='请输入你的真实姓名'>
        </div>
        <div class='register-list setMargin'>
            <div class='title'>密 码</div>
            <input v-model="password" password='true' placeholder='请输入密码'>
        </div>
        <div class='register-list'>
            <div class='title'>确认密码</div>
            <input v-model="surePassword" password='true' placeholder='请再次输入密码'>
        </div>
        <div class='agreement-con'>
          <checkbox-group @change="agreechange">
            <checkbox color='#f48400' :checked='isAgree' class='check-box'></checkbox>
          </checkbox-group>
          <div>同意<text class='agreement' @click="bindAgreementDetail">《{{agreementName}}》</text></div>
        </div>
        <div class='register' @click="registerUser">注册</div>

        <div class='over' v-if="isHotTip"></div>
        <div class='hot-tips' v-if="isHotTip">
        <div class='hot-title main-color'>特别提示</div>
        <div class='hot-tip-content'>1.1 本提示是您（以下简称“您”或“用户”）与本公司（以下简称“本平台”或者“我们”）之间关于您在本平台中注册并使用本平台业务（包括但不限于通过PC版或移动智能终端等版本）以及您通过本平台获得相关信息、建议及／或服务等相关事宜的规则说明。</div>
        <div class='hot-tip-content'>1.2 请您认真阅读本规则并充分理解各条款的内容。本平台发布的法律声明及隐私政策、计费标准、规则等其他规定均属于本规则的补充协议，与本规则不可分割且具有同等法律效力。您在使用本平台提供的服务之前必须同意接受本规则。当您按照注册页面提示填写信息、提交文件、阅读并同意本规则且完成注册程序后，即表示您已充分阅读、理解并接受本规则的全部内容。如您不同意接受本规则或其中任何条款约定，您应立即停止注册程序。</div>
        <div class='hot-tip-content'>1.3 您明确同意，本平台有权根据法律法规的变化及／或运营需要，不时对前述协议和条款进行修改并公布，规则和条款一经公布，立即生效，本平台无需另行通知。您应主动不时查阅本平台的公示，若不同意修改内容，您可以停止使用本平台业务。若继续使用本平台服务，则视为接受我们对前述协议和条款的修改。</div>
        <div class='hot-tip-content'>1.4 请您审慎阅读并充分理解本规则的内容以及本平台公布的所有相关协议、规则等文件。如您不具有完全民事行为能力，请您在法定监护人的陪同下阅读。注册成为本平台用户以及使用平台提供的服务即视为接受前述文件以及不时修改、删减及增加的内容。</div>
        <div class='regiest-agreement'>
          <div class='main-color' @click='bindAgreementDetail'>《{{agreementName}}》</div>
          <div class='main-color' @click='bindPlatfomRegiest'>《{{platAgreementName}}》</div>
        </div>
        <div class='operation'>
          <div class='operation-button main-bg-color' @click='bindDisAgreement'>不同意</div>
          <div class='operation-button main-bg-color' @click='bindAgreement'>同意</div>
        </div>
      </div>
  </div>
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      phone: "", //手机号
      versionCode: "", //验证码
      userName: "", //用户名
      password: "", //密码
      surePassword: "", //确认密码
      isVersion: true,
      timer: 60,
      click: true,
      agreementName: "",
      isAgree: false,
      isHotTip: false,
      platAgreementName: ''
    };
  },
  methods: {
    getVersionCode() {
      var that = this;
      var regM = /^1[345789]{1}\d{9}$/;
      if (that.click) {
        that.click = false;
        if (that.phone && regM.test(that.phone)) {
          that.versionCodeAjax(that.phone);
        } else {
          if (!that.phone) {
            utils.errorToast("请输入手机号");
          } else {
            utils.errorToast("手机号不正确");
          }
          that.click = true;
        }
      }
    },
    versionCodeAjax(phone) {
      var that = this;
      var time = that.timer;
      utils.postAjax(utils.hostUrl + "/account/account/send/verify_code",{ mobilePhone: phone },{
          success: function(res) {
            if (res.data.code === 200) {
              that.isVersion = false;
              var timer = setInterval(() => {
                if (time > 0) {
                  time--;
                  that.timer = time;
                }
                if (time <= 0) {
                  clearInterval(timer);
                  that.timer = 60;
                  that.isVersion = true;
                }
              }, 1000);
            }
          },
          complete: function() {
            that.click = true;
          }
        }
      );
    },
    registerUser() {
      //注册用户
      var that = this;
      var regM = /^1[345789]{1}\d{9}$/
      if (that.phone && that.versionCode && that.userName && that.password && that.surePassword && that.isAgree) {
        if (that.password === that.surePassword) {
          if(regM.test(that.phone)) {
            that.isHotTip = true;
          }else{
            utils.errorToast('请检查手机号');
          }
          
        } else {
          utils.errorToast("两次密码不一致");
        }
      } else {
        if (!that.phone) {
          return utils.errorToast("手机号不能为空");
        }
        if (!that.versionCode) {
          return utils.errorToast("验证码不能为空");
        }
        if (!that.userName) {
          return utils.errorToast("用户名不能为空");
        }
        if (!that.password) {
          return utils.errorToast("密码不能为空");
        }
        if (!that.surePassword) {
          return utils.errorToast("密码不能为空");
        }
        if (!that.isAgree) {
          return utils.errorToast("请同意协议");
        }
      }
    },
    validateLoginAccount(loginAccount) {
      //检查注册账号是否存在
      var that = this;
      var click = that.click;
      utils.postAjax(utils.hostUrl + `/account/account/${loginAccount}/validate`, { loginAccount: loginAccount }, {
          success: function(res) {
            if (res.data.code === 200) {
              if (click) {
                that.click = false;
                var params = {
                  loginAccount: that.phone,
                  verifyCode: that.versionCode,
                  password: that.password,
                  fullName: that.userName
                };
                wx.login({
                  success: function(res) {
                    params.code = res.code;
                    wx.getUserInfo({
                      success: function(res) {
                        params.encryptedData = res.encryptedData;
                        params.iv = res.iv;
                        //注册小程序帐号
                        that.reg(params.code, params);
                      }
                    });
                  },
                  complete: function() {
                    that.click = true;
                  }
                });
              }
            } else {
              that.click = true;
              utils.errorToast("该账号已存在");
            }
          }
        }
      );
    },
    reg: function(code, params) {
      var that = this;
      var cookie = wx.getStorageSync("cookies");
      wx.request({url: utils.hostUrl + `/account/account/add_wechat/rltx/${code}`, header: {"Content-Type": "application/x-www-form-urlencoded", Cookie: "JSESSIONID=" + cookie},
        data: params,
        method: "POST",
        success: function(res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            wx.showModal({
              title: "提示",
              content: "注册成功",
              showCancel: false,
              success: function(res) {
                //登录
                utils.logins(that);
              }
            });
          } else if (res.data.code === 500 && res.data.content != void 0) {
            utils.errorToast(res.data.content);
          }
        },
        fail: function(res) {
          utils.errorToast("请求失败!");
        },
        complete(res) {
          setTimeout(function() {
            that.click = true;
            that.isHotTip = false;
          }, 400);
        }
      });
    },
    bindAgreementDetail() {
      var url = wx.getStorageSync("webViewParams")[
        "other.statement.registrationUrl"
      ];
      wx.navigateTo({
        url: `/pages/agreement/main?url=${url}`
      });
    },
    bindPlatfomRegiest() {
      var url = wx.getStorageSync("webViewParams")[
        "other.statement.tradeRulesUrl"
      ];
      wx.navigateTo({
        url: `/pages/agreement/main?url=${url}`
      });
    },
    agreechange() {
      this.isAgree = !this.isAgree;
    },
    bindDisAgreement() {
      this.isHotTip = false;
    },
     bindAgreement() {
       var that = this;
      that.validateLoginAccount(that.phone);
     }
  },
  onShow() {
    var that = this;
    var urlObj = wx.getStorageSync("webViewParams");
    that.agreementName = urlObj["other.statement.registrationName"];
    that.platAgreementName = urlObj['other.statement.tradeRulesName'];
  },
  created() {}
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  font-size: 34rpx;
  padding-top: 30rpx;
}
.register-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90rpx;
  border-bottom: 1px solid #ccc;
  padding-left: 20rpx;
  background-color: #fff;
}
.register-list .title {
  width: 150rpx;
}
.register-list input {
  flex: 1;
}
.register-list .getCode {
  font-size: 28rpx;
  height: 90rpx;
  width: 200rpx;
  text-align: center;
  border-left: 1px solid #ccc;
  line-height: 90rpx;
  background-color: #eee;
  color: #666;
}
.register-list .getCode:active {
  background-color: #eee;
  color: #999;
}
.setMargin {
  margin-top: 30rpx;
}
.agreement-con {
  display: flex;
  justify-content: flex-start;
  height: 80rpx;
  align-items: center;
  padding-left: 20rpx;
}

.agreement {
  color: #f46d00;
}

.register {
  width: 80vw;
  height: 80rpx;
  background-color: #f46d00;
  text-align: center;
  line-height: 80rpx;
  font-size: 34rpx;
  margin: 0 auto;
  color: #fff;
  border-radius: 10rpx;
  margin-top: 50rpx;
}
.register:active {
  background-color: #f48d00;
  font-size: 37rpx;
}

/*协议弹窗*/
.hot-tips{
  position: fixed;
  top: 2vh;
  width: 650rpx;
  height: 94vh;
  left: 30rpx;
  background-color: #fff;
  overflow-y: auto;
  z-index: 5;
  padding: 20rpx;
}
.hot-title{
  font-size: 36rpx;
  color: #454545;
  margin-bottom: 20rpx;
}
.hot-tip-content{
  font-size: 30rpx;
  color: #454545;
  line-height: 40rpx;
  text-indent: 20rpx;
}
.regiest-agreement{
  margin-top: 20rpx;
  font-size: 34rpx;
  line-height: 50rpx;
}
.operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40rpx;
}
.operation-button{
  padding: 0 20rpx;
  border: 1px solid #ccc;
  height: 80rpx;
  line-height: 80rpx;
  min-width: 200rpx;
  text-align: center;
  
}
</style>
