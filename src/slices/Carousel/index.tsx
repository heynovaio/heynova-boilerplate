import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  Container,
  ContentBox,
  MultiCardPerTab,
  Section,
  SingleCardPerTab,
} from "@/components";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
  let carouselType;
  switch (slice.variation) {
    case "carouselMultiCard":
      carouselType = <MultiCardPerTab slice={slice} />;
      break;
    default:
      carouselType = <SingleCardPerTab slice={slice} />;
      break;
  }

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="overflow-x-hidden bg-background-complementary"
    >
      <Container containerClassName="flex flex-col items-center">
        <ContentBox
          title={slice.primary.title}
          content={
            <div className="text-bodyLarge">
              <PrismicRichText field={slice.primary.body} />
            </div>
          }
          width="standard"
        />
      </Container>
      {carouselType}
    </Section>
  );
};

export default Carousel;
