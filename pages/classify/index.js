var app = getApp()
Page({
  data: {
    navMenu: {},
    curNav: 1,
    curIndex: 0,
    domain: app.globalData.domain,
    showList: true,
    images: {}
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
        setTimeout(() => {
          that.setData({
            showList: false
          });
        }, 250);
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
  }, 
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 100,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 100 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  }

})