export default {
  title: "李小朋",
  description: "Just a blog",
  lang: "zh-ZN",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    sidebar: [
      {
        text: "前端基础",
        items: [
          { text: "docker", link: "/interview/docker.md" },
          { text: "http", link: "/interview/http.md" },
          { text: "html", link: "/interview/html.md" },
          { text: "css", link: "/interview/css.md" },
          { text: "js", link: "/interview/js.md" },
          { text: "vue", link: "/interview/vue.md" },
          { text: "ts", link: "/interview/ts.md" },
          { text: "react", link: "/interview/react.md" },
          { text: "webpack", link: "/interview/webpack.md" },
          { text: "miniApp", link: "/interview/miniApp.md" },
        ],
      },
      {
        text: "一些问题",
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
