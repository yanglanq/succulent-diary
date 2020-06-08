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
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              // console.log(res);
              var id = res.data;
              if(id < 0){
                id = -id;
                wx.getUserInfo({
                  success:res1=>{
                    // console.log(res1);
                    var username = res1.userInfo.nickName;
                    var sex = res1.userInfo.gender;
                    var headUrl = res1.userInfo.avatarUrl;
                    that.globalData.userInfo = res1.userInfo;
                    // console.log(that.globalData.userInfo);
                    wx.request({
                      url: 'https://yanglq.xyz/user/addUser',
                      data: {
                        'id':id,
                        'username':username,
                        'headUrl':headUrl,
                        'sex':sex,
                      },
                      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function(res){
                        // success
                        console.log(res);
                      },
                      fail: function() {
                        // fail
                      },
                      complete: function() {
                        // complete
                      }
                    })
                  }
                })
              }
              that.globalData.userInfo.uid = id;
              // console.log(that.globalData.userInfo);
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
              // that.globalData.userInfo.uid = 58;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    wxuserInfo: {},
  }
})