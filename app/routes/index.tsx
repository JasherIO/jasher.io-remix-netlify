import type { MetaFunction } from "remix";
import Hero from "~/components/Hero";
import FeaturedProjects from "~/components/FeaturedProjects";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Jasher",
    description: "Hello, I'm Josh!"
  };
};

export default function Index() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
    </main>
  )
};
