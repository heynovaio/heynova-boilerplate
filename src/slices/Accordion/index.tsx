import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  Container,
  ContentBox,
  Section,
  VerticalAccordion,
} from "@/components";
import { PrismicNextLink } from "@prismicio/next";
import { HorizontalAccordion } from "@/components/Accordion/HorizontalAccordion";

/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>;

/**
 * Component for "Accordion" Slices.
 */
const Accordion: FC<AccordionProps> = ({ slice }) => {
  if (!slice.primary.accordion) {
    return null;
  }

  const isVertical = slice.variation === "default";

  const titles = slice.primary.accordion.map((item) => item.title || "");
  const contents = slice.primary.accordion.map(
    (item) => item.description || "",
  );
  // const images = slice.primary.accordion.map((item) => item.icon || null);
  const buttons = slice.primary.accordion.map((item) => item.button || null);

  const selectedTabClass = "bg-secondary"; // TODO: replace this with however Faye is setting up all this stuff
  const backgroundClass = `bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "bg-background-none"}`;

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
          content={<PrismicRichText field={slice.primary.description} />}
          buttons={slice.primary.button.map((item, index) => {
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
        {isVertical &&
          slice.primary.accordion.map((item, index) => (
            <VerticalAccordion
              title={item.title}
              content={item.description}
              key={index}
              boldTitle={true}
            />
          ))}
        {!isVertical && (
          <HorizontalAccordion
            titles={titles}
            contents={contents}
            // images={images}
            // buttons={buttons}
            backgroundClass={backgroundClass}
            selectedTabClass={selectedTabClass}
          />
        )}
      </Container>
    </Section>
  );
};

export default Accordion;
