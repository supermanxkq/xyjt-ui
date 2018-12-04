var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    goodsId: 0,
    goodsPicsInfo: {},
    chooseSize: false,
    animationData: {},
    shopppingDetails: {},
    domain: app.globalData.domain,
    disabled: false
  },

  onLoad: function(options) {
    var that = this
    // 商品详情
    wx.request({
      url: app.globalData.domain + '/backstage/goods/view/' + options.id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          shopppingDetails: res.data,
          goodsPicsInfo: res.data.goodsPicVos
        })
      }
    })

  },
  //弹出层展示
  chooseSezi: function(e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  //隐藏弹出层
  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  //点击加入购物车
  addShopCart: function(e) {
    var that = this;
    that.setData({
      disabled: true
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.address);
    var user = wx.getStorageSync('user') || {};
    console.log(user);
    wx.request({
      url: app.globalData.domain + '/backstage/cart/check',
      method: 'POST',
      data: {
        'crUsId': user.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.resultCode == 'SUCCESS' && res.data.goodsNum==0) {
          wx.request({
            url: app.globalData.domain + '/backstage/cart/create',
            method: 'POST',
            data: {
              'goodsId': e.detail.value.goodsId,
              'goodsNum': 1,
              'crUsId': user.openid
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.data.resultCode == 'SUCCESS') {
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          });
        } else if (res.data.resultCode == 'SUCCESS' && res.data.goodsNum == -1){
          wx.showToast({
            title: '购物车满了',
          })
        }
      }
    });

  },
  //跳到购物车界面
  toCartPage: function() {
    wx.reLaunch({
      url: '../cart/index',
    })
  },
  contact: function() {
    wx.makePhoneCall({
      phoneNumber: '18004831028',
    })
  }
})