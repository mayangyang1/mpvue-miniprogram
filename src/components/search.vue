<template>
    <div class="search row">
        <div class="searchbar row" @click="bindSearch">
            <img src="/static/images/icon_search.png" alt="搜索">搜索
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
    .search{
        width: 100%;
        height: 100rpx;
        background-color: #f2f2f2;
        border-bottom: 1px solid #ccc;

    }
    .searchbar{
        width: 100%;
        height: 60rpx;
        margin: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;
        color: #a3a3a3;
        font-size: 26rpx;
    }
    .searchbar img{
        width: 30rpx;
        height: 30rpx;
        margin-right: 20rpx;
    }
</style>

