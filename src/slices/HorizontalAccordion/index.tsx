"use client";

import React, { JSX } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { HorizontalAccordion } from "@/components/Accordion/HorizontalAccordion";
import { Container, ContentBox, Section } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

export type HorizontalAccordionSliceProps = SliceComponentProps<
  Content.HorizontalAccordionSlice,
  SliceContext
>;

const HorizontalAccordionSlice = ({
  slice,
  context,
}: HorizontalAccordionSliceProps): JSX.Element | null => {
  if (!slice.primary.accordion) {
    return null;
  }

  const isBlog = context?.isBlogPage ?? false;

  const titles = slice.primary.accordion.map((item) => item.title || "");
  const contents = slice.primary.accordion.map((item) => item.body || "");
  const images = slice.primary.accordion.map((item) => item.icon || null);
  const buttons = slice.primary.accordion.map((item) => item.button || null);

  const selectedTabClass = "bg-secondary"; // TODO: replace this with however Faye is setting up all this stuff
  const backgroundClass = `bg-background-${slice.primary.background_color ? slice.primary.background_color.toLocaleLowerCase() : "bg-background-none"}`;
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={` bg-background-${slice.primary.background_color ? slice.primary.background_color.toLocaleLowerCase() : "bg-background-none"}`}
    >
      <Container>
        <ContentBox
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
          buttons={slice.primary.buttons.map((button, index) => {
            return (
              <PrismicNextLink
                field={button}
                key={index}
                className="btn btn-primary"
              />
            );
          })}
          className="mb-8"
        />
        <HorizontalAccordion
          titles={titles}
          contents={contents}
          images={images}
          buttons={buttons}
          backgroundClass={backgroundClass}
          selectedTabClass={selectedTabClass}
        />
      </Container>
    </Section>
  );
};

export default HorizontalAccordionSlice;
