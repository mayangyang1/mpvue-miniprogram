<template>
  <div class="container">
    <div class="dirver" @click="bindDeiver">
      <div class="con-title flex-sb">
        <div>司机</div>
        <div>{{driverIsAuthenticated}}</div>
      </div>
      <div class="message-list pdl20">
        <div class="message-item flex-sb pdr20">
          <div class="title">姓名</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{driverObj.fullName? driverObj.fullName : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">性别</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{gender}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">身份证号</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{driverObj.identityNumber? driverObj.identityNumber : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">驾驶证档案编号</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{driverObj.driverLicenseNo? driverObj.driverLicenseNo : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">从业资格证号</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{driverObj.qualificationCertificateNumber? driverObj.qualificationCertificateNumber : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">手机</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{driverObj.phone? driverObj.phone : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20" @click.stop="bindSeeBusinessCard">
          <div class="title">二维码名片</div>
          <div class="msg flex-fs">
            <img class="mgl20 ewm" src="/static/images/ewm.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="dirver" @click="bindVehicle">
      <div class="con-title flex-sb">
        <div>车辆</div>
        <div>{{truckIsAuthenticated}}</div>
      </div>
      <div class="message-list pdl20">
        <div class="message-item flex-sb pdr20">
          <div class="title">车牌号</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{truckObj.truckLicenseNo? truckObj.truckLicenseNo : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">车型</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{truckModelName}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">车长</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{truckObj.truckLength? truckObj.truckLength : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">动力类型</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{powerTypeText}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item flex-sb pdr20">
          <div class="title">牌照类型</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{truckLicenseType}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
        <div class="message-item last flex-sb pdr20">
          <div class="title">道路运输证</div>
          <div class="msg flex-fs">
            <div class="msg-title">{{truckObj.transportLicenseNo? truckObj.transportLicenseNo : ''}}</div>
            <img class="mgl20" src="/static/images/arrows.png" alt="">
          </div>
        </div>
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
      click: true,
      driverString: "",
      certStatus: "", //认证状态
      driverObj:{},
      truckObj: {},
      gender: '',
      powerTypeText: '',
      truckModelName: '',
      truckLicenseType: '',
      driverIsAuthenticated: "未认证",
      truckIsAuthenticated: "未认证",
      truckString: '',
      truckCertStatus: '',
      cardtypes: {
        '01': "大型汽车号牌",
        '02': "小型汽车号牌",
        '99': "其他号牌",
      },
      powers: [
        [
          { type: 'gas', name: '气车' },
          { type: 'oil', name: '油车' }
        ], [
          '气车',
          '油车'
        ]
      ],
    };
  },
  methods: {
    getDriverMessage() {//获取司机信息
      var that = this;
      utils.getAjax(utils.hostUrl + "/driver-api/driver-api/person/self/info", {
        success: function(res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            that.driverString = JSON.stringify(res.data.content);
            var driverObj = res.data.content;
            that.driverObj = driverObj;
            var gender = "未知";
            if (driverObj.gender) {
              gender = driverObj.gender == "male" ? "男" : "女";
            }
            //司机认证状态
            that.certStatus = driverObj.certStatus;
            if (that.certStatus == "authenticating") {
              that.driverIsAuthenticated = "认证中";
            } else if (that.certStatus == "authenticated") {
              that.driverIsAuthenticated = "已认证";
            } else {
              that.driverIsAuthenticated = "未提交认证";
            }
            that.gender = gender;
          }else{
            utils.errorToast(res.data.content);
          }
        }
      })
    },
    getCarMessage() { //获取车辆信息
      var that = this;
      utils.getAjax(utils.hostUrl + "/driver-api/driver-api/truck/list?size=1",{
          success: function(res) {
            if (res.data.code === 200 && res.data.content != void 0) {
              var truck = res.data.content.length ? res.data.content[0] : {};
              that.truckObj = truck;
              that.truckString = JSON.stringify(truck);
              //车辆认证状态
              that.truckCertStatus = truck.certStatus;
              if (that.truckCertStatus == "authenticating") {
                that.truckIsAuthenticated = "认证中";
              } else if (that.truckCertStatus == "authenticated") {
                that.truckIsAuthenticated = "已认证";
              } else {
                that.truckIsAuthenticated = "未提交认证";
              }
              //车型名称
              that.truckModelName = utils.config.truckModel[truck.truckModelCode];
              //牌照类型名称
              that.truckLicenseType = that.cardtypes[truck.truckLicenseType];
              var powerTypeText = "";
              if (truck.powerType) {
                for (var i in that.powers[0]) {
                  if (truck.powerType == that.powers[0][i].type) {
                    powerTypeText = that.powers[0][i].name;
                    break;
                  }
                }
              }
              that.powerTypeText = powerTypeText;
            }else{
              utils.errorToast(res.data.content);
            }
          }
      })
    },
    bindSeeBusinessCard() { //查看二维码名片
      var userCode = wx.getStorageSync('userCode');
      var pic = utils.hostUrl +`/driver-api/driver-api/generate_user_qr_code?code=${userCode}`;
      let img = [];
      img.push(pic);
      wx.previewImage({
        current: pic,
        urls: img
      })
    },
    bindDeiver() { //编辑司机信息
      var that = this;
      if(that.click) {
        if (that.certStatus == 'authenticating' || that.certStatus == 'authenticated'){
          return utils.errorToast('不可修改');
        }
        that.click = false;
        wx.navigateTo({
          url: '../chauffeurinfo/main?driverString=' + that.driverString,
          complete: function() {
            setTimeout(function(){
              that.click = true;
            },400)
          }
        })

      }
    },
    bindVehicle() { //编辑车辆信息
      var that = this;
      if(that.click){  
        if (that.truckCertStatus == 'authenticating' || that.truckCertStatus == 'authenticated') {
          return utils.errorToast('不可修改');
        }
        that.click = false;
        wx.navigateTo({
          url: '../voitureinfo/main?truckString=' + that.truckString,
          complete: function() {
            setTimeout(function(){
             that.click = true;
            },400)
          }
        })
      }
    }
  },
  onShow() {
    var that = this;
    that.getDriverMessage();
    that.getCarMessage();
  }
};
</script>

<style scoped>
.container {
}
.con-title {
  height: 83rpx;
  color: #a9a9a9;
  padding: 0 30rpx;
  background-color: #f2f2f2;
  border-bottom: 1px solid #d6d6d6;
  border-top: 1px solid #d6d6d6;
  font-size: 26rpx;
}
.message-list {
  background-color: #fff;
}
.message-item {
  border-bottom: 1px solid #d6d6d6;
  height: 83rpx;
}
.message-item:nth-child(7) {
  border-bottom: none;
}
.message-item .title {
  font-size: 34rpx;
  color: #000;
}
.msg {
  font-size: 28rpx;
  color: #888;
}
.msg img {
  width: 16rpx;
  height: 26rpx;
}

.msg .ewm {
  width: 50rpx;
  height: 50rpx;
}
.last {
  border-bottom: none;
}
</style>
