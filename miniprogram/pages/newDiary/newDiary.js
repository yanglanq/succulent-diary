// import {formatDate} from "../../utils/util.js"
// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: {
      title: "",
      imgList: [],
      content: "",
      id:null
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
      wx.showModal({
        title: '提示',
        content: '确认提交嘛？',
        success: (res)=>{
          if (res.confirm) { 
            wx.request({
              url: 'https://yanglq.xyz/diary/addDiary',
              data:{
                bid:Number(this.data.id),
                title:this.data.diary.title,
                inside:this.data.diary.content,
              },
              header:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              method:"POST",
              success:(res)=>{
                let i = 0;
                if(this.data.diary.imgList.length){
                  this.data.diary.imgList.forEach(item => {
                    wx.uploadFile({
                      url: 'https://yanglq.xyz/diary/updateDiary',
                      filePath: item, //文件路径  
                      name: 'file',  //随意
                      header: { 
                        'Content-Type': 'multipart/form-data',
                      },
                      formData: {
                        'id':res.data,
                        method: 'POST'   //请求方式
                      },
                      success:(res1)=>{
                        if(res1.data==="1"){
                          i++;
                          if(i==this.data.diary.imgList.length){
                            wx.showToast({
                              title: '添加成功',
                            })
                            wx.navigateBack({
                              delta: 1
                            });
                          }
                        }
                      }
                    })
                  });
                }else{
                  wx.showToast({
                    title: '添加成功',
                  })
                  wx.navigateBack({
                    delta: 1
                  });
                }
              },
              fail(err){
                throw err;
              }
            })
          } 
        }
      })
  },
  uploadImage(id){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  formatDate(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = minute < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
  }
})
