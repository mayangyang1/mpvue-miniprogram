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
   this.agreementUrl = this.$root.$mp.query.url;
  }
};
</script>

<style>

</style>