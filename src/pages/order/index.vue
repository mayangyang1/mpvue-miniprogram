<template>
  <div class="container">
        <div class='register-list'>
            <div class='title'>手机号</div>
            <input bindinput='bindPhone' placeholder='请输入手机号'>
        </div>
        <div class='register-list'>
            <div class='title'>验证码</div>
            <input bindinput='bindVersionCode' placeholder='请输入验证码'>
            <div class='getCode' v-if="isVersion" bindtap='getVersionCode'>获取验证码</div>
            <div class='getCode' v-else >重新获取({{timer}})</div>
        </div>
        <div class='register-list'>
            <div class='title'>姓 名</div>
            <input bindinput='bindUserName' placeholder='请输入你的真实姓名'>
        </div>
        <div class='register-list setMargin'>
            <div class='title'>密 码</div>
            <input bindinput='bindPassword' password='true' placeholder='请输入密码'>
        </div>
        <div class='register-list'>
            <div class='title'>确认密码</div>
            <input bindinput='bindSurePassword' password='true' placeholder='请再次输入密码'>
        </div>
        <div class='agreement-con'>
            <!-- <checkbox checked='{{false}}' color='#f46d00'></checkbox> -->
            <div>同意<text class='agreement'>《天盾物流注册服务协议》</text></div>
        </div>
        <div class='register'>注册</div>
    </div>
</template>

<script>
export default {
  components: {
    
  },

  data() {
    return {
      logs: []
    };
  },

  created() {
   
  }
};
</script>

<style>
.container{
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  font-size: 34rpx;
  padding-top: 30rpx;
}
.register-list{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90rpx;
  border-bottom: 1px solid #ccc;
  padding-left: 20rpx;
  background-color: #fff;
}
.register-list .title{
  width: 150rpx;
}
.register-list input{
  flex: 1;
}
.register-list .getCode{
  height: 90rpx;
  width: 200rpx;
  text-align: center;
  border-left: 1px solid #ccc;
  line-height: 90rpx;
  background-color: #eee;
  color: #666;
}
.register-list .getCode:active{
  background-color: #eee;
  color: #999;
}
.setMargin{
  margin-top: 30rpx;
}
.agreement-con{
  display: flex;
  justify-content: flex-start;
  height: 80rpx;
  align-items: center;
  padding-left: 20rpx;
}
 
.agreement{
  color: #f46d00;
}

.register{
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
.register:active{
  background-color: #f48d00;
  font-size: 37rpx;
}
</style>
