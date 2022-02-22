import front_matter from "front-matter";
import { marked } from "marked";
import reading_time from 'reading-time';

type GH_Entry = {
  name: string;
  object: {
    text: string;
  };
}
type GH_Entries = Array<GH_Entry>;

type Frontmatter = {
  title: string;
  description: string;
  date: Date;
  category: string;
  tags?: Array<String>;
  image?: string;
  fullscreen?: boolean;
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

// Reference: https://gist.github.com/MichaelCurrin/6777b91e6374cdb5662b64b8249070ea
const url = "https://api.github.com/graphql";
const query = `
  query ($owner: String!, $name: String!, $expression: String!) { 
    repository (owner: $owner, name: $name) {
      object (expression: $expression) {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;
const owner = "JasherIO";
const name = "JasherIO";
const expression = "main:posts";
const body = JSON.stringify({ 
  query, 
  variables: { owner, name, expression } 
});

export async function get_posts(): Promise<Posts> {
  const { GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;
  if (!GITHUB_PERSONAL_ACCESS_TOKEN)
    return [];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "JasherIO", // https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required
    },
    body
  });

  if (!response.ok)
    throw response;

  const json: any = await response.json();
  const entries: GH_Entries = json?.data?.repository?.object?.entries;
  const posts: Posts = await Promise.all(entries.map(parse)); 
  // const posts: Posts = await Promise.all(entries.map(_parse));

  return posts;
};

// async function _parse(entry : GH_Entry) {
//   const [
//     { unified },
//     { default: remark_parse },
//     { default: remark_frontmatter },
//     { default: remark_parse_frontmatter },
//     { default: remark_gfm },
//     { default: remark_rehype },
//     { default: rehype_sanitize },
//     { default: rehype_preset_minify },
//     { default: rehype_stringify },
//   ] = await Promise.all([
//     import('unified'),
//     import('remark-parse'),
//     import('remark-frontmatter'),
//     import('remark-parse-frontmatter'),
//     import('remark-gfm'),
//     import('remark-rehype'),
//     import('rehype-sanitize'),
//     import('rehype-preset-minify'),
//     import('rehype-stringify'),
//   ]);

//   const file = await unified()
//     .use(remark_parse)
//     .use(remark_frontmatter, ['yaml', 'toml'])
//     .use(remark_parse_frontmatter)
//     .use(remark_gfm)
//     .use(remark_rehype)
//     .use(rehype_sanitize)
//     .use(rehype_preset_minify)
//     .use(rehype_stringify)
//     .process(entry.object.text);

//   const slug = entry.name.replace(".md", "");
//   const frontmatter = file.data.frontmatter as Frontmatter;
//   const html = String(file);
//   const stats = reading_time(String(file));

//   return {
//     slug,
//     frontmatter,
//     html,
//     stats
//   };
// }

async function parse(entry : GH_Entry) : Promise<Post> {
  const { name } = entry;
  const slug = name.replace(".md", "");

  const { text } = entry.object;

  const { attributes: frontmatter, body } = front_matter(text);
  const html = marked(body);
  const stats = reading_time(body);

  return {
    slug,
    frontmatter,
    html,
    stats
  };
};