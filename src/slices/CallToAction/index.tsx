import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${slice.primary.background.toLocaleLowerCase()}`}
    >
      <Container>
        <Section styling="cta rounded-4xl">
          <ContentBox
            title={slice.primary.title}
            content={<PrismicRichText field={slice.primary.body} />}
            buttons={slice.primary.buttons.map((button, index) => (
              <PrismicNextLink
                key={button.key}
                field={button}
                className={
                  index === 0 ? "btn btn-primary" : "btn btn-secondary"
                }
              >
                {button.text}
              </PrismicNextLink>
            ))}
            width="narrow"
            className="flex flex-col justify-center gap-2 sm:w-2/3 mx-auto px-4 sm:px-0"
          />
        </Section>
      </Container>
    </Section>
  );
};

export default CallToAction;
