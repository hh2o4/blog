import { defineConfig } from 'vitepress';
// import { useData } from 'vitepress';

// const { params } = useData();
// console.log('page data: ', params);

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
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
