var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空哒～',
    list: {},
    domain: app.globalData.domain
  },
  onLoad: function() {
    this.queryCartList();
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryCartList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作∏
    wx.stopPullDownRefresh();
  },
  //查询购物车列表
  queryCartList() {
    var user = wx.getStorageSync('user') || {};
    var that = this
    wx.request({
      url: app.globalData.domain + '/backstage/cart/list?crUsId='+user.openid,
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
  //点击结算按钮，跳转到提交订单页面
  settle:function(){
    wx.navigateTo({
      url: '../my/order/addOrder/index',
    })
  }
})