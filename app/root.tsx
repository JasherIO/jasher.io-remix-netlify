import { Fragment } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "remix";
import type { LinksFunction, MetaFunction } from "remix";
import _Error from "~/components/Error";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import styles from "./tailwind.css";
import { site, platforms } from "~/util/site";

export const meta: MetaFunction = () => {
  const twitter = platforms.find(platform => platform.name === "Twitter");

  return { 
    title: site.title,
    description: site.description,
    keywords: site.keywords,
    "theme-color": "#22c55e",
    "twitter:card": "summary",
    "twitter:creator": twitter?.id || "",
    "twitter:description": site.description,
    "twitter:image": site.image,
    "twitter:site": twitter?.id || "",
    "twitter:title": site.title,
    "og:description": site.description,
    "og:image": site.image,
    "og:site_name": site.title,
    "og:title": site.title,
    "og:type": "website",
    // "og:url": "",
  };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preload", href: "/Jasher.svg", as: "image", type: "image/svg+xml"},
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
};

type ErrorBoundaryProps = {
  error: Error
}
export function ErrorBoundary({ error } : ErrorBoundaryProps) {
  return (
    <Document title="Error!">
      <_Error status="Unknown" title="There was an error" description={error.message}  />
    </Document>
  );
}

const errors = [
  {
    status: 401,
    title: "Oof! I think you've forgotten your keys.",
    description: "Seems like you are not logged in.",
  },
  {
    status: 403,
    title: "Oops! I think you've hit a wall.",
    description: "Looks like you tried to visit a page that you do not have access to.",
  },
  {
    status: 404,
    title: "Uh oh! I think you're lost.",
    description: "It looks like the page you're looking for doesn't exist.",
  },
]

export function CatchBoundary() {
  const caught = useCatch();
  const error = errors.find(_error => _error.status === caught.status);
  
  if (!error)
    throw new Error(caught.data || caught.statusText);

  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <_Error {...error} />
    </Document>
  );
};

type DocumentProps = {
  children: React.ReactNode,
  title?: string,
}
function Document({ children, title } : DocumentProps) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white overflow-y-scroll">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
};

type LayoutProps = {
  children: React.ReactNode,
}
function Layout({ children } : LayoutProps) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  )
}
