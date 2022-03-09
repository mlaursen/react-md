import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";
import type { ItemThrow } from "utils/sassdoc";

export interface ThrowsProps {
  throws: ItemThrow | undefined;
}

export default function Throws({ throws }: ThrowsProps): ReactElement | null {
  if (!throws || !throws.length) {
    return null;
  }

  return (
    <>
      <Typography type="headline-6" margin="top">
        Throws
      </Typography>
      <ul>
        {throws.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </>
  );
}
