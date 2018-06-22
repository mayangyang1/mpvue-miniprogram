<template>
  <div class="container pdt20">
    <div class="common-list pdl20">
      <div class="common-item flex-fs pdr20">
        <div class="title">车牌号</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="turckObjs.truckLicenseNo" type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">车型</div>
        <div class="edit-item flex-sb">
          <picker @change="bindTurckType" :value="index" :range="cartypes[1]">
            <div class="picker">
            {{truckModelName? truckModelName: '请选择'}}
            </div>
          </picker>
          <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">车长</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="turckObjs.truckLength"  type="text">
          <div class="unit">米</div>
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">载重</div>
        <div class="edit-item flex-sb">
          <input v-model="turckObjs.regTonnage"  type="text">
          <div class="unit">吨</div>
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">动力类型</div>
        <div class="edit-item flex-sb">
          <picker @change="bindPowerTypeChange" :value="index" :range="powers[1]">
            <div class="picker">
            {{powerTypeText? powerTypeText: '请选择'}}
            </div>
          </picker>
           <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">牌照类型</div>
        <div class="edit-item flex-sb">
          <picker @change="bindTruckLicenseTypeChange" :value="index" :range="cardtypes[1]">
            <div class="picker">
            {{truckLicenseName? truckLicenseName: '请选择'}}
            </div>
          </picker>
           <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">道路运输证号</div>
        <div class="edit-item flex-sb">
          <input v-model.lazy="turckObjs.transportLicenseNo" type="text">
        </div>
      </div>
    </div>
    <div class="upload-title flex-fs">行驶证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" @click="bindCloseImg('driveringOne')" v-if="attachments['driveringOne'].status == 'show'" alt="">
        <img class="defaultImg mgb20" @click="bindSelectImg('driveringOne')" :src="attachments['driveringOne'].value" alt="">
        <div class="title">行驶证第一联</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  @click="bindCloseImg('driveringTwo')"  v-if="attachments['driveringTwo'].status == 'show'" alt="">
        <img class="defaultImg mgb20" @click="bindSelectImg('driveringTwo')" :src="attachments.driveringTwo.value" alt="">
        <div class="title">行驶证第二联</div>
      </div>
    </div>
    <div class="upload-title flex-fs">道路运输证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png"  @click="bindCloseImg('transportLicenseRecourseCode')"  v-if="attachments['transportLicenseRecourseCode'].status == 'show'" alt="">
        <img class="defaultImg mgb20"  @click="bindSelectImg('transportLicenseRecourseCode')" :src="attachments.transportLicenseRecourseCode.value" alt="">
        <div class="title">道路运输证</div>
      </div>
    </div>
    <div class="warp">
      <div class="common-btn main-bg-color row" @click="bindCommitSave">确认保存</div>
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
      truckModelName:'',
      truckModelCode: '',
      truckLicenseName: '',
      turckObjs: {},
      powerTypeText: '',
      cartypes: utils.cartypes,
      cardtypes: [
          [
            { id: '01', type: "大型汽车号牌" },
            { id: '02', type: "小型汽车号牌" },
            { id: '99', type: "其他号牌" },
          ], [
            '大型汽车号牌',
            '小型汽车号牌',
            '其他号牌',
          ],
        ],
      powers: [
        [
          { type: 'gas', name: '气车' },
          { type: 'oil', name: '油车' }
        ], [
          '气车',
          '油车'
        ]
      ],
      click: true,
      imgDefault: '/static/images/pic.png',
      attachList:['driveringOne', 'driveringTwo', 'transportLicenseRecourseCode'],
      attachments: {
        'driveringOne': { name: '行驶证第一联', value: '/static/images/pic.png', status: 'hidden', resourceCode: '' },
        'driveringTwo': { name: '行驶证第二联', value: '/static/images/pic.png', status: 'hidden', resourceCode: '' },
        'transportLicenseRecourseCode': { name: '运输证', value: '/static/images/pic.png', status: 'hidden', resourceCode: '' },
      }
    };
  },
  methods: {
    getTruckMessage() { //获取车辆信息
      var that = this;
      utils.getAjax(utils.hostUrl + '/driver-api/driver-api/truck/list?size=1', {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            var truck = res.data.content.length ? res.data.content[0] : {};
            // 获取运输证和行驶证code -- start
            var truckObj = {};
            var transportObj = {};
            var truckAttachments = [];
            truckObj.attachmentName = '行驶证';
            truckObj.drivingLicenseRecourseCode = truck.drivingLicenseRecourseCode || '';
            transportObj.attachmentName = '运输证'
            transportObj.transportLicenseRecourseCode = truck.transportLicenseRecourseCode || '';
            truckAttachments.push(truckObj);
            truckAttachments.push(transportObj);
            // 获取附件图片url
            that.getAttachmentImages(truckAttachments);
            // 获取运输证和行驶证code -- end
            if (truck.powerType) {
              for (var i in that.powers[0]) {
                if (truck.powerType == that.powers[0][i].type) {
                  that.powerTypeText = that.powers[0][i].name;
                  that.powerType = truck.powerType;
                  break;
                }
              }
            }
            //车型名称
            that.truckModelName = utils.config.truckModel[truck.truckModelCode];
            that.truckModelCode = truck.truckModelCode;
            //牌照类型
            if (truck.truckLicenseType) {
              for (var i in that.cardtypes[0]) {
                if (truck.truckLicenseType == that.cardtypes[0][i].id) {
                  that.truckLicenseName = that.cardtypes[0][i].type;
                  that.truckLicenseType = truck.truckLicenseType;
                  break;
                }
              }
            }
           that.turckObjs = res.data.content[0] || {};
          }
        }
      });
    },
    getAttachmentImages(truckAttachments) { //获取附件图片
      var that = this;
      var newArrList = [];
      truckAttachments.forEach((_value, _index)=>{
        if (_value.attachmentName == '行驶证') {
          var drivingLicenseRecourseCode = _value.drivingLicenseRecourseCode.split(':');
          var driveringOne = {};
          driveringOne.attachmentName = '行驶证第一联';
          driveringOne.attachmentResourceCode = drivingLicenseRecourseCode[0] || '';
          newArrList.push(driveringOne);
          var driveringTwo = {};
          driveringTwo.attachmentName = '行驶证第二联';
          driveringTwo.attachmentResourceCode = drivingLicenseRecourseCode[1] || '';
          newArrList.push(driveringTwo);
        }
        if (_value.attachmentName == '运输证') {
          var transportCode = _value.transportLicenseRecourseCode.split(':');
          var transportLicenseRecourseCode = {};
          transportLicenseRecourseCode.attachmentName = '运输证';
          transportLicenseRecourseCode.attachmentResourceCode = transportCode[0] || '';
          newArrList.push(transportLicenseRecourseCode);
        }

      })
      that.initAttachments(newArrList);
      console.log('newArrList');
      console.log(newArrList);
    },
    initAttachments(newArrList) { //根据resourceCode 获取附件图片的url
      var that = this;
      newArrList.forEach((_value, _index)=>{
        if(_value.attachmentResourceCode) {
          utils.getAjax(utils.hostUrl + `/truck/fw/image/${_value['attachmentResourceCode']}/get`, {
            success: function (res) {
              var thumbnailList = res.data.content.thumbnailList;
              if (thumbnailList && thumbnailList.length) {
                switch (_value.attachmentName) {
                  case '行驶证第一联':
                    that.attachments.driveringOne.value = thumbnailList[0]['url'];
                    that.attachments.driveringOne.status = 'show';
                    that.attachments.driveringOne.resourceCode = _value.attachmentResourceCode;
                    break;
                
                  case '行驶证第二联':
                    that.attachments.driveringTwo.value = thumbnailList[0]['url'];
                    that.attachments.driveringTwo.status = 'show';
                    that.attachments.driveringTwo.resourceCode = _value.attachmentResourceCode;
                    break;
                  
                  case '运输证':
                    that.attachments.transportLicenseRecourseCode.value = thumbnailList[0]['url'];
                    that.attachments.transportLicenseRecourseCode.status = 'show';
                    that.attachments.transportLicenseRecourseCode.resourceCode = _value.attachmentResourceCode;
                    break;
                
                  default:
                    break;
                }
              }
            },
          });
        }else if(!_value.attachmentResourceCode) {
          switch (_value.attachmentName) {
            case '行驶证第一联':
              that.attachments.driveringOne.value = that.imgDefault;
              that.attachments.driveringOne.status = 'hiden';
              that.attachments.driveringOne.resourceCode = '';
              break;
          
            case '行驶证第二联':
              that.attachments.driveringTwo.value = that.imgDefault;
              that.attachments.driveringTwo.status = 'hiden';
              that.attachments.driveringTwo.resourceCode = '';
              break;
            
            case '运输证':
              that.attachments.transportLicenseRecourseCode.value = that.imgDefault;
              that.attachments.transportLicenseRecourseCode.status = 'hiden';
              that.attachments.transportLicenseRecourseCode.resourceCode = '';
              break;
          
            default:
              break;
          }
        }
      })
    },
    bindTurckType(e) { //切换车型
      var that = this;
      var _index = e.target.value[0];
      that.truckModelName = that.cartypes[1][_index];
      that.truckModelCode = that.cartypes[0][_index].id;
    },
    bindPowerTypeChange(e) { //切换动力类型
      var that = this;
      var _index = e.target.value[0];
      that.powerTypeText = that.powers[1][_index];
      that.powerType = that.powers[0][_index].type;
    },
    bindTruckLicenseTypeChange(e) { //切换牌照类型
      var that = this;
      var _index = e.target.value[0];
      that.truckLicenseName = that.cardtypes[1][_index];
      that.truckLicenseType = that.cardtypes[0][_index].id;
    },
    bindCloseImg(_type) { //删除附件照片
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确认删除图片?',
        success:function(res) {
          if(res.confirm) {
            switch (_type) {
              case 'driveringOne':
                that.attachments.driveringOne.value = that.imgDefault;
                that.attachments.driveringOne.status = "hiden";
                that.attachments.driveringOne.resourceCode ='';
                break;

              case 'driveringTwo':
                that.attachments.driveringTwo.value = that.imgDefault;;
                that.attachments.driveringTwo.status = "hiden";
                that.attachments.driveringTwo.resourceCode = '';
                break;

              case 'transportLicenseRecourseCode':
                that.attachments.transportLicenseRecourseCode.value = that.imgDefault;;
                that.attachments.transportLicenseRecourseCode.status = "hiden";
                that.attachments.transportLicenseRecourseCode.resourceCode ='';
                break;  

              default:
                break;
            }
          }
        }
      })
    },
    bindSelectImg(_type) { //上传附件图片
      var that = this;
      var cookie = wx.getStorageSync('cookies');
      if (that.attachments[_type].value.substr(0, 1) == '/') { //为默认图片时候
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var tempFilePath = res.tempFilePaths[0];
            utils.loading(true, "图片上传中");
            wx.uploadFile({
              url: utils.hostUrl + `/truck/fw/image/update`,
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
      } else {
        wx.previewImage({
          current: that.attachments[_type].value,
          urls: [that.attachments[_type].value],
        });
      }
    },
    bindCommitSave() { //保存车辆信息
      var params = {};
      var that = this;
      if (that.turckObjs.truckLicenseNo == '') {
        return utils.errorToast('请输入车牌号');
      }
      var truckReg = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/; //非零开头最多带两位小数
      params.truckLicenseNo = that.turckObjs.truckLicenseNo || '';
      params.truckModelName = that.truckModelName;
      params.truckModelCode = that.truckModelCode;
      if (that.turckObjs.regTonnage != '' && truckReg.test(that.turckObjs.regTonnage)) {
        params.regTonnage = that.turckObjs.regTonnage || '';
      } else {
        if (that.turckObjs.regTonnage != ''){
          return utils.errorToast('载重有误');
        }
        
      }
      params.regTonnageUnitCode = 'ton';
      params.truckLicenseType = that.truckLicenseType;
      params.transportLicenseNo = that.turckObjs.transportLicenseNo || '';
      if (that.turckObjs.truckLength != '' && truckReg.test(that.turckObjs.truckLength)){
        params.truckLength = that.turckObjs.truckLength;
      }else{
        if (that.turckObjs.truckLength != ''){
          return utils.errorToast('车长有误');
        }
        
      }
      params.truckLengthUnitCode = 'meter';
      params.powerType = that.powerType;
      params.drivingLicenseRecourseCode = [];
      params.drivingLicenseRecourseCode.push(that.attachments.driveringOne.resourceCode);

      params.drivingLicenseRecourseCode.push(that.attachments.driveringTwo.resourceCode);
      if (params.drivingLicenseRecourseCode[0] != '' || params.drivingLicenseRecourseCode[1] != '') {
        params.drivingLicenseRecourseCode = params.drivingLicenseRecourseCode.join(':');
      }else{
        params.drivingLicenseRecourseCode = ':';
      }
      

      params.transportLicenseRecourseCode = [];
      params.transportLicenseRecourseCode.push(that.attachments.transportLicenseRecourseCode.resourceCode);
      if (params.transportLicenseRecourseCode[0] != '') {
        params.transportLicenseRecourseCode = params.transportLicenseRecourseCode.join(':');
      }else{
        params.transportLicenseRecourseCode = ':';
      }
      
      if (that.turckObjs.truckCode == '') {
        var apiUrl = utils.hostUrl + '/driver-api/driver-api/truck/add';//添加
      } else {
        params.truckCode = that.turckObjs.truckCode;
        var apiUrl = utils.hostUrl + '/driver-api/driver-api/truck/edit';//更新
      }
      utils.loading(true);
      that.truckParams = JSON.parse(that.$root.$mp.query.truckString)
      params = Object.assign(that.truckParams, params);
      utils.postAjax(apiUrl, params, {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            utils.loading(false, '保存成功', 1);
          }
        }
      });
    },
    bindVerify() { //保存并认证车辆信息
      var params = {};
      var that = this;
      var truckReg = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/; //非零开头最多带两位小数
      if (that.turckObjs.truckLicenseNo == '') {
        return utils.errorToast('请输入车牌号');
      }
      params.truckLicenseNo = that.turckObjs.truckLicenseNo;
      if (that.turckObjs.truckModelName == '') {
        return utils.errorToast('请选择车型');
      }
      params.truckModelName = that.truckModelName;
      params.truckModelCode = that.truckModelCode;

      if (that.truckLicenseType == '') {
        return utils.errorToast('请选择牌照类型');
      }
      if (that.turckObjs.regTonnage == '') {
        return utils.errorToast('请输入载重');
      }
      if (that.turckObjs.transportLicenseNo == '') {
        return utils.errorToast('请输入道路运输证号');
      }
      if (truckReg.test(that.turckObjs.regTonnage)){
        params.regTonnage = that.turckObjs.regTonnage;
      }else{
        return utils.errorToast('载重有误');
      }
    
      params.regTonnageUnitCode = 'ton';
      params.truckLicenseType = that.truckLicenseType;
      params.transportLicenseNo = that.turckObjs.transportLicenseNo;

      if (that.turckObjs.truckLength == '') {
        return utils.errorToast('请输入车长');
      }
      if (truckReg.test(that.turckObjs.truckLength)){
        params.truckLength = that.turckObjs.truckLength;
      }else{
        return utils.errorToast('车长有误');
      }
    
      params.truckLengthUnitCode = 'meter';
      if (that.powerType == '') {
        return utils.errorToast('请选择动力类型');
      }
      params.powerType = that.powerType;
      params.drivingLicenseRecourseCode = [];
      if (that.attachments.driveringOne.resourceCode == '') {
        return utils.errorToast('信息不完整');
      } else {
        params.drivingLicenseRecourseCode.push(that.attachments.driveringOne.resourceCode);
      }
      if (that.attachments.driveringTwo.resourceCode == '') {
        return utils.errorToast('信息不完整');
      } else {
        params.drivingLicenseRecourseCode.push(that.attachments.driveringTwo.resourceCode);
      }
      if (params.drivingLicenseRecourseCode[0] != '' || params.drivingLicenseRecourseCode[1] != ''){
        params.drivingLicenseRecourseCode = params.drivingLicenseRecourseCode.join(':');
      }else{
        params.drivingLicenseRecourseCode = ':';
      }
    

      params.transportLicenseRecourseCode = [];
      if (that.attachments.transportLicenseRecourseCode.resourceCode == '') {
        return utils.errorToast('信息不完整');
      } else {
        params.transportLicenseRecourseCode.push(that.attachments.transportLicenseRecourseCode.resourceCode);
      }
      if (params.transportLicenseRecourseCode[0] != ''){
        params.transportLicenseRecourseCode = params.transportLicenseRecourseCode.join(':');
      }else{
        params.transportLicenseRecourseCode = ':';
      }
      
      if (that.turckObjs.truckCode == '') {
        var apiUrl = utils.hostUrl + '/driver-api/driver-api/truck/add';//添加
      } else {
        params.truckCode = that.turckObjs.truckCode;
        var apiUrl = utils.hostUrl + '/driver-api/driver-api/truck/edit';//更新
      }

      utils.loading(true);
      that.truckParams = JSON.parse(that.$root.$mp.query.truckString);
      params = Object.assign(that.truckParams, params);
      utils.postAjax(apiUrl, params, {
        success: function (res) {
          if (res.data.code === 200 && res.data.content != void 0) {
            that.code = res.data.content.code;
            utils.loading(false, '认证申请成功', 1);
            var apiUrl = '';
            apiUrl = utils.hostUrl + '/driver-api/truck/' + that.code + '/verify';//认证
            utils.loading(true);
            utils.postAjax(apiUrl, params, {
              success: function (res) {
                if (res.data.code === 200 && res.data.content != void 0) {
                 utils.loading(false, '认证提交成功', 1);
                }
              }
            });
          }
        }
      });
    }
  },
  onLoad() {
   this.getTruckMessage();
  },
};
</script>

<style scoped>
@import '../../../static/businessCardDetail.css';
.common-item:nth-child(5) {
  border-bottom:1px solid #d8d8d8;
}
.common-item:nth-child(7) {
  border-bottom: none;
}
.edit-item .unit{
  font-size: 34rpx;
  color: #666;
}
picker {
  flex: 1;
}
.picker{
  height: 60rpx;
}
</style>
