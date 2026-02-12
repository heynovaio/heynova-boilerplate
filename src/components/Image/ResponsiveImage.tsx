import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";

interface PrismicImageProps extends PrismicNextImageProps {
  image?: ImageField;
  containerClassName?: string;
  className?: string;
  imageHeightClassName?: string;
}

export const ResponsiveImage: React.FC<PrismicImageProps> = ({
  image,
  containerClassName,
  imageHeightClassName = "",
  ...props
}) => {
  if (!isFilled.image(image)) {
    return null;
  }
  return (
    <div className={clsx("relative", containerClassName)}>
      <PrismicNextImage
        fallbackAlt=""
        className={`object-cover rounded ${imageHeightClassName}`}
        {...props}
      />
    </div>
  );
};
