import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '管理银行卡',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
}
