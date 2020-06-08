// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: {
      title: "这是标题~",
      imgList: [],
      content: "这是正文~",
      id:null,
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id
    })
    wx.request({
      url: 'https://yanglq.xyz/diary/queryDiaryById',
      data: {
        id:that.data.diary.id,
      },
      method: 'GET', 
      success: function(res){
        console.log(res);
        var did = res.data.did;
        that.setData({
          ['diary.title']:res.data.title,
          ['diary.content']:res.data.inside,
        })
        wx.request({
          url: 'https://yanglq.xyz/diary/listImg',
          data: {
            did:did,
            id:that.data.diary.id,
          },
          method: 'GET', 
          success: function(res1){
            that.setData({
              ['diary.imgList']:res1.data,
            })
          }
        })
      }
    })  
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
