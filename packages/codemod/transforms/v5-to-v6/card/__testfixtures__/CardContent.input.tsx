import { type ReactElement } from "react";
import { CardContent } from "react-md";

export default function CardContent(): ReactElement {
  return (
    <>
      <CardContent>Content</CardContent>
      <CardContent disableParagraphMargin>Content</CardContent>
      <CardContent disableExtraPadding>Content</CardContent>
      <CardContent disablePadding disableSecondaryColor className="custom">
        Content
      </CardContent>
    </>
  );
}
