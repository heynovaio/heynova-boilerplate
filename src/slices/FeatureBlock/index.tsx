import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Container, Section } from "@/components";

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
  return (
    <Section className="bg-black">
      <Container>
        <div>test</div>
      </Container>
    </Section>
  );
};

export default FeatureBlock;
