import {CDN_PATH} from '../../config/appConfig';
const RADIUS = 4;
const INIT_MARKER = {
	callout: {
		content: '云大信息学院',
		padding: 10,
		borderRadius: 2,
		display: 'ALWAYS'
	},
	latitude: 24.824806,
	longitude: 102.850957,
	iconPath: '/photo/Marker1_Activated@3x.png',
	width: '34px',
	height: '34px',
	rotate: 0,
	alpha: 1
};
const INIT_CALLOUT = {
	content: '云大信息学院',
	padding: 12,
	display: 'ALWAYS',
	fontSize: 14,
	textAlign: 'left',
	borderRadius: RADIUS,
	borderWidth: 2,
	bgColor: '#ffffff'
};
const INIT_CALLOUT_MARKER = {
	callout: {
		...INIT_CALLOUT
	},
	latitude: 24.824806,
	longitude: 102.850957,
};
Page({
	data: {
		markers: [{
			...INIT_MARKER
		}],
		calloutMarkers: [{
			...INIT_CALLOUT_MARKER
		}],
     longitude:0,
     latitude:0
	},
  
  /**
   * 页面的初始数据
   */
  // data: {
  //   longitude:0,
  //   latitude:0
  // },
  bindcontroltap: function(e) {
    
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.timer = options.timer;
    wx.getLocation({
      success: (res)=> {
        this.setData({
          longitude : res.longitude,
          latitude : res.latitude
        })
      },
    })
    wx.getSystemInfo({  
      success: (res)=> {
        this.setData({

        })
      },
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  movetoCenter: function () {
    this.mapctx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapctx = wx.createMapContext("map");
    this.movetoCenter();
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
  
  }
})