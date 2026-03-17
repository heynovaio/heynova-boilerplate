"use client";
import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */

const Testimonial: FC<TestimonialProps> = ({ slice }) => {
  const allTestimonials = slice.primary.testimonial;

  const [randomIndex, setRandomIndex] = useState(() =>
    Array.isArray(allTestimonials) && allTestimonials.length > 0
      ? Math.floor(Math.random() * allTestimonials.length)
      : 0,
  );

  useEffect(() => {
    if (Array.isArray(allTestimonials) && allTestimonials.length > 0) {
      setRandomIndex(Math.floor(Math.random() * allTestimonials.length));
    }
    // Only run when the testimonials array reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTestimonials]);

  if (!Array.isArray(allTestimonials) || allTestimonials.length === 0) {
    return <></>;
  }

  const hasImage = Boolean(
    allTestimonials.map((testimonial) => testimonial.image).filter(Boolean)
      .length,
  );

  const displayedTestimonial = allTestimonials[randomIndex];

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`pt-6 bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "default"}`}
    >
      <Container containerClassName="flex flex-col gap-12 items-center">
        <ContentBox
          tagline={slice.primary.tagline || ""}
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
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
        <div
          className={`bg-background-${slice.primary.card_style ? slice.primary.card_style.toLocaleLowerCase() : "default"} relative rounded-default py-4 px-6 md:py-16 md:px-28 overflow-hidden`}
        >
          <div
            className={`relative z-10 flex flex-col gap-4 md:gap-12 ${
              hasImage
                ? "md:flex-row md:items-center"
                : "items-center text-center"
            }`}
          >
            {hasImage && (
              <div className="w-full md:w-1/3 aspect-square shrink-0 max-h-60 md:max-h-none">
                <PrismicNextImage
                  field={displayedTestimonial.image}
                  className="w-full h-full object-contain rounded-[1.25rem]"
                  alt=""
                />
              </div>
            )}

            <div
              className={`flex flex-col gap-2 ${
                hasImage ? "" : "items-center max-w-2xl"
              }`}
            >
              <div>
                {slice.primary.tagline != "" && (
                  <span className="text-accent tagline">
                    {slice.primary.tagline}
                  </span>
                )}
                <PrismicRichText field={slice.primary.title} />
              </div>
              <PrismicRichText field={displayedTestimonial.quote} />
              <div
                className={`flex flex-col ${hasImage ? "" : "items-center"}`}
              >
                <p className="text-[1.875rem] font-extraBold">
                  {displayedTestimonial.author}
                </p>
                <p className="text-[1.375rem]">
                  {displayedTestimonial.author_title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Testimonial;
