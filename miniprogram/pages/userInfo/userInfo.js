const app = getApp();
Page({
  data: {
    userInfo: {},
    // hasUserInfo:false
  },

  // getUserInfo:function(e){
  //   console.log(e.detail.userInfo);
  //   this.setData({
  //     userInfo:e.detail.userInfo,
  //     hasUserInfo:true
  //   })
  // },
  onLoad: function (options) {
    var that = this;
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo);
        that.data.userInfo = res.userInfo;
        that.setData({
          userInfo: that.data.userInfo
        })
      }
    })
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
})