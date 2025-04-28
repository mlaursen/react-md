import { type ReactElement } from "react";
import { ExpansionPanel } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ExpansionPanel raiseable />
      <ExpansionPanel disablePadding />
      <ExpansionPanel disableLastParagraphMargin />
      <ExpansionPanel disableSecondaryColor />
      <ExpansionPanel disableSecondaryColor={false} />
      <ExpansionPanel disableSecondaryColor={flag || another} />
    </>
  );
}
