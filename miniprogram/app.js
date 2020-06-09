//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://yanglq.xyz/user/login',
            data: {
              code: res.code
            },
            success: res => {
              var id = res.data;
              if (id < 0) {
                id = -id;
                wx.getUserInfo({
                  success: res1 => {
                    var username = res1.userInfo.nickName;
                    var sex = res1.userInfo.gender;
                    var headUrl = res1.userInfo.avatarUrl;
                    that.globalData.userInfo = res1.userInfo;
                    wx.request({
                      url: 'https://yanglq.xyz/user/addUser',
                      data: {
                        'id': id,
                        'username': username,
                        'headUrl': headUrl,
                        'sex': sex,
                      },
                      method: 'GET',
                      success: function (res) {
                        console.log(res);
                      },
                    })
                  }
                })
              }
              that.globalData.userInfo.uid = id;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.wxuserInfo = res.userInfo;
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
    var phoneInfo=wx.getSystemInfoSync();
    var pHeight=phoneInfo.windowHeight;//高
    this.globalData.pHeight = pHeight;
  },
  globalData: {
    userInfo: {},
    wxuserInfo: {},
  }
})