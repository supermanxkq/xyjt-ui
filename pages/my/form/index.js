var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    cartImg: '../../../images/a0p.png',
    domain: app.globalData.domain,
    tipWords: '您还没有订单呢～'
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作∏
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryList();
  },
  /**
   * 查询详情
   */
  queryList: function() {
    var that = this;
    var user = wx.getStorageSync('user') || {};
    wx.request({
      url: app.globalData.domain + '/backstage/coursereserve/list?crUsId=' + user.openid,
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
  deleteItem: function (e) {
    var id = e.target.dataset.index;
    wx.showModal({
      title: '删除表单',
      content: '确定要表单吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/backstage/coursereserve/remove/' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.resultCode == 'SUCCESS') {
                console.log("删除成功！")
                wx.redirectTo({
                  url: '../form/index',
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})