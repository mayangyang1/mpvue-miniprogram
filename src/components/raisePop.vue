<template>
    <div class="raiseCash">
       <div class="over"></div>
       <div class="raiseCashCon">
           <div class="content">
               <div class="close flex-fs"><img @click="close" mode="widthFix" src="/static/images/close.png" alt=""></div>
                <div class="title">提现金额</div>
                <div class="titles main-color">¥0.00</div>
                <div class="tips">额外扣除¥0手续费</div>
           </div>
            <div class="inputPassword">
                <div class="title-tips pdl20">请输入交易密码</div>  
                <div class='pay-password flex-fs'>
                    <block  v-for="item in Length" :key="item">
                    <input class="row" @click='tapFocus' :value="passwardValue.length>=index+1?passwardValue[index]:''" disabled password='true'>
                    </block>
                </div>
                <input  class='ipt'  maxlength="6"  type='number' :value='passwardValue' @input='bindKeyValue' :focus='isFocus' password='true'>
            </div>
       </div>
       
    </div>
</template>
<script>
export default {
    data(){
        return {
            Length: 6,
            passwardValue: '',
        }
    },
    methods:{
        close() {
            this.$emit('isClose');
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

