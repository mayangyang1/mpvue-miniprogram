<template>
  <div class='container'>
    <div class="deliver-goods">
      <div class="goods-message-list pdlr20 bdb flex-sb">
        <div class="goods-msg-title flex-fs"  @click="bindDataPicker">
          <div>{{msg}}时间</div>
          <input v-model.lazy="nowTime" disabled type="text">
        </div>
        <div class="good-tips"><img src="/static/images/arrows.png"></div>
      </div>
      <div class="goods-message-list pdlr20 bdb flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>{{msg}}重量</div>
          <input v-model.lazy="deliverWeight"  placeholder="请输入重量" type="text">
        </div>
        <div class="good-tips">吨</div>
      </div>
      <div class="goods-message-list pdlr20 bdb  flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>{{msg}}体积</div>
          <input v-model.lazy="deliverVolume" placeholder="请输入体积" type="text">
        </div>
        <div class="good-tips">方</div>
      </div>
      <div class="goods-message-list pdlr20 bdb  flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>{{msg}}数量</div>
          <input v-model.lazy="deliverNumber" placeholder="请输入数量" type="text">
        </div>
        <div class="good-tips">件</div>
      </div>
      <div class="operation-photo pdlr20">
        <div class="title mgt20">上传{{msg}}凭证</div>
        <div class="photo-list flex-fs">
          <div  class="photo-item" v-for="item in [0, 1, 2]" :key="item"> 
            <img class="close" v-if="attachments[item].status == 'show'" src="/static/images/delete.png" @click="deleteImg(item)" alt="">
            <img @click="bindUploadPicture(item)" class="affrim-phote" :src="attachments[item].value"  alt="">
            <div class="mgb20">{{msg}}凭证</div>
          </div>
        </div>
      </div>
    </div>
    <div class="affirm-button pdt20">
      <div class="common-btn row main-bg-color" @click="bindOperation">确认</div>
      <div class="common-btn  row mgl20 cancles" @click="bindCancel">取消</div>
    </div>
    <!-- 日期选择器组件 --start -->
    <block v-if="isChoiceTime">
      <datepickers @selectDate="selectDate" :changeTime='nowTime'></datepickers>
    </block>
    <!-- 日期选择器组件 --end -->    
  </div>
</template>
<script>
import DatePickers from "@/components/datePicker";
import * as utils from "../../utils/index.js";
export default {
  components: {
    datepickers: DatePickers
  },
  data() {
    return {
      msg:'',
      aff: 0, //0为发货 1为收货
      nowTime: "", //收发货时间
      isChoiceTime: false,
      deliverWeight: "", //重量
      deliverVolume: "", //体积
      deliverNumber: "", //数量
      click: true,
      imgDefault: "/static/images/pic.png",
      closeImg: "/static/images/delete.png",
      attachments: [
        { resourceCode: "", value: "/static/images/pic.png", status: "hidden" },
        { resourceCode: "", value: "/static/images/pic.png", status: "hidden" },
        { resourceCode: "", value: "/static/images/pic.png", status: "hidden" }
      ]
    };
  },
  methods: {
    bindDataPicker() {
      this.isChoiceTime = true;
      console.log("0000");
    },
    selectDate(isChoice, _value) {
      this.isChoiceTime = isChoice;
      this.nowTime = _value;
    },
    bindUploadPicture(index) {
      //上传图片
      var that = this;
      if (that.attachments[index].value.substr(0, 1) == "/") {
        //是默认图片时候
        var cookie = wx.getStorageSync("cookies");
        // 上传图片
        wx.chooseImage({
          count: 1, // 默认9
          //sizeType: ['original', 'compressed'],
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: function(res) {
            var tempFilePath = res.tempFilePaths[0];
            utils.loading(true, "图片上传中");
            wx.uploadFile({
              url: utils.hostUrl + `/waybill/fw/image/update`,
              header: { Cookie: "JSESSIONID=" + cookie },
              filePath: tempFilePath,
              name: "file",
              formData: { type: "driverApiWeb" },
              success: function(res) {
                wx.hideLoading();
                res.data = JSON.parse(res.data);
                if (res.data.code == 200) {
                  var resourceCode = res.data.content.resourceCode;
                  that.attachments[index].resourceCode = resourceCode;
                  that.attachments[index].value = tempFilePath;
                  that.attachments[index].status = "show";
                } else {
                  console.error("图片上传失败");
                  console.error(res);
                }
              }
            });
          }
        });
      } else {
        //不是默认图片时点击预览图片
        wx.previewImage({
          current: this.attachments[index].value,
          urls: [this.attachments[index].value]
        });
      }
    },
    deleteImg(index) {
      //删除上传的图片
      var that = this;
      wx.showModal({
        title: "提示",
        content: "确认是否删除？",
        success: function(res) {
          if (res.confirm) {
            that.attachments[index].value = that.imgDefault;
            that.attachments[index].resourceCode = "";
            that.attachments[index].status = "hidden";
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    bindOperation() {
      //确认收发货
      var click = this.click;
      var that = this;
      if (click) {
        that.click = false;
        var resourceCode = [];
        for (var i in that.attachments) {
          var code = that.attachments[i].resourceCode;
          if (code != "") {
            resourceCode.push(code);
          }
        }
        if (!resourceCode.length) {
          utils.errorToast("请先上传图片");
          that.click = true;
          return;
        }
        that.getLocationAddr(resourceCode); //获取地理位置
      }
    },
    getLocationAddr(resourceCode) {
      var that = this;
      wx.getLocation({
        success: function(res) {
          that.latitude = res.latitude; //纬度
          that.longitude = res.longitude; //经度
        },
        complete: function() {
          that.toDeliverOrReceive(resourceCode); //收发货
        }
      });
    },
    toDeliverOrReceive(resourceCode) {
      //收发货
      var that = this;
      var params = {};
      if (that.aff == 0) {
        params.loadingAddrLon = that.longitude; //发货地经度 ；
        params.loadingAddrLat = that.latitude; //发货地纬度；

        params.loadingAttachment = resourceCode.join(":");
        params.loadingTime = that.nowTime; // 发货时间

        if (that.deliverWeight != "") {
          params.loadingGoodsWeight = that.deliverWeight; // 货物重量
        }
        if (that.deliverNumber != "") {
          params.loadingGoodsNum = that.deliverNumber; // 货物数量
        }
        if (that.deliverVolume != "") {
          params.loadingGoodsVolume = that.deliverVolume; // 货物体积
        }
        if (
          !params.loadingGoodsWeight &&
          !params.loadingGoodsNum &&
          !params.loadingGoodsVolume
        ) {
          app.errorToast("信息不全");
          that.click = true;
          return;
        }
        var apiUrl = utils.hostUrl + "/driver-api/driver-api/waybill/loading";
      } else if (that.aff == 1) {
        params.unloadingAddrLon = that.longitude; //收货地经度；
        params.unloadingAddrLat = that.latitude; //收货地纬度；

        params.unloadingAttachment = resourceCode.join(":");
        params.unloadingTime = that.nowTime; // 发货时间

        if (that.deliverWeight != "") {
          params.unloadingGoodsWeight = that.deliverWeight; // 货物重量
        }
        if (that.deliverNumber != "") {
          params.unloadingGoodsNum = that.deliverNumber; // 货物数量
        }
        if (that.deliverVolume != "") {
          params.unloadingGoodsVolume = that.deliverVolume; // 货物体积
        }
        if (
          !params.unloadingGoodsWeight &&
          !params.unloadingGoodsNum &&
          !params.unloadingGoodsVolume
        ) {
          app.errorToast("信息不全");
          that.click = true;
          return;
        }
        var apiUrl = utils.hostUrl + "/driver-api/driver-api/waybill/unloading";
      } else {
        return;
      }
      params.code = that.code;
     that.sureDo(apiUrl, params);
    },
    sureDo(apiUrl, params) {
      var that = this;
      utils.postAjax(apiUrl, params, {
        success: function(res) {
          if (res.data.code === 200) {
            utils.successToast("上传成功");
            wx.navigateBack({
              delta: 1,
              complete: function() {
                setTimeout(function() {
                  that.click = true;
                }, 400);
              }
            });
          } else {
            utils.errorToast("保存失败");
            that.click = true;
          }
        }
      });
    },
    bindCancel() { //取消收发货
      wx.navigateBack({
        delta: 1
      })
    }
  },
  mounted() {
    var that = this; 
    // 获取参数
    var query = that.$root.$mp.query;
    that.code = query.code;
    that.aff = query.aff;
    that.nowTime = utils.formatTime(new Date());
    // 判断收发货
    if(that.aff == 0) {
      wx.setNavigationBarTitle({
        title: '确认发货'
      })
      that.msg = '发货';
    }else if(that.aff == 1) {
      wx.setNavigationBarTitle({
        title: '确认收货'
      })
      that.msg = '收货';
    }
  },
  onUnload() { //清空数据
    var that = this;
    that.deliverWeight = '';
    that.deliverVolume = '';
    that.deliverNumber = '';
    that.attachments = [
      { resourceCode: "", value: "/static/images/pic.png", status: "hidden" },
      { resourceCode: "", value: "/static/images/pic.png", status: "hidden" },
      { resourceCode: "", value: "/static/images/pic.png", status: "hidden" }
    ]
  }
};
</script>

<style scoped>
.container {
  font-size: 30rpx;
}
.goods-message-list {
  height: 80rpx;
}
.goods-msg-title input {
  flex: 1;
  padding-left: 40rpx;
}
.operation-photo .title {
}
.photo-list {
  padding: 30rpx 0;
}
.photo-item {
  position: relative;
  text-align: center;
  margin-right: 25rpx;
}
.photo-item .close {
  width: 50rpx;
  height: 50rpx;
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
}
.photo-item .affrim-phote {
  width: 211rpx;
  height: 211rpx;
  margin-bottom: 25rpx;
}
.good-tips img {
  width: 20rpx;
  height: 32rpx;
}
.affirm-button {
  background-color: #f2f2f2;
  height: 220rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.affirm-button .cancles {
  background-color: #fff;
  color: #454545;
}
.common-btn {
  margin-bottom: 20rpx;
  width: 96vw;
}
</style>


