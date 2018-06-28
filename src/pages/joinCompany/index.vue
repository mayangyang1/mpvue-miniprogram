<template>
  <div class="container pdb20">
    <div class="company-list" v-if="orgHave">
      <div class="company-item flex-sb pdlr20 mgt20" v-for="item in orgList" :key="item.code">
        <div class="company-name">{{item.orgFullName}}</div>
        <div class="company-operation">
          <switch :checked='item.show == null? true:true' @change="bingdCancelOrg(item.code)"/>
        </div>
      </div>
    </div>
    <div class="none-company" v-else>
        暂未加入公司
    </div>
    <div class="search-company mgt20">
      <div class="search-bar row">
        <input class="pdlr20" v-model="orgNameValue" @input="bindInputOrgName" placeholder="请输入公司名称" type="text">
      </div>
      <div class="all-company-list">
        <div class="company-title" @click="bindSelectCompany(item.code, item.orgFullName)" v-for="item in orgFullList" :key="item.code">{{item.orgFullName}}</div>
      </div>
      <div class="common-btn main-bg-color row" @click="bindAddCompany">添加</div>
      <div class="tips main-color pdlr20 mgt20 pdb20">司机和车辆将会一起加入到该公司，并且可收到该公司的直接派车。</div>
    </div>
  </div> 
</template>

<script>
import * as utils from "../../utils/index.js";
export default {
  components: {},
  data() {
    return {
      orgList: [], //已经加入公司列表
      orgHave: true, 
      orgNameValue: '',
      orgFullList: [], 
      orgCode: ''
    };
  },
  methods: {
    getCompanyList() { //获取已挂靠公司列表
      var that = this;
      var apiUrl = utils.hostUrl + '/transport/transport/query/pertain/org';
      utils.getAjax(apiUrl, {
        success: function (res) {
          //更新组织清单数据源
          if (res.data.total) {
            that.orgList = res.data.content;
          }
          //更新当前是否存在组织
           that.orgHave = res.data.total == 0 ? false : true;
        },
        fail: function (res) {
          return utils.errorToast('系统异常');
        }
      });
    },
    bingdCancelOrg(orgCode) { //取消已经挂靠的公司
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确认要解除挂靠吗？',
        success: function (res) {
          if (res.confirm) {
            var apiUrl = utils.hostUrl + '/transport/transport/pertain/org/' + orgCode + '/remove';
            utils.postAjax(apiUrl, {}, {
              success: function (res) {
                if (res.data.code === 200) {
                  that.getCompanyList();
                }else{
                  return utils.errorToast(res.data.content);
                }
              },
              fail: function (res) {
                return utils.errorToast('系统异常');
              }
            });
          } else if (res.cancel) {
            that.getCompanyList();
          }
        }
      })
    },
    getPartnerList(orgFullName) { //根据关键字获取公司列表
      var that = this;
      utils.getAjax(utils.hostUrl + '/platform/org/manager/list?orgFullName=' + orgFullName +'&size=100', {
        success: function(res) {
          if(res.data.code === 200) {
            var orgFullList = res.data.content;
            var dealList = [];
            orgFullList.forEach((_val)=>{
              if (_val.orgType != 1) {
                dealList.push(_val);
              }
            })
            that.orgFullList = dealList;
          }
        }
      })
    },
    bindInputOrgName() {
      var that = this;
      if(that.orgNameValue) {
        that.getPartnerList(that.orgNameValue);
      }else{
        that.orgFullList = [];
        that.orgCode = '';
      }
    },
    bindSelectCompany(code, orgFullName) {
      var that = this;
      that.orgCode = code;
      that.orgNameValue = orgFullName;
      that.getPartnerList(orgFullName);
    },
    bindAddCompany() {
      var that = this;
      if(that.orgNameValue == '') {
        return utils.errorToast('请输入单位名称');
      }
      if(!that.orgCode) {
        return utils.errorToast(' 请选择公司');
      }
      var params = {};
       params.orgCode = that.orgCode;
      var apiUrl = utils.hostUrl + '/transport/transport/set/pertain/org/by/driver';
      utils.postAjax(apiUrl, params, {
        success: function (res) {
          if (res.data.code === 200) {
            utils.successToast('加入成功');
            that.orgFullList = [];
            that.orgCode = '';
            //重新初始化数据
            setTimeout(()=>{
              that.getCompanyList();
            },1000);
            that.orgNameValue = '';
          } else {
            utils.errorToast(res.data.content);
          }
        },
        fail: function (res) {
          return utils.errorToast(res.data.content);
        },
        complete:function() {
          that.orgCode = '';
        }
      });
    }
  },
  onShow() {
    this.getCompanyList();
  },
  onPullDownRefresh() {
    
  },
  onReachBottom() {
    
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-size: 28rpx;
  padding-top: 1rpx;
}
.company-list{
  max-height: 500rpx;
  overflow: auto;
}
.company-item{
  background-color: #fff;
  border-top: 1px solid #d6d6d6;
  height: 120rpx;
}
.search-company{
  background-color: #fff;
  padding-top: 30rpx;
}
.search-bar{
  margin: 0 auto;
  border: 1px solid #ccc;
  width: 96vw;
  border-radius: 10rpx;
}
.search-bar input{
  width: 100%;
  height: 80rpx;
  background-color:#f2f2f2;
  font-size: 32rpx;
}
.common-btn{
  width: 96vw;
}
.none-company{
 background-color:white;
  color:gray;
  text-align:center;
  line-height:80rpx;
  margin:0rpx;
  padding:10rpx;
  padding-top:15rpx;
  font-size: 34rpx;
}
.all-company-list{
  background-color: #fff;
  max-height: 300rpx;
  overflow: auto;
  margin-bottom: 30rpx;
}
.company-title{
border-bottom: 1px solid #ccc;
padding-left: 20rpx;
height: 80rpx;
line-height: 80rpx;
font-size: 32rpx;
}

</style>
