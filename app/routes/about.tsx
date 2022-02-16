import { Outlet } from "remix";
import type { MetaFunction } from "remix";
import Main from "~/components/Main";

/// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Jasher | About",
    description: "About Jasher!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function About() {
  return (
    <Main>
      <h1>Hello from the about.tsx!</h1>
      <Outlet />
    </Main>
  );
}
