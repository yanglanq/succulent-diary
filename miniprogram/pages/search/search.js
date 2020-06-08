// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyList: [],
    // searchList:[{
    //   imgUrl:"https://yanglq.xyz/images/ziyuan1.png",
    //   name:"清盛锦",
    //   alias:"艳日晖  灿烂  艳日辉",
    //   intro:"清盛锦又称“灿烂”，为景天科、莲花掌属多年生肉质草本植物，清盛锦株形秀丽美观，叶片色彩绚丽斑斓，常用小型工艺盆栽种，装饰窗台、几架、..."
    // }]
    searchList: [],
    searchWord: "清盛锦",
    url:"http://yanglq.xyz:4430"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取搜索热词
    wx.request({
      url: 'https://yanglq.xyz/succulent/getHotWord',
      success: (res) => {
        this.setData({
          hotKeyList: res.data
        })
      },
      fail(err) {
        throw err;
      }
    })
  },
  search(e) {
    
    let word;
    if (e.currentTarget.dataset.searchword) {
      word = e.currentTarget.dataset.searchword
    }else{
      word = this.data.searchWord
    }
    console.log(word);
    wx.request({
      url: 'https://yanglq.xyz/succulent/searchByWord',
      data:{
        word:word
      },
      success: (res) => {
        console.log(res.data.data);
        
        this.setData({
          searchList: res.data.data
        })
      },
      fail(err) {
        throw err;
      }
    })
    
  },
  searchWordChange(e) {
    this.setData({
      searchWord: e.detail.value
    })
  }

})