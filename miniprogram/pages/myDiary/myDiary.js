// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:0,
    haveImg:false,
    imgNum:0,
    modalName:'',
    addbutton:'https://yanglq.xyz/images/plantIcon/add.png',
    deletebutton:'https://yanglq.xyz/images/plantIcon/delete.png',
    diary: [],
    temp:{
      watering:'00:00'
    }
  },

  editShow(e){
		this.setData({
			modalName: "viewModal",
		})
	},//隐藏抽屉
	hideModal(e) {
		this.setData({
			modalName: null,
		})
  },
  
  onTitle(e){
    this.setData({
      ['temp.name']:e.detail.value,
    })
  },

  onMajor(e){
    this.setData({
      ['temp.plant']:e.detail.value,
    })
  },

  TimeChange(e) {
    this.setData({
      ['temp.watering']:e.detail.value,
    })
  },

  onWatering(e){
    this.setData({
      ['temp.watering']:e.detail.value,
    })
  },

  onDescription(e){
    this.setData({
      ['temp.description']:e.detail.value,
    })
  },

  onImg(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log(res.tempFilePaths[0]);
        that.setData({
          ['temp.headUrl']:res.tempFilePaths[0],
          haveImg:true,
          imgNum:1
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

  onSubmit(e){
    var that = this;
    var D = that.data.diary;
    var name = that.data.temp.name;
    var uid = that.data.uid;//用户id
    var plant = that.data.temp.plant;
    var headUrl = that.data.temp.headUrl;
    var description = that.data.temp.description;
    var watering = that.data.temp.watering;
    // console.log(tmp);
    wx.request({
      url: 'https://yanglq.xyz/diary/addBook',
      data: {
        name:name,
        plant:plant,
        uid: uid,
        description: description,
        watering: watering,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res.data);
        var Id = res.data;
        wx.uploadFile({
          url: 'https://yanglq.xyz/diary/updateBook',
          filePath: headUrl, //文件路径  
          name: 'file',  //随意
          header: { 
            'Content-Type': 'multipart/form-data',
          },
          formData: {
            'id':Id,
            'name':name,
            method: 'POST'   //请求方式
          },
          success: function(res){
            // success
            // console.log(res);
            var id = res.data;
            var ans = {};
            ans.headUrl = headUrl;
            ans.id = id;
            ans.name = name;
            ans.path = '';
            ans.plant = plant;
            ans.uid = uid;
            ans.description = description;
            ans.watering = watering;
            D.push(ans);
            that.setData({
              diary:D,
              haveImg:false,
              imgNum:0,
              ['temp.watering']:'00:00',
              ['temp.plant']:'',
              ['temp.name']:'',
            })
            // console.log(that.data.diary);
            
          }
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

  //删除
  DeleteDiary(e) {
    var that  = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除这本日记吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          var ID = that.data.diary[e.currentTarget.dataset.index].id;
          that.data.diary.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            ['diary']: that.data.diary
          })
          // console.log(ID);
          wx.request({
            url: 'https://yanglq.xyz/diary/deleteBook',
            header: {
              'Content-Type': 'application/json'
            },
            data:{
              id:ID,
            },
            success: function(res) {
              if(res.data == 1){
                wx.showToast({
                  title: '删除成功！',
                  icon: 'success'
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data: {
        id: app.globalData.userInfo.uid //用户id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          diary: res.data
        })
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