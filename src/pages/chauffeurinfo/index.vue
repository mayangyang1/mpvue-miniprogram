<template>
  <div class="container pdt20">
    <div class="common-list pdl20">
      <div class="common-item flex-fs pdr20">
        <div class="title">姓名</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="personObj.fullName"  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">性别</div>
        <div class="edit-item flex-sb">
          <picker @change="bindGenderType" :value="gender" :range="genders">
            <div class="picker">
            {{genders[gender]}}
            </div>
          </picker>
          <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">身份证号</div>
        <div class="edit-item flex-sb">
          <input  v-model.lazy="personObj.identityNumber" type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">驾驶证档案编号</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="personObj.driverLicenseNo"  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">从业资格证号</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="personObj.qualificationCertificateNumber" type="text">
        </div>
      </div>
    </div>
    <div class="upload-title flex-fs">身份证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" v-if="attachments.cardFront.status == 'show'" alt="" @click="bindClose('cardFront')">
        <img class="defaultImg mgb20" :src="attachments.cardFront.value" alt=""  @click="bindSelectImg('cardFront')">
        <div class="title">身份证正面</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  v-if="attachments.cardAfter.status == 'show'" alt="" @click="bindClose('cardAfter')">
        <img class="defaultImg mgb20" :src="attachments.cardAfter.value" alt=""  @click="bindSelectImg('cardAfter')">
        <div class="title">身份证反面</div>
      </div>
    </div>
    <div class="upload-title flex-fs">驾驶证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  v-if="attachments.driverOne.status == 'show'" alt="" @click="bindClose('driverOne')">
        <img class="defaultImg mgb20" :src="attachments.driverOne.value" alt=""  @click="bindSelectImg('driverOne')">
        <div class="title">驾驶证第一联照片</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  v-if="attachments.driverTwo.status == 'show'" alt="" @click="bindClose('driverTwo')">
        <img class="defaultImg mgb20" :src="attachments.driverTwo.value" alt="" @click="bindSelectImg('driverTwo')">
        <div class="title">驾驶证第二联照片</div>
      </div>
    </div>
    <div class="upload-title flex-fs">从业资格证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  v-if="attachments.qualificationCertificateResourceCode.status == 'show'" alt="" @click="bindClose('qualificationCertificateResourceCode')">
        <img class="defaultImg mgb20" :src="attachments.qualificationCertificateResourceCode.value" @click="bindSelectImg('qualificationCertificateResourceCode')" alt="">
        <div class="title">从业资格证照片</div>
      </div>
    </div>
    <div class="warp">
      <div class="common-btn main-bg-color row" @click="bindSaveCommit">确认保存</div>
      <div class="common-btn main-bg-color row" @click="bindVerify">提交认证</div>
    </div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      code: "",
      personParams: {},
      personObj: {},
      imgDefault: "/static/images/pic.png",
      closeImg: "/static/images/delete.png",
      genders: ["请选择", "男", "女"],
      gender: 1,
      // attachList: utils.attachList,
      attachments: utils.attachments
    };
  },
  methods: {
    getPersonInfo() {
      //获取司机个人信息
      var that = this;
      utils.getAjax(utils.hostUrl + `/driver-api/driver-api/person/self/info`, {
        success: function(res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            var data = res.data.content;
            // 获取图片-- start
            var identityObj = {};
            identityObj.attachmentName = "身份证";
            identityObj.attachmentResourceCode =
              data.identityResourceCode || "";
            var driverLicenseObj = {};
            driverLicenseObj.attachmentName = "驾驶证";
            driverLicenseObj.attachmentResourceCode =
              data.driverLicenseResourceCode || "";
            var qualificationObj = {};
            qualificationObj.attachmentName = "从业资格证";
            qualificationObj.attachmentResourceCode =
              data.qualificationCertificateResourceCode || "";
            var personAttachment = [];
            personAttachment.push(
              identityObj,
              driverLicenseObj,
              qualificationObj
            );
            that.getAttachment(personAttachment);
            // 获取图片-- end
            if (data.gender) that.gender = data.gender == "female" ? 2 : 1;
            that.personObj = data;
          }
        }
      });
    },
    // 获取附加图片 -- start
    getAttachment(personAttachment) {
      //获取图片附加
      var that = this;
      var newArrList = [];
      personAttachment.forEach((_value, _index) => {
        if (_value.attachmentName == "身份证") {
          var attachmentResourceCode = _value.attachmentResourceCode.split(":");
          var cardFront = {};
          cardFront.attachmentName = "身份证正面";
          cardFront.attachmentResourceCode = attachmentResourceCode[0] || "";
          newArrList.push(cardFront);
          var cardAfter = {};
          cardAfter.attachmentName = "身份证反面";
          cardAfter.attachmentResourceCode = attachmentResourceCode[1] || "";
          newArrList.push(cardAfter);
        }
        if (_value.attachmentName == "驾驶证") {
          var attachmentResourceCode = _value.attachmentResourceCode.split(":");
          var driverOne = {};
          driverOne.attachmentName = "驾驶证第一联照片";
          driverOne.attachmentResourceCode = attachmentResourceCode[0] || "";
          newArrList.push(driverOne);
          var driverTwo = {};
          driverTwo.attachmentName = "驾驶证第二联照片";
          driverTwo.attachmentResourceCode = attachmentResourceCode[1] || "";
          newArrList.push(driverTwo);
        }
        if (_value.attachmentName == "从业资格证") {
          var attachmentResourceCode = _value.attachmentResourceCode.split(":");
          var qualificationCertificateResourceCode = {};
          qualificationCertificateResourceCode.attachmentName =
            "从业资格证照片";
          qualificationCertificateResourceCode.attachmentResourceCode =
            attachmentResourceCode[0] || "";
          newArrList.push(qualificationCertificateResourceCode);
        }
      });
      console.log(newArrList);
      that.getAttachmentImages(newArrList);
    },
    getAttachmentImages(arrList) {
      //根据resourceCode获取附加的图片
      var that = this;
      arrList.forEach((_value, _index) => {
        if (_value.attachmentResourceCode) {
          utils.getAjax(utils.hostUrl +`/person/fw/image/${ _value["attachmentResourceCode"]}/get`,{
              success: function(res) {
                if (res.data.code === 200 && res.data.content) {
                  var thumbnailList = res.data.content.thumbnailList;
                  if (thumbnailList && thumbnailList.length) {
                    switch (_value.attachmentName) {
                      case "身份证正面":
                        that.attachments.cardFront.value =
                          thumbnailList[0]["url"];
                        that.attachments.cardFront.status = "show";
                        that.attachments.cardFront.resourceCode =
                          _value.attachmentResourceCode;
                        break;
                      case "身份证反面":
                        that.attachments.cardAfter.value =
                          thumbnailList[0]["url"];
                        that.attachments.cardAfter.status = "show";
                        that.attachments.cardAfter.resourceCode =
                          _value.attachmentResourceCode;
                        break;
                      case "驾驶证第一联照片":
                        that.attachments.driverOne.value =
                          thumbnailList[0]["url"];
                        that.attachments.driverOne.status = "show";
                        that.attachments.driverOne.resourceCode =
                          _value.attachmentResourceCode;
                        break;
                      case "驾驶证第二联照片":
                        that.attachments.driverTwo.value =
                          thumbnailList[0]["url"];
                        that.attachments.driverTwo.status = "show";
                        that.attachments.driverTwo.resourceCode =
                          _value.attachmentResourceCode;
                        break;
                      case "从业资格证照片":
                        that.attachments.qualificationCertificateResourceCode.value =
                          thumbnailList[0]["url"];
                        that.attachments.qualificationCertificateResourceCode.status =
                          "show";
                        that.attachments.qualificationCertificateResourceCode.resourceCode =
                          _value.attachmentResourceCode;
                        break;
                      default:
                        break;
                    }
                  }
                }
              }
            }
          );
        } else if (!_value.attachmentResourceCode) {
          switch (_value.attachmentName) {
            case "身份证正面":
              that.attachments.cardFront.value = that.imgDefault;
              that.attachments.cardFront.status = "hiden";
              that.attachments.cardFront.resourceCode ='';
              break;
            case "身份证反面":
              that.attachments.cardAfter.value = that.imgDefault;;
              that.attachments.cardAfter.status = "hiden";
              that.attachments.cardAfter.resourceCode = '';
              break;
            case "驾驶证第一联照片":
              that.attachments.driverOne.value = that.imgDefault;;
              that.attachments.driverOne.status = "hiden";
              that.attachments.driverOne.resourceCode ='';
              break;
            case "驾驶证第二联照片":
              that.attachments.driverTwo.value = that.imgDefault;;
              that.attachments.driverTwo.status = "hiden";
              that.attachments.driverTwo.resourceCode = '';
              break;
            case "从业资格证照片":
              that.attachments.qualificationCertificateResourceCode.value = that.imgDefault;
              that.attachments.qualificationCertificateResourceCode.status = "hiden";
              that.attachments.qualificationCertificateResourceCode.resourceCode = '';
              break;
            default:
              break;
          }
        }
      });
    },
    // 获取附加图片 -- start
    bindClose(_type){ //删除上传的图片
      var that = this;
      wx.showModal({
        title:'提示',
        content:'确认是否删除',
        success:function(res) {
          if(res.confirm) {
            switch (_type) {
              case 'cardFront':
                that.attachments.cardFront.value = that.imgDefault;
                that.attachments.cardFront.status = "hiden";
                that.attachments.cardFront.resourceCode ='';
                break;

              case 'cardAfter':
                that.attachments.cardAfter.value = that.imgDefault;;
                that.attachments.cardAfter.status = "hiden";
                that.attachments.cardAfter.resourceCode = '';
                break;
              case 'driverOne':
                that.attachments.driverOne.value = that.imgDefault;;
                that.attachments.driverOne.status = "hiden";
                that.attachments.driverOne.resourceCode ='';
                break; 
              
              case 'driverTwo':
                that.attachments.driverTwo.value = that.imgDefault;;
                that.attachments.driverTwo.status = "hiden";
                that.attachments.driverTwo.resourceCode = '';
                break;
              case 'qualificationCertificateResourceCode':
                that.attachments.qualificationCertificateResourceCode.value = that.imgDefault;
                that.attachments.qualificationCertificateResourceCode.status = "hiden";
                that.attachments.qualificationCertificateResourceCode.resourceCode = '';
                break;    
              default:
                break;
            }
          }
        }
      })
      
    },
    bindSelectImg(_type) { //上传图片
      var that = this;
      var cookie = wx.getStorageSync('cookies');
      if (that.attachments[_type].value.substr(0, 1) == '/'){
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var tempFilePath = res.tempFilePaths[0];
            utils.loading(true, "图片上传中");
            wx.uploadFile({
              url: utils.hostUrl +`/person/fw/image/update`,
              header: { 'Cookie': 'JSESSIONID=' + cookie },
              filePath: tempFilePath,
              name: 'file',
              formData: { type: 'driverApiWeb' },
              success: function (res) {
                wx.hideLoading();
                res.data = JSON.parse(res.data);
                if (res.data.code == 200) {
                  var resourceCode = res.data.content.resourceCode;
                  that.attachments[_type].resourceCode = resourceCode;
                  that.attachments[_type].value = tempFilePath;
                  that.attachments[_type].status = 'show';
                } else {
                  console.error("图片上传失败");
                  console.error(res);
                }
              }
            });
          }
        })
      }else{
        wx.previewImage({
          current: this.attachments[_type].value,
          urls: [this.attachments[_type].value],
        });
      }
    },
    bindGenderType(e) { //切换性别
      this.gender = e.target.value[0];
    },
    // 保存与认知司机资料 -- start
    bindSaveCommit() { //保存司机的个人资料
      var that = this;
      var params = {};
      if (that.personObj.fullName == ''){      
        return utils.errorToast('请输入姓名');
      }
      params.fullName = that.personObj.fullName;
      params.gender = (that.gender == 2) ? 'female' : 'male';
      params.identityNumber = that.personObj.identityNumber;
      params.driverLicenseNo = that.personObj.driverLicenseNo;
      params.qualificationCertificateNumber = that.personObj.qualificationCertificateNumber;
      params.code = that.personObj.code;
      var identityResourceCode = [];

      identityResourceCode.push(that.attachments.cardFront.resourceCode);
      identityResourceCode.push(that.attachments.cardAfter.resourceCode);
      if (identityResourceCode[0] != '' || identityResourceCode[1] != '') {
        params.identityResourceCode = identityResourceCode.join(':');
      }else {
       params.identityResourceCode = ':';
      }
    
      var driverLicenseResourceCode = [];

      driverLicenseResourceCode.push(that.attachments.driverOne.resourceCode);
      driverLicenseResourceCode.push(that.attachments.driverTwo.resourceCode);
      if (driverLicenseResourceCode[0] != '' || driverLicenseResourceCode[1] != '') {
        params.driverLicenseResourceCode = driverLicenseResourceCode.join(':');
      }else {
        params.driverLicenseResourceCode = ':'
      }
      
      var qualificationCertificateResourceCode = [];
      qualificationCertificateResourceCode.push(that.attachments.qualificationCertificateResourceCode.resourceCode);
      if (qualificationCertificateResourceCode[0] != '') {
        params.qualificationCertificateResourceCode = qualificationCertificateResourceCode.join(':');
      }else{
         params.qualificationCertificateResourceCode = ':'
      }
      utils.loading(true);
      that.personParams = JSON.parse(that.$root.$mp.query.driverString);
      params = Object.assign(that.personParams, params);
      utils.postAjax(utils.hostUrl +'/driver-api/driver-api/person/self/edit',params,{
        success: function(res){
          if (res.data.code === 200 && res.data.content != void 0) {
            utils.loading(false, '保存成功', 1);
          }
        }
      });
    },
    bindVerify() { // 提交认证司机个人资料
      var that = this;
      var params = {};
      // 参数校验 -- start
      if (that.personObj.fullName == '') {
        return utils.errorToast('请输入姓名');
      }
      if (that.gender == 0) {
        return utils.errorToast('请选择性别');
      }

      if (that.personObj.identityNumber == '') {
        return utils.errorToast('请输入身份证号');
      }

      if (that.personObj.driverLicenseNo == '') {
        return utils.errorToast('驾驶证档案编号');
      }

      if (that.personObj.qualificationCertificateNumber == '') {
        return utils.errorToast('请输入从业资格证号');
      }

      params.fullName = that.personObj.fullName;
      params.gender = (that.gender == 2) ? 'female' : 'male';
      params.identityNumber = that.personObj.identityNumber;
      params.driverLicenseNo = that.personObj.driverLicenseNo;
      params.qualificationCertificateNumber = that.personObj.qualificationCertificateNumber;
      params.code = that.personObj.code;
      params.identityResourceCode = [];
      if (that.attachments.cardFront.resourceCode == '') {
        return utils.errorToast('请添加图片');
      } else {
        params.identityResourceCode.push(that.attachments.cardFront.resourceCode);
      }
      if (that.attachments.cardAfter.resourceCode == '') {
        return utils.errorToast('请添加图片');
      } else {
        params.identityResourceCode.push(that.attachments.cardAfter.resourceCode);
      }
      params.identityResourceCode = params.identityResourceCode.join(':');
      params.driverLicenseResourceCode = [];
      if (that.attachments.driverOne.resourceCode == '') {
        return utils.errorToast('请添加图片');
      } else {
        params.driverLicenseResourceCode.push(that.attachments.driverOne.resourceCode);
      }
      if (that.attachments.driverTwo.resourceCode == '') {
        return utils.errorToast('请添加图片');
      } else {
        params.driverLicenseResourceCode.push(that.attachments.driverTwo.resourceCode);
      }
      params.driverLicenseResourceCode = params.driverLicenseResourceCode.join(':');

      params.qualificationCertificateResourceCode = [];
      if (that.attachments.qualificationCertificateResourceCode.resourceCode == '') {
        return utils.errorToast('请添加图片');
      } else {
        params.qualificationCertificateResourceCode.push(that.attachments.qualificationCertificateResourceCode.resourceCode);
      }
      params.qualificationCertificateResourceCode = params.qualificationCertificateResourceCode.join(':');
      // 参数校验 -- end
      utils.loading(true);
      that.personParams = JSON.parse(that.$root.$mp.query.driverString); 
      params = Object.assign(that.personParams, params);
      utils.postAjax(utils.hostUrl + '/driver-api/driver-api/new/person/self/edit', params, {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            // //提交认证
            // var apiUrl = app.globalData.hostUrl + '/driver-api/person/verify';//认证
            // app.loading(true);
            // app.postAjax(apiUrl, params, {
            //   success: function (res) {
            //     if (res.data.code === 200 && res.data.content != void 0) {
            //       app.loading(false, '认证提交成功，请等待审核！', 1);
            //     }
            //   }
            // });

            utils.loading(false, '认证申请成功', 1);
            utils.loading(false, '认证提交成功', 1);
          }
        }
      });
    }
    // 保存与认知司机资料 -- end
  },
  onLoad() {
    this.getPersonInfo(); //获取个人信息
  }
};
</script>

<style scoped>
@import "../../../static/businessCardDetail.css";
picker {
  flex: 1;
}
.picker {
  
  height: 60rpx;
}
</style>
