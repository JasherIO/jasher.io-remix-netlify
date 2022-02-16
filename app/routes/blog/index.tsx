import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Main from "~/components/Main";
import { get_posts } from "~/types/post";
import type { Posts } from "~/types/post";

export function headers () {
  return {
    "Cache-Control": "max-age: 10, s-maxage=10, stale-while-revalidate=60, stale-if-error: 3600"
  };
};

export const loader: LoaderFunction = async () => {
  return get_posts();
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