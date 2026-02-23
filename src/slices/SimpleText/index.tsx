import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Section/Section";
import { Container } from "@/components/Container/Container";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `SimpleText`.
 */
export type SimpleTextProps = SliceComponentProps<Content.SimpleTextSlice>;

/**
 * Component for "SimpleText" Slices.
 */
const SimpleText: FC<SimpleTextProps> = ({ slice }) => {
  const leftAligned = slice.primary.text_formatting === false;
  const textAlignment = leftAligned
    ? "items-start text-left"
    : "items-center text-center";

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "bg-background-none"}`}
    >
      <Container>
        <ContentBox
          tagline={slice.primary.subtitle || ""}
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
          width="narrow"
          className={`flex flex-col justify-center gap-2 sm:w-2/3 mx-auto px-4 sm:px-0 ${textAlignment}`}
          buttons={slice.primary.buttons.map((item, index) => {
            return (
              <PrismicNextLink
                field={item}
                key={index}
                className={
                  index === 0 ? "btn btn-primary" : "btn btn-secondary"
                }
              />
            );
          })}
        />
      </Container>
    </Section>
  );
};

export default SimpleText;
