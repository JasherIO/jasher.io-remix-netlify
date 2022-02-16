import { classNames } from "~/utilities/classNames";

type SectionProps = {
  children?: React.ReactNode,
  className?: String
};

export default function Section(props: SectionProps) {
  const { children, className: additional, ..._props } = props;
  const base = "max-w-7xl mx-auto py-8 lg:py-14 px-4 sm:px-6 lg:px-8";

  return (
    <section className={classNames(base, additional)} {..._props}>
      {children}
    </section>
  )
};
