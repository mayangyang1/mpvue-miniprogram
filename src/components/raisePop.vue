<template>
    <div class="raiseCash">
       <div class="over"></div>
       <div class="raiseCashCon">
        <div class="close"><img mode="widthFix" src="/static/images/close.png" alt=""></div>
        <div class="title">提现金额</div>
        <div class="title main-color">¥0.00</div>
        <div class="tips">额外扣除¥0手续费</div>
       </div>
       <div class="inputPassword">
           <div class="title-tips">请输入交易密码</div>
           
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isSelectAddress: false
        }
    },
    methods:{
        bindSearch() {
            this.isSelectAddress = true;
            this.$emit('searchBar', this.isSelectAddress);
        }
    }
}
</script>
<style scoped>

</style>

