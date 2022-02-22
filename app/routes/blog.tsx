import { Outlet } from "remix";
import Main from "~/components/Main";

export default function Blog() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
