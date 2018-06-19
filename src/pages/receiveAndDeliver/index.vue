<template>
  <div class='container'>
    <div class="deliver-goods">
      <div class="goods-message-list pdlr20 bdb flex-sb">
        <div class="goods-msg-title">发货时间</div>
        <div class="good-tips"><img src="/static/images/arrows.png"></div>
      </div>
      <div class="goods-message-list pdlr20 bdb flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>发货重量</div>
          <input ut placeholder="请输入发货重量" type="text">
        </div>
        <div class="good-tips">吨</div>
      </div>
      <div class="goods-message-list pdlr20 bdb  flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>发货体积</div>
          <input placeholder="请输入发货体积" type="text">
        </div>
        <div class="good-tips">方</div>
      </div>
      <div class="goods-message-list pdlr20 bdb  flex-sb">
        <div class="goods-msg-title">
          <div>发货数量</div>
          <input placeholder="请输入发货数量" type="text">
        </div>
        <div class="good-tips">件</div>
      </div>
      <div class="operation-photo pdlr20">
        <div class="title">上传发货凭证</div>
        <div class="photo-list flex-fs">
          <div  class="photo-item">
            <img class="close" src="/static/images/close.png" alt="">
            <img class="affrim-phote" src="/static/images/delete.png" alt="">
            <div>发货凭证</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="deliver-goods">
      <div class="goods-message-list flex-sb">
        <div class="goods-msg-title">收货时间</div>
        <div class="good-tips"><img src="/static/images/arrow.png" alt=""></div>
      </div>
      <div class="goods-message-list flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>收货重量</div>
          <inp ut placeholder="请输入收货重量" type="text">
        </div>
        <div class="good-tips">吨</div>
      </div>
      <div class="goods-message-list flex-sb">
        <div class="goods-msg-title flex-fs">
          <div>收货体积</div>
          <input placeholder="请输入收货体积" type="text">
        </div>
        <div class="good-tips">方</div>
      </div>
      <div class="goods-message-list flex-sb">
        <div class="goods-msg-title">
          <div>收货数量</div>
          <input placeholder="请输入收货数量" type="text">
        </div>
        <div class="good-tips">件</div>
      </div>
      <div class="operation-photo">
        <div class="title">上传收货凭证</div>
        <div class="photo-list flex-sa">
          <div  class="photo-item">
            <img src="/static/images/close.png" alt="">
            <img src="/static/images/delete.png" alt="">
            <div>收货凭证</div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="affirm-button">
      <div class="common-btn main-bg-color">确认</div>
      <div class="common-btn ">取消</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
   
  }
};
</script>

<style scoped>
.container{
  font-size: 30rpx;
}
.goods-message-list{
  height: 80rpx;

}
.goods-msg-title input {
  flex: 1;
  padding-left: 40rpx;
}
.operation-photo{

}
.photo-item{
  position: relative;
}
.photo-item .close{
  width: 50rpx;
  height: 50rpx;
  z-index: 999;
  position:absolute;
  top: 0;
  right: 0
}
.photo-item .affrim-phote{
  width: 211rpx;
  height: 211rpx;
  margin-bottom: 25rpx;
}
</style>


