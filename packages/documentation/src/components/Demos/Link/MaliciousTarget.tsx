import React, { FC } from "react";
import { Link } from "@react-md/link";
import { Text } from "@react-md/typography";

const MaliciousTarget: FC = () => (
  <Text type="body-2">
    This link to{" "}
    <Link href="https://google.com" target="_blank">
      google.com
    </Link>{" "}
    will be updated to prevent malicious scripts from Google, while this link to{" "}
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

export default MaliciousTarget;
