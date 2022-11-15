export default {
  title: "李小朋的博客",
  description: "Just a blog",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    sidebar: [
      {
        text: "关于",
        items: [{ text: "about", link: "/about.md" }],
      },
      {
        text: "Babel插件制作流程",
        items: [
          { text: "什么是babel", link: "/babel/babel1.md" },
          { text: "babel编译流程", link: "/babel/babel2.md" },
          { text: "babel的AST", link: "/babel/babel3.md" },
          { text: "babel的API", link: "/babel/babel4.md" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "overflow的visible和hidden", link: "/css/overflow.md" },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present peng",
    },
    editLink: {
      pattern:
        "https://github.com/LiJiaPeng001/LiJiaPeng001.github.io/tree/master/docs/:path",
      text: "修改本页面",
    },
  },
};
