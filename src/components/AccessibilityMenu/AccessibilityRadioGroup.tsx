import {
  RadioGroup as HeadlessRadioGroup,
  Label,
  Field,
  Radio,
} from "@headlessui/react";
import React, { Fragment } from "react";

interface RadioGroupProps {
  onChange: (value: string) => void;
  value: string;
  heading: string;
  options: { name: string; value: string }[];
}

export const RadioGroup = ({
  onChange,
  value,
  heading,
  options,
}: RadioGroupProps) => {
  return (
    <HeadlessRadioGroup
      value={value}
      onChange={onChange}
      aria-label={heading}
      defaultValue={options[0].value}
      className="flex flex-col gap-3 basis-1/2 accessibility_menu"
    >
      <Label as="h3" className="flex gap-5 text-h3 font-title sm:text-h2">
        {heading}
      </Label>
      {options.map((option) => (
        <Field key={option.name} className="flex items-center gap-5">
          <Radio as={Fragment} value={option.value}>
            {({ checked }) => (
              <span className="flex items-center gap-5 text-lg radio-group">
                <span
                  className={`border-black border-2 rounded-md w-5 h-5 inline-block ${checked ? "bg-yellow hover:bg-yellow-light" : "hover:bg-purple-light"}`}
                />
                <Label>{option.name}</Label>
              </span>
            )}
          </Radio>
        </Field>
      ))}
    </HeadlessRadioGroup>
  );
};
