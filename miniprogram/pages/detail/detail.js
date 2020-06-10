// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:false,
    space:"&emsp;&emsp;",
    succulent:{
      
    }
  },
  ViewImage(e) {
    var cur = [];
    cur.push('http://yanglq.xyz:4430' + this.data.succulent.imgUrl);
    wx.previewImage({
      urls: cur,
      current: cur[0]
    });
  },

  displayMore(e){
    this.setData({
      detail: true
    })
  },

  displayLess(e){
    this.setData({
      detail: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      succulent:JSON.parse(options.info)
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
