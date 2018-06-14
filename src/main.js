import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', //首页
      'pages/regiest/main', // 注册页
      'pages/order/main', // 运单页
      'pages/personal/main', //个人页
      'pages/jurisdiction/main', //获取权限
      'pages/login/main', //登录页
      'pages/findpassword/main', //忘记密码页
      'pages/entrustAgreement/main', //委托吊车协议详情
      'pages/agreement/main', //注册协议详情
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f46d00',
      navigationBarTitleText: '货源',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/main",
          text: "货源",
          selectedIconPath: 'static/images/hya.png',
          iconPath: "static/images/hyb.png"
        },
        {
          pagePath: "pages/order/main",
          text: "运单",
          selectedIconPath: "static/images/dda.png",
          iconPath: "static/images/ddb.png"
        },
        {
          pagePath: "pages/personal/main",
          text: "我的",
          selectedIconPath: "static/images/wda.png",
          iconPath: "static/images/wdb.png"
        }
      ],
      color: "#888888",
      selectedColor: "#19549d",
      backgroundColor: "#fafafa",
      borderStyle: "black"
    },
  }
}
