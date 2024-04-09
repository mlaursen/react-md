import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
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
