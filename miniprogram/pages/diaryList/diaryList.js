// pages/diaryList/diaryList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        thisDiary:{
            name:"日记名称"
        },
        diaryList:[
            {
                
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
		this.setData({
			imgList: [],
		})
		this.setData({
			card: {}
		})
	},
})