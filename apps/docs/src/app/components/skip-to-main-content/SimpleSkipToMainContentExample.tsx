import { AppBar, SkipToMainContent } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleSkipToMainContentExample(): ReactElement {
  return (
    <AppBar style={{ position: "relative" }}>
      <SkipToMainContent />
    </AppBar>
  );
}
