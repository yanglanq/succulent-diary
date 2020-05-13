const app = getApp();
Page({
  data: {
    userInfo: {},
    duorouNum:0,
    diaryNum:0,
    number:[0,1,2,3,4,5,6,7,8,9,10]
    // hasUserInfo:false
  },
  duorouNumChange(e) {
    // console.log(e);
    this.setData({
      duorouNum: e.detail.value
    })
  },
  diaryNumChange(e) {
    this.setData({
      diaryNum: e.detail.value
    })
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