import { FC } from "react";
import { Content, RichTextField, ImageField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Container, Section } from "@/components";
import { Grid } from "@/components";
import { StandardCard } from "@/components/Cards/StandardCard";

/**
 * Props for `FeatureBlock`.
 */
export type FeatureBlockProps = SliceComponentProps<Content.FeatureBlockSlice>;

/**
 * Component for "FeatureBlock" Slices.
 */
const FeatureBlock: FC<FeatureBlockProps> = ({ slice }) => {
  const numColumns = slice.primary.number_of_columns;
  const leftAligned = slice.primary.alignment === false;
  const selectedBackground = slice.primary.background;
  const selectedCardBackground = slice.primary.card_background;

  const imageBeside = selectedBackground === "None" && leftAligned === true;
  const blocks = (slice.primary.blocks || []).map((block) => ({
    title: block.title as RichTextField,
    body: block.description as RichTextField,
    image: block.icon as ImageField,
  }));

  return (
    <Section
      styling={`bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "bg-background-none"}`}
    >
      <Container>
        <div className="mt-10">
          <Grid maxColumns={numColumns}>
            {blocks.map((block, index) => (
              <StandardCard
                key={index}
                title={block.title}
                description={block.body}
                image={block.image}
                cardBgColorClass="bg-primary" // TODO: these need to be hooked  up to the right classes once we know which one is using which class
                borderColorClass="border-red"
                imageStyle={
                  imageBeside
                    ? "imageBeside"
                    : leftAligned
                      ? "iconLeft"
                      : "iconCentered"
                }
                textAlignment={leftAligned ? "left" : "center"}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default FeatureBlock;
