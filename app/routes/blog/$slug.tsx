import { useLoaderData, useMatches } from "remix";
import type { LoaderFunction } from "remix";
import Main from "~/components/Main";
// import { get_posts } from "~/types/post";

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  
  // const posts = await get_posts();
  // const post = posts.find(post => post.slug === slug);
  // if (!post) {
  //   throw new Response("Post not found", { status: 404 });
  // }

  // console.log(post);

  return slug;
};

export default function Post() {
  // const matches = useMatches();
  // console.log(matches);
  const slug = useLoaderData();

  return (
    <Main>
      <h1>Some Post: {slug}</h1>
    </Main>
  );
};