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
      <CardSubtitle textOverflow="nowrap">{children}</CardSubtitle>
      <CardSubtitle textColor={null}>{children}</CardSubtitle>
      <CardSubtitle
        textOverflow={noWrap ? "nowrap" : undefined}
        textColor={disableSecondaryColor ? null : undefined}
      >
        {children}
      </CardSubtitle>
    </>
  );
}
