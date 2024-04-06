import { Box, Typography, typography } from "react-md";
import { type ReactElement } from "react";

export default function CustomTypographyElement(): ReactElement {
  return (
    <Box stacked>
      <Typography type="headline-1" as="p">
        Paragraph
      </Typography>
      <div className={typography({ type: "headline-3" })}>Div</div>
    </Box>
  );
}
