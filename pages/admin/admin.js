// pages/admin/admin.js
const app=getApp();
const db=wx.cloud.database();
const _=db.command;
Page({
    //获取学号
    getName(event) {
      console.log('获取输入的学号', event.detail.value)
      this.setData({
       xuehao: event.detail.value
      })
      },
  tijiao() {
    let xuehao = this.data.xuehao
    console.log("点击了提交")
    console.log("xuehao", xuehao)
    //校验学号
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
  

  db.collection('user').where({
    xuehao: xuehao
   }).get({
    success(res) {
     console.log("获取数据成功", res)
     let user = res.data[0]
     console.log("user", user)
     db.collection('user').doc(user._id).update({
       data:{
         admin:1
       }
     })
    },
    fail(res) {
     console.log("获取数据失败", res)
    }
   })

  }
 
})