import clsx from "clsx";

type MainProps = {
  children?: React.ReactNode,
  className?: String
};

export default function Main(props: MainProps) {
  const { children, className: additional, ..._props } = props;
  const base = "max-w-4xl mx-auto";

  return (
    <main className={clsx(base, additional)} {..._props}>
      {children}
    </main>
  )
};

