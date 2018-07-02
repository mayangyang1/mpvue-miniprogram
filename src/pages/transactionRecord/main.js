import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '交易记录',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
}
