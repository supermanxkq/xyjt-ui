//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: true, // loading
    userInfo:{},
    images: [{
      picurl: '../../images/banner1.png'
    }, {
      picurl: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg'
    }, {
      picurl: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg'
    }],
    venuesItems: [{
      smallpic: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE'
    }, {
        smallpic: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg'
    }, {
        smallpic: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg'
      },{
        smallpic: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE'
      },],
    choiceItems:[{
      goodspics:'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
      title:'雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他'
    }, {
        goodspics: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
        title: '雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他'
      }]
  },

  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '18004831028',
    })
  },

  onLoad: function() {
    console.log('onLoad')
    var that = this
    // wx.redirectTo({
    //   url: '../reserve/index',
    // })
    //调用应用实例的方法获取全局数据

    //sliderList
    // wx.request({
    //   url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
    //     that.setData({
    //       images: res.data
    //     })
    //   }
    // })

    //venuesList
    // wx.request({
    //   url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
    //     that.setData({
    //       venuesItems: res.data.data
    //     })
    //     setTimeout(function() {
    //       that.setData({
    //         loadingHidden: true
    //       })
    //     }, 1500)
    //   }
    // })

    //choiceList
    // wx.request({
    //   url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
    //     that.setData({
    //       choiceItems: res.data.data.dataList
    //     })
    //     setTimeout(function() {
    //       that.setData({
    //         loadingHidden: true
    //       })
    //     }, 1500)
    //   }
    // })

  }
})