import { Link } from "@react-md/core/link/Link";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";

export function Welcome() {
  return (
    <TextContainer>
      <Typography type="headline-2">ReactMD + react-router Starter</Typography>
      <Typography>
        See{" "}
        <Link href="https://next.react-md.dev" target="_blank">
          https://next.react-md.dev
        </Link>{" "}
        and{" "}
        <Link href="https://reactrouter.com/docs" target="_blank">
          https://reactrouter.com/docs
        </Link>{" "}
        for more information.
      </Typography>
    </TextContainer>
  );
}
