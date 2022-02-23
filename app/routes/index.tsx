import { Link } from "remix";
import type { MetaFunction } from "remix";
import { Image, MimeType } from "remix-image";
import Section from "~/components/Section";
import { site } from "~/utilities/site";

// https://realtimestrat.com/
const clients = [
  {
    name: "DreamHack",
    src: "/Dreamhack_Gray.png",
  },
  {
    name: "ESL",
    src: "/ESL_Gray.png",
  },
  {
    name: "PAX",
    src: "/PAX_Gray.png",
  },
  {
    name: "Psyonix",
    src: "/Psyonix_Gray.png",
  },
];

const projects = [
  {
    name: "RLCS 21-22",
    role: "Referee and Statistician",
    href: "/projects/rlcs-21-22",
    start_date: "",
    end_date: "",
    src: "/RLCS_21_22.jpg"
  },
  {
    name: "DreamHack Beyond Boost Cup",
    role: "Referee",
    href: "/projects/dreamhack-beyond-boost-cup",
    start_date: "",
    end_date: "",
    src: "/Dreamhack_Beyond_Boost_Cup_21.jpg"
  },
  {
    name: "RLCS X",
    role: "Referee and Statistician",
    href: "/projects/rlcs-x",
    start_date: "",
    end_date: "",
    src: "/RLCS_X.jpg"
  },
];

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
      <section className="w-full mx-auto">
        <div className="relative shadow-xl">
          <div className="absolute inset-0">
            <Image
              loaderUrl="/api/image"
              src="https://i.imgur.com/5cQnAQC.png"
              // src="/RetroGaming.jpg"
              alt="Retro Gaming"
              responsive={[
                { size: { width: 100, height: 100, }, maxWidth: 200, },
                // { size: { width: 640, height: 426, }, maxWidth: 640, },
                // { size: { width: 1920, height: 1280, }, maxWidth: 1920, },
                // { size: { width: 2400, height: 1600, }, maxWidth: 2400, },
                // { size: { width: 6048, height: 4032, }, maxWidth: 6048, },
              ]}
              options={{ contentType: MimeType.WEBP }}
              // className="h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-green-500 dark:bg-green-900 mix-blend-multiply backdrop-blur-sm" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-40 lg:px-8">
            <h1 className="max-w-lg mx-auto text-center text-white text-4xl font-extrabold font-display tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm Josh!
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-center text-xl text-green-200 sm:max-w-3xl">
              {site.description}
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link
                  to="/contact"
                  prefetch="intent"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-green-700 bg-neutral-100 hover:bg-green-50 sm:px-8"
                >
                  Contact
                </Link>
                <Link
                  to="/projects"
                  prefetch="intent"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-green-100 bg-green-700 bg-opacity-80 hover:bg-opacity-90 dark:bg-green-500 dark:bg-opacity-50 dark:hover:bg-opacity-60 sm:px-8"
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <p className="text-center text-sm sm:text-base font-semibold uppercase text-neutral-500 tracking-wide">
          Worked With
        </p>
        
        <div className="mt-4 lg:mt-6 flex justify-between">
          {clients.map((client) => (
            <img key={client.name} src={client.src} className="object-contain h-8 w-14 lg:h-16 lg:w-32" />
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-center text-sm sm:text-base font-semibold uppercase text-neutral-500 tracking-wide">
          Featured Projects
        </p>

        <ul role="list" className="mt-4 lg:mt-6 flex flex-wrap justify-center space-y-10 lg:justify-between lg:space-y-0">
          {projects.map((project) => (
            <li key={project.name} className="relative">
              <div className="group block w-72 lg:w-80 aspect-w-16 aspect-h-9 rounded-lg bg-neutral-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-100 focus-within:ring-green-500 overflow-hidden">
                <img src={project.src} alt={project.name} className="object-cover pointer-events-none group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {project.name}</span>
                </button>
              </div>
              <p className="mt-2 block text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate pointer-events-none">{project.name}</p>
              <p className="block text-sm font-medium text-neutral-500 pointer-events-none">{project.role}</p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
};
