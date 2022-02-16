import { Outlet } from "remix";
import type { MetaFunction } from "remix";
import Main from "~/components/Main";

/// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Jasher | Blog",
    description: "Posts from Jasher!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Blog() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
