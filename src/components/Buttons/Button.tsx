import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface ButtonProps {
  button: LinkField;
  buttonClass?: "primary" | "secondary" | "outline";
}
export const Button = ({ button, buttonClass = "primary" }: ButtonProps) => {
  return (
    <PrismicNextLink field={button} className={`btn btn-${buttonClass}`}>
      {button.text || "Learn more"}
    </PrismicNextLink>
  );
};
