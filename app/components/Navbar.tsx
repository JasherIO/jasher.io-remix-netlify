import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from "remix";
import { Disclosure, Listbox } from '@headlessui/react';
import { DesktopComputerIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';
import { platforms, routes } from "~/utilities/site";
import clsx from "clsx";

const _platforms = platforms.filter(platform => platform?.navbar);
const _routes = routes.filter(route => route?.navbar);

function _Link(props: any) {
  const { classes, ..._props } = props;
  const { children } = _props;
  const { base, active, inactive } = classes;
  
  return (
    <NavLink
      {..._props}
      prefetch="intent"
      className={({ isActive }) => isActive ? clsx(base, active) : clsx(base, inactive)}
    >
      {children}
    </NavLink>
  )
}

function DesktopLink(props: any) {
  const classes = {
    base: "px-2 py-2 text-sm font-medium border-b-2",
    active: "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400",
    inactive: "border-neutral-100 dark:border-neutral-900 hover:border-neutral-900 dark:hover:border-neutral-100 text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100 dark:hover:border-neutral-100"
  }

  return (<_Link {...props} classes={classes} />)
}

function MobileLink(props: any) {
  const classes = {
    base: "block text-center px-3 py-2 rounded-md text-base font-medium",
    active: "text-green-500",
    inactive: "text-neutral-800 dark:text-neutral-200"
  }

  return (<_Link {...props} classes={classes} />)
}

const themes = [
  {
    value: "light",
    label: "Light",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: MoonIcon,
  },
  {
    value: "system",
    label: "System",
    icon: DesktopComputerIcon,
  }
];

function update() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme');
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme')
  });
};

function useTheme() {
  let [setting, setSetting] = useState('system');
  // let initial = useRef(true);

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme)
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    update();

  }, [setting]);

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', update);
    } else {
      mediaQuery.addListener(update);
    }

    function onStorage() {
      update();
      let theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', update);
      } else {
        mediaQuery.removeListener(update);
      }

      window.removeEventListener('storage', onStorage);
    }
  }, []);

  return [setting, setSetting];
};

function Toggle({ panelClassName = 'mt-4' }) {
  let [setting, setSetting] = useTheme();

  return (
    <Listbox value={setting} onChange={setSetting}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button type="button">
        <span className="dark:hidden">
          <SunIcon className={clsx("w-5 h-5", setting !== 'system' && "text-green-600 dark:text-green-500")} />
        </span>
        <span className="hidden dark:inline">
          <MoonIcon className={clsx("w-5 h-5", setting !== 'system' && "text-green-600 dark:text-green-500")} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={clsx(
          'absolute z-50 top-full right-8 bg-white rounded-lg ring-1 ring-neutral-900/10 shadow-lg overflow-hidden py-1 text-sm text-neutral-900 font-semibold dark:bg-neutral-800 dark:ring-0 dark:highlight-white/5 dark:text-neutral-300',
          panelClassName
        )}
      >
        {themes.map(({ value, label, icon: Icon }) => (
          <Listbox.Option key={value} value={value} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={clsx(
                  'py-1 px-3 flex items-center cursor-pointer',
                  selected && 'text-green-500',
                  active && 'bg-neutral-50 dark:bg-neutral-600/30'
                )}
              >
                <Icon className={clsx("w-5 h-5 mr-2", selected ? "text-green-600 dark:text-green-500" : "text-neutral-500 dark:text-neutral-500")} />
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};


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
                  height="28"
                  width="28"
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
                  <Toggle />
                  
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
