import { json, Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Main from "~/components/Main";
import { get_posts } from "~/types/post";
import type { Posts } from "~/types/post";

export function headers () {
  return {
    "Cache-Control": { headers: { "Cache-Control": "max-age: 1440, s-maxage=1440, stale-while-revalidate=10800, stale-if-error: 43200" } }
  };
};

export const loader: LoaderFunction = async () => {
  const posts = await get_posts();

  return json(posts, { headers: { "Cache-Control": "max-age: 60, s-maxage=60, stale-while-revalidate=300, stale-if-error: 600" } });
};

export default function Posts() {
  const posts = useLoaderData<Posts>();

  return (
    <Main>
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
    </Main>
  );
};