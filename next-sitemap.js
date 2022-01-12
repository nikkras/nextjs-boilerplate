// for more config options;
// https://www.npmjs.com/package/next-sitemap#configuration-options

module.exports = {
  // ========================
  // sitemap.xml
  // ========================
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_SITE_URL,
  changefreq: 'daily', // always hourly daily weekly monthly yearly never
  priority: 0.7, // between 0 and 1
  sitemapSize: 5000,
  exclude: [
    '/unsupported'
    // '/page-0'
    // '/page-*'
    // '/private/*'
  ],
  alternateRefs: [
    // multi-language support
    // {
    //   href: 'https://example.com/fr',
    //   hreflang: 'fr'
    // }
  ],
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  },
  // additionalPaths: async (config) => {},
  // outDir: 'out',
  autoLastmod: true,
  // ========================
  // robots.txt
  // ========================
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next', '/404', '/500', '/unsupported', '/favicons']
      }
    ]
  }
};
