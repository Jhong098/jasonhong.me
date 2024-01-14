const fs = require('fs');

const prettier = require('prettier');

(async () => {
  const { globby } = await import('globby');
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api'
  ]);

  // console.log(pages);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('.js', '')
                  .replace('.mdx', '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://jasonhong.me${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted);
})();
