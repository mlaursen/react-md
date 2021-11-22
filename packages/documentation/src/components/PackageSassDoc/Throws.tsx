import { ReactElement } from "react";
import { Text } from "@react-md/typography";
import { ItemThrow } from "utils/sassdoc";

export interface ThrowsProps {
  throws: ItemThrow | undefined;
}

export default function Throws({ throws }: ThrowsProps): ReactElement | null {
  if (!throws || !throws.length) {
    return null;
  }

  return (
    <>
      <Text type="headline-6" margin="top">
        Throws
      </Text>
      <ul>
        {throws.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </>
  );
}
