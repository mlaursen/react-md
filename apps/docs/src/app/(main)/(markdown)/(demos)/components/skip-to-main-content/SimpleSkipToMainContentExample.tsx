import { AppBar } from "@react-md/core/app-bar/AppBar";
import { SkipToMainContent } from "@react-md/core/link/SkipToMainContent";
import { type ReactElement } from "react";

export default function SimpleSkipToMainContentExample(): ReactElement {
  return (
    <AppBar style={{ position: "relative" }}>
      <SkipToMainContent />
    </AppBar>
  );
}
