/**
 * Site-wide configuration. Edit these values to personalize the blog.
 */
export const SITE = {
  title: 'Ishan Kulshrestha',
  /** Short tagline used on the home page + meta description fallback. */
  description:
    'An engineer figuring out how the tools we use every day really work.',
  author: 'Ishan Kulshrestha',
  /** Used for og:image fallback (lives in /public). */
  defaultImage: '/og-default.png',
  /** Twitter/X handle including @, or '' to omit. */
  twitter: '',
  /** Header / footer nav links. */
  nav: [
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/tags' },
    { label: 'About', href: '/about' },
  ],
  /** External profile links shown in the footer. */
  social: [
    { label: 'GitHub', href: 'https://github.com/ifactor08' },
    { label: 'LinkedIn', href: 'https://in.linkedin.com/in/ishankulshrestha' },
    { label: 'RSS', href: '/rss.xml' },
  ],
  /**
   * Cloudflare Web Analytics token. Paste the token from
   * Cloudflare dashboard → Web Analytics. Leave '' to disable.
   */
  cloudflareAnalyticsToken: 'd3572ef966ae45fcba599f82bcd95d7d',
} as const;
