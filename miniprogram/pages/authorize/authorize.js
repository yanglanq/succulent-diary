// pages/authorize/authorize.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  
  getUserInfo(e){
    console.log(e);
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
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
                    },
                    fail: function () {
                      console.log("获取失败！")
                    },
                    complete: function () {
                      console.log("获取用户信息完成！")
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
      wx.switchTab({
        url: '../index/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success: function(res) {
    //     if(res.authSetting['scope.userInfo']){
    //       wx.getUserInfo({
    //         success: function(res){
    //           // success
    //           // console.log(res.userInfo);
    //         },
    //         fail: function() {
    //           // fail
    //         },
    //         complete: function() {
    //           // complete
    //         }
    //       })
    //     }
    //   }
    // });
      
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

  }
})