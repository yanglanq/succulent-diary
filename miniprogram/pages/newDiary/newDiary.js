
// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: {
      title: "",
      imgList: [],
      content: ""
    }
  },

  textInput(e) {
    if(e.detail.value!=""){
      this.setData({
        ['diary.title']: e.detail.value
      })
    }
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
  diarySubmit(e){
    // console.log(e);
      wx.showModal({
        title: '提示',
        content: '确认提交嘛？',
        success: (res)=>{
          if (res.confirm) {  
            console.log('确认')
            console.log(this.data.diary);
            
          } 
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
  },
})
