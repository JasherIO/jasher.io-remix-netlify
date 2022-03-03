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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const offset = url.searchParams.get("offset");
  console.log(request, request.url, limit, offset);

  const posts = await get_posts();

  return json(posts, { headers: { "Cache-Control": "max-age: 60, s-maxage=60, stale-while-revalidate=300, stale-if-error: 600" } });
};

export default function Posts() {
  const posts = useLoaderData<Posts>();

  return (
    <Section>
      <h1 className="sr-only">Posts</h1>
      {posts.map((post: Post, index: number) => (
        <article key={post.frontmatter.title} className={clsx("rounded-lg p-2", index > 0 && "mt-8")}>
          <span className="text-green-600 dark:text-green-400 font-semibold mb-1">{post.frontmatter.category}</span>
          <Link to={`/blog/${post.slug}`} prefetch="intent">
            <h2 className="text-2xl md:text-4xl font-bold mt-1 mb-1">{post.frontmatter.title}</h2>
            <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-400 mb-1">{post.frontmatter.description}</p>
          </Link>
          <span className="text-sm md:text-base text-neutral-500 font-semibold space-x-2">
            <span>{post.stats.text}</span>
            <span>&bull;</span>
            <time dateTime={post.frontmatter.date.ISO}>
              {post.frontmatter.date.text}
            </time>
          </span>
        </article>
      ))}
    </Section>
  );
};