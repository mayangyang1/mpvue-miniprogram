<template>
  <div class="container pdt20">
    <div class="common-list pdl20">
      <div class="common-item flex-fs pdr20">
        <div class="title">姓名</div>
        <div class="edit-item flex-sb">
          <input  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">性别</div>
        <div class="edit-item flex-sb">
          <input type="text">
          <img class="arrow" src="/static/images/arrows.png" alt="">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">身份证号</div>
        <div class="edit-item flex-sb">
          <input  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">驾驶证档案编号</div>
        <div class="edit-item flex-sb">
          <input  type="text">
        </div>
      </div>
      <div class="common-item flex-fs pdr20">
        <div class="title">从业资格证号</div>
        <div class="edit-item flex-sb">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="upload-title flex-fs">身份证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">身份证正面</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">身份证反面</div>
      </div>
    </div>
    <div class="upload-title flex-fs">驾驶证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">驾驶证第一联照片</div>
      </div>
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">驾驶证第二联照片</div>
      </div>
    </div>
    <div class="upload-title flex-fs">从业资格证</div>
    <div class="upload-list pd20 flex-fs">
      <div class="upload-item">
        <img class="close" src="/static/images/delete.png" alt="">
        <img class="defaultImg mgb20" src="/static/images/pic.png" alt="">
        <div class="title">从业资格证照片</div>
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
</style>
