import { type ReactElement, type ReactNode } from "react";
import { CardSubtitle } from "react-md";

interface ExampleProps {
  noWrap?: boolean;
  children: ReactNode;
  disableSecondaryColor?: boolean;
}

export default function Example({
  noWrap,
  children,
  disableSecondaryColor,
}: ExampleProps): ReactElement {
  return (
    <>
      <CardSubtitle noWrap>{children}</CardSubtitle>
      <CardSubtitle disableSecondaryColor>{children}</CardSubtitle>
      <CardSubtitle
        noWrap={noWrap}
        disableSecondaryColor={disableSecondaryColor}
      >
        {children}
      </CardSubtitle>
    </>
  );
}
