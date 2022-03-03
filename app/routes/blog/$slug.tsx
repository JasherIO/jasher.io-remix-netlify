import { useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import Section from "~/components/Layout/Section";
import { get_post } from "~/types/post";
import type { Post } from "~/types/post";
import { platforms } from "~/util/site";

export const meta: MetaFunction = ({ data }) => {
  const post = data;
  const twitter = platforms.find(platform => platform.name === "Twitter");

  return { 
    title: `Jasher | ${post.frontmatter.title}`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords.join(", "),
    thumbnail: post.frontmatter.image,
    pubdate: post.frontmatter.date.ISO,
    "twitter:card": "summary_large_image",
    "twitter:creator": twitter?.id || "",
    "twitter:description": post.frontmatter.description,
    "twitter:image": post.frontmatter.image,
    "twitter:site": twitter?.id || "",
    "twitter:title": post.frontmatter.title,
    "og:description": post.frontmatter.description,
    "og:image": post.frontmatter.image,
    "og:image:width": "1920",
    "og:image:height": "1080",
    "og:pubdate": post.frontmatter.date.ISO,
    "og:title": post.frontmatter.title,
    "og:type": "article",
    // "og:url": "",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected a slug")
  return get_post(params.slug);
};

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <Section>
      <article className="p-2">
        <span className="text-base md:text-lg text-green-600 dark:text-green-400 font-semibold">{post.frontmatter.category}</span>
        <h1 className="text-3xl md:text-5xl font-bold my-1">{post.frontmatter.title}</h1>
        <span className="text-base text-neutral-500 font-semibold space-x-2">
          <span>{post.stats.text}</span>
          <span>&bull;</span>
          <time dateTime={post.frontmatter.date.ISO}>
            {post.frontmatter.date.text}
          </time>
        </span>
        <div className="max-w-none mx-auto mt-4 selection:bg-green-300 selection:text-green-900 prose md:prose-lg dark:prose-invert prose-neutral prose-a:text-green-600 dark:prose-a:text-green-400 prose-li:my-0.5 md:prose-li:my-0.5 prose-h1:mb-0 md:prose-h1:mb-2" dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </article>
    </Section>
  );
};