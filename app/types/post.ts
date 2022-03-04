
import path from "path";
import fs from "fs/promises";
import { marked } from "marked";
import parse_frontmatter from "front-matter";
import reading_time from 'reading-time';
import invariant from "tiny-invariant";

type RawFrontmatter = {
  title: string;
  description: string;
  keywords: Array<String>;
  date: string;
  category: string;
  image?: string;
  status?: string;
};

export type Frontmatter = {
  title: string;
  description: string;
  keywords: Array<String>;
  date: {
    raw: string;
    text: string;
    ISO: string;
  };
  category: string;
  image?: string;
  status?: string;
};

export type Post = {
  slug: string;
  frontmatter: Frontmatter;
  html: string;
  stats: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

export type Posts = {
  pagination: {
    limit: number;
    offset: number;
    page: number;
    totalPages: number;
  };
  posts: Array<Post>
};

const posts_path = path.join(__dirname, "data/posts");
const date_compare = (a: Post, b: Post) => {
  const a_date = new Date(a.frontmatter.date.raw);
  const b_date = new Date(b.frontmatter.date.raw);

  if (a_date < b_date)
    return 1;
  
  if (b_date < a_date)
    return -1

  return 0;
}

export async function get_posts({ limit, offset}: { limit: number, offset: number }): Promise<Posts> {
  const directory = await fs.readdir(posts_path);
  const parsed = await Promise.all(directory.map(parse));
  const posts = parsed
                  .filter(post => post.frontmatter?.status !== "draft")
                  .sort(date_compare)
                  .slice(offset, offset + limit);
  const page = offset > 0 ? Math.floor(offset / limit) + 1 : 1;
  const totalPages = Math.ceil(parsed.length / limit);
  
  return {
    pagination: {
      limit,
      offset,
      page,
      totalPages
    },
    posts
  };
};

export async function get_post(slug: string): Promise<Post> {
  return parse(`${slug}.md`);
}

function isValidFronmatter(attributes: any): attributes is RawFrontmatter {
  return attributes?.title && attributes?.description && attributes?.keywords && attributes?.date && attributes?.category;
}

async function parse(file_name: string) : Promise<Post> {
  const file = await fs.readFile(path.join(posts_path, file_name));
  const slug = file_name.replace(".md", "");
  const { attributes: raw_frontmatter, body } = parse_frontmatter(file.toString());
  invariant(isValidFronmatter(raw_frontmatter), `${file_name} has bad frontmatter!`);
  
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const date_object = new Date(raw_frontmatter.date);
  const date = {
    raw: raw_frontmatter.date,
    text: date_object.toLocaleDateString("en-US", options),
    ISO: date_object.toISOString(),
  };
  const frontmatter = { ...raw_frontmatter, date };
  
  const html = marked(body);
  const stats = reading_time(body);

  return {
    slug,
    frontmatter,
    html,
    stats
  };
}
