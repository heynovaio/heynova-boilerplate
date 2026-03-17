import { FC } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  Container,
  ContentBox,
  Section,
  VerticalAccordion,
} from "@/components";
import { PrismicNextLink } from "@prismicio/next";
import { HorizontalAccordion } from "@/components/Accordion/HorizontalAccordion";
import { AccordionSliceHorizontalAccordionPrimaryAccordionItem } from "../../../prismicio-types";

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

  const titles = slice.primary.accordion.map(
    (item) => item.title,
  ) as KeyTextField[];
  const contents = slice.primary.accordion.map((item) => item.body || "");
  const images = slice.primary.accordion.map((item) => {
    return isVertical
      ? null
      : (item as AccordionSliceHorizontalAccordionPrimaryAccordionItem).icon ||
          null;
  });
  const buttons = slice.primary.button;

  const selectedTabClass = `bg-background-${slice.primary.card_style ? slice.primary.card_style.toLocaleLowerCase() : "bg-background-default"}`;

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "default"}`}
    >
      <Container>
        <ContentBox
          tagline={slice.primary.tagline || ""}
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
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
              content={item.body}
              key={index}
              boldTitle={true}
              background={selectedTabClass}
            />
          ))}
        {!isVertical && (
          <HorizontalAccordion
            titles={titles}
            contents={contents}
            images={images}
            buttons={buttons}
            backgroundClass={selectedTabClass}
          />
        )}
      </Container>
    </Section>
  );
};

export default Accordion;
