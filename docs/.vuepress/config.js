/*
 * @Author: ProtoDrive000
 * @Date: 2020-11-02 18:59:45
 * @LastEditors: your name
 * @Description: my blog
 * @FilePath: \undefinedx:\vuepress-demo\docs\.vuepress\config.js
 * @Copyright © : 2020年 赛博智能车实验室. All rights reserved.
 */
//const moment = require('moment');
module.exports = {
  // plugins: [
  //   [
  //     '@vuepress/last-updated',
  //     {
  //       transformer: (timestamp, lang) => {
  //         // 不要忘了安装 moment
  //         const moment = require('moment')
  //         moment.locale(lang)
  //         return moment(timestamp).fromNow()
  //       }
  //     }
  //   ]
  // ]
    title: "ProtoDrive'WIKI",
    description: 'Hello, Car friend!',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        //lastUpdated: 'Last Updated', // string | boolean ***it must use git commit
      logo: `/favicon.ico`,
        smoothScroll: true,
        sidebarDepth: 2,
        sidebar: [
                  {
                    title: 'Guide',
                    collapsable: false,
                    children: ['/guide/']
                  }         
                ],
        nav: [
                  { text: 'Home', link: '/' },
                  { text: 'Guide', link: '/guide/' },
                  {
                    text: 'Languages',
                    items: [
                      { text: 'Chinese', link: '/language/chinese' },
                      { text: 'English', link: '/language/english' }
                    ]
                  },
                  { text: 'External', link: 'https://www.baidu.com' },
             ]
    //   // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // repo: 'vuejs/vuepress',
    //   // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    //   // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    //   repoLabel: '查看源码',

    //   // 以下为可选的编辑链接选项

    //   // 假如你的文档仓库和项目本身不在一个仓库：
    //   docsRepo: 'vuejs/vuepress',
    //   // 假如文档不是放在仓库的根目录下：
    //   docsDir: 'docs',
    //   // 假如文档放在一个特定的分支下：
    //   docsBranch: 'master',
    //   // 默认是 false, 设置为 true 来启用
    //   editLinks: true,
    //   // 默认为 "Edit this page"
    //   editLinkText: '帮助我们改善此页面！'
    }
}
