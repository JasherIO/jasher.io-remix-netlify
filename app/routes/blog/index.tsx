import { json, Link, useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Section from "~/components/Layout/Section";
import { get_posts } from "~/types/post";
import type { Post, Posts } from "~/types/post";

const _limit = 10;
const _offset = 0;

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
  const page = parseInt(url.searchParams.get("page") || "") || 1;
  const offset = (page - 1) * _limit;

  const data = await get_posts({ limit: _limit, offset });

  return json(data, { headers: { "Cache-Control": "max-age: 60, s-maxage=60, stale-while-revalidate=300, stale-if-error: 600" } });
};

export default function Posts() {
  const { pagination, posts } = useLoaderData<Posts>();

  const hasPrevious = pagination.page > 1;
  const previous = pagination.page - 1;
  const isFirst = previous === 1;

  const hasNext = pagination.page < pagination.totalPages;
  const next = pagination.page + 1;
  const isLast = next === pagination.totalPages;
  
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
          <span className="text-sm md:text-base text-neutral-400 font-medium space-x-2">
            <span>{post.stats.text}</span>
            <span>&bull;</span>
            <time dateTime={post.frontmatter.date.ISO}>
              {post.frontmatter.date.text}
            </time>
          </span>
        </article>
      ))}

      <nav role="navigation" aria-labelledby="pagination" className="flex justify-center items-center mt-16 space-x-24 text-lg font-medium">
        <Link to={isFirst ? "/blog" : `/blog?page=${previous}`} prefetch="intent" rel={isFirst ? "first" : "previous"} aria-hidden={!hasPrevious} className={clsx("group", !hasPrevious && "hidden")}>
          <span className="flex items-center space-x-2">
            <ChevronLeftIcon className="h-4 w-4 text-neutral-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
            <span className="text-neutral-500 group-hover:text-green-600 dark:group-hover:text-green-400">Previous</span>
          </span>
        </Link>
        <span className="text-neutral-500">{pagination.page}</span>
        <Link to={`/blog?page=${next}`} prefetch="intent" rel={isLast ? "last" : "next"} aria-hidden={!hasNext} className={clsx("group", !hasNext && "hidden")}>
          <span className="flex items-center space-x-2">
            <span className="text-neutral-500 group-hover:text-green-600 dark:group-hover:text-green-400">Next</span>
            <ChevronRightIcon className="h-4 w-4 text-neutral-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
          </span>
        </Link>
      </nav>
    </Section>
  );
};