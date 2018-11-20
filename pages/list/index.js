var app = getApp()
Page({
  data: {
    list: [{
      id: 1,
      goodspics: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
      country: '1999',
      bigname: '90%',
      title: '雅马哈(YAMAHA)印尼进口民谣吉他 雅马哈吉他 初学入门吉他',
      ourprice: '998',
      marketprice: '998'
    }, {
      id: 1,
        goodspics: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg',
      country: '996',
      bigname: '95%',
        title: '雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他',
      ourprice: '998',
      marketprice: '998'
    }, {
      id: 1,
        goodspics: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg',
      country: '999',
      bigname: '100%',
        title: '雅马哈（YAMAHA）民谣木吉他初学者入门F310/F600男女41寸 印尼制 F310-经典原声款',
      ourprice: '4990',
      marketprice: '998'
      }, {
        id: 1,
        goodspics: 'https://img12.360buyimg.com/n7/jfs/t27853/80/1673547331/206269/86a69cf2/5be9a750N52ce5ceb.jpg',
        country: '999',
        bigname: '100%',
        title: '雅马哈（YAMAHA）民谣木吉他初学者入门F310/F600男女41寸 印尼制 F310-经典原声款',
        ourprice: '4990',
        marketprice: '998'
      }, {
        id: 1,
        goodspics: 'https://img14.360buyimg.com/n7/jfs/t17119/218/692808582/98253/20e0800a/5aa22186Nd71d4fda.jpg',
        country: '996',
        bigname: '95%',
        title: '雅马哈(YAMAHA)SLG200STBL黑色民谣静音吉他',
        ourprice: '998',
        marketprice: '998'
      }, {
        id: 1,
        goodspics: 'http://192.168.0.102:8040/admin/image/download/31/GOODSTYPE',
        country: '1999',
        bigname: '90%',
        title: '雅马哈(YAMAHA)印尼进口民谣吉他 雅马哈吉他 初学入门吉他',
        ourprice: '998',
        marketprice: '998'
      }, ]
  },
  onLoad: function(options) {

    // var that = this

    // wx.request({
    //     url: 'http://www.huanqiuxiaozhen.com/wemall/goods/inqGoodsByTypeBrand?brand=' + options.brand + "&typeid=" + options.typeid,
    //     method: 'GET',
    //     data: {},
    //     header: {
    //         'Accept': 'application/json'
    //     },
    //     success: function(res) {
    //         that.setData({
    //             list: res.data.data
    //         });
    //     }
    // })
  }

})