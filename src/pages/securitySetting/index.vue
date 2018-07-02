<template>
  <div class="container pdb20">
    <div class="security-list">
      <div class="security-item flex-sb pdlr20 bdb" @click="changePassword(0)">
        <div class="title">设置交易密码</div>
        <img mode="widthFix" src="/static/images/arrows.png" alt="">
      </div>
      <div class="security-item flex-sb pdlr20 bdb" @click="changePassword(1)">
        <div  class="title">修改交易密码</div>
        <img mode="widthFix" src="/static/images/arrows.png" alt="">
      </div>
      <div class="security-item flex-sb pdlr20 bdb" @click="changePassword(2)">
        <div class="title">忘记交易密码</div>
        <img mode="widthFix" src="/static/images/arrows.png" alt="">
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
      
    };
  },
  methods: {
    changePassword(type) {
      wx.navigateTo({
        url: `../changePassword/main?type=${type}`
      })
    }
  },

};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-top: 40rpx;
}
.security-list{
  background-color: #fff;
}
.security-item{
  height: 90rpx;
}
.security-item .title{
  font-size: 32rpx;
}
.security-item img{
  width: 18rpx;
  height: 12rpx;
}

</style>
