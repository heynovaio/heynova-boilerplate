import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  containerClassName?: string;
}

export function Section({
  children,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      className={`px-5 mx-auto max-w-screen-xl w-full ${containerClassName || ""}`}
      {...props}
    >
      {children}
    </section>
  );
}
