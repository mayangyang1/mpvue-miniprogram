import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '运单管理',
        enablePullDownRefresh: true,
        onReachBottomDistance: 50
    }
}
