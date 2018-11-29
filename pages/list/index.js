var app = getApp()
Page({
  data: {
    list:{},
    domain: app.globalData.domain,
    goodsTypeId:0
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