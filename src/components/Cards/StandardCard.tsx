import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { Button } from "../Buttons/Button";
import { ResponsiveImage } from "../ResponsiveImage/ResponsiveImage";

interface StandardCardProps {
  title?: RichTextField | KeyTextField | string;
  subtitle?: KeyTextField | string;
  description?: RichTextField | KeyTextField | string;
  button?: LinkField;
  image?: ImageField;

  textAlignment?: "left" | "center" | "right";
  imageStyle?: "fullWidth" | "contained" | "iconCentered" | "iconLeft";
  radiusClass?: string;
  shadowClass?: string;

  borderColorClass?: string;
  cardBgColorClass?: string;
  titleTextClassName?: string;
  buttonClass?: "primary" | "secondary" | "outline";
  titleLevel?: "h3" | "h4";

  noBackground?: boolean;
}

export const StandardCard = ({
  title,
  description,
  subtitle,
  image,
  imageStyle = "contained",
  textAlignment = "left",
  borderColorClass = "border-white",
  cardBgColorClass = "",
  radiusClass = "rounded-[1.25rem]",
  shadowClass = "",
  button,
  buttonClass = "primary",
  titleTextClassName = "",
  titleLevel = "h3",
  noBackground = false,
}: StandardCardProps) => {
  const hasImage = isFilled.image(image);

  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[textAlignment];

  const renderTitle = () => {
    if (!title) return null;

    if (Array.isArray(title)) {
      return (
        <PrismicRichText
          field={title}
          components={{
            heading3: ({ children }) => (
              <h3 className={`${titleTextClassName} mb-4`}>{children}</h3>
            ),
            heading2: ({ children }) => (
              <h2 className={`${titleTextClassName} mb-4`}>{children}</h2>
            ),
            heading4: ({ children }) => (
              <h4 className={`${titleTextClassName} mb-4`}>{children}</h4>
            ),
          }}
        />
      );
    }

    return titleLevel === "h3" ? (
      <h3 className={`${titleTextClassName} mb-4`}>{title}</h3>
    ) : (
      <h4 className={`${titleTextClassName} mb-4`}>{title}</h4>
    );
  };
  const renderDescription = () => {
    if (!description) return null;
    if (Array.isArray(description)) {
      return <PrismicRichText field={description} />;
    }
    return <p>{description}</p>;
  };

  const renderSubtitle = () => {
    if (!subtitle) return null;
    return <p>{subtitle}</p>;
  };

  const renderImage = () => {
    if (!image || !("url" in image) || !image.url) {
      return null;
    }

    if (imageStyle === "contained") {
      return (
        <div className="w-full pb-6">
          <ResponsiveImage image={image} className="object-cover h-72 w-full" />
        </div>
      );
    }

    if (imageStyle === "iconLeft" || imageStyle === "iconCentered") {
      return (
        <div
          className={`w-full flex items-center ${imageStyle === "iconCentered" ? "justify-center" : "justify-start"} pb-6`}
        >
          <ResponsiveImage
            image={image}
            className="object-contain max-h-32 w-auto"
          />
        </div>
      );
    }

    return (
      <div className="relative -mx-8 -mt-8 mb-4 ">
        <ResponsiveImage
          image={image}
          className="w-full h-72 object-cover rounded-none"
        />
      </div>
    );
  };

  const renderButton = () => {
    if (!isFilled.link(button)) return null;

    return (
      <div className="mt-4">
        <Button button={button} buttonClass={buttonClass} />
      </div>
    );
  };

  return !noBackground ? (
    <div
      className={`border ${borderColorClass} ${cardBgColorClass} ${radiusClass} ${shadowClass} p-6 w-full overflow-hidden h-full flex flex-col`}
    >
      {hasImage && renderImage()}

      <div
        className={`
        flex flex-col w-full
        ${
          !hasImage
            ? "flex-1 justify-center items-center text-center"
            : alignmentClass
        }
      `}
      >
        {renderSubtitle()}
        {renderTitle()}
        {renderDescription()}
        {renderButton()}
      </div>
    </div>
  ) : (
    <div className={` p-6 w-full overflow-hidden h-full flex flex-col`}>
      {hasImage && renderImage()}

      <div
        className={`
        flex flex-col w-full
        ${
          !hasImage
            ? "flex-1 justify-center items-center text-center"
            : alignmentClass
        }
      `}
      >
        {renderSubtitle()}
        {renderTitle()}
        {renderDescription()}
        {renderButton()}
      </div>
    </div>
  );
};
