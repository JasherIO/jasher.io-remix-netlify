import { json, Link, useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import Section from "~/components/Layout/Section";
import { get_posts } from "~/types/post";
import type { Post, Posts } from "~/types/post";
import clsx from "clsx";

export let meta: MetaFunction = () => {
  return {
    title: "Jasher | Blog",
    description: "Posts from Jasher!"
  };
};

export function headers () {
  return {
    "Cache-Control": { headers: { "Cache-Control": "max-age: 600, s-maxage=600, stale-while-revalidate=3600, stale-if-error: 10800" } }
  };
};

export const loader: LoaderFunction = async () => {
  const posts = await get_posts();

  return json(posts, { headers: { "Cache-Control": "max-age: 60, s-maxage=60, stale-while-revalidate=300, stale-if-error: 600" } });
};

export default function Posts() {
  const posts = useLoaderData<Posts>();

  return (
    <Section>
      <h1 className="sr-only">Posts</h1>
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-a:no-underline prose-h2:mb-2 prose-h2:mt-0 prose-p:mb-0 md:prose-lg md:prose-h2:mb-2 md:prose-h2:mt-0 md:prose-p:mb-0">
        {posts.map((post: Post, index: number) => (
          <Link to={`/blog/${post.slug}`} prefetch="intent" key={post.frontmatter.title}>
            <article className={clsx("rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 md:p-6", index > 0 && "mt-8")}>
              <h2>{post.frontmatter.title}</h2>
              <p className="text-neutral-700 dark:text-neutral-400">{post.frontmatter.description}</p>
              <span className="text-sm md:text-base uppercase tracking-wide text-neutral-500 space-x-2">
                <span>{post.stats.text}</span>
                <span>&bull;</span>
                <time dateTime={post.frontmatter.date.ISO}>
                  {post.frontmatter.date.text}
                </time>
              </span>
            </article>
          </Link>
        ))}
      </div>
    </Section>
  );
};