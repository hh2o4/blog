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
    search: {
      provider: 'local',
    },
  },
});
