// pages/newDiary/newdiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:false,
    space:"&emsp;&emsp;",
    succulent:{
      // Name:"",
      // PlantId:[],
      // ImgUrl:[],
      // Alias:[],
      // Classify:[],
      // Florescence:[],
      // Intro:["介绍",""],
      // Feature:["形态特征",""],
      Name:"月宴",
      PlantId:[],
      ImgUrl:"",
      Alias:["别名","断崖女王、巴西薄雪草、月之宴、红花断崖"],
      Classify:["分类","多肉多浆植物"],
      Florescence:["盛花期","春季"],
      Intro:["介绍","月宴又名断崖女王，是隶属于苦苣苔科大岩桐属（也称岩桐属）石生植物、多肉植物。具底下块茎，叶面被有稠密、质感似天鹅绒的大量白色绒毛；生于枝顶端，数朵群聚开放，花筒较细，长3至4厘米，直径约2厘米，花瓣先端稍微弯曲，橙红色或朱红色，外被白色绒毛，春季至初夏开放，4至5月开花最盛。在野外由蜂鸟传粉。","月宴形态美丽奇异，适合用排水良好的介质栽种，可装点明亮的窗台、阳台以及室内的几架、桌桉等处。"],
      Feature:["形态特征","月宴叶色奇特，上面的白色绒毛犹如动物皮毛般光滑，又像月光洒在叶面上，非常美丽；橙红色的花朵鲜豔夺目；球茎古朴雅致，是花、叶俱佳的多肉植物。适合用古色古香的紫砂盆栽种，布置窗台、阳台以及室内的几架、桌桉等处，自然清新，效果独特。","“断崖之女王”也称“断崖女王”、“月之宴”、“月宴”，为苦苣苔科月之宴属多年生肉质草本植物。植株具球状或甘薯状肉质茎(俗称“块根”)，表皮呈黄褐色，有须根，顶端簇生绿色枝条，高20-30cm，表面密生短小白毛。","月宴的叶片生于枝条上部，椭圆形或长椭圆形，交互对生，全缘，先端尖，绿色，叶长8至12釐米，宽4至6釐米，叶表密生厚实的白色绒毛，有光泽。花生于枝顶端，数朵群聚开放，花筒较细，长3至4釐米，直径约2釐米，花瓣先端稍微弯曲，橙红色或朱红色，外被白色绒毛，春末至初秋开放，4至5月开花最盛。"],
    }
  },
  
  displayMore(e){
    this.setData({
      detail: true
    })
  },

  displayLess(e){
    this.setData({
      detail: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.info));
    
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
