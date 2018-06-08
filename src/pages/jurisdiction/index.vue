<template>
    <!-- 获取用户信息权限弹窗 ---start -->
  <div class='authorization'>
    <div class='content'>
      <div>欢迎使用司机端小程序</div>
    </div>
    <div class='operations'>
      <div class='mes-allow'>
        <button open-type='getUserInfo' @getuserinfo="bindGetUserInfo">立即体验</button>
      </div>
    </div>
  </div>
  <!-- 获取用户信息权限弹窗 ---end -->
</template>
<script>
export default {
  methods: {
    bindGetUserInfo(res) {
        console.log(res);
      var that = this;
      wx.switchTab({
        url: "../index/main"
      });
    }
  }
};
</script>

<style scoped>
/* 获取用户信息权限弹窗---start */
.authorization {
  /* height: 100vh; */
  width: 100vw;
  background-color: #fff;
}
.authorization .content {
  text-align: center;
  font-size: 48rpx;
  color: #666;
  margin-top: 300rpx;
}
.operations {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80rpx;
  margin-top: 200rpx;
}
.operations .mes-allow {
  height: 80rpx;
  flex: 0 0 40%;
  text-align: center;
  line-height: 80rpx;
  color: #1fbba6;
}
.operations .mes-allow button {
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fff;
  color: #1fbba6;
}
/* 获取用户信息权限弹窗---end */
</style>


