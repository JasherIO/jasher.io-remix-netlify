import front_matter from "front-matter";
import { marked } from "marked";
import reading_time from 'reading-time';

type GH_Entry = {
  name: string,
  object: {
    text: string
  }
}

export type Post = {
  slug: string,
  frontmatter: {
    title: string,
    description: string,
    date: Date,
    category: string,
    tags: Array<String>,
    image: string,
    fullscreen: boolean,
    status: string,
  },
  html: string,
  stats: {
    text: string,
    minutes: number,
    time: number,
    words: number,
  },
};

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

export async function get_posts(token: string) : Promise<Array<GH_Entry>> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "JasherIO", // https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required
    },
    body
  });

  if (!response.ok)
    throw response;

  const json: any = await response.json();
  const entries: Array<GH_Entry> = json?.data?.repository?.object?.entries;
  // parse(entries[0]);

  return entries;
}

async function parse(entry : GH_Entry) {
  const { text } = entry.object;

  const { attributes: frontmatter, body } = front_matter(text);
  const html = marked(body);
  const stats = reading_time(body);

  const post = {
    frontmatter,
    html,
    stats
  };

  console.log(post);
}