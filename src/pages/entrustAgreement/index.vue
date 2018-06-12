<template>
  <div class="container">
    <web-view :src="agreementUrl"></web-view>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      agreementUrl: '',
    };
  },
  onShow(){
    var options = this.$root.$mp.query;
    var urlObj = wx.getStorageSync('webViewParams');
    var url = urlObj['other.statement.driverAgreementUrl'];
   this.agreementUrl = url+`?firstParty=${urlObj.coreOrgFullName}&secondParty=${options.secondParty}&idNumber=${options.idNumber}&phoneNumber=${options.driverPhone}`;
  }
};
</script>

<style>

</style>
