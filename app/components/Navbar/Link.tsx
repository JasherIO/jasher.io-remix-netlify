import { NavLink } from "remix";
import { classNames } from "~/utilities/classNames";

function _Link(props: any) {
  const { classes, ..._props } = props;
  const { children } = _props;
  const { base, active, inactive } = classes;
  
  return (
    <NavLink
      {..._props}
      prefetch="intent"
      className={({ isActive }) => isActive ? classNames(base, active) : classNames(base, inactive)}
    >
      {children}
    </NavLink>
  )
}

export function DesktopLink(props: any) {
  const classes = {
    base: "px-2 py-2 text-sm font-medium border-b-2",
    active: "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400",
    inactive: "border-neutral-100 dark:border-neutral-900 hover:border-neutral-900 dark:hover:border-neutral-100 text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100 dark:hover:border-neutral-100"
  }

  return (<_Link {...props} classes={classes} />)
}

export function MobileLink(props: any) {
  const classes = {
    base: "block text-center px-3 py-2 rounded-md text-base font-medium",
    active: "text-green-500",
    inactive: "text-neutral-800 dark:text-neutral-200"
  }

  return (<_Link {...props} classes={classes} />)
}
