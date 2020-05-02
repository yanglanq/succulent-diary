// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: {
      title: "在这里输入标题，最多30个字符",
      imgs: [],
      content: "美好的一天，写点东西吧^o^"
    }
  },

  titleConfirm: function (e) {
    console.log(e);
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.diary.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.diary.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['删除该图片'],
      success: function (res) {
        if (!res.cancel) {
          // console.log(res.tapIndex)
          if (res.tapIndex === 0) {
            var imgs = that.data.diary.imgs;
            var index = e.currentTarget.dataset.index;
            imgs.splice(index, 1);
            that.setData({
              imgs: imgs
            });
          }
        }
      }
    })
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.diary.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  contentConfirm: function (e) {
    console.log(e)
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },

  diarySubmit: function (e) {
    // console.log(e);
      wx.showModal({
        title: '提示',
        content: '确认保存嘛？',
        success: function (res) {
          if (res.confirm) {  
            console.log('确认')
          } else {   
            console.log('取消')
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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