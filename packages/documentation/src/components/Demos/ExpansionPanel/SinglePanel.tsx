import { ReactElement, useState } from "react";
import { usePanels, ExpansionPanel } from "@react-md/expansion-panel";
import { Typography } from "@react-md/typography";
import { Grid } from "@react-md/utils";

export default function SinglePanel(): ReactElement {
  const [[panelProps]] = usePanels({ idPrefix: "single-panel", count: 1 });
  const [expanded, setExpanded] = useState(false);
  return (
    <Grid columns={1}>
      <ExpansionPanel {...panelProps} header="With usePanels">
        <Typography>
          Suspendisse malesuada vitae ipsum quis faucibus. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nam accumsan turpis non
          efficitur vehicula. Aenean egestas lobortis fermentum. Integer a purus
          ullamcorper, ultrices libero convallis, laoreet ligula. Pellentesque
          tellus sapien, porta at mollis a, vehicula eu sem. Fusce lacinia at
          nulla eget dapibus. Fusce scelerisque luctus ex non fermentum. Integer
          feugiat velit id sagittis commodo. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nam non facilisis ipsum. Vivamus commodo fermentum lectus
          sit amet finibus. Donec porttitor, justo nec viverra interdum, mi
          lacus pulvinar justo, elementum faucibus lectus nisi at turpis.
          Phasellus a ultricies ipsum, vel sodales orci.
        </Typography>
      </ExpansionPanel>
      <ExpansionPanel
        id="single-panel-own-props"
        expanded={expanded}
        onExpandClick={() => setExpanded(!expanded)}
        header="Custom Props"
      >
        <Typography>
          Suspendisse malesuada vitae ipsum quis faucibus. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nam accumsan turpis non
          efficitur vehicula. Aenean egestas lobortis fermentum. Integer a purus
          ullamcorper, ultrices libero convallis, laoreet ligula. Pellentesque
          tellus sapien, porta at mollis a, vehicula eu sem. Fusce lacinia at
          nulla eget dapibus. Fusce scelerisque luctus ex non fermentum. Integer
          feugiat velit id sagittis commodo. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nam non facilisis ipsum. Vivamus commodo fermentum lectus
          sit amet finibus. Donec porttitor, justo nec viverra interdum, mi
          lacus pulvinar justo, elementum faucibus lectus nisi at turpis.
          Phasellus a ultricies ipsum, vel sodales orci.
        </Typography>
      </ExpansionPanel>
    </Grid>
  );
}
