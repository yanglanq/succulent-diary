// pages/diaryList/diaryList.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
	data: {
		diary: {
			name: "日记名称"
		},
		imgList: [],
		diaryList: [],
		id: null,
		url: "http://yanglq.xyz:4430",
		height:null
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		this.setData({
			height:app.globalData.pHeight
		})
		this.setData({
			id: options.id
		})
		//获取日记详细信息
		wx.request({
			url: 'https://yanglq.xyz/diary/queryBookById',
			data: {
				id: options.id
			},
			success: (res) => {
				let data = res.data;
				data.watering = data.watering.match(/\d{2}:\d{2}/)[0]
				this.setData({
					imgList: [this.data.url + res.data.headUrl + ""]
				})
				this.setData({
					diary: data
				})
			},
			fail(err) {
				throw err;
			}
		})
		// 获取日记列表信息
		this.loadData(options.id);
	},
	loadData(id){
		wx.request({
			url: 'https://yanglq.xyz/diary/listDiary',
			data: {
				id: id
			},
			success: (res) => {
				let data = [];
				res.data.forEach(item => {
					item.date = item.date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/g)[0].split("T")
					
					if(Number(item.date[1].split(":")[0])>=12&&Number(item.date[1].split(":")[1])>0){
						item.time="下午"
					}else{
						item.time="上午"
					}
					data.push(item);
				});
				this.setData({
					diaryList: data
				})
			},
			fail(err) {
				throw err;
			}
		})
	},
	delete(e){
		wx.showModal({
			title: '提示',
			content: '确认要删除吗?',
			success: (res)=>{
			  if (res.confirm) {
				wx.request({
					url: 'https://yanglq.xyz/diary/deleteDiary',
					data: {
						id: e.currentTarget.dataset.item.id
					},
					success: (res) => {
						if(res.data){
							let list = this.data.diaryList.splice(e.currentTarget.dataset.index,1);
							this.setData({
								diaryList:list
							})
							wx.showToast({
							  title: '删除成功',
							})
						}
					},
					fail(err) {
						throw err;
					}
				})
			  }
			}
		})
		
	},
	onSubmit() {
		// 传图片
		if (/http:\/\/tmp/.test(this.data.imgList[0])) {
			// 有图片
			wx.uploadFile({
				url: 'https://yanglq.xyz/diary/updateBook',
				filePath: this.data.imgList[0], //文件路径  
				name: 'file',  //随意
				header: {
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'id': this.data.id,
					method: 'POST'   //请求方式
				},
				success: (res1) => {
				}
			})
		}
		// 传文字
		wx.request({
			url: 'https://yanglq.xyz/diary/update',
			data: {
				'id': this.data.id,
				'name': this.data.diary.name,
				'plant': this.data.diary.plant,
				'description': this.data.diary.description,
				'watering': this.data.diary.watering+":00",
			},
			success: (res) => {
				if(res.data){
					wx.showToast({
						title: '修改成功',
					})
					this.hideModal();
				}
			}
		})
	},
	onTitle(e) {
		this.setData({
			["diary.name"]: e.detail.value,
		})
	},
	onPlant(e) {
		this.setData({
			["diary.plant"]: e.detail.value,
		})
	},
	textareaInput(e) {
		this.setData({
			["diary.description"]: e.detail.value,
		})
	},
	newDairy(){
		wx.navigateTo({// 传该日记的id
			url: '../newDiary/newDiary?id=' + this.data.id
		})
	},
	viewDetail(e){
		console.log(e.currentTarget.dataset.id);
		wx.navigateTo({// 传该日记的id
			url: '../viewDiary/viewDiary?id=' + e.currentTarget.dataset.id
		})
	},
	editShow(e) {
		this.setData({
			modalName: "viewModal",
		})
	},
	//隐藏抽屉
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
	TimeChange(e) {
		console.log(e);

		let time = "diary.watering"
		this.setData({
			[time]: e.detail.value
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