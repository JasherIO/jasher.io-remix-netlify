import { Link } from "remix";
import { platforms, routes } from "~/utilities/site";

const _platforms = platforms.filter(platform => platform?.footer);

export default function Footer() {
  return (
    <footer className="mt-4">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {routes.map((route) => (
            <div key={route.name} className="px-5 py-2">
              <Link to={route.href} prefetch="intent" className="text-base text-neutral-500 hover:text-green-500">
                {route.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {_platforms.map((platform) => (
            <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-green-500">
              <span className="sr-only">{platform.name}</span>
              <platform.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-neutral-400">&copy; 2022 Josh Willis. All rights reserved.</p>
      </div>
    </footer>
  )
};
