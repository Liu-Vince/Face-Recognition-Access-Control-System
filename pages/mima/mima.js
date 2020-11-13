// pages/mima/mima.js
Page({
  data: {
    Mima: ''
    },
  getMima(event) {
    console.log('获取输入的密码', event.detail.value)
    this.setData({
     Mima: event.detail.value
    })
    },

    tijiao() {
      let Mima = this.data.Mima
      console.log("Mima", Mima)
      if (Mima == "010116")
      {
        wx.redirectTo({
          url: '../home/home',
         })
      }else
      {
        console.log('密码错误')
        wx.showToast({
          icon: 'none',
          title: '密码错误',
        })
      }
    }
})