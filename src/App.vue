<script>
export default {
  created () {
    
  }
}
</script>

<style>
.container {
  height: 100%;
  background-color: #fff;
  font-size: 28rpx;
  color: #454545;
}
.flex-sb{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-sa{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flex-fs{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
}
.flex-fe{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.row{
  display: flex;
  justify-content: center;
  align-items: center;
}
/*主题色 --start*/
.main-color{
  color: #f46d00;
}
.main-bg-color{
  background-color: #f46d00;
  color: #fff;
}
/*主题色 --end*/
/*padding布局 --start*/
.pd20{
  padding: 20rpx;
}
.pdl20{
  padding-left: 20rpx;
}
.pdr20{
  padding-right: 20rpx;
}
.pdlr20{
  padding: 0 20rpx;
}
.pdb20{
  padding-bottom: 20rpx;
}
/*padding布局 --end*/
/*margin布局 -- start*/
.mg20{
  margin: 20rpx;
}
.mgl20{
  margin-left: 20rpx;
}
.mgr20{
  margin-right: 20rpx;
}
.mglr20{
  margin: 0 20rpx;
}

/*margin布局 -- end*/
/*盒子居中 -- start*/
.box-center{
  margin: 0 auto;
  text-align: center;
}
/*盒子居中 -- end*/
/*文字溢出显示... -- start*/
.text-overflow{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
/*文字溢出显示... -- end*/
/*蓝色字体 -- start*/
.blue-color{
  color: #19549d;
}
/*蓝色字体 -- end*/
/*标准点击按钮 -- start*/
.common-btn{
  width: 100%;
  height: 80rpx;
  font-size: 32rpx;
  color: #fff;
  border-radius: 10rpx;
  margin: 0 auto;
}
/*标准点击按钮 -- end*/
/*小按钮 -- start*/
  .mini-button{
    width: 200rpx;
    height: 80rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 10rpx;
    line-height: 80rpx;
    text-align: center;
  }
/*小按钮 -- end*/
/*遮罩 -- start*/
.over{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: #000;
  opacity: .3;
}
/*遮罩 -- end*/
</style>

