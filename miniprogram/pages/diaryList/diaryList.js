// pages/diaryList/diaryList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        diary:{
            name:"日记名称"
        },
        imgList:[],
        diaryList:[
            {
                
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		//获取日记详细信息
		wx.request({
			url: 'https://yanglq.xyz/diary/queryBookById',
			data:{
				id:options.id
			},
			success:(res)=>{
				console.log(res.data);
				
			//   this.setData({
			// 	diary:res.data.msg
			//   })
			},
			fail(err){
			  throw err;
			}
		})
		// 获取日记列表信息
		wx.request({
			url: 'https://yanglq.xyz/diary/listDiary',
			data:{
				id:options.id
			},
			success:(res)=>{
				console.log(res.data);
				
			//   this.setData({
			// 	recommendMsg:res.data.msg
			//   })
			},
			fail(err){
			  throw err;
			}
		})
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
    TimeChange(e){
        let time = "diary.time"
        this.setData({
            [time]:e.detail.data
        })
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
})