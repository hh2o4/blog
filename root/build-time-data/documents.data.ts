import { createContentLoader } from 'vitepress';

export default {
  async load() {
    const posts = await createContentLoader('documents/*.md' /* options */, {
      excerpt: true,
      transform(rawData) {
        return rawData
          .sort((a, b) => {
            return (
              +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            );
          })
          .map((page) => {
            return {
              author: page.frontmatter.author,
              updateTime: page.frontmatter.date,
            };
          });
      },
    }).load();

    const catalogueWithTime = {};
    const catalogueWithAuthor = {};
    posts.forEach((post) => {
      const { author, updateTime } = post;
      console.log(post);
    });

    return {
      catalogueWithTime,
      catalogueWithAuthor,
    };
  },
};
