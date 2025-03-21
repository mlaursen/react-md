import { type ReactElement } from "react";
import { CardContent } from "react-md";

export default function CardContent(): ReactElement {
  return (
    <>
      <CardContent>Content</CardContent>
      <CardContent>Content</CardContent>
      <CardContent disableLastChildPadding>Content</CardContent>
      <CardContent disablePadding disableSecondaryColor className="custom">
        Content
      </CardContent>
    </>
  );
}
