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
                  wx.getUserInfo({
                    success: res1 => {
                      var username = res1.userInfo.nickName;
                      var sex = res1.userInfo.gender;
                      var headUrl = res1.userInfo.avatarUrl;
                      that.globalData.userInfo = res1.userInfo;
                      wx.request({
                        url: 'https://yanglq.xyz/user/addUser',
                        data: {
                          'id': -res.data,
                          'username': username,
                          'headUrl': headUrl,
                          'sex': sex,
                        },
                        method: 'GET',
                        success: function (res) {
                        },
                      })
                    },
                    fail: function () {
                    },
                    complete: function () {
                    }
                  })
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
                this.loadDiaryList();
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
  loadDiaryList(){
    wx.request({
      url: 'https://yanglq.xyz/diary/listBook',
      data: {
        id: app.globalData.userInfo.uid //用户id
      },
      success: (res)=>{
        this.setData({
          diaryList: res.data
        })
        let list = [];
        if(res.data.length){
          for (let i = 0; i < this.data.diaryList.length; i++) {
            list.push(this.data.diaryList[i].name)
          }
        }
        this.setData({
          list:list
        })
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
  PickerChange(e){
    wx.navigateTo({// 传该日记的id
      url: '../newDiary/newDiary?id=' + this.data.diaryList[e.detail.value].id
    })
  },
  check(){
    if(!this.data.diaryList.length){
      wx.showToast({
        title: '请先建日记本哦~',
        icon: 'none',
      })
    }
  },
  // 图片预览
  showImgList(e) {
    let list = this.data.swiperList.map(item => this.data.url+item.url);
    
    wx.previewImage({
      urls: list,
      current: this.data.url+e.currentTarget.dataset.item.url
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
  },
  onShow: function () {
    this.loadDiaryList();
  },
})