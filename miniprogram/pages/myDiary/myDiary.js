// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: [{
      date: '',
      headUrl: '',
      id: '',
      name: '',
      path: '',
      uid: '',
    }],
  },

  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        
      }
    });
  },


  //删除
  Del(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这本日记吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.diary.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            ['diary']: this.data.diary
          })
        }
      }
    })
  },

  // InputName(e){
  //   if (this.data.diary.name.length != 0) {
  //     this.setData({
  //       ['diary.name']: this.data.diary.name.concat(res.detail.value)
  //     })
  //   } else {
  //     this.setData({
  //       ['diary.name']: e.detail.value
  //     })
  //   }
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data:{
        id:'1'//用户id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        // success
        // console.log(res.data);
        that.setData({
	        diary:res.data
        })        
      },
      fail: function() {
        // fail
      },
      complete: function() {
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