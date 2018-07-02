<template>
    <div class="warnContainer">
        <div class="over"></div>
        <div class="warn-result">
            <div class="warn-message">
                <img class="status-img" v-if="msg == '成功'" src="/static/images/addSuccess.png" alt="">
                <img class="status-img" v-else src="/static/images/addFail.png" alt="">
                <div class="warn-status">添加{{msg}}</div>
                <div class="warn-msg">{{failMsg}}</div>
                <div class="bank-name">{{bankName}}</div>
                <div class="bank-account">{{accountNo}}</div>
            </div>
            <div class="common-btn row" @click="bindSure">完成</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
       'msg': String,
       'failMsg': String,
       'bankName': String,
       'accountNo': String,
    },
    data() {
        return {
            
        }
    },
    methods:{
        bindSure(){
            if(this.msg == '成功') {
                this.$emit('onSure', true);
            }else{
                this.$emit('onSure', false);
            }
           
        }
    }
}
</script>

<style scoped>
    .over{
        position: fixed;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
        opacity: 1;
    }
    .warn-result{
        position:fixed;
        top:20rpx;
        left:0;
        z-index:3;
        background-color:#f2f2f2

    }
    .warn-message{
        width:100vw;
        background-color:#fff;
        padding-top:50rpx;
        text-align:center;
        padding-bottom:60rpx;
    }
    .status-img{
        width:100rpx;
        height:100rpx;
        display:block;
        margin:0 auto;

    }
    .warn-status{
        font-size:34rpx;
        font-weight:600;
        text-align:center;
        margin-top:30rpx;
    }
    .warn-msg{
        font-size:28rpx;
        color:#888;
        margin-top:20rpx;
    }
    .bank-name{
        font-size:34rpx;
        color:#888;
        margin-top:60rpx;

    }
    .bank-account{
        font-size:34rpx;
        color:#888;
        margin-top:30rpx
    }
    .common-btn{
        color: #454545;
        margin-top: 100rpx;
        background-color: #fff;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
</style>


