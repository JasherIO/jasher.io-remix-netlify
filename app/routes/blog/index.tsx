import { json, Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Main from "~/components/Main";
import { get_posts } from "~/types/post";
import type { Posts } from "~/types/post";

const _headers = {
  "Cache-Control": "max-age: 10, s-maxage=10, stale-while-revalidate=60, stale-if-error: 3600"
};

export function headers () {
  return _headers;
};

export const loader: LoaderFunction = async () => {
  const posts = await get_posts();

  return json(posts, { headers: _headers });
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