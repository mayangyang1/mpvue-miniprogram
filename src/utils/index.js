function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
/**
 * 公用地址
 */
const mainUrl = {
  wc: 'https://gatway.nmglabei.com', //万创
  yfb: 'https://rltx2-yfb-gateway.rltx.com', // 预发布
  ks: 'https://gateway.nmgkswl.com',  //凯顺
  lyg: 'https://lygateway.rltx.com/account/', //连云港
  td: 'https://gateway.tdsxwl.com', // 天盾
}
const hostUrl = mainUrl.yfb;
/**
 * 获取当前页面的路径
 */
const getCurrentRouteUrl = () => {
  var pages = getCurrentPages(); //小程序方法
  var currentPage = pages[pages.length - 1];
  var currentRouteUrl = currentPage.route;
  return currentRouteUrl;
}
/**
 * 获取cookie并储存到storage里;
 */
const getCookieAndSaveInStorage = res => {
  const cookiestr = res.header['Set-Cookie'];
  const cookiesarr = cookiestr.split(';');
  for (let data of cookiesarr) {
    if (data.indexOf('JSESSIONID') != -1) {
      let itemar = data.split('=');
      const cookies = itemar[1];
      //保存小程序cookies
      wx.setStorageSync("cookies", cookies);
    }
  }
}
/**
 * 登录小程序
 */
const logins = (_this, loginAccount, password, isBtn) => {
  var that = _this;
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.setStorageSync('wxcode', res.code);
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            login(code, res.encryptedData, res.iv, true, loginAccount, password, isBtn);
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../../pages/jurisdiction/main',
            })
          }
        });
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }, fail: function (res) {
      errorToast('微信授权失败');
    }
  });
}
/**
 * 封装微信的ajax
 */

const ajax = (types, url, params, callfunc, attch) => {
  var that = this;
  if (url == '' || types == '') return;
  var params = params || {};
  var cookie = wx.getStorageSync('cookies');
  var callfunc = callfunc || {};
  wx.showNavigationBarLoading();
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8', 'Cookie': 'JSESSIONID=' + cookie },
    method: types,
    data: params,
    success(res) {
      if (res.data.code === 501) {
        if (!(url.indexOf("/weixinLogin") > -1 || url.indexOf("/driver-api/freight/list") > -1)) {
          var wxcode = wx.getStorageSync('wxcode');
          wxLogin(code);
          return;
        }
      }
      if (res.data.code === 500) {
        return errorToast(res.data.content);
      }
      if (canVisitUrl(url)) {
        callfunc.success(res, attch);
      } else {
        if ((isLogin(res) && callfunc.success)) {
          callfunc.success(res, attch);
        }
      }
    }, complete(res) {
      wx.hideNavigationBarLoading();
      if (callfunc.complete) callfunc.complete(res, attch);
    }, fail(res) {
      if (callfunc.fail) callfunc.fail(res, attch);
    }
  })
}
/**
 * 获取code后登陆
 */
const wxLogin = (code) => {
  var that = this;
  wx.getUserInfo({
    success: function (res) {
      //小程序登录
      login(code, res.encryptedData, res.iv, true);
    },
    fail: function (res) {
      wx.redirectTo({
        url: '../../pages/jurisdiction/main',
      })
    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  });
}
/**
 * 登陆login
 */
const login = (code, encryptedData, iv, skip, loginAccount, password, isBtn) => {
  var params = {};
  params.code = code;
  params.type = "rltx-driver";
  params.encryptedData = encryptedData;
  params.iv = iv;
  params.loginAccount = loginAccount || '';
  params.password = password || '';
  postAjax(hostUrl + '/account/weixinLogin', params, {
    success: function (res) {
      if (res.data.code == 501) {
        var currentRouteUrl = getCurrentRouteUrl();
        if (currentRouteUrl.indexOf('/login/main') > -1 && isBtn) {
          errorToast('账号密码错误');
        } else {
          wx.redirectTo({
            url: '/pages/login/main',
          });
        }
      } else {
        getCookieAndSaveInStorage(res);

        wx.setStorageSync("userCode", res.data.content.userCode);
        //跳转首页
        var currentRouteUrl = getCurrentRouteUrl();
        if (currentRouteUrl.indexOf('/regies/main') > -1 || currentRouteUrl.indexOf('/login/main') > -1) {
          wx.switchTab({
            url: '/pages/index/main'
          })
        }
      }
    }
  });
}
/**
* 判断微信登录用户是否注册
*/
const isLogin = (res) => {
  var  that = this;
  if (res.statusCode === 401) {
    logins(that);
    return false;
  } else {
    wx.setStorageSync("login", 0);
    return true;
  }
}
/**
 * 调用方式封装(get,post)
 */
const postAjax = (url, params, callfunc) => {
  ajax("POST", url, params, callfunc);
}

const getAjax = (url, callfunc, attch) => {
  ajax("GET", url, {}, callfunc, attch);
}
/**
 * 排除一些url地址
 */
const canVisitUrl = (url) => {
  if (url.indexOf("/driver-api/freight/list") > -1) {
    return true;
  }
  if (url.indexOf("/driver-api/freight/") > -1 && url.indexOf("/get") > -1) {
    return true;
  }
  if (url.indexOf("/weixinLogin") > -1) {
    return true;
  }
  return false;
}

/**
 * 显示方法
 */
const errorToast = (title) => {
  wx.showToast({
    title: title,
    image: '/static/images/sb.png',
    mask: true
  });
}
const successToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 2000,
    mask: true
  });
}
const loading = (status, title, url) => {
  if (status) {
    var title = title || '数据保存中...';
    wx.showLoading({
      title: title,
      mask: true
    })
  } else {
    wx.hideLoading();
    var title = title || '保存成功';
    wx.showToast({
      title: title,
      icon: 'succes',
      duration: 1000,
      mask: true,
      success: function () {
        setTimeout(function () {
          console.log('url: ' + url);
          if (!url || url == 1 || url == 2 || url == 3) {
            var params = (url > 0) ? { delta: url } : {};
            wx.navigateBack(params)
          } else {
            wx.navigateTo({ url: url });
          }
        }, 1000);
      }
    })
  }
}
const config = {
  truckModel: {
    'H01': '普通货车',
    'H02': '厢式货车',
    'H04': '罐式货车',
    'Q00': '牵引车',
    'G01': '普通挂车',
    'G03': '罐式挂车',
    'G05': '集装箱挂车',
    'H09': '仓栅式货车',
    'H03': '封闭货车',
    'H05': '平板货车',
    'H06': '集装箱车',
    'H07': '自卸货车',
    'H08': '特殊结构货车',
    'Z00': '专项作业车',
    'G02': '厢式挂车',
    'G07': '仓栅式挂车',
    'G04': '平板挂车',
    'G06': '自卸挂车',
    'G09': '专项作业挂车',
    'X91': '车辆运输车',
    'X92': '车辆运输车（单排）'
  },
  gender: {
    'male': '男',
    'female': '女'
  },
  freightStatus: {
    'pushling': '发布中',
    'received': '已接单',
    'finished': '已结束'
  },
  driverAcceptStatus: {
    'undispatched': '待派车',
    'dispatched': '已派车',
    'ignored': '已忽略'
  },
  waybillStatus: {
    'unloading': '待装货',
    'going': '运输中',
    'finish': '运输完成',
    'cancel': '运单取消'
  },
  powerType: {
    'gas': '气车',
    'oil': '油车'
  },
  unit: {
    'cube': {
      'carrier.price': {
        'yuanpersquare': '元/方',
        'yuanpertruck': '元/车',
      },
      'driver.price': {
        'yuanpercube': '元/方',
        'yuanpertruck': '元/车',
      },
      'goods.loss': {
        'cube': '方/车'
      },
      'goods.price': {
        'yuanpercube': '元/方'
      },
      'goods.volume': {
        'cube': '方'
      },
      'settle.volume.unit': {
        'cube': '方'
      },
      'truck.cubage': {
        'cube': '方'
      }
    },
    'day': {
      'route.duration': {
        'day': '天'
      }
    },
    'hour': {
      'route.duration': {
        'hour': '小时'
      }
    },
    'item': {
      'carrier.price': {
        'yuanperitem': '元/件',
        'yuanpertruck': '元/车'
      },
      'driver.price': {
        'yuanperitem': '元/件',
        'yuanpertruck': '元/车'
      },
      'goods.loss': {
        'item': '件/车'
      },
      'goods.number': {
        'item': '件'
      },
      'goods.price': {
        'yuanperitem': '元/件'
      },
      'settle.volume.unit': {
        'item': '件'
      }
    },
    'km': {
      'mileage.number': {
        'km': '公里'
      },
      'standard.distance': {
        'km': '公里'
      }
    },
    'liang': {
      'truckqty.number': {
        'liang': '辆'
      }
    },
    'meter': {
      'truck.size': {
        'meter': '米'
      }
    },
    'millimetre': {
      'truck.size': {
        'millimetre': '毫米'
      }
    },
    'mm': {
      'tyrewrinkles.number': {
        'mm': '毫米'
      }
    },
    'percent': {
      'goods.loss.ration': {
        'percent': '%'
      }
    },
    'ton': {
      'carrier.price': {
        'yuanperton': '元/吨',
        'yuanpertruck': '元/车'
      },
      'driver.price': {
        'yuanperton': '元/吨',
        'yuanpertruck': '元/车'
      },
      'goods.loss': {
        'ton': '吨/车'
      },
      'goods.price': {
        'yuanperton': '元/吨'
      },
      'goods.weight': {
        'ton': '吨'
      },
      'settle.volume.unit': {
        'ton': '吨'
      },
      'truck.carry': {
        'ton': '吨'
      },
    },
    'yuan': {
      'price.unit': {
        'yuan': '元'
      }
    }
  }
}

const attachList = ['cardFront', 'cardAfter', 'driverOne', 'driverTwo', 'qualificationCertificateResourceCode']
const attachments = {
  'cardFront': { name: '身份证正面', value: '/images/pic.png', status: 'hidden', resourceCode: '' },
  'cardAfter': { name: '身份证反面', value: '/images/pic.png', status: 'hidden', resourceCode: '' },
  'driverOne': { name: '驾驶证第一联照片', value: '/images/pic.png', status: 'hidden', resourceCode: '' },
  'driverTwo': { name: '驾驶证第二联照片', value: '/images/pic.png', status: 'hidden', resourceCode: '' },
  'qualificationCertificateResourceCode': { name: '从业资格证照片', value: '/images/pic.png', status: 'hidden', resourceCode: '' },
}

const monthData = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];
const dayData = ['01日', '02日', '03日', '04日', '05日', '06日', '07日', '08日', '09日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'];
const hourData = ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'];
const minuteData = ['00分', '01分', '0分', '02分', '03分', '04分', '05分', '06分', '07分', '08分', '09分', '10分', '11分', '12分', '13分', '14分', '15分', '16分', '17分', '18分', '19分', '20分', '21分', '22分', '23分', '24分', '25分', '26分', '27分', '28分', '29分', '30分', '31分', '32分', '33分', '34分', '35分', '36分', '37分', '38分', '39分', '40分', '41分', '42分', '43分', '44分', '45分', '46分', '47分', '48分', '49分', '50分', '51分', '52分', '53分', '54分', '55分', '56分', '57分', '58分', '59分'];




export{
  formatTime,
  logins,
  ajax,
  postAjax,
  getAjax,
  errorToast,
  successToast,
  loading,
  config,
  hostUrl,
  attachList,
  attachments,
  monthData,
  dayData,
  hourData,
  minuteData,
  wxLogin

}