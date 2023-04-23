import { createContentLoader } from 'vitepress';

export default {
  async load() {
    const posts = await createContentLoader(
      'documents/*.md' /* options */,
    ).load();

    const catalogueWithTime = {};
    const catalogueWithAuthor = {};
    posts.forEach((post) => {
      const {
        author = 'other',
        updated = 'other',
        title = 'title',
      } = post.frontmatter;
      const { url } = post;
      console.log('!!!!!!!!!!!! ', updated);
      const timeKey = updated.slice(0, 10);

      if (!catalogueWithAuthor[author]) {
        catalogueWithAuthor[author] = [];
      }

      if (!catalogueWithTime[timeKey]) {
        catalogueWithTime[timeKey] = [];
      }

      catalogueWithAuthor[author].push({
        title,
        url,
      });

      catalogueWithTime[timeKey].push({
        title,
        url,
      });
    });

    return {
      catalogueWithTime,
      catalogueWithAuthor,
    };
  },
};
