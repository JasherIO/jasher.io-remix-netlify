import { Link } from "remix";
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { DesktopLink, MobileLink } from "~/components/Navbar/Link";
import { ThemeToggle } from "~/components/Navbar/Theme";
import { platforms, routes } from "~/utilities/site";

const _platforms = platforms.filter(platform => platform?.navbar);
const _routes = routes.filter(route => route?.navbar);

export default function Navbar() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center h-16 px-4 sm:px-0">
              <Link to="/" prefetch="intent" className="contents flex-shrink-0">
                <img
                  className="h-7 w-7"
                  src="/Jasher.svg"
                  alt="Jasher Logo"
                />
                <p className="ml-4 text-lg text-semibold text-neutral-900 dark:text-neutral-100 hover:text-green-600 dark:hover:text-green-500">Jasher</p>
              </Link>
            
              <div className="absolute right-0 hidden md:flex md:items-center">
                <div className="contents space-x-4">
                  {_routes.map((_route) => (
                    <DesktopLink
                      key={_route.name}
                      to={_route.href}
                    >
                      {_route.name}
                    </DesktopLink>
                  ))}
                </div>
                
                <div className="inline-flex ml-6 pl-6 text-neutral-500 border-l border-neutral-700 dark:border-neutral-700">
                  <ThemeToggle />
                  
                  {_platforms.map(platform => (
                    <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer">
                      <span className="sr-only">{platform.name}</span>
                      <platform.icon className="ml-5 block h-5 w-5 hover:text-green-500" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 py-3 space-y-1 sm:px-3">
              {_routes.map((_route) => (
                <Disclosure.Button
                  key={_route.name}
                  as={MobileLink}
                  to={_route.href}
                >
                  {_route.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
};
