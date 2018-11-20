var app = getApp()
Page({
  data: {
    navMenu: {},
    curNav: 1,
    curIndex: 0,
    domain: app.globalData.domain
  },
  onLoad: function() {
    this.queryGoodsType();
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryGoodsType();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  //事件处理函数
  switchRightTab: function(e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  queryGoodsType:function(){
    var that = this
    wx.request({
      url: app.globalData.domain + '/backstage/goodstype/list',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          navMenu: res.data.navItems,
        })
      }
    })
  }

})