var app = getApp()
Page({
  data: {
    list: {},
    domain: app.globalData.domain,
    goodsTypeId: 0,
    goodsName: ''
  },
  onLoad: function(options) {
    if (options.goodsName) {
      this.setData({
        goodsName: options.goodsName
      });
      this.queryGoodsListByName(options.goodsName);
    } else {
      this.queryGoodsList(options.goodsTypeId);
      this.setData({
        goodsTypeId: options.goodsTypeId
      });
    }
  },
  queryGoodsListByName(goodsName) {
    var that = this
    wx.request({
      url: app.globalData.domain + '/backstage/goods/list?name=' + goodsName,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          list: res.data.content,
        });
      }
    })
  },
  /**
   * 查询商品列表
   */
  queryGoodsList(goodsTypeId) {
    var that = this
    wx.request({
      url: app.globalData.domain + '/backstage/goods/list?goodsTypeId=' + goodsTypeId,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          list: res.data.content,
        });
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    if (this.data.goodsTypeId != 0) {
      this.queryGoodsList(this.data.goodsTypeId);
    } else if (this.data.goodsName) {
      this.queryGoodsListByName(this.data.goodsName);
    }

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

})