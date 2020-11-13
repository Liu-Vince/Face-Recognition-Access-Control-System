Page({
  data: {
    imgUrls: [
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3090651753,1191520533&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=259648009,747507726&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604830692855&di=9c567bd091f085d23d321d98183fc57c&imgtype=0&src=http%3A%2F%2Ft1.focus-img.cn%2Fsh740wsh%2Fxf%2Fdt%2Ffe488523-f446-446a-a3de-83de73dfc454.JPEG'
    ],
    list: ['📣云大人脸门禁系统', '📣祝腾讯小程序大赛圆满举办', '敬请期待'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    interval2: 11000,
    duration: 1000,
    duration2: 2000,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    btnSize: 0,
    token: wx.getStorageSync('token'),
    status: 2,
    latitude: 0,
    longitude: 0
  },
  onLoad() {
    var that = this;
    this.setData({
      btnSize: 0.8 * 0.32 * this.data.windowHeight,
    })
    const token = wx.getStorageSync('token')
    if (token == '') {
      wx.navigateTo({
        url: '../index/index',
      })
    }
  },
  onShow() {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    })
  },
  onHide: function () {
    this.setData({
      status: 2
    })
  },

  toIndex() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  toDenglu() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  toAdmin() {
    let user = wx.getStorageSync('user')
    if (user.admin == 2) {
      wx.navigateTo({
        url: '../admin/admin',

      })
    } else {
      console.log('抱歉您不是管理员')
      wx.showToast({
        icon: 'none',
        title: '抱歉您不是管理员或未登录',
      })
    }

  },
  toSetting() {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  toHome() {
    // 获取当前经纬度
    const that = this;
    // 获取当前经纬度
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          latitude: latitude,
          longitude: longitude
        });
        // let latitude = this.data.latitude
        // let longitude = this.data.longitude
        // 0.00003  1
        console.log(latitude)
        console.log(longitude)
        let user = wx.getStorageSync('user')
        if (user) {
          if (((latitude - 24.824806)* (latitude - 24.824806)  + (longitude - 102.850957 )*  (longitude - 102.850957 )) < 0.00003) {
            if (user.admin > 0) {
              wx.checkIsSoterEnrolledInDevice({
                checkAuthMode: 'facial',
                success(res) {
                  wx.startSoterAuthentication({
                    requestAuthModes: ['facial'],
                    challenge: '123456',
                    authContent: '请用人脸解锁',
                    success(res) {
                      wx.navigateTo({
                        url: '../home/home',
                      })
                    }
                  })
                },
                fail(res) {
                  wx.checkIsSoterEnrolledInDevice({
                    checkAuthMode: 'fingerPrint',
                    success(res) {
                      wx.startSoterAuthentication({
                        requestAuthModes: ['fingerPrint'],
                        challenge: '123456',
                        authContent: '请用指纹解锁',
                        success(res) {
                          wx.navigateTo({
                            url: '../home/home',
                          })
                        }
                      })
                    },
                    fail(res) {
                      wx.navigateTo({
                        url: '../mima/mima',
                      })

                    }
                  })
                }
              })
            } else {
              console.log('抱歉您没有权限')
              wx.showToast({
                icon: 'none',
                title: '抱歉您没有权限或未登录',
              })
            }
          } else {
            console.log('距离门禁位置太远,请点击地图，查看并移动到门禁位置附近。')
            wx.showToast({
              icon: 'none',
              title: '距离门禁位置太远,请点击地图，查看并移动到门禁位置附近。',
            })
          }
        } else {
          console.log('抱歉您没有登录')
          wx.showToast({
            icon: 'none',
            title: '请先登录',
          })
        }
      }
    })

    // wx.navigateTo({
    //   url: '../home/home',
    // })
  }

  // test0(){
  //   wx.navigateTo({
  //     url: '../user/user',
  //   })
  // },
  // test1(){
  //   wx.navigateTo({
  //     url: '../guest/guest',
  //   })
  // },
  // test2() {
  //   wx.navigateTo({
  //     url: '../entrance/entrance',
  //   })
  // }
})