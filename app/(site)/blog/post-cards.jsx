import { BLOG_CATEGORIES } from "../../../lib/content.mjs";

export function CategoryNav({ current }) {
  return (
    <ul className="pill-nav" aria-label="Blog categories">
      <li>
        <a href="/blog" aria-current={current ? undefined : "page"}>
          All posts
        </a>
      </li>
      {Object.entries(BLOG_CATEGORIES).map(([slug, cat]) => (
        <li key={slug}>
          <a href={`/blog/category/${slug}`} aria-current={current === slug ? "page" : undefined}>
            {cat.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PostCards({ posts, showCategory = true }) {
  return (
    <ul className="cards">
      {posts.map((post) => (
        <li key={post.slug} className="card">
          <a className="card__link" href={`/blog/${post.slug}`}>
            {showCategory ? (
              <span className="card__eyebrow">{BLOG_CATEGORIES[post.category]?.name}</span>
            ) : null}
            <span className="card__title">{post.title}</span>
            <span className="card__text">{post.description}</span>
            <span className="card__meta">{post.minutes} min read</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
