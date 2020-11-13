const config = require('../../utils/config.js');
// pages/home/home.js
const cfg = require('../../utils/config.js');
const moment = require('../../utils/moment.min.js');
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;
Page({
  data: {
    isCamera: false,
    src: '',
    c: '',
    a: false
  },

  // 重拍
  reTakePhoto() {
    this.setData({
      isCamera: false
    });
  },


  // 拍照
  takePhoto() {
    let that = this;
    const ctx = wx.createCameraContext()
    let src = this.data.src
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          isCamera: true
        })

        this.init()
      },
      fail: function (res) {
        wx.showToast({
          title: '拍照错误',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  error(e) {
    wx.showToast({
      title: '请允许小程序使用摄像头',
      icon: 'none',
      duration: 2000
    });
  },


  // wx.cloud.downloadFile({
  //   fileID: user.src,
  //   success: res => {
  //     // get temp file path
  //     that.setData({
  //       tempFilePath: res.tempFilePath
  //   })
  //     console.log('res.tempFilePath',res.tempFilePath)
  //   },
  //   fail: err => {
  //     // handle error
  //     console.log('图片读取失败')
  //     wx.showToast({
  //       icon: 'none',
  //       title: '图片读取失败',
  //     })
  //   }
  // })




  shibie() {
    let that = this;
    let c =this.data.c

    wx.uploadFile({
        url: cfg.BaseURL + '/v1/login', 
        filePath: c,
        name: 'file',
        success: function (res) {
            console.log('res',res);
            var data = JSON.parse(res.data);
            if (res.statusCode == 200) {
                wx.showToast({
                    title: '识别成功',
                    icon: 'success',
                    duration: 2000
                });
                this.data({
                  a:true
                })
                console.log('a',a)
                data.face_url = cfg.BaseURL + data.face_url;
            } else {
                wx.showToast({
                    title: '识别失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        },
        fail: function () {
            wx.showToast({
                title: '登录请求错误',
                icon: 'none',
                duration: 2000
            });
        },
        complete: function () {
            wx.hideLoading();
        }
    })
},






  async init() {

    let user = wx.getStorageSync('user')
    let that = this;
    let src = this.data.src
    let c = this.data.c
   
    // wx.cloud.getTempFileURL({
          
    //   fileList: [user.src],
    //   success: res => {
    //     // get temp file URL
    //     console.log('res.fileList', res.fileList)
    //     this.setData({
    //       c:res.fileList[0].tempFileURL
    //     })
    //   },
    //   fail: err => {
    //     // handle error
    //     console.log('err', err)
    //   }
    // })

    wx.cloud.downloadFile({
      fileID: user.src,
      success: res => {
        console.log('res.tempFilePath',res.tempFilePath)
        this.setData({
          c:res.tempFilePath
        });
      },
      fail: err => {
        console.log('err',err)
        // handle error
      }
    })



    wx.uploadFile({
      url: cfg.BaseURL + '/v1/user', 
      filePath: that.data.src,
      name: 'file',
      formData: {
          'username':parseInt(100*Math.random()),
          'password': user.password
      },
      success: function (res) {
          console.log('res:',res);
          var data = JSON.parse(res.data);
          if(res.statusCode == 200){
              wx.showToast({
                  title: '人脸添加成功',
                  icon: 'success',
                  duration: 2000
              });
              // wx.switchTab({
              //     url: '/pages/user/user'
              // })
          }else{
              wx.showToast({
                  title: '人脸添加失败',
                  icon: 'none',
                  duration: 2000
              });
          }
      }
  })





  },
  openBluetooth: function () {

    let user = wx.getStorageSync('user')

    if (user) {
      let src = this.data.src
      let c = this.data.c
      console.log('c', c)
      console.log('src', src)
      let a = this.data.a
          if (a) {

            if (user.admin > 0) {
              console.log("开始启动蓝牙");
              wx.openBluetoothAdapter({
                complete() {
                  console.log("蓝牙启动完成");
                  wx.showToast({
                    icon: 'loading',
                    title: '蓝牙启动完成',
                  })
                },
                success(res) {
                  console.log("蓝牙启动成功");
                  wx.showToast({
                    icon: 'loading',
                    title: '蓝牙启动成功',
                  })
                  console.log(res);
                  var blueToothCount = 0;
                  wx.startBluetoothDevicesDiscovery({
                    allowDuplicatesKey: false,
                    success(res) {
                      console.log("启动蓝牙发现服务");
                      console.log(res);
                      wx.showToast({
                        icon: 'loading',
                        title: '正在搜索门禁',
                      })
                      wx.onBluetoothDeviceFound(function (res) {
                        var devices = res.devices;
                        blueToothCount += devices.length;
                        console.log('new device list has founded,total Count：' + blueToothCount);
                        console.log(devices);
                        devices.forEach(element => {
                          if (element.name.startsWith("door")) {
                            console.log("实验室门禁蓝牙设备已找到");
                            wx.showToast({
                              title: '门已打开',
                            })
                            console.log(element);
                            // 找到实验室门门禁就关闭
                            wx.stopBluetoothDevicesDiscovery({
                              success(res) {
                                console.log("关闭蓝牙发现器");
                                console.log(res)
                              }
                            });
                          }
                        });

                      });
                    },
                    fail(res) {
                      console.log("启动发现服务失败");
                      console.log(res);
                      wx.showToast({
                        title: '启动发现服务失败',
                      })
                    }
                  });
                },
                fail(res) {
                  console.log("蓝牙启动失败");
                  console.log(res);
                  wx.showToast({
                    title: '蓝牙启动失败',
                  })
                }
              });

            } else {
              console.log('抱歉您没有权限开门')
              wx.showToast({
                title: '抱歉您没有权限开门',
              })
            }
          }else{
            console.log('人脸不匹配')
            wx.showToast({
              icon: 'none',
              title: '请先识别匹配的人脸',
            })
          }

     
    } else {
      console.log('请先登录')
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }
  },




  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isCamera: false,
      userinfo: null
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isCamera: true
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  wode() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },


})