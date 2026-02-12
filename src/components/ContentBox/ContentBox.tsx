import { PrismicRichText } from "@prismicio/react";
import React, { ReactNode, useMemo } from "react";
import clsx from "clsx";
import { getWidthClassNames, WidthProp } from "@/utils";
import { RichTextField } from "@prismicio/client";

interface ContentBoxProps {
  children?: ReactNode;
  title?: string | RichTextField;
  tagline?: string;
  content?: ReactNode;
  buttons?: ReactNode[];
  width?: WidthProp;
  className?: string;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  title,
  tagline,
  content,
  buttons,
  width = "full",
  className, // Have different content-box types -> Make a list of the styles available
  ...props
}) => {
  const widthClassName = getWidthClassNames(width);

  return (
    <div
      data-test-id="contentbox"
      className={clsx(
        "flex flex-col gap-7 content-box",
        widthClassName,
        className,
      )}
      {...props}
    >
      <div className="flex flex-col w-full gap-2 content-box__title-container">
        {(tagline || title) && (
          <div>
            {tagline && <div className="text-bodyLarge tagline">{tagline}</div>}
            {typeof title === "string" ? (
              <h2>{title}</h2>
            ) : (
              <PrismicRichText field={title} />
            )}
          </div>
        )}
        {content && <div className="content-box__content">{content}</div>}
      </div>
      {buttons && buttons.length > 0 && (
        // TODO: Make a button component to replace this div
        <div className="flex gap-6 button-container">{buttons}</div>
      )}
      {children}
    </div>
  );
};
