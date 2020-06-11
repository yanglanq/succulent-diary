// pages/newDiary/newdiary.js
let app = getApp();
Page({
  data: {
    haveImg: false,
    imgNum: 0,
    modalName: '',
    addbutton: 'https://yanglq.xyz/images/plantIcon/add.png',
    deletebutton: 'https://yanglq.xyz/images/plantIcon/delete.png',
    imgList: [],
    diary: [],
    height:null,
    temp: {
      watering: '00:00'
    }
  },



  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          });
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  editShow(e) {
    this.setData({
      modalName: "viewModal",
    })
  }, //隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  onTitle(e) {
    this.setData({
      ['temp.name']: e.detail.value,
    })
  },
  onMajor(e) {
    this.setData({
      ['temp.plant']: e.detail.value,
    })
  },

  TimeChange(e) {
    this.setData({
      ['temp.watering']: e.detail.value,
    })
  },

  onDescription(e) {
    this.setData({
      ['temp.description']: e.detail.value,
    })
  },

  onImg(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res.tempFilePaths[0]);
        that.setData({
          ['temp.headUrl']: res.tempFilePaths[0],
          haveImg: true,
          imgNum: 1
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

  onSubmit(e) {
    var that = this;
    var app = getApp();
    var D = that.data.diary;
    var name = that.data.temp.name;
    var uid = app.globalData.userInfo.uid; //用户id
    var plant = that.data.temp.plant;
    if (that.data.imgList.length > 0) var headUrl = that.data.imgList[0];
    var description = that.data.temp.description;
    var watering = that.data.temp.watering;
    if(typeof(name) == 'undefined' || typeof(plant) == 'undefined'){
      if(typeof(name) == 'undefined'){
        wx.showToast({
          title: '请输入日记本名称',
          icon: 'loading',
          duration: 800
        })
      }
      else {
        wx.showToast({
          title: '请输入多肉名称',
          icon: 'loading',
          duration: 800
        })
      }
    }
    else {
      if (that.data.imgList.length == 0) {
        wx.request({
          url: 'https://yanglq.xyz/diary/addBook',
          data: {
            name: name,
            plant: plant,
            uid: uid,
            description: description,
            watering: watering+":00",
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (res) {
            var id = res.data;
            var ans = {};
            ans.id = id;
            ans.name = name;
            ans.path = '';
            ans.plant = plant;
            ans.uid = uid;
            ans.description = description;
            ans.watering = watering;
            D.push(ans);
            that.setData({
              diary: D,
              haveImg: false,
              imgNum: 0,
              ['temp.watering']: '00:00',
              ['temp.plant']: '',
              ['temp.name']: '',
              ['temp.description']: '',
            })
            wx.showToast({
              title: '提交成功！',
              icon: 'success'
            })
            that.hideModal();
            that.load();
          }
        })
      } else {
        wx.request({
          url: 'https://yanglq.xyz/diary/addBook',
          data: {
            name: name,
            plant: plant,
            uid: uid,
            description: description,
            watering: watering,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (res) {
            var Id = res.data;
            wx.uploadFile({
              url: 'https://yanglq.xyz/diary/updateBook',
              filePath: headUrl, //文件路径  
              name: 'file', //随意
              header: {
                'Content-Type': 'multipart/form-data',
              },
              formData: {
                'id': Id,
                'name': name,
                method: 'POST' //请求方式
              },
              success: function (res) {
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
                  diary: D,
                  haveImg: false,
                  imgNum: 0,
                  ['temp.watering']: '00:00',
                  ['temp.plant']: '',
                  ['temp.name']: '',
                  ['temp.description']: '',
                  imgList: [],
                })
                wx.showToast({
                  title: '提交成功！',
                  icon: 'success'
                })
                that.hideModal();
                that.load();
              }
            })
          }
        })
      }
    }
  },

  //删除
  DeleteDiary(e) {
    var that = this;
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
          wx.request({
            url: 'https://yanglq.xyz/diary/deleteBook',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              id: ID,
            },
            success: function (res) {
              if (res.data == 1) {
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

  //跳转
  change(e) {
    wx.navigateTo({
      url: '../diaryList/diaryList?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
			height:app.globalData.height
		})
    this.load();
  },
  load(){
    var that = this;
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data: {
        id: app.globalData.userInfo.uid, //用户id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.length) {
          that.setData({
            diary: res.data
          })
        }
      },
      fail: function () {
        // fail
        wx.showModal({
          title: '加载失败',
          icon: 'loading'
        })
      },
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