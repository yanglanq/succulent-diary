//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    cardCur: 0,
    CustomBar: app.globalData.CustomBar,
    recommendMsg:"",
    diaryList:[],
    index:0,
    list:[],
    modalName:"",
    recommendList:[],
    url:"http://yanglq.xyz:4430",
    watheringList:[]// 该浇水的日记本列表
  },
  onLoad: function () {
    if(app.globalData.userInfo.id){
      wx.request({
        url: 'https://yanglq.xyz/diary/watering',
        data:{
          id:app.globalData.userInfo.uid
        },
        success:(res)=>{
          console.log(res.data);
          
          // this.setData({
          //   recommendMsg:res.data.msg
          // })
        },
        fail(err){
          throw err;
        }
      })
      wx.request({
        url: 'https://yanglq.xyz/diary/listBook',
        data: {
          id: app.globalData.userInfo.uid //用户id
        },
        success: (res)=>{
          if(res.data.length){
            this.setData({
              diaryList: res.data
            })
            let list = [];
            for (let i = 0; i < this.data.diaryList.length; i++) {
              list.push(this.data.diaryList[i].name)
            }
            this.setData({
              list:list
            })
          }
        }
      })
    }else{
      wx.login({
        success:(res)=>{
          if (res.code) {
            wx.request({
              url: 'https://yanglq.xyz/user/login',
              data: {
                code: res.code
              },
              success: res => {
                if(res.data < 0){
                  app.globalData.userInfo.uid = -res.data;
                }
                app.globalData.userInfo.uid = res.data;
                // 获取浇水数据
                wx.request({
                  url: 'https://yanglq.xyz/diary/watering',
                  data:{
                    id:app.globalData.userInfo.uid
                  },
                  success:(res)=>{
                    if(res.data.length){
                      
                      let data=res.data;
                      data.forEach(item => {
                        item.watering = item.watering.match(/\d{2}:\d{2}/);
                        
                      });
                      this.setData({
                        watheringList:data
                      })
                      this.setData({
                        modalName:"Modal"
                      })
                    }
                    
                  },
                  fail(err){
                    throw err;
                  }
                })
                wx.request({
                  url: 'https://yanglq.xyz/diary/listBook',
                  data: {
                    id: app.globalData.userInfo.uid //用户id
                  },
                  success: (res)=>{
                    if(res.data.length){
                      this.setData({
                        diaryList: res.data
                      })
                      let list = [];
                      for (let i = 0; i < this.data.diaryList.length; i++) {
                        list.push(this.data.diaryList[i].name)
                      }
                      this.setData({
                        list:list
                      })
                    }
                  }
                })
              }
            })
          } 
        }
      })
    }

    // 获取轮播图数据
    wx.request({
      url: 'https://yanglq.xyz/pic/getAll',
      success:(res)=>{
        this.setData({
          swiperList:res.data
        })
      },
      fail(err){
        throw err;
      }
    })
    wx.request({
      url: 'https://yanglq.xyz/succulent/searchByWord',
      data:{
        word:"清盛锦"
      },
      success: (res) => {
        console.log(res.data.data);
        
        this.setData({
          recommendList: res.data.data
        })
      },
      fail(err) {
        throw err;
      }
    })
    // 获取每日推荐数据
    wx.request({
      url: 'https://yanglq.xyz/msg/userGetMsg',
      success:(res)=>{
        this.setData({
          recommendMsg:res.data.msg
        })
      },
      fail(err){
        throw err;
      }
    })
    
    
  },
  viewInfo(e){
    wx.navigateTo({
      url: '../detail/detail?info='+JSON.stringify(e.currentTarget.dataset.info),
    })
  },
  hideModal(){
    this.setData({
      modalName:""
    })
  },
  search() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  newDiary() {
    wx.navigateTo({
      url: '/pages/newDiary/newDiary'
    })
  },
  PickerChange(e){
    wx.navigateTo({// 传该日记的id
      url: '../newDiary/newDiary?id=' + this.data.diaryList[e.detail.value].id
    })
  },
  // 图片预览
  showImgList(e) {
    let list = this.data.swiperList.map(item => this.data.url+item.url);
    wx.previewImage({
      urls: list,
      current: e.currentTarget.dataset.item.url
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})