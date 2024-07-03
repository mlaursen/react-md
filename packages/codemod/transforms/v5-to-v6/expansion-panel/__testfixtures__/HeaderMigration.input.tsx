import { type ReactElement } from "react";
import { ExpansionPanel, ExpansionPanelHeader, Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ExpansionPanel header="Some Content">And some more</ExpansionPanel>
      <ExpansionPanel header={<Typography>Some JSX</Typography>}>
        And some more
      </ExpansionPanel>
      <ExpansionPanel customHeader={<ExpansionPanelHeader />}>
        Content
      </ExpansionPanel>
    </>
  );
}
