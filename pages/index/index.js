//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用云大人脸门禁系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginOK: false,
    xuehao:''

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //去登陆页
denglu() {
  wx.redirectTo({
   url: '/pages/login/login',
  })
  },
  //去注册页
  zhuce() {
  wx.navigateTo({
   url: '/pages/zhuce/zhuce',
  })
  },
  guanli(){
    let user = wx.getStorageSync('user')
    if (user.admin == 2){
    wx.redirectTo({
      url: '/pages/admin/admin',
  })}
  else{
    console.log('抱歉您不是管理员')
    wx.showToast({
      icon: 'none',
     title: '抱歉您不是管理员或未登录',
    })
  }
},
  onShow() {
  let user = wx.getStorageSync('user')
  if (user && user.xuehao) {
   this.setData({
    loginOK: true,
    xuehao: user.xuehao
   })
  } else {
   this.setData({
    loginOK: false
   })
  }
  },
   
  //退出登陆
  tuichu() {
  wx.setStorageSync('user', null)
  let user = wx.getStorageSync('user')
  if (user && user.xuehao) {
   this.setData({
    loginOK: true,
    xuehao: user.xuehao
   })
  } else {
   this.setData({
    loginOK: false
   })
  }
  }
})
