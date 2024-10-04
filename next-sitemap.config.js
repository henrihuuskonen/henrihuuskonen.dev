/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://henrihuuskonen.dev',
    generateRobotsTxt: false,
    exclude: ['/home/*']
}