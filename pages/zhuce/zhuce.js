// pages/add/add.js
const cfg = require('../../utils/config.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCamera: false,
        src: [],
        xuehao: '',
        username: '',
        password: '',
        c:''
    },

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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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
    bindInputXuehao(e) {
        this.setData({
            xuehao: e.detail.value
        })
    },

    // 用户名输入
    bindInputUser(e) {
        this.setData({
            username: e.detail.value
        })
    },

    // 密码输入
    bindInputPwd(e) {
        this.setData({
            password: e.detail.value
        })
    },
    bindInputadmin(event) {
        console.log('获取输入管理员验证码', event.detail.value)
        this.setData({
            admin: event.detail.value
        })
    },

    // 保存用户
    addUser(e) {
        var that = this;
        let username = this.data.username
        let password = this.data.password
        let xuehao = this.data.xuehao
        let admin = this.data.admin
        let src = this.data.c
        console.log("点击了注册")
        console.log("username", username)
        console.log("password", password)
        console.log("xuehao", xuehao)
        console.log("admin", admin)
        console.log("src", src)
        if (src == '') {
            wx.showToast({
                title: '请先拍照',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (that.data.username == '') {
            wx.showToast({
                title: '请输入用户名',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (xuehao.length < 11) {
            wx.showToast({
                icon: 'none',
                title: '学号只能11位',
            })
            return
        }
        if (xuehao.length > 11) {
            wx.showToast({
                icon: 'none',
                title: '学号只能11位',
            })
            return
        }
        //校验管理员权限
        if (admin == "010116") {
            admin = 2
        } else {
            admin = 0
        }
        wx.cloud.database().collection('user').add({
            data: {
                username: username,
                password: password,
                xuehao: xuehao,
                admin: admin,
                src: src
            },
            success(res) {
                console.log('注册成功', res)
                wx.showToast({
                    title: '注册成功',
                });
                wx.redirectTo({
                    url: '../login/login',
                });
            },
            fail(res) {
                console.log('注册失败', res)
            },
        });
    },

    // 重拍
    reTakePhoto() {
        this.setData({
            isCamera: false
        });
    },
    // 上传照片
    uploadImage: function (imgs) {
        console.log(imgs)
        wx.showLoading({
            title: '上传图片中',
         mask: true,
        })
        // TODO 照片上传至云存储

        wx.cloud.uploadFile({
            cloudPath: `photos/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}.png`,

            filePath: imgs, // 文件路径
            success: res => {

                wx.showToast({
                    title: '上传图片成功'
                })
                console.log('res:', res)
                wx.hideLoading();
              // get resource ID
              console.log(res.fileID)
              this.setData({
                c: res.fileID,
            })
            },
            fail: err => {
              // handle error
              console.log('err:', err)
              wx.hideLoading();
              wx.showToast({
                  title: '上传图片错误',
                  icon: 'error'
              })
            }
          })

        // const uploadTasks = imgs.map(item => {
        //     return wx.cloud.uploadFile({
        //         cloudPath: `photos/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}.png`,
        //         filePath: item
        //     })
        // });
        // Promise.all(uploadTasks).then(result => {
        //     this.addPhotos(result);
        // }).catch(err => {
        //     wx.hideLoading();
        //     wx.showToast({
        //         title: '上传图片错误',
        //         icon: 'error'
        //     })
        // })
    },
    // 添加图片数据至数据库
    // addPhotos(photos) {
    //     wx.showLoading({
    //         title: '添加图片中',
    //         mask: true
    //     })
    //     // 构造照片数据结构体，保存到数据库
    //     const albumPhotos = photos.map(src => ({
    //         fileID: src.fileID,
    //         comments: ''
    //     }));
    //     db.collection('user').doc(app.globalData.id).update({
    //         data: {
    //             src: _.push(albumPhotos)
    //         }
    //     }).then(result => {
    //         console.log(result);
    //         this.init();
    //     })
    // },
    // 拍照
    takePhoto() {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                console.log('res:', res)
                this.setData({
                    src: res.tempImagePath,
                    isCamera: true
                })
                this.uploadImage(res.tempImagePath)
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
    }

})