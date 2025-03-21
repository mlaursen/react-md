import { type ReactElement } from "react";
import { ExpansionPanel, ExpansionPanelHeader, Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ExpansionPanel headerChildren="Some Content">And some more</ExpansionPanel>
      <ExpansionPanel headerChildren={<Typography>Some JSX</Typography>}>
        And some more
      </ExpansionPanel>
      <ExpansionPanel header={<ExpansionPanelHeader />}>
        Content
      </ExpansionPanel>
    </>
  );
}
