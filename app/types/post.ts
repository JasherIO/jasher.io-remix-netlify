
import path from "path";
import fs from "fs/promises";
import { marked } from "marked";
import parse_frontmatter from "front-matter";
import reading_time from 'reading-time';
import invariant from "tiny-invariant";

export type Frontmatter = {
  title: string;
  description: string;
  keywords: Array<String>;
  date: Date;
  category: string;
  image?: string;
  status?: string;
}

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
export type Posts = Array<Post>;

const posts_path = path.join(__dirname, "../data/posts");

export async function get_posts(): Promise<Posts> {
  const directory = await fs.readdir(posts_path);
  return await Promise.all(directory.map(parse));
};

export async function get_post(slug: string): Promise<Post> {
  return parse(`${slug}.md`);
}

function isValidFronmatter(attributes: any): attributes is Frontmatter {
  return attributes?.title && attributes?.description && attributes?.keywords && attributes?.date && attributes?.category;
}

async function parse(file_name: string) : Promise<Post> {
  const file = await fs.readFile(path.join(posts_path, file_name));
  const slug = file_name.replace(".md", "");
  const { attributes: frontmatter, body } = parse_frontmatter(file.toString());
  invariant(isValidFronmatter(frontmatter), `${file_name} has bad frontmatter!`);
  
  const html = marked(body);
  const stats = reading_time(body);

  return {
    slug,
    frontmatter,
    html,
    stats
  };
}
