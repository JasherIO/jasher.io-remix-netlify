import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Section from "~/components/Section";
import { get_posts } from "~/types/post";

export const loader: LoaderFunction = async () => {
  const { GITHUB_TOKEN } = process.env;
  
  return get_posts(GITHUB_TOKEN);
};

export default function Posts() {
  const posts = useLoaderData();

  return (
    <Section>
      <h1>Posts</h1>
      <ul>
        {posts.map((post : any) => (
          <li key={post.name}>{post.name}</li>
        ))}
      </ul>
    </Section>
  );
};