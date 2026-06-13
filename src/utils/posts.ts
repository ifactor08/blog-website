import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * All publishable posts, newest first.
 * Excludes drafts and future-dated posts in production builds
 * (both are shown in `astro dev` so you can preview while writing).
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const now = Date.now();
  const posts = await getCollection('blog', ({ data }) => {
    if (import.meta.env.PROD && data.draft) return false;
    if (import.meta.env.PROD && data.pubDate.getTime() > now) return false;
    return true;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Map of tag -> posts, derived from published posts. */
export async function getTagMap(): Promise<Map<string, Post[]>> {
  const posts = await getPublishedPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const list = map.get(tag) ?? [];
      list.push(post);
      map.set(tag, list);
    }
  }
  return map;
}

/** Normalize a tag into a URL-safe slug. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function formatDate(date: Date): string {
  return dateFmt.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString();
}
