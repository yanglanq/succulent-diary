const app = getApp();
Page({
  data: {
    userInfo: {},
    duorouNum: 0,
    diaryNum: 0,
    // hasUserInfo:false
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onLoad: function () {
    var that = this;
    var app = getApp();
    that.setData({
      userInfo:app.globalData.wxuserInfo
    })
    var uid = app.globalData.userInfo.uid;
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data: {
        id: uid, 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          diaryNum: res.data.length,
          duorouNum: res.data.length
        })
      },
      fail: function () {
        // fail
        wx.showModal({
          title: '加载失败',
          icon:'loading'
        })
        this.hideModal();
      },
    })
  },
})