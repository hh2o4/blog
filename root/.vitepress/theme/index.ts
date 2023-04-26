// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import Comment from './layouts/Comment.vue';
import './style.css';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'doc-after': h(Comment),
    });
  },
  enhanceApp({ app, router, siteData }) {
    console.log(app.data);
  },
};
