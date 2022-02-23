import type { MetaFunction } from "remix";
import Main from "~/components/Layout/Main";

/// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Jasher | Projects",
    description: "Projects Jasher!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Projects() {
  return (
    <Main>
      <h1>Hello from the projects.tsx!</h1>
    </Main>
  );
}
