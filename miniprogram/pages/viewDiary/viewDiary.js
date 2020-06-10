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
      id: null
    }
  },
  ViewImage(e) {
    var cur = [];
<<<<<<< HEAD
    for (var i = 0; i < this.data.diary.imgList.length; i++) {
      cur.push('http://yanglq.xyz:4430' + this.data.diary.imgList[i]);
=======
    for(var i = 0;i < this.data.diary.imgList.length;i++){
      cur.push('http://yanglq.xyz:4430' + this.data.diary.imgList[i].picUrl);
>>>>>>> 80319d65327babe587cda726857398ec24b160b1
    }
    wx.previewImage({
      urls: cur,
      current: e.currentTarget.dataset.url
    });
  },
  onShareAppMessage(res){
    if (res.from === 'button') {

    }
    return {
      title: '转发',
      path: '/pages/viewDiary/viewDiary?id=' + this.data.id,
      imageUrl:this.data.diary.imgList.length?'http://yanglq.xyz:4430'+this.data.diary.imgList[0].picUrl:"",
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        })
      }
    }
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    wx.request({
      url: 'https://yanglq.xyz/diary/queryDiaryById',
      data: {
        id: options.id,
      },
      method: 'GET',
      success: function (res) {
        var did = res.data.did;
        that.setData({
          ['diary.title']: res.data.title,
          ['diary.content']: res.data.inside,
        })
        wx.request({
          url: 'https://yanglq.xyz/diary/listImg',
          data: {
            did: did,
            id: options.id,
          },
          method: 'GET',
          success: function (res1) {
            that.setData({
              ['diary.imgList']: res1.data,
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


})
