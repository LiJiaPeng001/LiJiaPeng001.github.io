// import fs from 'fs'

// fs.readFile("./theme/index.js","utf-8",(err,data)=>{
//   console.log(err,'data')
// })

export default {
  title: '李小朋的博客',
  description: 'Just a blog',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: [
      {
        text: '首页',
        items: [
          { text: 'info', link: '/info' },
          { text: 'about', link: '/about' },
          { text: 'teamPage', link: '/teamPage' },
          { text: 'badge', link: '/badge' },
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present peng'
    },
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    }
  }
}