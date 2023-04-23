import { defineConfig } from 'vitepress';
import {
  getDocumentSidebarConfig,
  getNavBarConfig,
} from '../scripts/setSidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hannah Huang's Blog",
  description: "Recordings about what I've done.",
  outDir: '../docs',
  base: '/blog/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   {
    //     text: 'Documents',
    //     link: '/documents/index',
    //     activeMatch: '/documents/',
    //   },
    //   {
    //     text: 'Contribution Guides',
    //     link: '/contribution-guides/index',
    //     activeMatch: '/contribution-guides/',
    //   },
    //   {
    //     text: 'Catalogue',
    //     link: '/custom-pages/catalogue',
    //   },
    // ],
    nav: getNavBarConfig(),

    sidebar: {
      '/documents/': getDocumentSidebarConfig(),
      '/contribution-guides/': [
        {
          text: 'Introduction',
          link: '/contribution-guides/index.md',
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hh2o4/blog' }],
  },
});
