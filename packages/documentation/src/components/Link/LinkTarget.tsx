import * as React from "react";
import { Text } from "@react-md/typography";
import { Link } from "@react-md/link";

const LinkTarget: React.SFC<{}> = () => (
  <Text type="body-2">
    This link to{" "}
    <Link href="https://google.com" target="_blank">
      google.com
    </Link>{" "}
    will be updated to prevent malicious scripts from Google, while this link to{" "}
    <Link href="https://www.w3.org/" target="_blank" preventMaliciousTarget={false}>
      w3.org
    </Link>{" "}
    will not.
  </Text>
);

export default LinkTarget;
