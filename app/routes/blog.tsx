import { Outlet } from "remix";
import Main from "~/components/Layout/Main";

export default function Blog() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
