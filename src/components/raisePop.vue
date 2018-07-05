<template>
    <div class="raiseCash">
       <div class="over" @click="cancelTapFoucs"></div>
       <div class="raiseCashCon">
           <div class="content">
               <div class="close flex-fs"><img @click="close" mode="widthFix" src="/static/images/close.png" alt=""></div>
                <div class="title">提现金额</div>
                <div class="titles main-color">¥{{cashMoney}}</div>
                <div class="tips">额外扣除¥{{deductions}}手续费</div>
           </div>
            <div class="inputPassword">
                <div class="title-tips pdl20">请输入交易密码</div>  
                <div class='pay-password flex-fs'>
                    <block  v-for="item in Length" :key="item">
                    <input class="row" @click='tapFocus' :value="passwardValue.length>=index+1?passwardValue[index]:''" disabled password='true'>
                    </block>
                </div>
                <input  class='ipt'  maxlength="6"  type='number' v-model='passwardValue' @input='bindKeyValue' :focus='isFocus' password='true'>
            </div>
       </div>
       
    </div>
</template>
<script>
import * as utils from '../utils/index.js';
export default {
    props:{
        'cashMoney': String,
        'deductions': String,
        'cash': String,
        'accountNo': String
    },
    data(){
        return {
            Length: 6,
            passwardValue: '',
            isFocus: true
        }
    },
    methods:{
        close() {
            this.$emit('isClose');
        },
        reiseCash() { //提现操作
            var that = this;
            wx.showLoading({
            title: '加载中...',
            mask: true
            })
            var params = {};
            params.amount = that.cash;
            params.accountNo = that.accountNo;
            params.payPassword = that.passwardValue;
            utils.postAjax(utils.hostUrl + `/pay/mobile/doWithdraw`, params, {
                success: function (res) {
                    if (res.data.code === 200 && res.data.content) {
                        var memberFees = res.data.content.data.memberFees || 0;
                        var lastNum = res.data.content.data.realAccount.slice(-4);
                        wx.navigateTo({
                        url: `../raiseCashResult/main?cash=${that.cash}&bankName=${res.data.content.data.bankName}&withdrawCashTime=${res.data.content.data.withdrawCashTime}&memberFees=${memberFees}&lastNum=${lastNum}`,
                        })
                    } else {
                        setTimeout(()=>{
                        utils.errorToast(res.data.content);
                        },100);
                        
                    }
                },
                complete:function(){
                    wx.hideLoading();
                    that.$emit('onAction')
                }
            });
        },
        bindKeyValue() {
            var that =this;
            if (that.passwardValue.length === 6){
                console.log('调用提现接口');
                that.reiseCash();//当输入六位密码时调用提现的接口
            }
        },
        tapFocus() {
            this.isFocus =  !this.isFocus;
            console.log(this.isFocus);
        },
        cancelTapFoucs() {
            this.isFocus = false;
        }
    }
}
</script>
<style scoped>
    .raiseCashCon{
        position:fixed;
        background-color:#fff;
        width:90vw;
        top:100rpx;
        left:5vw;
        z-index:3;
        font-size:30rpx;
        color:#454545;
        border-radius:10rpx;
    }
    .close{
        font-size:34rpx;
        font-weight:600;
        display:flex;
        justify-content:flex-start;
        align-items:center;

    }
    .close img{
        width: 35rpx;
        height: 35rpx;
    }
    .content{
        border-bottom: 1px solid #f2f2f2;
        padding: 20rpx;
    }
    .content .title{
        font-size: 32rpx;
        text-align: center;
        padding-top: 30rpx;
    }
    .content .titles{
        font-size: 46rpx;
        font-weight: 600;
        text-align: center;
        line-height: 80rpx;
    }
    .content .tips{
        font-size: 28rpx;
        color: #999;
        text-align: center;
    }
    .pay-password{
        margin:0 20rpx;
        border:1px solid #ccc;
        height:80rpx;
        margin-top:20rpx;

    }
    .pay-password input{
        border-right:1px solid #ccc;
        width:80rpx;
        height:80rpx;
        flex:1;
        text-align: center;
    }
    .pay-password input:last-child{
        border-right: none;
    }
    .ipt{
        width: 0;
        height: 0;
    }
    .inputPassword{
        margin-top:30rpx;
    }
    .title-tips{
        font-size: 28rpx;
    }
</style>

