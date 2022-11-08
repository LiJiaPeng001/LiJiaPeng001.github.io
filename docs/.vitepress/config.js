export default {
  title: '李小朋的博客',
  description: 'Just a blog',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: [
      {
        text: '关于',
        items: [
          { text: 'about', link: '/about.md' },
        ]
      },
      // {
      //   text: 'Html',
      //   items: [
      //     { text: 'index', link: '/html/index.md' },
      //   ]
      // },
      {
        text: 'CSS',
        items: [
          { text: 'overflow的visible和hidden', link: '/css/overflow.md' },
        ]
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present peng'
    },
    editLink: {
      pattern: 'https://github.com/LiJiaPeng001/LiJiaPeng001.github.io/tree/master/docs/:path',
      text: '修改本页面'
    }
  }
}