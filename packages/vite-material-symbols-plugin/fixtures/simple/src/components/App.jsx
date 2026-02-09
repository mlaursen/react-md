import { Link } from "@react-md/core/link/Link";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";

import { RootLayout } from "./RootLayout.jsx";

export default function App() {
  return (
    <RootLayout>
      <TextContainer>
        <Typography>
          This is a simple app bootstrapped with{" "}
          <Link href="https://react-md.dev">react-md</Link> and{" "}
          <Link href="https://vite.dev">vite</Link>.
        </Typography>
      </TextContainer>
    </RootLayout>
  );
}
