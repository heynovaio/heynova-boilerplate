"use client";

// import { Button } from "@/components";
import { Section, Container, ResponsiveImage, ContentBox } from "@/components";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
// import { components } from "@/utils";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `ImageText`.
 */
export type ImageTextProps = SliceComponentProps<Content.ImageTextSlice>;

/**
 * Component for "ImageText" Slices.
 */
const ImageText = ({ slice }: ImageTextProps): JSX.Element => {
  const isVideo = slice.variation === "video";

  const imageSide =
    slice.primary.image_left === false ? "md:flex-row-reverse" : "md:flex-row";

  const imageFit =
    (slice.primary as Record<string, unknown>).imageFit === "cover"
      ? "cover"
      : "contain";

  const buttons = slice.primary.button?.some((item) => isFilled.link(item))
    ? slice.primary.button.map((link, index) =>
        isFilled.link(link) ? (
          <PrismicNextLink
            field={link}
            key={index}
            className="btn btn-primary"
          />
        ) : null,
      )
    : undefined;

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${slice.primary.background_color.toLocaleLowerCase()}`}
    >
      <Container
        containerClassName={`flex flex-col ${imageSide} gap-4 md:gap-16 w-full items-center`}
      >
        <div className="w-full md:w-1/2">
          {isVideo ? (
            <div className="w-full h-62.5 md:h-100 overflow-hidden rounded-xl">
              <div
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 relative"
                dangerouslySetInnerHTML={{
                  __html: slice.primary.video?.html ?? "",
                }}
              />
            </div>
          ) : (
            <ResponsiveImage
              image={slice.primary.image}
              className={`w-full h-62.5 md:h-100 object-${imageFit} mb-4 md:mb-0 rounded-image`}
            />
          )}
        </div>

        <div className="w-full md:w-1/2">
          <ContentBox
            title={slice.primary.title}
            tagline={slice.primary.subtitle || ""}
            content={<PrismicRichText field={slice.primary.description} />}
            buttons={buttons}
          />
        </div>
      </Container>
    </Section>
  );
};

export default ImageText;
