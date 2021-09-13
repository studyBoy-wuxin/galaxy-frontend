export default {
  pages: [
    'pages/Owner/index',
    'pages/ServiceCenter/index',
    'pages/CompanyPage/index',
    'pages/TransactionPage/index',
    'pages/Studycenter/index',
    'pages/FixedText/index',
    'pages/MarketNeed/index',
    'pages/MarketInfo/index',
    'pages/Contract/index',
    'pages/CourseInfo/index',
    'pages/Experience/index',
    'pages/CertificateInfo/index',
    'pages/StudyPlan/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "color": "#c0c4cc",
    "selectedColor": "#fa436a",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": 'pages/ServiceCenter/index',
        "text": "资讯中心",
        "iconPath": "accects/tabs/tab-home.png",
        "selectedIconPath": "accects/tabs/tab-home-current.png"
      },
      {
        "pagePath": "pages/Studycenter/index",
        "text": "我的学习",
        "iconPath": "accects/tabs/select.png",
        "selectedIconPath": "accects/tabs/selected.png"
      },
      {
        "pagePath": "pages/Owner/index",
        "text": "个人中心",
        "iconPath": "accects/tabs/tab-my.png",
        "selectedIconPath": "accects/tabs/tab-my-current.png"
      }
    ]
  }
}
