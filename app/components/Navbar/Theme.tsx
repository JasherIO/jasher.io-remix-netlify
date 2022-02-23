// https://github.com/tailwindlabs/tailwindcss.com/blob/6024007d1578e14109509a154b89661762064914/src/components/ThemeToggle.js
import { Fragment, useEffect, useRef, useState } from 'react';
import { Listbox } from "@headlessui/react";
import { DesktopComputerIcon, MoonIcon, SunIcon, } from "@heroicons/react/outline";
import { classNames } from "~/utilities/classNames";
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';

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

    // 
    // if (initial.current) {
    //   initial.current = false;
    // } else {
    //   update();
    // }
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

export function ThemeToggle({ panelClassName = 'mt-4' }) {
  let [setting, setSetting] = useTheme();

  return (
    <Listbox value={setting} onChange={setSetting}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button type="button">
        <span className="dark:hidden">
          <SunIcon className={classNames("w-5 h-5", setting !== 'system' && "text-green-600 dark:text-green-500")} />
        </span>
        <span className="hidden dark:inline">
          <MoonIcon className={classNames("w-5 h-5", setting !== 'system' && "text-green-600 dark:text-green-500")} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={classNames(
          'absolute z-50 top-full right-8 bg-white rounded-lg ring-1 ring-neutral-900/10 shadow-lg overflow-hidden py-1 text-sm text-neutral-900 font-semibold dark:bg-neutral-800 dark:ring-0 dark:highlight-white/5 dark:text-neutral-300',
          panelClassName
        )}
      >
        {themes.map(({ value, label, icon: Icon }) => (
          <Listbox.Option key={value} value={value} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={classNames(
                  'py-1 px-3 flex items-center cursor-pointer',
                  selected && 'text-green-500',
                  active && 'bg-neutral-50 dark:bg-neutral-600/30'
                )}
              >
                <Icon className={classNames("w-5 h-5 mr-2", selected ? "text-green-600 dark:text-green-500" : "text-neutral-500 dark:text-neutral-500")} />
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
