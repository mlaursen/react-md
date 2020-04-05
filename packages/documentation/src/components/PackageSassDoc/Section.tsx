import React, { FC } from "react";

import { FormattedSassDocItem } from "utils/sassdoc";

import SassDocItem from "./SassDocItem";
import SectionTitle from "./SectionTitle";

export interface SectionProps {
  type: "Variables" | "Functions" | "Mixins";
  items: FormattedSassDocItem[];
  packageName: string;
}

const Section: FC<SectionProps> = ({ items, type, packageName }) => {
  if (!items.length) {
    return null;
  }

  return (
    <>
      <SectionTitle packageName={packageName} type={type} />
      {items.map((item) => (
        <SassDocItem key={item.name} {...item} />
      ))}
    </>
  );
};

export default Section;
