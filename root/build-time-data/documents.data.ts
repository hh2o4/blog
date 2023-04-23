import { createContentLoader } from 'vitepress';

export default {
  async load() {
    const posts = await createContentLoader('documents/*.md' /* options */, {
      excerpt: true,
    }).load();

    const catalogueWithTime = {};
    const catalogueWithAuthor = {};
    posts.forEach((post) => {
      // const { author, updateTime } = post;
      console.log(post);
    });

    return {
      catalogueWithTime,
      catalogueWithAuthor,
    };
  },
};
