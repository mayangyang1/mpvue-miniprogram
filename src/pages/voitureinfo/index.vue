<template>
  <div class="container pdt20">
    <div class="common-list pdl20">
      <div class="common-item flex-fs pdr20">
        <div class="title">车牌号</div>
        <div class="edit-item flex-sb">
          <input  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">车型</div>
        <div class="edit-item flex-sb">
          <picker @change="bindTurckType" :value="index" :range="array">
            <div class="picker">
            {{array[index]}}
            </div>
          </picker>
          <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">车长</div>
        <div class="edit-item flex-sb">
          <input  type="text">
          <div class="unit">米</div>
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">载重</div>
        <div class="edit-item flex-sb">
          <input  type="text">
          <div class="unit">吨</div>
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">动力类型</div>
        <div class="edit-item flex-sb">
          <input type="text">
           <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">牌照类型</div>
        <div class="edit-item flex-sb">
          <input type="text">
           <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">道路运输证号</div>
        <div class="edit-item flex-sb">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="upload-title flex-fs">行驶证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">行驶证第一联</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">行驶证第二联</div>
      </div>
    </div>
    <div class="upload-title flex-fs">道路运输证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">道路运输证</div>
      </div>
    </div>
    <div class="warp">
      <div class="common-btn main-bg-color row">确认保存</div>
      <div class="common-btn main-bg-color row">提交认证</div>
    </div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    
  },
  onShow() {
   
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
picker{
  flex: 1;
}
</style>
