var app = getApp()
Page({
  data: {
    navMenu: {},
    curNav: 1,
    curIndex: 0
  },
  onLoad: function() {
    var that = this
    wx.request({
      url: app.globalData.domain+'/backstage/goodstype/list',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          navMenu: res.data.navItems,
        })
      }
    })
  },

  //事件处理函数
  switchRightTab: function(e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
  }

})