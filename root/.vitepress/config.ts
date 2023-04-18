import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hannah Huang's Blog",
  description: "Recordings about what I've done.",
  outDir: '../docs',
  base: '/blog/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documents',
        link: '/documents/react',
        activeMatch: '/documents/',
      },
      {
        text: 'Contribution Guides',
        link: '/contribution-guides/index',
        activeMatch: '/contribution-guides/',
      },
      {
        text: 'Catalogue',
        link: '/custom-pages/catalogue',
      },
    ],

    sidebar: {
      '/documents/': [
        {
          text: 'Framework',
          items: [
            {
              text: 'react',
              link: '/documents/react.md',
            },
            {
              text: 'vue',
              link: '/documents/vue.md',
            },
          ],
        },
      ],
      '/contribution-guides/': [
        {
          text: 'Introduction',
          link: '/contribution-guides/index.md',
        },
      ],
    },
    // [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
