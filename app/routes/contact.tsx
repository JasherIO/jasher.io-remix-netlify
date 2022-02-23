import type { MetaFunction } from "remix";
import Main from "~/components/Layout/Main";

/// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Jasher | Contact",
    description: "Contact Jasher!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Contact() {
  return (
    <Main>
      <h1>Hello from the contact.tsx!</h1>
    </Main>
  );
}
