// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: {
      title: "这是标题~",
      imgList: [],
      content: "这是正文~"
    }
  },

  textInput(e) {
    this.setData({
      ['diary.title']: e.detail.value
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 8, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.diary.imgList.length != 0) {
          this.setData({
            ['diary.imgList']: this.data.diary.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            ['diary.imgList']: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.diary.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.diary.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            ['diary.imgList']: this.data.diary.imgList
          })
        }
      }
    })
  },
  textareaInput(e) {
    this.setData({
      ['diary.content']: e.detail.value
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
    var that = this;
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data: {
        id: '0' //用户id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // success
        // console.log(res.data);
        var D = [];
        for (var i = 0; i < res.data.length; i++) {
          var tmp = {};
          tmp.headUrl = res.data[i].headUrl;
          tmp.id = res.data[i].id;
          tmp.name = res.data[i].name;
          tmp.path = res.data[i].path;
          tmp.uid = res.data[i].uid;
          D.push(tmp);
        }
        that.setData({
          diary: D
        })
        console.log(D);
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
