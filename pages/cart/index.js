var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空哒～',
    list: {},
    domain: app.globalData.domain,
  },
  onLoad: function() {
    this.queryCartList();
  },
  /**
   * 生命周期函数--监听页面显示1
   */
  onShow: function () {
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
    wx.redirectTo({
      url: '../my/order/addOrder/index',
    })
  },
  deleteCart:function(e){
    var id = e.target.dataset.cartid;
    console.log('删除商品，获取到的ID是' + id);
    wx.showModal({
      title: '删除购物车商品',
      content: '确定要删除购物车商品吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/backstage/cart/remove/' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.resultCode == 'SUCCESS') {
                console.log("删除成功！")
                wx.reLaunch({
                  url: '../cart/index',
                })
              } else {
                console.log("删除失败！");

              }
            }
          })
        } else {
          console.log("用户点击取消");
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小野吉他工作室',
      path: '/pages/classify/index',
      imageUrl: "/images/share2.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})