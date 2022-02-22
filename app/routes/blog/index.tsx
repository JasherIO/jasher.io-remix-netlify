import { json, Link, useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import Section from "~/components/Section";
import { get_posts } from "~/types/post";
import type { Posts } from "~/types/post";

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
      <h1>Posts</h1>
      <ul>
        {posts.map((post : any) => (
          <li key={post.frontmatter.title}>
            <Link to={`/blog/${post.slug}`} prefetch="intent">
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};