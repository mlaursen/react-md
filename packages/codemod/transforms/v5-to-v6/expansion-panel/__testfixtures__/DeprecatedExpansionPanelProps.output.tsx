import { type ReactElement } from "react";
import { ExpansionPanel } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ExpansionPanel raisable />
      <ExpansionPanel disableContentPadding />
      <ExpansionPanel />
      <ExpansionPanel />
      <ExpansionPanel contentProps={{
        disableSecondaryColor: false
      }} />
      <ExpansionPanel contentProps={{
        disableSecondaryColor: flag || another
      }} />
    </>
  );
}
