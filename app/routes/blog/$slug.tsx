import { useLoaderData } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import Section from "~/components/Layout/Section";
import { get_post } from "~/types/post";
import type { Post } from "~/types/post";
import { platforms } from "~/util/site";

export const meta: MetaFunction = ({ data }) => {
  const { frontmatter } = data;
  const twitter = platforms.find(platform => platform.name === "Twitter");
  const date = new Date(frontmatter.date);

  return { 
    title: `Jasher | ${frontmatter.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords.join(", "),
    thumbnail: frontmatter.image,
    pubdate: date.toISOString(),
    "twitter:card": "summary_large_image",
    "twitter:creator": twitter?.id || "",
    "twitter:description": frontmatter.description,
    "twitter:image": frontmatter.image,
    "twitter:site": twitter?.id || "",
    "twitter:title": frontmatter.title,
    "og:description": frontmatter.description,
    "og:image": frontmatter.image,
    "og:image:width": "1920",
    "og:image:height": "1080",
    "og:pubdate": date.toISOString(),
    "og:title": frontmatter.title,
    "og:type": "article",
    // "og:url": "",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected a slug")
  return get_post(params.slug);
};

export default function Post() {
  const { frontmatter, html } = useLoaderData<Post>();
  const date = new Date(frontmatter.date);

  return (
    <Section>
      <article className="prose md:prose-lg dark:prose-invert prose-neutral mx-auto">
        <time dateTime={date.toISOString()}></time>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </article>
    </Section>
  );
};