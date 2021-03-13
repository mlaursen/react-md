import React, { ReactElement } from "react";
import { Link } from "@react-md/link";
import { Text } from "@react-md/typography";

export default function MaliciousTarget(): ReactElement {
  return (
    <Text type="body-2">
      This link to{" "}
      <Link href="https://google.com" target="_blank">
        google.com
      </Link>{" "}
      will be updated to prevent malicious scripts from Google, while this link
      to{" "}
      <Link
        href="https://www.w3.org/"
        target="_blank"
        preventMaliciousTarget={false}
      >
        w3.org
      </Link>{" "}
      will not.
    </Text>
  );
}
