var app = getApp()
Page({
  data: {
    userInfo: {},
    addressList: {},
    domain: app.globalData.domain,
    delBtnWidth: 360 //删除按钮宽度单位（rpx）
  },

  onLoad: function() {
    this.queryAddressList();
    this.initEleWidth();
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.queryAddressList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  //查询地址列表
  queryAddressList: function() {
    var that = this;
    //请求后台获取地址列表数据
    var user = wx.getStorageSync('user') || {};
    console.log('查询地址列表，获取到的openID：' + user.openid);
    wx.request({
      url: app.globalData.domain + '/backstage/takeaddress/list?crUsId=' + user.openid,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.resultCode == 'SUCCESS') {
          console.log(res)
          that.setData({
            addressList: res.data.content
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'loading'
          })
        }
      }
    })
  },
  //跳转到新增收货人页面
  toAddPage: function() {
    wx.redirectTo({
      url: 'addAddress/index',
    })
  },
  //删除地址信息
  delete_address: function(e) {
    var id = e.target.dataset.index;
    console.log('删除地址，获取到的ID是' + id);
    wx.showModal({
      title: '删除地址',
      content: '确定要删除地址信息吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/backstage/takeaddress/remove/' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.resultCode == 'SUCCESS') {
                console.log("删除成功！")
                wx.redirectTo({
                  url: 'index',
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
  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.addressList;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          addressList: list
        });
      }
    }
  },

  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.addressList;
      console.log(e);
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          addressList: list
        });
      }
    }
  },
  //设置默认地址
  setDefaultAddress: function(e) {
    var id = e.target.dataset.setdefaultid;
    var user = wx.getStorageSync('user') || {};
    console.log('设默认地址，获取到的ID是' + id);
    wx.showModal({
      title: '设置默认地址',
      content: '确定要设置为默认地址吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/backstage/takeaddress/setdefault/' + id + '/' + user.openid,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.resultCode == 'SUCCESS') {
                console.log("设置成功！")
                wx.redirectTo({
                  url: 'index',
                })
              } else {
                console.log("设置失败！");

              }
            }
          })
        } else {
          console.log("用户点击取消");
        }
      }
    })
  },
  toIndex: function() {
    wx.reLaunch({
      url: '../../classify/index',
    })
  }
})