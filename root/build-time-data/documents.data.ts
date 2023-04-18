import { createContentLoader } from 'vitepress';

export default {
  async load() {
    const posts = await createContentLoader(
      'documents/*.md' /* options */,
    ).load();

    const catalogueWithTime = {};
    const catalogueWithAuthor = {};
    posts.forEach((post) => {});

    return {
      catalogueWithTime,
      catalogueWithAuthor,
    };
  },
};
