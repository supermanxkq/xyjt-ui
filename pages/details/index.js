var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    goodsPicsInfo: [{
      picurl: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE'
    }, {
        picurl: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg'
      }, {
        picurl: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg'
      }],
    shopppingDetails:{
      title: '雅马哈（YAMAHA）民谣木吉他初学者入门F310/F600男女41寸 印尼制 F310-经典原声款', reason:'❤【官方商城】印尼原装正品 ❤【精彩好礼】好琴赠好配件 ❤【免费教学】零基础轻松弹 ❤【顺丰闪送】全国顺丰包邮 ❤【新品推荐】国民单板登场'
    }
  },

  onLoad: function(options) {

    var that = this

    // 商品详情
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/inqgoods?id=' + options.id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        //console.log(res.data.data);
        that.data.shopppingDetails = res.data.data;

        var goodsPicsInfo = [];
        var goodsPicsObj = {};
        var goodspic = res.data.data.goodspics;
        var goodspics = goodspic.substring(0, goodspic.length - 1);
        var goodspicsArr = goodspics.split("#");
        for (var i = 0; i < goodspicsArr.length; i++) {
          goodsPicsInfo.push({
            "picurl": goodspicsArr[i]
          });
        }
        that.setData({
          goodsPicsInfo: goodsPicsInfo
        })
      }
    })

  }
})