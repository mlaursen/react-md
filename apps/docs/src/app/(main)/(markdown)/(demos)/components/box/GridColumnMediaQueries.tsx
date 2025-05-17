import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function GridColumnMediaQueries(): ReactElement {
  return (
    <>
      <AppSize />
      <Box
        grid
        gridColumns={{
          phone: 1,
          tablet: "fill",
          desktop: "fit",
          largeDesktop: 6,
        }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <Card key={i}>
            <CardContent>{`Item ${i + 1}`}</CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

function AppSize(): ReactElement {
  const appSize = useAppSize();
  let current: string;
  if (appSize.isPhone) {
    current = "phone: 1";
  } else if (appSize.isTablet) {
    current = 'tablet: "fill"';
  } else if (appSize.isLargeDesktop) {
    current = "largeDesktop: 6";
  } else {
    current = 'desktop: "fit"';
  }
  return <Typography>Using {current}</Typography>;
}
