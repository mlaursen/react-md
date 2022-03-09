import type { ReactElement } from "react";

import type { FormattedSassDocItem } from "utils/sassdoc";

import SassDocItem from "./SassDocItem";
import SectionTitle from "./SectionTitle";

export interface SectionProps {
  type: "Variables" | "Functions" | "Mixins";
  items: FormattedSassDocItem[];
  packageName: string;
}

export default function Section({
  items,
  type,
  packageName,
}: SectionProps): ReactElement | null {
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
}
