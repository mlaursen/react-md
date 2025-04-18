import { Link } from "@react-md/core/link/Link";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { RootLayout } from "./RootLayout.jsx";

export default function App(): ReactElement {
  return (
    <RootLayout>
      <TextContainer>
        <Typography type="headline-2">ReactMD + Vite Starter</Typography>
        <Typography>
          See{" "}
          <Link href="https://next.react-md.dev" target="_blank">
            https://next.react-md.dev
          </Link>{" "}
          and{" "}
          <Link href="https://vite.dev" target="_blank">
            https://vite.dev
          </Link>{" "}
          for more information.
        </Typography>
      </TextContainer>
    </RootLayout>
  );
}
