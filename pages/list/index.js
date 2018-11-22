var app = getApp()
Page({
  data: {
    list:{},
    domain: app.globalData.domain,
    goodsTypeId:0
    // list: [{
    //   id: 1,
    //   goodspics: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
    //   country: '1999',
    //   bigname: '90%',
    //   title: '雅马哈(YAMAHA)印尼进口民谣吉他 雅马哈吉他 初学入门吉他',
    //   ourprice: '998',
    //   marketprice: '998'
    // }, {
    //   id: 1,
    //   goodspics: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg',
    //   country: '996',
    //   bigname: '95%',
    //   title: '雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他',
    //   ourprice: '998',
    //   marketprice: '998'
    // }, {
    //   id: 1,
    //   goodspics: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg',
    //   country: '999',
    //   bigname: '100%',
    //   title: '雅马哈（YAMAHA）民谣木吉他初学者入门F310/F600男女41寸 印尼制 F310-经典原声款',
    //   ourprice: '4990',
    //   marketprice: '998'
    // }, {
    //   id: 1,
    //   goodspics: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg',
    //   country: '999',
    //   bigname: '100%',
    //   title: '雅马哈（YAMAHA）民谣木吉他初学者入门F310/F600男女41寸 印尼制 F310-经典原声款',
    //   ourprice: '4990',
    //   marketprice: '998'
    // }, {
    //   id: 1,
    //   goodspics: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg',
    //   country: '996',
    //   bigname: '95%',
    //   title: '雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他',
    //   ourprice: '998',
    //   marketprice: '998'
    // }, {
    //   id: 1,
    //   goodspics: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
    //   country: '1999',
    //   bigname: '90%',
    //   title: '雅马哈(YAMAHA)印尼进口民谣吉他 雅马哈吉他 初学入门吉他',
    //   ourprice: '998',
    //   marketprice: '998'
    // }, ]
  },
  onLoad: function(options) {
    this.queryGoodsList(options.goodsTypeId);
    this.setData({
      goodsTypeId: options.goodsTypeId
    });
  },
  /**
   * 查询商品列表
   */
  queryGoodsList(goodsTypeId){
    var that = this
    wx.request({
      url: app.globalData.domain + '/backstage/goods/list?goodsTypeId=' + goodsTypeId,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.content,
        });
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryGoodsList(this.data.goodsTypeId);
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

})