import { classNames } from "~/utilities/classNames";

type MainProps = {
  children?: React.ReactNode,
  className?: String
};

export default function Main(props: MainProps) {
  const { children, className: additional, ..._props } = props;
  const base = "mt-4";

  return (
    <main className={classNames(base, additional)} {..._props}>
      {children}
    </main>
  )
};

