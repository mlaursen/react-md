import React, { FC } from "react";
import Link from "components/Link";
import { useRouter } from "next/router";

const ThirdPartyRoutingLibraries: FC = () => {
  const { asPath } = useRouter();
  const prefix = asPath.replace(/#.*$/, "");
  return (
    <ul>
      <li>
        <Link href={`${prefix}#with-icons`}>With Icons demo link</Link>
      </li>
    </ul>
  );
};

export default ThirdPartyRoutingLibraries;
