import { Link } from "@react-md/core/link/Link";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <TextContainer>
      <Typography type="headline-2">ReactMD + Next.js Starter</Typography>
      <Typography>
        See{" "}
        <Link href="https://next.react-md.dev" target="_blank">
          https://next.react-md.dev
        </Link>{" "}
        and{" "}
        <Link href="https://nextjs.org" target="_blank">
          https://nextjs.org
        </Link>{" "}
        for more information.
      </Typography>
    </TextContainer>
  );
}
