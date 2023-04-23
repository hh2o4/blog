import matter from 'gray-matter';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

const getDocumentSidebarConfig = () => {
  const dirPath = fileURLToPath(new URL('../documents', import.meta.url));
  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md'));
  const labelMap = {};

  files.forEach((file) => {
    const content = fs.readFileSync(`${dirPath}/${file}`, 'utf8');
    const fileName = file.slice(0, -3);
    const { data } = matter(content);
    const { label, title } = data;

    if (!labelMap[label]) {
      labelMap[label] = [];
    }

    labelMap[label].push({
      text: title,
      link: `/documents/${fileName}`,
    });
  });

  return Object.keys(labelMap).map((label) => {
    return {
      text: label,
      items: labelMap[label].map((document) => {
        const { text, link } = document;

        return {
          text,
          link,
        };
      }),
    };
  });
};

const getNavBarConfig = () => {
  const firstDocumentPath =
    getDocumentSidebarConfig()?.[0]?.items?.[0]?.link || '/';

  return [
    { text: 'Home', link: '/' },
    {
      text: 'Documents',
      link: firstDocumentPath,
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
  ];
};

export { getDocumentSidebarConfig, getNavBarConfig };
